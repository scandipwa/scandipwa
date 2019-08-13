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
import ProductDetails from 'Component/ProductDetails';
import ProductGallery from 'Component/ProductGallery';
import ProductDescription from 'Component/ProductDescription';
import ProductReviewList from 'Component/ProductReviewList';
import ProductReviewForm from 'Component/ProductReviewForm';
import ContentWrapper from 'Component/ContentWrapper';
import ProductActions from 'Component/ProductActions';
import GroupedProductsList from 'Component/GroupedProductsList';
import Meta from 'Component/Meta';
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
    }

    componentDidMount() {
        const { isOnlyPlaceholder } = this.props;
        if (!isOnlyPlaceholder) this.requestProduct();
        this.updateBreadcrumbs();
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
        this.updateBreadcrumbs();
    }

    componentWillUnmount() {
        const { product: { type_id }, clearGroupedProductQuantity } = this.props;

        if (type_id === 'grouped') return clearGroupedProductQuantity();

        return null;
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

    getConfigurableVariantIndex(variants) {
        const { configurableVariantIndex, parameters } = this.state;

        if (configurableVariantIndex >= 0) return configurableVariantIndex;
        if (variants) return getVariantIndex(variants, parameters);

        return -1;
    }

    getConfigurableVariantMediaLibrary() {
        const { product: { variants } } = this.props;
        const dataSource = this.getDataSource();
        const index = this.getConfigurableVariantIndex(variants);

        const { media_gallery_entries } = dataSource;
        const { media_gallery_entries: configurableMediaGallery } = variants[index];

        return configurableMediaGallery.length ? configurableMediaGallery : media_gallery_entries;
    }

    getLink(key, value) {
        const { location: { search, pathname } } = this.props;
        const query = convertKeyValueObjectToQueryString({
            ...convertQueryStringToKeyValuePairs(search),
            [key]: value
        });

        return `${pathname}${query}`;
    }

    /**
     * Get thumbnail picture of the product
     * @param {Object} dataSource product data
     * @return {Number} variant index
     */
    getThumbnail(dataSource) {
        const { thumbnail, variants = [] } = dataSource;
        const index = this.getConfigurableVariantIndex(variants);
        const { thumbnail: variantThumbnail } = variants[index] || {};
        return variantThumbnail || thumbnail;
    }

    /**
     * Dispatch product data request
     * @return {void}
     */
    requestProduct() {
        const { requestProduct, location, match } = this.props;
        const options = {
            productUrlPath: getUrlParam(match, location),
            notRequireInfo: true,
            isSingleProduct: true,
            getConfigurableData: true
        };
        requestProduct(options);
    }

    /**
     * Dispatch breadcrumbs update
     * @return {void}
     */
    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const dataSource = this.getDataSource();

        if (Object.keys(dataSource).length) updateBreadcrumbs(dataSource);
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
        const { product, product: { variants }, location: { search } } = this.props;
        const { configurableVariantIndex, parameters } = this.state;
        const dataSource = this.getDataSource();
        const { media_gallery_entries } = dataSource;
        const areDetailsLoaded = dataSource === product;
        const thumbnail = this.getThumbnail(dataSource);
        const mediaGallery = variants && areDetailsLoaded
            ? this.getConfigurableVariantMediaLibrary()
            : media_gallery_entries;

        return (
            <>
                <Meta metaObject={ dataSource } />
                <main block="ProductPage" aria-label="Product page">
                    <ContentWrapper
                      mix={ { block: 'ProductPage' } }
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label={ __('Main product details') }
                    >
                        <ProductGallery
                          thumbnail={ thumbnail }
                          mediaGallery={ mediaGallery }
                          areDetailsLoaded={ areDetailsLoaded }
                        />
                        <ProductDetails
                          search={ search }
                          product={ dataSource }
                          areDetailsLoaded={ areDetailsLoaded }
                          configurableVariantIndex={ configurableVariantIndex }
                        />
                        <div>
                            <GroupedProductsList
                              product={ dataSource }
                              handleGroupedQuantityChange={ this.changeGroupedProductQuantity }
                            />
                            { this.renderConfigurableAttributes(areDetailsLoaded) }
                            <ProductActions
                              product={ dataSource }
                              parameters={ parameters }
                              configurableVariantIndex={ configurableVariantIndex }
                              areDetailsLoaded={ areDetailsLoaded }
                            />
                        </div>
                    </ContentWrapper>
                    <ProductDescription
                      product={ dataSource }
                      mediaGallery={ media_gallery_entries }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                    <ProductReviewList
                      product={ dataSource }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                    <ProductReviewForm
                      product={ dataSource }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                    <RelatedProducts
                      areDetailsLoaded={ areDetailsLoaded }
                      product={ product }
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
    clearGroupedProductQuantity: PropTypes.func.isRequired,
    product: ProductType.isRequired,
    isOnlyPlaceholder: PropTypes.bool
};

ProductPage.defaultProps = {
    location: {
        state: {}
    },
    isOnlyPlaceholder: false
};

export default ProductPage;
