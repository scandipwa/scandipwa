/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa-ProductReviewListtheme
 */

import { PureComponent, Suspense } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader/Loader.component';
import ProductGallery from 'Component/ProductGallery';
import { REVIEW_POPUP_ID } from 'Component/ProductReviews/ProductReviews.config';
import { ProductTabShape } from 'Component/ProductTabs/ProductTabs.type';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import NoMatchHandler from 'Route/NoMatchHandler';
import { ProductPageTabs } from 'Route/ProductPage/ProductPage.config';
import { LinkedProductType } from 'Store/LinkedProducts/LinkedProducts.type';
import { ReactElement } from 'Type/Common.type';
import { lowPriorityLazy } from 'Util/Request/LowPriorityLoad';

import { ProductPageComponentProps, ProductPageTab } from './ProductPage.type';

import './ProductPage.style';

export const ProductReviews = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-misc" */
    'Component/ProductReviews'
));
export const ProductTabs = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-misc" */
    'Component/ProductTabs'
));
export const ProductAttributes = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-misc" */
    'Component/ProductAttributes'
));
export const ProductReviewForm = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-misc" */
    'Component/ProductReviewForm'
));
export const ProductLinks = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-misc" */
    'Component/ProductLinks'
));
export const ProductInformation = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-misc" */
    'Component/ProductInformation'
));
export const Popup = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "overlays" */
    'Component/Popup/Popup.container'
));
export const ProductActions = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "overlays" */
    'Component/ProductActions'
));

/** @namespace Route/ProductPage/Component */
export class ProductPageComponent extends PureComponent<ProductPageComponentProps> {
    tabMap: Record<ProductPageTabs, ProductPageTab> = {
        [ ProductPageTabs.INFORMATION ]: {
            name: __('About'),
            shouldTabRender: (): boolean => {
                const { isInformationTabEmpty } = this.props;

                return !isInformationTabEmpty;
            },
            render: (key: string): ReactElement => this.renderProductInformationTab(key),
        },
        [ ProductPageTabs.ATTRIBUTES ]: {
            name: __('Details'),
            shouldTabRender: (): boolean => {
                const { isAttributesTabEmpty } = this.props;

                return !isAttributesTabEmpty;
            },
            render: (key: string): ReactElement => this.renderProductAttributesTab(key),
        },
        [ ProductPageTabs.REVIEWS ]: {
            name: __('Reviews'),
            // Return true since we always show 'Add review' button
            shouldTabRender: (): boolean => {
                const { areReviewsEnabled } = this.props;

                return areReviewsEnabled;
            },
            render: (key: string): ReactElement => this.renderProductReviewsTab(key),
        },
    };

    renderProductDesktopMainData(): ReactElement {
        return (
            <>
                { this.renderProductBrand() }
                { this.renderProductName() }
            </>
        );
    }

    renderProductName(): ReactElement {
        const { dataSource: { name } } = this.props;

        return (
            <h1 block="ProductPage" elem="Title" itemProp="name">
                <TextPlaceholder content={ name } length={ TextPlaceHolderLength.MEDIUM } />
            </h1>
        );
    }

    renderProductBrand(): ReactElement {
        const {
            dataSource: {
                attributes: { brand: { attribute_value: brand = '' } = {} } = {},
            },
        } = this.props;

        if (!brand) {
            return null;
        }

        return (
            <>
                <meta itemProp="brand" content={ brand } />
                <h4 block="ProductPage" elem="Brand" itemProp="brand">
                    <TextPlaceholder content={ brand } />
                </h4>
            </>
        );
    }

    renderProductActionsPlaceholder() {
        return (
            <>
                <div block="ProductPage" elem="SectionPlaceholder" />
                <div block="ProductPage" elem="SectionPlaceholder" />
            </>
        );
    }

    renderProductActions() {
        const {
            getLink,
            dataSource,
            areDetailsLoaded,
            setActiveProduct,
            parameters,
            isMobile,
        } = this.props;

        return (
            <div block="ProductPage" elem="ProductActions">
                { !isMobile && this.renderProductDesktopMainData() }
                <Suspense fallback={ this.renderProductActionsPlaceholder() }>
                    <ProductActions
                      getLink={ getLink }
                      product={ dataSource }
                      parameters={ parameters }
                      areDetailsLoaded={ areDetailsLoaded }
                      setActiveProduct={ setActiveProduct }
                    />
                </Suspense>
            </div>
        );
    }

    renderProductPageContent(): ReactElement {
        const {
            areDetailsLoaded,
            activeProduct,
            useEmptyGallerySwitcher,
            isVariant,
        } = this.props;

        return (
            <>
                <ProductGallery
                  product={ activeProduct }
                  areDetailsLoaded={ areDetailsLoaded }
                  isWithEmptySwitcher={ useEmptyGallerySwitcher }
                  showLoader={ isVariant }
                />
                { this.renderProductActions() }
            </>
        );
    }

    renderProductInformationTab(key: string): ReactElement {
        const {
            dataSource: { description: { html } = {} },
            areDetailsLoaded,
        } = this.props;

        if (!html) {
            return null;
        }

        return (
            <Suspense fallback={ null }>
                <ProductInformation
                  htmlDescription={ html }
                  areDetailsLoaded={ areDetailsLoaded }
                  key={ key }
                />
            </Suspense>
        );
    }

    renderProductAttributesTab(key: string): ReactElement {
        const {
            activeProduct,
            areDetailsLoaded,
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
            areDetailsLoaded,
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

    shouldTabsRender(): ProductTabShape[] {
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
            <Suspense fallback={ <div /> }>
                <ProductTabs tabs={ tabs } />
            </Suspense>
        );
    }

    renderAdditionalSections(): ReactElement {
        const {
            areDetailsLoaded,
        } = this.props;

        return (
            <>
                { this.renderProductTabs() }
                <Suspense fallback={ null }>
                    <ProductLinks
                      linkType={ LinkedProductType.RELATED }
                      title={ __('Recommended for you') }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                </Suspense>
                <Suspense fallback={ null }>
                    <ProductLinks
                      linkType={ LinkedProductType.UPSELL }
                      title={ __('You might also like') }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                </Suspense>
            </>
        );
    }

    renderReviewPopup(): ReactElement {
        const { dataSource } = this.props;

        return (
            <Suspense fallback={ null }>
                <Popup
                  id={ REVIEW_POPUP_ID }
                  mix={ { block: 'ProductReviews', elem: 'Popup' } }
                >
                    <ProductReviewForm product={ dataSource } />
                </Popup>
            </Suspense>
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

export default ProductPageComponent;
