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

import PropTypes from 'prop-types';
import { lazy, PureComponent, Suspense } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader/Loader.component';
import Popup from 'Component/Popup/Popup.container';
import ProductActions from 'Component/ProductActions';
import ProductLinks from 'Component/ProductLinks';
import ProductReviewForm from 'Component/ProductReviewForm/ProductReviewForm.container';
import { REVIEW_POPUP_ID } from 'Component/ProductReviews/ProductReviews.config';
import ProductTabs from 'Component/ProductTabs';
import NoMatchHandler from 'Route/NoMatchHandler';
import {
    PRODUCT_ATTRIBUTES,
    PRODUCT_INFORMATION,
    PRODUCT_REVIEWS
} from 'Route/ProductPage/ProductPage.config';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { ProductType } from 'Type/ProductList.type';

import './ProductPage.style';

export const ProductGallery = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-gallery" */
    'Component/ProductGallery'
));
export const ProductInformation = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-info" */
    'Component/ProductInformation'
));
export const ProductReviews = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-reviews" */
    'Component/ProductReviews'
));
export const ProductAttributes = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-attributes" */
    'Component/ProductAttributes'
));

/** @namespace Route/ProductPage/Component */
export class ProductPage extends PureComponent {
    static propTypes = {
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        dataSource: ProductType.isRequired,
        activeProduct: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        isInformationTabEmpty: PropTypes.bool.isRequired,
        isAttributesTabEmpty: PropTypes.bool.isRequired,
        setActiveProduct: PropTypes.func.isRequired,
        useEmptyGallerySwitcher: PropTypes.bool.isRequired,
        isVariant: PropTypes.bool.isRequired
    };

    tabMap = {
        [PRODUCT_INFORMATION]: {
            name: __('About'),
            shouldTabRender: () => {
                const { isInformationTabEmpty } = this.props;

                return !isInformationTabEmpty;
            },
            render: (key) => this.renderProductInformationTab(key)
        },
        [PRODUCT_ATTRIBUTES]: {
            name: __('Details'),
            shouldTabRender: () => {
                const { isAttributesTabEmpty } = this.props;

                return !isAttributesTabEmpty;
            },
            render: (key) => this.renderProductAttributesTab(key)
        },
        [PRODUCT_REVIEWS]: {
            name: __('Reviews'),
            // Return true since we always show 'Add review' button
            shouldTabRender: () => true,
            render: (key) => this.renderProductReviewsTab(key)
        }
    };

    renderProductPageContent() {
        const {
            getLink,
            dataSource,
            areDetailsLoaded,
            activeProduct,
            setActiveProduct,
            useEmptyGallerySwitcher,
            parameters,
            isVariant
        } = this.props;

        return (
            <>
                <Suspense fallback={ <Loader /> }>
                    <ProductGallery
                      product={ activeProduct }
                      areDetailsLoaded={ areDetailsLoaded }
                      isWithEmptySwitcher={ useEmptyGallerySwitcher }
                      showLoader={ isVariant }
                    />
                </Suspense>
                <ProductActions
                  getLink={ getLink }
                  product={ dataSource }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  setActiveProduct={ setActiveProduct }
                />
            </>
        );
    }

    renderProductInformationTab(key) {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        return (
            <Suspense fallback={ <Loader /> } key={ key }>
                <ProductInformation
                  product={ { ...dataSource, parameters } }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    renderProductAttributesTab(key) {
        const {
            activeProduct,
            areDetailsLoaded
        } = this.props;

        return (
            <Suspense fallback={ <Loader /> } key={ key }>
                <ProductAttributes
                  product={ activeProduct }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    renderProductReviewsTab(key) {
        const {
            dataSource,
            areDetailsLoaded
        } = this.props;

        return (
            <Suspense fallback={ <Loader /> } key={ key }>
                <ProductReviews
                  product={ dataSource }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    shouldTabsRender() {
        return Object.entries(this.tabMap)
            .map(([id, values]) => ({ id, ...values }))
            .filter(({ shouldTabRender }) => shouldTabRender());
    }

    renderProductTabs() {
        const tabs = this.shouldTabsRender();

        if (!tabs) {
            return null;
        }

        return (
            <ProductTabs tabs={ tabs } />
        );
    }

    renderAdditionalSections() {
        const {
            areDetailsLoaded
        } = this.props;

        return (
            <>
                { this.renderProductTabs() }
                <ProductLinks
                  linkType={ RELATED }
                  title={ __('Recommended for you') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductLinks
                  linkType={ UPSELL }
                  title={ __('You might also like') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }

    renderReviewPopup() {
        const { dataSource } = this.props;

        return (
            <Popup
              id={ REVIEW_POPUP_ID }
              mix={ { block: 'ProductReviews', elem: 'Popup' } }
            >
                <ProductReviewForm product={ dataSource } />
            </Popup>
        );
    }

    render() {
        return (
            <NoMatchHandler>
                <main
                  block="ProductPage"
                  aria-label="Product page"
                  itemScope
                  itemType="http://schema.org/Product"
                >
                    <ContentWrapper
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label={ __('Main product details') }
                    >
                        { this.renderProductPageContent() }
                    </ContentWrapper>
                    { this.renderAdditionalSections() }
                    { this.renderReviewPopup() }
                </main>
            </NoMatchHandler>
        );
    }
}

export default ProductPage;
