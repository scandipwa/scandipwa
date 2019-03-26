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
import ContentWrapper from 'Component/ContentWrapper';
import ProductActions from 'Component/ProductActions';
import GroupedProductsList from 'Component/GroupedProductsList';
import Meta from 'Component/Meta';
import { ProductType } from 'Type/ProductList';
import { getUrlParam, getQueryParam, updateQueryParamWithoutHistory } from 'Util/Url';
import './ProductPage.style';
import RelatedProducts from 'Component/RelatedProducts';

class ProductPage extends Component {
    constructor() {
        super();

        this.state = {
            configurableVariantIndex: 0,
            // eslint-disable-next-line react/no-unused-state
            isConfigurationInitilized: false
        };
    }

    componentDidMount() {
        this.requestProduct();
        this.updateBreadcrumbs();
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

    componentDidUpdate(prevProps) {
        const { location } = this.props;

        if (location !== prevProps.location) this.requestProduct();
        if (this.variantIndexInPropsChanged(this.props, prevProps)) this.setState({ isConfigurationInitilized: false });
        this.updateBreadcrumbs();
    }

    componentWillUnmount() {
        const { product: { type_id }, clearGroupedProductQuantity } = this.props;

        if (type_id === 'grouped') return clearGroupedProductQuantity();

        return null;
    }

    static getDerivedStateFromProps(props, state) {
        const { isConfigurationInitilized } = state;
        const { location } = props;
        const variantIndex = parseInt(getQueryParam('variant', location), 10);
        const shouldConfigurableOptionBeInitilized = !isConfigurationInitilized
            && typeof variantIndex === 'number';

        if (shouldConfigurableOptionBeInitilized) {
            return {
                configurableVariantIndex: variantIndex,
                isConfigurationInitilized: true
            };
        }

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
     * Check if product varian has changed
     * @param {Object} props
     * @param {Object} prevProps
     * @return {Boolean}
     */
    variantIndexInPropsChanged(props, prevProps) {
        return ProductPage.getVariantIndexFromProps(props) !== ProductPage.getVariantIndexFromProps(prevProps);
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

        this.setState({ isConfigurationInitilized: false });
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
     * @param {Number} variant
     */
    updateUrl(variant) {
        const { configurableVariantIndex } = this.state;

        if (configurableVariantIndex !== variant) updateQueryParamWithoutHistory('variant', variant);

        return this.setState({ configurableVariantIndex: variant });
    }

    render() {
        const { product, product: { variants, type_id }, filters } = this.props;
        const { configurableVariantIndex } = this.state;
        const dataSource = this.getDataSource();
        const { media_gallery_entries } = dataSource;
        const areDetailsLoaded = dataSource === product;
        const thumbnail = this.getThumbnail(configurableVariantIndex, dataSource);
        const mediaGallery = variants && variants[configurableVariantIndex] && areDetailsLoaded
            ? this.getConfigurableVariantMediaLibrary()
            : media_gallery_entries;

        return (
            <>
                <Meta metaObject={ dataSource } />
                <main block="ProductPage" aria-label="Product page">
                    <ContentWrapper
                      mix={ { block: 'ProductPage' } }
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label="Main product details"
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
                        <div>
                            { type_id === 'grouped'
                            && (
                                <GroupedProductsList
                                  product={ dataSource }
                                  handleGroupedQuantityChange={ this.changeGroupedProductQuantity }
                                />
                            ) }
                            <ProductActions
                              product={ dataSource }
                              availableFilters={ filters }
                              configurableVariantIndex={ configurableVariantIndex }
                              areDetailsLoaded={ areDetailsLoaded }
                              updateConfigurableVariantIndex={ index => this.updateUrl(index) }
                            />
                        </div>
                    </ContentWrapper>
                    <ProductDescription
                      product={ dataSource }
                      mediaGallery={ media_gallery_entries }
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
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    requestProduct: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    clearGroupedProductQuantity: PropTypes.func.isRequired,
    product: ProductType.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape)
};

ProductPage.defaultProps = {
    location: {
        state: {}
    },
    filters: []
};

export default ProductPage;
