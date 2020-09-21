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
import { HistoryType, LocationType, MatchType } from 'Type/Common';
import { ProductType } from 'Type/ProductList';
import { getVariantIndex } from 'Util/Product';
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
    navigation: state.NavigationReducer[TOP_NAVIGATION_TYPE],
    metaTitle: state.MetaReducer.title,
    device: state.ConfigReducer.device
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
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithProduct(breadcrumbs, dispatch)
    ),
    updateMetaFromProduct: (product) => MetaDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithProduct(product, dispatch)
    ),
    goToPreviousNavigationState: (state) => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Route/ProductPage/Container */
export class ProductPageContainer extends PureComponent {
    state = {
        configurableVariantIndex: -1,
        parameters: {},
        productOptionsData: {},
        selectedBundlePrice: 0,
        currentProductSKU: ''
    };

    containerFunctions = {
        updateConfigurableVariant: this.updateConfigurableVariant.bind(this),
        getLink: this.getLink.bind(this),
        getSelectedCustomizableOptions: this.getSelectedCustomizableOptions.bind(this),
        setBundlePrice: this.setBundlePrice.bind(this)
    };

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
        product: ProductType.isRequired,
        history: HistoryType.isRequired,
        match: MatchType.isRequired,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        navigation: PropTypes.shape(PropTypes.shape).isRequired,
        metaTitle: PropTypes.string
    };

    static defaultProps = {
        location: { state: {} },
        productSKU: '',
        metaTitle: undefined
    };

    static getDerivedStateFromProps(props, state) {
        const {
            product: {
                sku,
                variants,
                configurable_options
            },
            location: { search }
        } = props;

        const { currentProductSKU: prevSKU } = state;

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

        const configurableVariantIndex = getVariantIndex(variants, parameters);

        return {
            parameters,
            currentProductSKU,
            configurableVariantIndex
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
    }

    componentDidUpdate(prevProps) {
        const {
            isOffline,
            productSKU,
            product: {
                sku,
                options,
                items
            }
        } = this.props;

        const {
            productSKU: prevProductSKU,
            product: {
                sku: prevSku,
                options: prevOptions,
                items: prevItems
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

        /**
         * LEGACY: needed to make sure required items are
         * selected in the bundle product.
         */
        if (JSON.stringify(options) !== JSON.stringify(prevOptions)) {
            this.getRequiredProductOptions(options);
        }

        /**
         * LEGACY needed to make sure required options are
         * selected in the customizable options product.
         */
        if (JSON.stringify(items) !== JSON.stringify(prevItems)) {
            this.getRequiredProductOptions(items);
        }
    }

    setOfflineNoticeSize = () => {
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
    };

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

    getRequiredProductOptions(options) {
        const { productOptionsData } = this.state;

        if (!options) {
            return [];
        }

        const requiredOptions = options.reduce((acc, { option_id, required }) => {
            if (required) {
                acc.push(option_id);
            }

            return acc;
        }, []);

        return this.setState({
            productOptionsData:
                { ...productOptionsData, requiredOptions }
        });
    }

    setBundlePrice(price) {
        this.setState({ selectedBundlePrice: price });
    }

    getSelectedCustomizableOptions(values, updateArray = false) {
        const { productOptionsData } = this.state;

        if (updateArray) {
            this.setState({
                productOptionsData:
                    { ...productOptionsData, productOptionsMulti: values }
            });
        } else {
            this.setState({
                productOptionsData:
                    { ...productOptionsData, productOptions: values }
            });
        }
    }

    getIsConfigurableParameterSelected(parameters, key, value) {
        return Object.hasOwnProperty.call(parameters, key) && parameters[key] === value;
    }

    getNewParameters(key, value) {
        const { parameters } = this.state;

        // If value is already selected, than we remove the key to achieve deselection
        if (this.getIsConfigurableParameterSelected(parameters, key, value)) {
            const { [key]: oldValue, ...newParameters } = parameters;

            return newParameters;
        }

        return {
            ...parameters,
            [key]: value.toString()
        };
    }

    containerProps = () => ({
        productOrVariant: this.getProductOrVariant(),
        dataSource: this.getDataSource(),
        areDetailsLoaded: this.getAreDetailsLoaded()
    });

    updateConfigurableVariant(key, value) {
        const parameters = this.getNewParameters(key, value);
        this.setState({ parameters });

        this.updateUrl(key, value, parameters);
        this.updateConfigurableVariantIndex(parameters);
    }

    updateUrl(key, value, parameters) {
        const { location, history } = this.props;

        const isParameterSelected = this.getIsConfigurableParameterSelected(parameters, key, value);

        if (isParameterSelected) {
            updateQueryParamWithoutHistory(key, value, history, location);
        } else {
            removeQueryParamWithoutHistory(key, history, location);
        }
    }

    updateConfigurableVariantIndex(parameters) {
        const { product: { variants, configurable_options } } = this.props;
        const { configurableVariantIndex } = this.state;

        const newIndex = Object.keys(parameters).length === Object.keys(configurable_options).length
            ? getVariantIndex(variants, parameters)
            // Not all parameters are selected yet, therefore variantIndex must be invalid
            : -1;

        if (configurableVariantIndex !== newIndex) {
            this.setState({ configurableVariantIndex: newIndex });
        }
    }

    getAreDetailsLoaded() {
        const { product } = this.props;
        const dataSource = this.getDataSource();
        return dataSource === product;
    }

    getProductOrVariant() {
        const dataSource = this.getDataSource();
        const { variants } = dataSource;
        const currentVariantIndex = this.getConfigurableVariantIndex(variants);
        const variant = variants && variants[currentVariantIndex];

        return variant || dataSource;
    }

    getConfigurableVariantIndex(variants) {
        const { configurableVariantIndex, parameters } = this.state;

        if (configurableVariantIndex >= 0) {
            return configurableVariantIndex;
        }

        if (variants) {
            return getVariantIndex(variants, parameters);
        }

        return -1;
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
        const { productSKU } = this.props;
        return { productSKU };
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
        const { updateBreadcrumbs } = this.props;
        updateBreadcrumbs(this.getDataSource());
    }

    render() {
        return (
            <ProductPage
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer)
);
