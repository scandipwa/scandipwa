/* eslint-disable react/no-unused-state */
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'Route';
import { PDP } from 'Component/Header';
import ProductGallery from 'Component/ProductGallery';
import ContentWrapper from 'Component/ContentWrapper';
import ProductInformation from 'Component/ProductInformation';
import Meta from 'Component/Meta';
import ProductActions from 'Component/ProductActions';
import { ProductType } from 'Type/ProductList';
import { getVariantIndex } from 'Util/Product';
import RelatedProducts from 'Component/RelatedProducts';
import {
    getUrlParam,
    convertQueryStringToKeyValuePairs,
    updateQueryParamWithoutHistory,
    convertKeyValueObjectToQueryString
} from 'Util/Url';
import './ProductPage.style';
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes';

class ProductPage extends Component {
    constructor() {
        super();

        this.getLink = this.getLink.bind(this);
        this.updateUrl = this.updateUrl.bind(this);

        this.state = {
            id: -1,
            parameters: {},
            configurableVariantIndex: -1
        };

        this.updateUrl = this.updateUrl.bind(this);
    }

    componentDidMount() {
        const { isOnlyPlaceholder } = this.props;
        if (!isOnlyPlaceholder) this.requestProduct();
        this.onProductUpdate();
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

    onProductUpdate() {
        const dataSource = this.getDataSource();

        if (Object.keys(dataSource).length) {
            this.updateBreadcrumbs(dataSource);
            this.updateHeaderState(dataSource);
        }
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

    getLink(key, value) {
        const { location: { search, pathname } } = this.props;
        const query = convertKeyValueObjectToQueryString({
            ...convertQueryStringToKeyValuePairs(search),
            [key]: value
        });

        return `${pathname}${query}`;
    }

    getConfigurableVariantIndex() {
        const { product: { variants } } = this.props;
        const { configurableVariantIndex, parameters } = this.state;

        if (configurableVariantIndex >= 0) return configurableVariantIndex;
        if (variants) return getVariantIndex(variants, parameters);

        return -1;
    }

    /**
     * Get thumbnail picture of the product
     * @param {Object} dataSource product data
     * @return {Number} variant index
     */
    getProductOrVariant(dataSource) {
        const { variants } = dataSource;

        const currentVariantIndex = this.getConfigurableVariantIndex();
        const variant = variants && variants[ currentVariantIndex ];

        return variant || dataSource;
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

    renderConfigurableAttributes(isReady) {
        const { product: { configurable_options, type_id } } = this.props;
        const { parameters } = this.state;

        if (type_id !== 'configurable') return null;

        return (
            <ProductConfigurableAttributes
              isReady={ isReady }
              getLink={ this.getLink }
              parameters={ parameters }
              updateConfigurableVariant={ this.updateUrl }
              configurable_options={ configurable_options }
            />
        );
    }

    render() {
        const { product } = this.props;
        const { configurableVariantIndex, parameters } = this.state;
        const dataSource = this.getDataSource();
        const areDetailsLoaded = dataSource === product;
        const productOrVariant = this.getProductOrVariant(dataSource);

        return (
            <>
                <Meta metaObject={ dataSource } />
                <main block="ProductPage" aria-label="Product page">
                    <ContentWrapper
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label={ __('Main product details') }
                    >
                        <ProductGallery
                          product={ productOrVariant }
                        />
                        <ProductActions
                          getLink={ this.getLink }
                          updateUrl={ this.updateUrl }
                          product={ dataSource }
                          parameters={ parameters }
                          areDetailsLoaded={ areDetailsLoaded }
                          configurableVariantIndex={ configurableVariantIndex }
                        />
                    </ContentWrapper>
                    <ProductInformation product={ dataSource } type="block" />
                    <RelatedProducts
                      product={ dataSource }
                      areDetailsLoaded={ areDetailsLoaded }
                      label="ScandiPWA recommends"
                    />
                </main>
            </>
        );
    }
}

ProductPage.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.shape({
            product: ProductType
        })
    }),
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    requestProduct: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired,
    clearGroupedProductQuantity: PropTypes.func.isRequired,
    product: ProductType.isRequired,
    isOnlyPlaceholder: PropTypes.bool
};

ProductPage.defaultProps = {
    location: { state: {} },
    isOnlyPlaceholder: false
};

export default ProductPage;
