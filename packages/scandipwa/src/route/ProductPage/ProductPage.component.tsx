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
import { ProductPageTabs } from 'Route/ProductPage/ProductPage.config';
import { LinkedProductType } from 'Store/LinkedProducts/LinkedProducts.type';
import { ReactElement } from 'Type/Common.type';

import { ProductPageComponentProps } from './ProductPage.type';

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
export class ProductPage extends PureComponent<ProductPageComponentProps> {
    tabMap = {
        [ ProductPageTabs.INFORMATION ]: {
            name: __('About'),
            shouldTabRender: (): boolean => {
                const { isInformationTabEmpty } = this.props;

                return !isInformationTabEmpty;
            },
            render: (key: string): ReactElement => this.renderProductInformationTab(key)
        },
        [ ProductPageTabs.ATTRIBUTES ]: {
            name: __('Details'),
            shouldTabRender: (): boolean => {
                const { isAttributesTabEmpty } = this.props;

                return !isAttributesTabEmpty;
            },
            render: (key: string): ReactElement => this.renderProductAttributesTab(key)
        },
        [ ProductPageTabs.REVIEWS ]: {
            name: __('Reviews'),
            // Return true since we always show 'Add review' button
            shouldTabRender: (): boolean => true,
            render: (key: string): ReactElement => this.renderProductReviewsTab(key)
        }
    };

    renderProductPageContent(): ReactElement {
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

    renderProductInformationTab(key: string): ReactElement {
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

    renderProductAttributesTab(key: string): ReactElement {
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

    renderProductReviewsTab(key: string): ReactElement {
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

    shouldTabsRender(): ReactElement {
        return Object.entries(this.tabMap)
            .map(([id, values]) => ({ id, ...values }))
            .filter(({ shouldTabRender }) => shouldTabRender());
    }

    renderProductTabs(): ReactElement {
        const tabs = this.shouldTabsRender();

        if (!tabs) {
            return null;
        }

        return (
            <ProductTabs tabs={ tabs } />
        );
    }

    renderAdditionalSections(): ReactElement {
        const {
            areDetailsLoaded
        } = this.props;

        return (
            <>
                { this.renderProductTabs() }
                <ProductLinks
                  linkType={ LinkedProductType.RELATED }
                  title={ __('Recommended for you') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductLinks
                  linkType={ LinkedProductType.UPSELL }
                  title={ __('You might also like') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }

    renderReviewPopup(): ReactElement {
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

    render(): ReactElement {
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
