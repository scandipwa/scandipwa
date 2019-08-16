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

const mapStateToProps = state => ({
    product: state.ProductReducer.product
});

const mapDispatchToProps = dispatch => ({
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
            getProductOrVariant: this.getProductOrVariant.bind(this),
            getLink: this.getLink.bind(this)
        };

        this.containerProps = () => ({
            dataSource: this.getDataSource()
        });
    }

    /**
     * Get selected configurable product variant
     * @param {Object} props
     * @return {Number} variant index
     */
    static getVariantIndexFromProps(props) {
        const { location: { state: locationState } } = props;

        return (locationState && Object.hasOwnProperty.call(locationState, 'variantIndex'))
            ? locationState.variantIndex
            : null;
    }

    componentDidUpdate({ location: { pathname: prevPathname } }) {
        const { location: { pathname } } = this.props;

        if (pathname !== prevPathname) this.requestProduct();
        this.onProductUpdate();
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

    onProductUpdate() {
        const dataSource = this.getDataSource();

        if (Object.keys(dataSource).length) {
            this.updateBreadcrumbs(dataSource);
            this.updateHeaderState(dataSource);
        }
    }

    /**
     * Get thumbnail picture of the product
     * @param {Object} dataSource product data
     * @return {Number} variant index
     */
    getProductOrVariant(dataSource) {
        const { variants } = dataSource;

        const currentVariantIndex = this.getConfigurableVariantIndex();
        const variant = variants && variants[currentVariantIndex];

        return variant || dataSource;
    }

    getConfigurableVariantIndex() {
        const { product: { variants } } = this.props;
        const { configurableVariantIndex, parameters } = this.state;

        if (configurableVariantIndex >= 0) return configurableVariantIndex;
        if (variants) return getVariantIndex(variants, parameters);

        return -1;
    }

    getLink(key, value) {
        const { location: { search, pathname } } = this.props;
        const query = convertKeyValueObjectToQueryString({
            ...convertQueryStringToKeyValuePairs(search),
            [key]: value
        });

        return `${pathname}${query}`;
    }

    getDataSource() {
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

    /**
     * Dispatch product data request
     * @return {void}
     */
    requestProduct() {
        const { requestProduct, location, match } = this.props;
        const options = {
            isSingleProduct: true,
            args: {
                filter: {
                    productUrlPath: getUrlParam(match, location)
                }
            }
        };

        // eslint-disable-next-line react/no-unused-state
        this.setState({ isConfigurationInitialized: false });
        requestProduct(options);
    }

    updateHeaderState({ name: title }) {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            name: PDP,
            title,
            onBackClick: () => history.goBack()
        });
    }


    /**
     * Dispatch breadcrumbs update
     * @return {void}
     */
    updateBreadcrumbs(dataSource) {
        const { updateBreadcrumbs } = this.props;
        updateBreadcrumbs(dataSource);
    }

    /**
     * Update query params without adding to history, set configurableVariantIndex
     * @param {string} key
     * @param {number|string} value
     */
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
    isOnlyPlaceholder: PropTypes.bool
};

ProductPageContainer.defaultProps = {
    location: { state: {} },
    isOnlyPlaceholder: false
};

const ProductPageContainerWrapper = connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer);
export default withRouter(ProductPageContainerWrapper);
