/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { PDP } from 'Component/Header/Header.config';
import { MENU_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import { LOADING_TIME } from 'Route/CategoryPage/CategoryPage.config';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import ProductReducer from 'Store/Product/Product.reducer';
import { addRecentlyViewedProduct } from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import { ProductType } from 'Type/ProductList.type';
import { HistoryType, LocationType, MatchType } from 'Type/Router.type';
import { scrollToTop } from 'Util/Browser';
import { withReducers } from 'Util/DynamicReducer';
import { getIsConfigurableParameterSelected } from 'Util/Product';
import { debounce } from 'Util/Request';
import {
    convertQueryStringToKeyValuePairs,
    objectToUri,
    removeQueryParamWithoutHistory,
    updateQueryParamWithoutHistory
} from 'Util/Url';

import ProductPage from './ProductPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const MetaDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Meta/Meta.dispatcher'
);

export const ProductDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Product/Product.dispatcher'
);

/** @namespace Route/ProductPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOffline: state.OfflineReducer.isOffline,
    product: state.ProductReducer.product,
    metaTitle: state.MetaReducer.title,
    isMobile: state.ConfigReducer.device.isMobile,
    store: state.ConfigReducer.code
});

/** @namespace Route/ProductPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    changeNavigationState: (state) => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, state)),
    requestProduct: (options) => {
        // TODO: check linked products, there might be issues :'(
        ProductDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
        );
    },
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig)),
    updateBreadcrumbs: (breadcrumbs, prevCategoryId) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithProduct(breadcrumbs, prevCategoryId, dispatch)
    ),
    updateMetaFromProduct: (product) => MetaDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithProduct(product, dispatch)
    ),
    goToPreviousNavigationState: (state) => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE, state)),
    addRecentlyViewedProduct: (product, store) => dispatch(addRecentlyViewedProduct(product, store))
});

/** @namespace Route/ProductPage/Container */
export class ProductPageContainer extends PureComponent {
    static propTypes = {
        location: LocationType,
        changeHeaderState: PropTypes.func.isRequired,
        setBigOfflineNotice: PropTypes.func.isRequired,
        changeNavigationState: PropTypes.func.isRequired,
        updateMetaFromProduct: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        requestProduct: PropTypes.func.isRequired,
        isOffline: PropTypes.bool.isRequired,
        productSKU: PropTypes.string,
        productID: PropTypes.number,
        product: ProductType.isRequired,
        history: HistoryType.isRequired,
        match: MatchType.isRequired,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        metaTitle: PropTypes.string,
        addRecentlyViewedProduct: PropTypes.func.isRequired,
        store: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        location: { state: {} },
        productSKU: '',
        productID: 0,
        metaTitle: undefined
    };

    state = {
        parameters: {},
        currentProductSKU: '',
        activeProduct: null
    };

    containerFunctions = {
        getLink: this.getLink.bind(this),
        setActiveProduct: this.setActiveProduct.bind(this),
        isProductInformationTabEmpty: this.isProductInformationTabEmpty.bind(this),
        isProductAttributesTabEmpty: this.isProductAttributesTabEmpty.bind(this)
    };

    setOfflineNoticeSize = this.setOfflineNoticeSize.bind(this);

    static getDerivedStateFromProps(props, state) {
        const {
            product: {
                sku,
                variants,
                configurable_options,
                options,
                productOptionsData
            },
            location: { search }
        } = props;

        const {
            currentProductSKU: prevSKU,
            productOptionsData: prevOptionData
        } = state;

        const currentProductSKU = prevSKU === sku ? '' : prevSKU;

        /**
         * If the product we expect to load is loaded -
         * reset expected SKU
         */
        if (!configurable_options && !variants) {
            return {
                currentProductSKU
            };
        }

        const parameters = Object.entries(convertQueryStringToKeyValuePairs(search))
            .reduce((acc, [key, value]) => {
                if (key in configurable_options) {
                    return { ...acc, [key]: value };
                }

                return acc;
            }, {});

        if (Object.keys(parameters).length !== Object.keys(configurable_options).length) {
            return {
                parameters,
                currentProductSKU
            };
        }

        const newOptionsData = options.reduce((acc, { option_id, required }) => {
            if (required) {
                acc.push(option_id);
            }

            return acc;
        }, []);

        const prevRequiredOptions = productOptionsData?.requiredOptions || [];
        const requiredOptions = [...prevRequiredOptions, ...newOptionsData];

        return {
            parameters,
            currentProductSKU,
            productOptionsData: {
                ...prevOptionData, ...productOptionsData, requiredOptions
            }
        };
    }

    componentDidMount() {
        /**
         * Always make sure the navigation switches into the MENU tab
         * */
        this.updateNavigationState();

        /**
         * Ensure transition PDP => homepage => PDP always having proper meta
         */
        this.updateMeta();

        /**
         * Make sure to update header state, the data-source will
         * define the correct information to use for update
         * (it can be a product, history state product or an empty object).
         */
        this.updateHeaderState();
        this.updateBreadcrumbs();

        /**
         * Scroll page top in order to display it from the start
         */
        scrollToTop();
    }

    componentDidUpdate(prevProps) {
        const {
            isOffline,
            productSKU,
            product: {
                sku
            }
        } = this.props;

        const {
            productSKU: prevProductSKU,
            product: {
                sku: prevSku
            }
        } = prevProps;

        const { sku: stateSKU } = history?.state?.state?.product || {};

        if (isOffline) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        /**
         * We should also update product based data if, the URL
         * rewrite SKU has changed to matching the product history SKU
         * one. At this point there could be sufficient data for
         * some updates (i.e. header state).
         */
        if (
            productSKU !== prevProductSKU
            && stateSKU === productSKU
        ) {
            this.updateHeaderState();
        }

        /**
         * If the currently loaded category ID does not match the ID of
         * category ID from URL rewrite, request category.
         */
        if (productSKU !== sku) {
            this.requestProduct();
        }

        /**
         * If product ID was changed => it is loaded => we need to
         * update product specific information, i.e. breadcrumbs.
         */
        if (sku !== prevSku) {
            this.updateBreadcrumbs();
            this.updateHeaderState();
            this.updateMeta();
        }

        this._addToRecentlyViewedProducts();
    }

    setActiveProduct(product) {
        this.setState({ activeProduct: product });
    }

    isProductInformationTabEmpty() {
        const dataSource = this.getDataSource();

        return dataSource?.description?.html?.length === 0;
    }

    isProductAttributesTabEmpty() {
        const dataSource = this.getDataSource();

        return Object.keys(dataSource?.attributes || {}).length === 0;
    }

    _addToRecentlyViewedProducts() {
        const {
            product,
            product: { sku },
            addRecentlyViewedProduct,
            store
        } = this.props;

        // necessary for skipping not loaded products
        if (!sku) {
            return;
        }

        // push into localstorage only preview of product (image, name and etc)
        const {
            canonical_url,
            categories,
            configurable_options,
            description,
            items,
            meta_description,
            meta_keyword,
            meta_title,
            options,
            product_links,
            reviews,
            short_description,
            variants,
            ...productPreview
        } = product;

        addRecentlyViewedProduct(productPreview, store);
    }

    setOfflineNoticeSize() {
        const { setBigOfflineNotice, productSKU } = this.props;
        const { sku } = this.getDataSource();

        /**
         * If there is any information about the product, in example,
         * we know it's URL-rewrite SKU is matching the product SKU -
         * show the small offline notice, else - show larger one.
         */
        if (sku !== productSKU) {
            setBigOfflineNotice(true);
        } else {
            setBigOfflineNotice(false);
        }
    }

    getLink(key, value) {
        const { location: { search, pathname } } = this.props;
        const obj = {
            ...convertQueryStringToKeyValuePairs(search)
        };

        if (key) {
            obj[key] = value;
        }

        const query = objectToUri(obj);

        return `${pathname}${query}`;
    }

    containerProps() {
        const { isMobile, location } = this.props;
        const { parameters } = this.state;

        return {
            areDetailsLoaded: this.getAreDetailsLoaded(),
            isAttributesTabEmpty: this.isProductAttributesTabEmpty(),
            isInformationTabEmpty: this.isProductInformationTabEmpty(),
            activeProduct: this.getActiveProductDataSource(),
            dataSource: this.getDataSource(),
            useEmptyGallerySwitcher: this.getUseEmptyGallerySwitcher(),
            isVariant: this.getIsVariant(),
            isMobile,
            parameters,
            location
        };
    }

    getIsVariant() {
        const { activeProduct } = this.state;

        if (!activeProduct) {
            return false;
        }

        const { product: { id } = {} } = this.props;
        const { id: childId } = activeProduct;

        return id !== childId;
    }

    updateUrl(key, value, parameters) {
        const { location, history } = this.props;

        const isParameterSelected = getIsConfigurableParameterSelected(parameters, key, value);

        if (isParameterSelected) {
            updateQueryParamWithoutHistory(key, value, history, location);
        } else {
            removeQueryParamWithoutHistory(key, history, location);
        }
    }

    getAreDetailsLoaded() {
        const { product } = this.props;
        const dataSource = this.getDataSource();

        return dataSource === product;
    }

    getUseEmptyGallerySwitcher() {
        const { activeProduct } = this.state;
        const product = this.getDataSource();

        if (!activeProduct || !product) {
            return false;
        }

        const { media_gallery_entries: mediaGallery = [] } = product;
        const { media_gallery_entries: activeMediaGallery = [] } = activeProduct;

        return mediaGallery.length > 1 || activeMediaGallery.length > 1;
    }

    getActiveProductDataSource() {
        const { activeProduct } = this.state;
        const product = this.getDataSource();

        if (!activeProduct || !product) {
            return product;
        }

        const { attributes: productAttr = {}, media_gallery_entries: mediaGallery = [] } = product;
        const { attributes: activeAttr = {}, media_gallery_entries: activeMediaGallery = [] } = activeProduct;

        const attributes = {};
        Object.keys(productAttr).forEach((attr) => {
            const { [attr]: { attribute_value: attrValue }, [attr]: currAttr } = productAttr;
            const { [attr]: { attribute_value: activeAttrValue } = {} } = activeAttr;
            attributes[attr] = {
                ...currAttr,
                attribute_value: activeAttrValue || attrValue
            };
        });

        return {
            ...product,
            attributes,
            media_gallery_entries: activeMediaGallery.length === 0 ? mediaGallery : activeMediaGallery
        };
    }

    getDataSource() {
        const {
            productSKU,
            product
        } = this.props;

        const { sku } = product;
        const { product: stateProduct } = history?.state?.state || {};
        const { sku: stateSKU } = stateProduct || {};

        /**
         * If URL rewrite requested matches loaded product SKU
         * assume it is a data-source.
         */
        if (productSKU === sku) {
            return product;
        }

        /**
         * If URL rewrite requested matches product SKU from
         * history state - it is a data-source.
         */
        if (productSKU === stateSKU) {
            return stateProduct;
        }

        /**
         * Else there is no place to get a up-to-date
         * information about the product from.
         */
        return {};
    }

    getProductRequestFilter() {
        const { productID } = this.props;

        return { productID };
    }

    requestProduct() {
        const { requestProduct, productSKU } = this.props;
        const { currentProductSKU } = this.state;

        /**
         * If URL rewrite was not passed - do not request the product.
         */
        if (!productSKU) {
            return;
        }

        /**
         * Skip loading the same product SKU the second time
         */
        if (currentProductSKU === productSKU) {
            return;
        }

        this.setState({ currentProductSKU: productSKU });

        const options = {
            isSingleProduct: true,
            args: { filter: this.getProductRequestFilter() }
        };

        requestProduct(options);
    }

    updateNavigationState() {
        const { changeNavigationState } = this.props;
        changeNavigationState({ name: MENU_TAB });
    }

    updateMeta() {
        const { updateMetaFromProduct } = this.props;
        updateMetaFromProduct(this.getDataSource());
    }

    updateHeaderState() {
        const { name = '' } = this.getDataSource();
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: PDP,
            title: name,
            onBackClick: () => history.back()
        });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs, location } = this.props;
        const { state: { prevCategoryId = null } = {} } = location;
        updateBreadcrumbs(this.getDataSource(), prevCategoryId);
    }

    render() {
        return (
            <ProductPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withReducers({
    ProductReducer
})(withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer)
));
