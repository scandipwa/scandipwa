/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import Html from 'Component/Html';
import { ProductComponent } from 'Component/Product/Product.component';
import { ProductType } from 'Component/Product/Product.config';
import ProductAlerts from 'Component/ProductAlerts';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import TierPrices from 'Component/TierPrices';
import { ReactElement } from 'Type/Common.type';
import { GQLProductStockStatus } from 'Type/Graphql.type';
import { isCrawler, isSSR } from 'Util/Browser';
import {
    showNewReviewPopup,
} from 'Util/Product';

import { ProductActionsComponentProps } from './ProductActions.type';

import './ProductActions.style';

/**
 * Product actions
 * @class ProductActions
 * @namespace Component/ProductActions/Component
 */
export class ProductActionsComponent extends ProductComponent<ProductActionsComponentProps> {
    static defaultProps: Partial<ProductActionsComponentProps> = {
        ...ProductComponent.defaultProps,
        productName: '',
        isPricePreview: false,
    };

    className = 'ProductActions';

    componentDidUpdate(prevProps: ProductActionsComponentProps): void {
        const { product: { id: prevId } } = prevProps;
        const { product: { id }, minQuantity, setQuantity } = this.props;

        if (id !== prevId) {
            setQuantity(minQuantity);
        }
    }

    renderReviewButton(): ReactElement {
        const { device, areReviewsEnabled } = this.props;

        if (!areReviewsEnabled) {
            return null;
        }

        const isNotSafariOrIos = !device.ios && !device.safari;

        return (
            <button
              block="ProductActions"
              elem="Review"
              onClick={ showNewReviewPopup }
            >
                <span
                  block="ProductActions"
                  elem="ReviewText"
                  mods={ { isNotSafariOrIos } }
                >
                    { __('Write a review') }
                </span>
            </button>
        );
    }

    renderSkuAndStock(): ReactElement {
        const {
            getActiveProduct,
            showOnlyIfLoaded,
        } = this.props;

        const { sku } = getActiveProduct();

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'sku' } }
              aria-label="Product SKU and availability"
            >
                { showOnlyIfLoaded(
                    !!sku,
                    (
                        <>
                            { this.renderSku() }
                            { this.renderStock() }
                        </>
                    ),
                    <TextPlaceholder />,
                ) }
            </section>
        );
    }

    renderShortDescriptionContent(): ReactElement {
        const { product: { short_description } } = this.props;
        const { html } = short_description || {};

        const htmlWithItemProp = `<div itemProp="description">${html}</div>`;

        return (
            <div block="ProductActions" elem="ShortDescription">
                { html
                    ? <Html content={ htmlWithItemProp } />
                    : <p><TextPlaceholder length={ TextPlaceHolderLength.LONG } /></p> }
            </div>
        );
    }

    renderShortDescription(): ReactElement {
        const { product: { short_description, id } } = this.props;
        const { html } = short_description || {};

        if (!html && id) {
            return null;
        }

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'short' } }
              aria-label="Product short description"
            >
                { this.renderShortDescriptionContent() }
            </section>
        );
    }

    renderOfferCount(): ReactElement {
        const { offerCount } = this.props;

        if (offerCount > 1) {
            return (
                <meta
                  itemProp="offerCount"
                  content={ String(offerCount) }
                />
            );
        }

        return null;
    }

    renderSchema(): ReactElement {
        const {
            productName,
            stockMeta,
            metaLink,
        } = this.props;

        return (
            <>
                { this.renderOfferCount() }
                <meta itemProp="availability" content={ stockMeta } />
                <meta itemProp="url" content={ metaLink } />
                { /* eslint-disable-next-line react/forbid-elements */ }
                <a
                  block="ProductActions"
                  elem="SchemaUrl"
                  itemProp="url"
                  href={ metaLink }
                >
                    { productName }
                </a>
            </>
        );
    }

    renderPriceWithSchema(): ReactElement {
        const {
            productPrice,
        } = this.props;

        const {
            originalPrice: {
                minFinalPrice: {
                    value: minFinalPrice = 0,
                } = {},
                maxFinalPrice: {
                    value: maxFinalPrice = 0,
                } = {},
            } = {},
        } = productPrice;

        return (
            <div
              block="ProductActions"
              elem="PriceWrapper"
            >
                { this.renderSchema() }
                <meta
                  itemProp="highPrice"
                  content={ (minFinalPrice === maxFinalPrice) ? String(minFinalPrice) : String(maxFinalPrice) }
                />
                { this.renderPrice() }
            </div>
        );
    }

    renderPriceWithGlobalSchema(): ReactElement {
        const {
            offerType,
            product: {
                type_id: type,
            },
        } = this.props;

        if (type === ProductType.GROUPED) {
            return null;
        }

        return (
            <div
              block="ProductActions"
              elem="Schema"
              itemType={ offerType }
              itemProp="offers"
              itemScope
            >
                { this.renderPriceWithSchema() }
            </div>
        );
    }

    renderReviewSection(): ReactElement {
        return (
            <div
              block="ProductActions"
              elem="Reviews"
            >
                { this.renderRatingSummary() }
                { this.renderReviewButton() }
            </div>
        );
    }

    renderPrice(): ReactElement {
        const {
            getActiveProduct,
            inStock,
            product: { type_id: baseType, price_range = null } = {},
            isPricePreview,
        } = this.props;
        const { type_id: activeType } = getActiveProduct();

        const notConfigured = baseType === ProductType.CONFIGURABLE && activeType === baseType;

        if (!price_range) {
            return <TextPlaceholder />;
        }

        if (baseType === ProductType.CONFIGURABLE && !inStock) {
            return null;
        }

        return super.renderPrice(!inStock || notConfigured || isPricePreview);
    }

    renderTierPrices(): ReactElement {
        const { getActiveProduct } = this.props;

        return (
            <div block="ProductActions" elem="TierPrices">
                <TierPrices product={ getActiveProduct() } />
            </div>
        );
    }

    renderProductAlerts(): ReactElement {
        const {
            areDetailsLoaded,
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            getActiveProduct,
            inStock,
        } = this.props;

        if (
            (!isInStockAlertEnabled && !isPriceAlertEnabled)
            || !areDetailsLoaded
        ) {
            return null;
        }

        const { id } = getActiveProduct();

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'alerts' } }
            >
                <ProductAlerts
                  productId={ id }
                  stockStatus={ inStock ? GQLProductStockStatus.IN_STOCK : GQLProductStockStatus.OUT_OF_STOCK }
                />
            </section>
        );
    }

    renderAddToCartActionBlock(): ReactElement {
        return (
            <div
              block="ProductActions"
              elem="AddToCartWrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderQuantityChanger() }
                { this.renderAddToCartButton() }
                <div block="ProductActions" elem="ActionButtons">
                    { this.renderWishlistButton() }
                    { this.renderCompareButton() }
                </div>
            </div>
        );
    }

    renderAddToCartMobile(): ReactElement {
        return (
            <div
              block="ProductActions"
              elem="AddToCartFixed"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderQuantityChanger() }
                { this.renderAddToCartButton() }
                { this.renderWishlistButton() }
            </div>
        );
    }

    renderDesktop(): ReactElement {
        return (
            <>
                { this.renderReviewSection() }
                { this.renderSkuAndStock() }
                { this.renderShortDescription() }
                { this.renderConfigurableOptions() }
                { this.renderCustomAndBundleOptions() }
                { this.renderGroupedOptions() }
                { this.renderDownloadableSamples() }
                { this.renderDownloadableLinks() }
                { this.renderTierPrices() }
                { this.renderProductAlerts() }
                { this.renderPriceWithGlobalSchema() }
                { this.renderAddToCartActionBlock() }
            </>
        );
    }

    renderMobile(): ReactElement {
        const { product: { type_id: type } } = this.props;
        const isWithoutPriceTotal = type === ProductType.GROUPED;

        return (
            <>
                { this.renderTierPrices() }
                <div block="ProductActions" elem="ActionsWrapper" mods={ { isWithoutPriceTotal } }>
                    { this.renderPriceWithGlobalSchema() }
                    { this.renderSkuAndStock() }
                </div>
                <div block="ProductActions" elem="ActionsWrapper">
                    { this.renderReviewSection() }
                    { this.renderCompareButton() }
                </div>
                { this.renderBrand(true) }
                { this.renderShortDescription() }
                { this.renderProductAlerts() }
                { this.renderConfigurableOptions() }
                { this.renderCustomAndBundleOptions() }
                { this.renderGroupedOptions() }
                { this.renderDownloadableSamples() }
                { this.renderDownloadableLinks() }
                { this.renderAddToCartMobile() }
            </>
        );
    }

    render(): ReactElement {
        const { device: { isMobile } = {}, setValidator } = this.props;

        return (
            <article block="ProductActions" ref={ (elem) => elem && setValidator(elem) }>
                { isMobile ? this.renderMobile() : this.renderDesktop() }
            </article>
        );
    }
}

export default ProductActionsComponent;
