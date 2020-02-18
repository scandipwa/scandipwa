/* eslint-disable react/no-unused-state */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-ProductReviewListtheme
 */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Meta from 'Component/Meta';
import { LocationType } from 'Type/Common';
import { ProductType } from 'Type/ProductList';
import ProductGallery from 'Component/ProductGallery';
import ProductActions from 'Component/ProductActions';
import ContentWrapper from 'Component/ContentWrapper';
import ProductReviews from 'Component/ProductReviews';
import RelatedProducts from 'Component/RelatedProducts';
import ProductInformation from 'Component/ProductInformation';

import './ProductPage.style';

const PDP_IMAGE_HEIGHT = 650;
const PDP_IMAGE_WIDTH = 533;

export default class ProductPage extends PureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired
    };

    renderProductPageContent() {
        const {
            configurableVariantIndex,
            parameters,
            getLink,
            dataSource,
            updateConfigurableVariant,
            productOrVariant,
            areDetailsLoaded
        } = this.props;

        return (
            <>
                <ProductGallery
                  product={ productOrVariant }
                />
                <ProductActions
                  getLink={ getLink }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  product={ dataSource }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  configurableVariantIndex={ configurableVariantIndex }
                />
            </>
        );
    }

    renderAdditionalSections() {
        const { dataSource, parameters, areDetailsLoaded } = this.props;

        return (
            <>
                <ProductInformation
                  product={ { ...dataSource, parameters } }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductReviews product={ dataSource } />
                <RelatedProducts
                  product={ dataSource }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }

    renderMeta() {
        const {
            location: { pathname },
            dataSource
        } = this.props;
        const { media_gallery_entries = {} } = dataSource;

        const {
            base: { url: imageSrc = '' } = {}
        } = media_gallery_entries[0] || {};

        return (
            <Meta
              metaObject={ {
                  ...dataSource,
                  imageHeight: PDP_IMAGE_HEIGHT,
                  imageWidth: PDP_IMAGE_WIDTH,
                  imageSrc,
                  pathname
              } }
            />
        );
    }

    render() {
        return (
            <>
                { this.renderMeta() }
                <main block="ProductPage" aria-label="Product page">
                    <div
                      itemScope
                      itemType="http://schema.org/Product"
                    >
                        <ContentWrapper
                          wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                          label={ __('Main product details') }
                        >
                            { this.renderProductPageContent() }
                        </ContentWrapper>
                    </div>
                    { this.renderAdditionalSections() }
                </main>
            </>
        );
    }
}
