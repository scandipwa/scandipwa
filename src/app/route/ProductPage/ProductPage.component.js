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
            getThumbnail, updateUrl,
            getConfigurableVariantMediaLibrary,
            dataSource
        } = this.props;
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
                    <div
                      itemScope
                      itemType="http://schema.org/Product"
                    >
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
                    </div>
                    <ProductInformation product={ dataSource } type="block" />
                    <RelatedProducts
                      product={ dataSource }
                      areDetailsLoaded={ areDetailsLoaded }
                      label="ScandiPWA recommends"
                      itemType=""
                    />
                </main>
            </>
        );
    }
}

ProductPage.propTypes = {
    configurableVariantIndex: PropTypes.number.isRequired,
    getThumbnail: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    getConfigurableVariantMediaLibrary: PropTypes.func.isRequired,
    dataSource: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.shape({
            product: ProductType
        })
    }),
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    product: ProductType.isRequired
};

ProductPage.defaultProps = {
    location: { state: {} }
};

export default ProductPage;
