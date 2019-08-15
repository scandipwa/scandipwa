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
import ProductGallery from 'Component/ProductGallery';
import ContentWrapper from 'Component/ContentWrapper';
import ProductActions from 'Component/ProductActions';
// import GroupedProductsList from 'Component/GroupedProductsList';
import Meta from 'Component/Meta';
import { ProductType } from 'Type/ProductList';
import RelatedProducts from 'Component/RelatedProducts';
import ProductInformation from 'Component/ProductInformation';
import './ProductPage.style';

class ProductPage extends Component {
    render() {
        const {
            product, product: { variants },
            filters, configurableVariantIndex,
            getDataSource, getThumbnail,
            getConfigurableVariantMediaLibrary,
            updateUrl
        } = this.props;
        const dataSource = getDataSource();
        const { media_gallery_entries } = dataSource;
        const areDetailsLoaded = dataSource === product;
        const thumbnail = getThumbnail(configurableVariantIndex, dataSource);
        const mediaGallery = variants && variants[configurableVariantIndex] && areDetailsLoaded
            ? getConfigurableVariantMediaLibrary()
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
                        />
                        <ProductActions
                          product={ dataSource }
                          availableFilters={ filters }
                          areDetailsLoaded={ areDetailsLoaded }
                          configurableVariantIndex={ configurableVariantIndex }
                          updateConfigurableVariantIndex={ updateUrl }
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
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    requestProduct: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired,
    clearGroupedProductQuantity: PropTypes.func.isRequired,
    product: ProductType.isRequired,
    filters: PropTypes.objectOf(PropTypes.shape).isRequired,
    isOnlyPlaceholder: PropTypes.bool
};

ProductPage.defaultProps = {
    location: { state: {} },
    isOnlyPlaceholder: false
};

export default ProductPage;
