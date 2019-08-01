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
import { getUrlParam, convertQueryStringToKeyValuePairs, setQueryParams } from 'Util/Url';
import { getVariantIndex } from 'Util/Product';
import RelatedProducts from 'Component/RelatedProducts';
import './ProductPage.style';

class ProductPage extends Component {
    constructor() {
        super();

        this.state = {
            configurableVariantIndex: 0,
            parameters: {},
            previousPath: ''
        };
    }

    componentDidMount() {
        const { isOnlyPlaceholder } = this.props;
        if (!isOnlyPlaceholder) this.requestProduct();
        this.updateBreadcrumbs();
    }

    static getDerivedStateFromProps(props, state) {
        const { product: { variants, configurable_options }, location: { search } } = props;
        const { parameters: prevParams } = state;

        if (!(configurable_options && variants)) return null;

        const parameters = Object.entries(convertQueryStringToKeyValuePairs(search))
            .reduce((acc, [key, value]) => {
                if (configurable_options.find(({ attribute_code }) => attribute_code === key)) {
                    return { ...acc, [key]: value };
                }
                return acc;
            }, {});

        const didParametersChange = (param1, param2) => {
            const sortParameters = parameters => Object.keys(parameters).sort().reduce((acc, key) => ({
                ...acc,
                [key]: parameters[key]
            }), {});

            return JSON.stringify(sortParameters(param1)) !== JSON.stringify(sortParameters(param2));
        };

        if (didParametersChange(parameters, prevParams)) {
            const configurableVariantIndex = getVariantIndex(variants, parameters);
            return { configurableVariantIndex, parameters };
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;

        if (location.pathname !== prevProps.location.pathname) this.requestProduct();
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

    getConfigurableVariantMediaLibrary() {
        const { product: { variants } } = this.props;
        const { configurableVariantIndex } = this.state;
        const dataSource = this.getDataSource();
        const { media_gallery_entries } = dataSource;
        const { media_gallery_entries: configurableMediaGallery } = variants[configurableVariantIndex].product;

        return configurableMediaGallery.length ? configurableMediaGallery : media_gallery_entries;
    }

    /**
     * Get thumbnail picture of the product
     * @param {Number} currentVariantIndex product variant index
     * @param {Object} dataSource product data
     * @return {Number} variant index
     */
    getThumbnail(currentVariantIndex, dataSource) {
        const { thumbnail, variants } = dataSource;
        const variantThumbnail = variants
            && variants[ currentVariantIndex ]
            && variants[ currentVariantIndex ].product.thumbnail;
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
     * @param {Object} options
     */
    updateUrl(options) {
        const { product: { variants }, location, history } = this.props;
        const { configurableVariantIndex } = this.state;
        const { product: { parameters } } = variants[configurableVariantIndex];

        const newParams = {
            ...parameters,
            ...options
        };
        const newIndex = getVariantIndex(variants, newParams);

        if (configurableVariantIndex !== newIndex) {
            setQueryParams(options, location, history);
            this.setState({ configurableVariantIndex: newIndex });
        }
    }

    render() {
        const { product, product: { variants, type_id } } = this.props;
        const { configurableVariantIndex } = this.state;
        const dataSource = this.getDataSource();
        const { media_gallery_entries } = dataSource;
        const areDetailsLoaded = dataSource === product;
        const thumbnail = this.getThumbnail(configurableVariantIndex, dataSource);
        const mediaGallery = variants && variants[configurableVariantIndex] && areDetailsLoaded
            ? this.getConfigurableVariantMediaLibrary()
            : media_gallery_entries;

        console.log(dataSource, product);
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
                          product={ dataSource }
                          areDetailsLoaded={ areDetailsLoaded }
                          configurableVariantIndex={ configurableVariantIndex }
                        />
                        <div aria-label={ __('Product Actions') }>
                            { type_id === 'grouped'
                            && (
                                <GroupedProductsList
                                  product={ dataSource }
                                  handleGroupedQuantityChange={ this.changeGroupedProductQuantity }
                                />
                            ) }
                            <ProductActions
                              product={ dataSource }
                              configurableVariantIndex={ configurableVariantIndex }
                              areDetailsLoaded={ areDetailsLoaded }
                              updateConfigurableVariant={ options => this.updateUrl(options) }
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
