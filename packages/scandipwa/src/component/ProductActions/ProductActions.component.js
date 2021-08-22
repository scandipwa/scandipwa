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

import GroupedProductList from 'Component/GroupedProductList';
import Html from 'Component/Html';
import { Product } from 'Component/Product/Product.component';
import ProductAlerts from 'Component/ProductAlerts';
import ProductBundleItems from 'Component/ProductBundleItems';
import ProductCompareButton from 'Component/ProductCompareButton';
import ProductPrice from 'Component/ProductPrice';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import TextPlaceholder from 'Component/TextPlaceholder';
import TierPrices from 'Component/TierPrices';
import PRODUCT_TYPE from 'Config/Product.config';
import { IN_STOCK } from 'Config/Stock.config';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';
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
        productOrVariant: ProductType.isRequired,
        minQuantity: PropTypes.number.isRequired,
        maxQuantity: PropTypes.number.isRequired,
        configurableVariantIndex: PropTypes.number,
        showOnlyIfLoaded: PropTypes.func.isRequired,
        quantity: PropTypes.number.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getLink: PropTypes.func.isRequired,
        setQuantity: PropTypes.func.isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
        clearGroupedProductQuantity: PropTypes.func.isRequired,
        setGroupedProductQuantity: PropTypes.func.isRequired,
        onProductValidationError: PropTypes.func.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired,
        productOptionsData: PropTypes.object.isRequired,
        setBundlePrice: PropTypes.func.isRequired,
        productName: PropTypes.string,
        offerCount: PropTypes.number.isRequired,
        offerType: PropTypes.string.isRequired,
        stockMeta: PropTypes.string.isRequired,
        metaLink: PropTypes.string.isRequired,
        device: DeviceType.isRequired,
        isPriceAlertEnabled: PropTypes.bool.isRequired,
        isInStockAlertEnabled: PropTypes.bool.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired,
        displayProductStockStatus: PropTypes.bool.isRequired,
        setRefs: PropTypes.func.isRequired,
        areReviewsEnabled: PropTypes.bool.isRequired
    };

    static defaultProps = {
        ...Product.defaultProps,
        configurableVariantIndex: 0,
        productPrice: {},
        productName: ''
    };

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
            product,
            product: { variants },
            configurableVariantIndex,
            showOnlyIfLoaded
        } = this.props;

        const productOrVariant = variants && variants[configurableVariantIndex] !== undefined
            ? variants[configurableVariantIndex]
            : product;

        const { sku } = productOrVariant;

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

    renderBundleItems() {
        const {
            product: { items, type_id, price_range },
            maxQuantity,
            getSelectedCustomizableOptions,
            productOptionsData,
            setBundlePrice
        } = this.props;

        if (type_id !== PRODUCT_TYPE.bundle) {
            return null;
        }

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'bundle_items' } }
            >
                <ProductBundleItems
                  items={ items }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  maxQuantity={ maxQuantity }
                  productOptionsData={ productOptionsData }
                  setBundlePrice={ setBundlePrice }
                  price_range={ price_range }
                  type_id={ type_id }
                />
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
    //
    // renderCustomizableOptions() {
    //     const {
    //         product: {
    //             options,
    //             type_id = '',
    //             price_range = {}
    //         } = {},
    //         getSelectedCustomizableOptions,
    //         productOptionsData,
    //         device: { isMobile }
    //     } = this.props;
    //
    //     if (isMobile) {
    //         return null;
    //     }
    //
    //     return (
    //         <section
    //           block="ProductActions"
    //           elem="Section"
    //           mods={ { type: 'customizable_options' } }
    //         >
    //             <ProductCustomizableOptions
    //               options={ options }
    //               getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
    //               productOptionsData={ productOptionsData }
    //               price_range={ price_range }
    //               type_id={ type_id }
    //             />
    //         </section>
    //     );
    // }

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

    getConfigurablePriceBadge() {
        const {
            configurableVariantIndex,
            product: { type_id }
        } = this.props;

        if (
            type_id !== PRODUCT_TYPE.configurable
            || configurableVariantIndex > -1
        ) {
            return null;
        }

        return __('As Low as');
    }

    renderPriceWithSchema() {
        const {
            productPrice,
            offerCount,
            productOrVariant: {
                stock_status
            }
        } = this.props;

        if (stock_status !== IN_STOCK) {
            return null;
        }

        const {
            minimum_price: {
                final_price: {
                    value: minFinalPrice = 0
                } = {}
            } = {},
            maximum_price: {
                final_price: {
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
                <ProductPrice
                  isSchemaRequired
                  variantsCount={ offerCount }
                  price={ productPrice }
                  mix={ { block: 'ProductActions', elem: 'Price' } }
                  label={ this.getConfigurablePriceBadge() }
                />
            </div>
        );
    }

    renderPriceWithGlobalSchema() {
        const {
            offerType,
            product: {
                type_id
            }
        } = this.props;

        if (type_id === PRODUCT_TYPE.grouped) {
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

    renderProductWishlistButton() {
        const {
            product,
            quantity,
            configurableVariantIndex,
            onProductValidationError,
            productOptionsData,
            groupedProductQuantity,
            isWishlistEnabled
        } = this.props;

        if (!isWishlistEnabled) {
            return null;
        }

        return (
            <ProductWishlistButton
              product={ product }
              quantity={ quantity }
              configurableVariantIndex={ configurableVariantIndex }
              onProductValidationError={ onProductValidationError }
              productOptionsData={ productOptionsData }
              groupedProductQuantity={ groupedProductQuantity }
            />
        );
    }

    renderProductCompareButton() {
        const {
            product: { id } = {}
        } = this.props;

        if (!id) {
            return null;
        }

        return (
            <ProductCompareButton productId={ id } />
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

    renderGroupedItems() {
        const {
            product,
            product: {
                type_id
            },
            groupedProductQuantity,
            setGroupedProductQuantity,
            clearGroupedProductQuantity
        } = this.props;

        if (type_id !== PRODUCT_TYPE.grouped) {
            return null;
        }

        return (
            <div
              block="ProductActions"
              elem="GroupedItems"
            >
                <GroupedProductList
                  product={ product }
                  clearGroupedProductQuantity={ clearGroupedProductQuantity }
                  groupedProductQuantity={ groupedProductQuantity }
                  setGroupedProductQuantity={ setGroupedProductQuantity }
                />
            </div>
        );
    }

    renderTierPrices() {
        const { productOrVariant } = this.props;

        return (
            <div block="ProductActions" elem="TierPrices">
                <TierPrices product={ productOrVariant } />
            </div>
        );
    }

    renderProductAlerts() {
        const {
            areDetailsLoaded,
            configurableVariantIndex,
            isInStockAlertEnabled,
            isPriceAlertEnabled,
            product,
            product: { variants }
        } = this.props;

        if (
            (!isInStockAlertEnabled && !isPriceAlertEnabled)
            || !areDetailsLoaded
        ) {
            return null;
        }

        const productOrVariant = variants && variants[configurableVariantIndex] !== undefined
            ? variants[configurableVariantIndex]
            : product;

        const { id, stock_status } = productOrVariant;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'alerts' } }
            >
                <ProductAlerts
                  productId={ id }
                  stockStatus={ stock_status }
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
                    { this.renderProductWishlistButton() }
                    { this.renderProductCompareButton() }
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
                { this.renderProductWishlistButton() }
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
                { this.renderGroupedItems() }
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
        const { product: { type_id } } = this.props;
        const isWithoutPriceTotal = type_id === PRODUCT_TYPE.grouped;

        return (
            <>
                { this.renderTierPrices() }
                <div block="ProductActions" elem="ActionsWrapper" mods={ { isWithoutPriceTotal } }>
                    { this.renderPriceWithGlobalSchema() }
                    { this.renderSkuAndStock() }
                </div>
                <div block="ProductActions" elem="ActionsWrapper">
                    { this.renderReviewSection() }
                    { this.renderProductCompareButton() }
                </div>
                { this.renderBrand(true) }
                { this.renderShortDescription() }
                { this.renderProductAlerts() }
                { this.renderConfigurableOptions() }
                { this.renderBundleItems() }
                { this.renderGroupedItems() }
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
