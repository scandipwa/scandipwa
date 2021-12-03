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

import PropTypes from 'prop-types';

import Html from 'Component/Html';
import { Product } from 'Component/Product/Product.component';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import { STOCK_TYPE } from 'Component/Product/Stock.config';
import ProductAlerts from 'Component/ProductAlerts';
import TextPlaceholder from 'Component/TextPlaceholder';
import TierPrices from 'Component/TierPrices';
import { isCrawler, isSSR } from 'Util/Browser';
import {
    showNewReviewPopup
} from 'Util/Product';

import './ProductActions.style';

/**
 * Product actions
 * @class ProductActions
 * @namespace Component/ProductActions/Component
 */
export class ProductActions extends Product {
    static propTypes = {
        ...Product.propTypes,
        showOnlyIfLoaded: PropTypes.func.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getLink: PropTypes.func.isRequired,
        offerCount: PropTypes.number.isRequired,
        offerType: PropTypes.string.isRequired,
        stockMeta: PropTypes.string.isRequired,
        metaLink: PropTypes.string.isRequired,
        isPriceAlertEnabled: PropTypes.bool.isRequired,
        isInStockAlertEnabled: PropTypes.bool.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired,
        displayProductStockStatus: PropTypes.bool.isRequired,
        areReviewsEnabled: PropTypes.bool.isRequired,
        isPricePreview: PropTypes.bool.isRequired
    };

    static defaultProps = {
        ...Product.defaultProps,
        productName: ''
    };

    className = 'ProductActions';

    componentDidUpdate(prevProps) {
        const { product: { id: prevId } } = prevProps;
        const { product: { id }, minQuantity, setQuantity } = this.props;

        if (id !== prevId) {
            setQuantity(minQuantity);
        }
    }

    renderReviewButton() {
        const { areReviewsEnabled } = this.props;

        if (!areReviewsEnabled) {
            return null;
        }

        return (
            <button
              block="ProductActions"
              elem="Review"
              onClick={ showNewReviewPopup }
            >
                { __('Write a review') }
            </button>
        );
    }

    renderSkuAndStock() {
        const {
            getActiveProduct,
            showOnlyIfLoaded
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
                    sku,
                    (
                        <>
                            { this.renderSku() }
                            { this.renderStock() }
                        </>
                    ),
                    <TextPlaceholder />
                ) }
            </section>
        );
    }

    renderShortDescriptionContent() {
        const { product: { short_description } } = this.props;
        const { html } = short_description || {};

        const htmlWithItemProp = `<div itemProp="description">${ html }</div>`;

        return (
            <div block="ProductActions" elem="ShortDescription">
                { html ? <Html content={ htmlWithItemProp } /> : <p><TextPlaceholder length="long" /></p> }
            </div>
        );
    }

    renderShortDescription() {
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

    renderOfferCount() {
        const { offerCount } = this.props;

        if (offerCount > 1) {
            return (
                <meta
                  itemProp="offerCount"
                  content={ offerCount }
                />
            );
        }

        return null;
    }

    renderSchema() {
        const {
            productName,
            stockMeta,
            metaLink
        } = this.props;

        return (
            <>
                { this.renderOfferCount() }
                <meta itemProp="availability" content={ stockMeta } />
                <meta itemProp="url" content={ metaLink } />
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

    renderPriceWithSchema() {
        const {
            productPrice
        } = this.props;

        const {
            originalPrice: {
                minFinalPrice: {
                    value: minFinalPrice = 0
                } = {},
                maxFinalPrice: {
                    value: maxFinalPrice = 0
                } = {}
            } = {}
        } = productPrice;

        return (
            <div
              block="ProductActions"
              elem="PriceWrapper"
            >
                { this.renderSchema() }
                <meta
                  itemProp="highPrice"
                  content={ (minFinalPrice === maxFinalPrice) ? minFinalPrice : maxFinalPrice }
                />
                { this.renderPrice() }
            </div>
        );
    }

    renderPriceWithGlobalSchema() {
        const {
            offerType,
            product: {
                type_id: type
            }
        } = this.props;

        if (type === PRODUCT_TYPE.grouped) {
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

    renderReviewSection() {
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

    renderPrice() {
        const {
            getActiveProduct,
            inStock,
            product: { type_id: baseType } = {},
            isPricePreview
        } = this.props;
        const { type_id: activeType } = getActiveProduct();

        const notConfigured = baseType === PRODUCT_TYPE.configurable && activeType === baseType;

        return super.renderPrice(!inStock || notConfigured || isPricePreview);
    }

    renderTierPrices() {
        const { getActiveProduct } = this.props;

        return (
            <div block="ProductActions" elem="TierPrices">
                <TierPrices product={ getActiveProduct() } />
            </div>
        );
    }

    renderProductAlerts() {
        const {
            areDetailsLoaded,
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            getActiveProduct,
            inStock
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
                  stockStatus={ inStock ? STOCK_TYPE.IN_STOCK : STOCK_TYPE.OUT_OF_STOCK }
                />
            </section>
        );
    }

    renderAddToCartActionBlock() {
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

    renderAddToCartMobile() {
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

    renderDesktop() {
        return (
            <>
                { this.renderBrand(true) }
                { this.renderName() }
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

    renderMobile() {
        const { product: { type_id: type } } = this.props;
        const isWithoutPriceTotal = type === PRODUCT_TYPE.grouped;

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

    render() {
        const { device: { isMobile } = {}, setValidator } = this.props;

        return (
            <article block="ProductActions" ref={ (elem) => setValidator(elem) }>
                { isMobile ? this.renderMobile() : this.renderDesktop() }
            </article>
        );
    }
}

export default ProductActions;
