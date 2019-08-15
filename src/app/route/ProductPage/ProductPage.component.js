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
            product,
            filters, configurableVariantIndex,
            updateUrl,
            dataSource,
            getProductOrVariant
        } = this.props;
        const areDetailsLoaded = dataSource === product;
        const productOrVariant = getProductOrVariant(configurableVariantIndex, dataSource);

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
                          product={ productOrVariant }
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
    getProductOrVariant: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    dataSource: ProductType.isRequired,
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
