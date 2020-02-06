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
import Event, { EVENT_GTM_PRODUCT_DETAIL } from 'Util/Event';
import ProductInformation from 'Component/ProductInformation';

import './ProductPage.style';

export default class ProductPage extends PureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        product: ProductType.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired
    };

    componentDidUpdate(prevProps) {
        const { areDetailsLoaded, location: { pathname } } = this.props;
        const { areDetailsLoaded: prevAreDetailsLoaded, location: { pathname: prevPathname } } = prevProps;

        if (
            (areDetailsLoaded && areDetailsLoaded !== prevAreDetailsLoaded)
            || (areDetailsLoaded && pathname !== prevPathname)
        ) {
            this._gtmProductDetail();
        }
    }

    _gtmProductDetail() {
        const { product, location: { pathname }, configurableVariantIndex } = this.props;

        if (product && product.price && product.attributes) {
            Event.dispatch(EVENT_GTM_PRODUCT_DETAIL, {
                product: { ...product, configurableVariantIndex },
                pathname
            });
        }
    }

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

    render() {
        const { dataSource } = this.props;

        return (
            <>
                <Meta metaObject={ dataSource } />
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
