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
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ProductDispatcher } from 'Store/Product';
import { changeHeaderState } from 'Store/Header';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { history } from 'Route';
import { ProductType } from 'Type/ProductList';
import { PDP } from 'Component/Header';
import { getVariantIndex } from 'Util/Product';
import {
    getUrlParam,
    convertQueryStringToKeyValuePairs,
    updateQueryParamWithoutHistory,
    convertKeyValueObjectToQueryString
} from 'Util/Url';

import ProductPage from './ProductPage.component';

export const mapStateToProps = state => ({
    product: state.ProductReducer.product
});

export const mapDispatchToProps = dispatch => ({
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    requestProduct: options => ProductDispatcher.handleData(dispatch, options),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.updateWithProduct(breadcrumbs, dispatch),
    clearGroupedProductQuantity: () => ProductDispatcher.clearGroupedProductQuantity(dispatch)
});

export class ProductPageContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            configurableVariantIndex: 0,
            isConfigurationInitialized: false,
            parameters: {}
        };

        this.containerFunctions = {
            updateUrl: this.updateUrl.bind(this),
            getLink: this.getLink.bind(this)
        };

        this.containerProps = () => ({
            productOrVariant: this._getProductOrVariant(),
            dataSource: this._getDataSource(),
            areDetailsLoaded: this._getAreDetailsLoaded()
        });
    }

    componentDidMount() {
        const { isOnlyPlaceholder } = this.props;
        if (!isOnlyPlaceholder) this._requestProduct();
        this._onProductUpdate();
    }

    componentDidUpdate({ location: { pathname: prevPathname } }) {
        const { location: { pathname } } = this.props;

        if (pathname !== prevPathname) this._requestProduct();
        this._onProductUpdate();
    }


    componentWillUnmount() {
        const { product: { type_id }, clearGroupedProductQuantity } = this.props;

        if (type_id === 'grouped') return clearGroupedProductQuantity();

        return null;
    }

    static getDerivedStateFromProps(props, state) {
        const { id: stateId } = state;
        const {
            product: {
                id,
                variants,
                configurable_options
            },
            location: { search }
        } = props;

        if (!(configurable_options && variants && id !== stateId)) return null;

        const parameters = Object.entries(convertQueryStringToKeyValuePairs(search))
            .reduce((acc, [key, value]) => {
                if (key in configurable_options) {
                    return { ...acc, [key]: value };
                }
                return acc;
            }, {});

        if (Object.keys(parameters).length !== Object.keys(configurable_options).length) {
            return { id, parameters };
        }

        const configurableVariantIndex = getVariantIndex(variants, parameters);
        return { id, parameters, configurableVariantIndex };
    }

    getLink(key, value) {
        const { location: { search, pathname } } = this.props;
        const query = convertKeyValueObjectToQueryString({
            ...convertQueryStringToKeyValuePairs(search),
            [key]: value
        });

        return `${pathname}${query}`;
    }

    updateUrl(key, value) {
        const { product: { variants, configurable_options }, location, history } = this.props;
        const { configurableVariantIndex, parameters: oldParameters } = this.state;

        const parameters = {
            ...oldParameters,
            [key]: value.toString(10)
        };

        this.setState({ parameters });
        updateQueryParamWithoutHistory(key, value, history, location);

        const newIndex = getVariantIndex(variants, parameters);

        if (
            Object.keys(parameters).length === Object.keys(configurable_options).length
            && configurableVariantIndex !== newIndex
        ) {
            this.setState({ configurableVariantIndex: newIndex });
        }
    }

    _onProductUpdate() {
        const dataSource = this._getDataSource();

        if (Object.keys(dataSource).length) {
            this._updateBreadcrumbs(dataSource);
            this._updateHeaderState(dataSource);
        }
    }

    _getAreDetailsLoaded() {
        const { product } = this.props;
        return this._getDataSource() === product;
    }

    _getProductOrVariant() {
        const dataSource = this._getDataSource();
        const { variants } = dataSource;
        const currentVariantIndex = this._getConfigurableVariantIndex();
        const variant = variants && variants[currentVariantIndex];

        return variant || dataSource;
    }

    _getConfigurableVariantIndex() {
        const { product: { variants } } = this.props;
        const { configurableVariantIndex, parameters } = this.state;

        if (configurableVariantIndex >= 0) return configurableVariantIndex;
        if (variants) return getVariantIndex(variants, parameters);

        return -1;
    }

    _getDataSource() {
        const { product, location: { state } } = this.props;
        const productIsLoaded = Object.keys(product).length > 0;
        const locationStateExists = state && Object.keys(state.product).length > 0;

        // return nothing, if no product in url state and no loaded product
        if (!locationStateExists && !productIsLoaded) return {};

        // use product from props, if product is loaded and state does not exist, or state product is equal loaded product
        const useLoadedProduct = productIsLoaded && (
            (locationStateExists && (product.id === state.product.id))
            || !locationStateExists
        );

        return useLoadedProduct ? product : state.product;
    }

    _requestProduct() {
        const { requestProduct, location, match } = this.props;
        const options = {
            isSingleProduct: true,
            args: {
                filter: {
                    productUrlPath: getUrlParam(match, location)
                }
            }
        };

        this.setState({ isConfigurationInitialized: false });
        requestProduct(options);
    }

    _updateHeaderState({ name: title }) {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: PDP,
            title,
            onBackClick: () => history.goBack()
        });
    }

    _updateBreadcrumbs(dataSource) {
        const { updateBreadcrumbs } = this.props;
        updateBreadcrumbs(dataSource);
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

ProductPageContainer.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.shape({
            product: ProductType
        })
    }),
    isOnlyPlaceholder: PropTypes.bool,
    changeHeaderState: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    requestProduct: PropTypes.func.isRequired,
    product: ProductType.isRequired,
    clearGroupedProductQuantity: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

ProductPageContainer.defaultProps = {
    location: { state: {} },
    isOnlyPlaceholder: false
};

const ProductPageContainerWrapper = connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer);
export default withRouter(ProductPageContainerWrapper);
