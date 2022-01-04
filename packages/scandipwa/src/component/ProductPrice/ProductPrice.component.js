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
import { PureComponent } from 'react';

import PRODUCT_TYPE from 'Component/Product/Product.config';
import TextPlaceholder from 'Component/TextPlaceholder';
import { MixType } from 'Type/Common.type';
import { OriginalPriceType, ProductPriceType } from 'Type/Price.type';
import { PriceConfiguration } from 'Type/ProductList.type';

import './ProductPrice.style';

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Component
 */
export class ProductPrice extends PureComponent {
    static propTypes = {
        price: ProductPriceType,
        priceType: PropTypes.oneOf(Object.values(PRODUCT_TYPE)),
        originalPrice: OriginalPriceType,
        tierPrice: PropTypes.string,
        configuration: PriceConfiguration,
        priceCurrency: PropTypes.string,
        discountPercentage: PropTypes.number,
        isPreview: PropTypes.bool,
        isSchemaRequired: PropTypes.bool,
        label: PropTypes.string,
        variantsCount: PropTypes.number,
        mix: MixType
    };

    static defaultProps = {
        price: {},
        priceType: PRODUCT_TYPE.simple,
        originalPrice: {},
        priceCurrency: 'USD',
        discountPercentage: 0,
        isPreview: false,
        isSchemaRequired: false,
        variantsCount: 0,
        mix: {},
        tierPrice: '',
        label: '',
        configuration: {}
    };

    pricePreviewRenderMap = {
        [PRODUCT_TYPE.simple]: this.renderDefaultPrice.bind(this),
        [PRODUCT_TYPE.virtual]: this.renderDefaultPrice.bind(this),
        [PRODUCT_TYPE.bundle]: this.renderBundlePrice.bind(this),
        [PRODUCT_TYPE.grouped]: this.renderGroupedPrice.bind(this),
        [PRODUCT_TYPE.downloadable]: this.renderDefaultPrice.bind(this),
        [PRODUCT_TYPE.configurable]: this.renderConfigurablePrice.bind(this)
    };

    priceLabelTypeMap = {
        [PRODUCT_TYPE.simple]: __('Starting at'),
        [PRODUCT_TYPE.virtual]: __('Starting at'),
        [PRODUCT_TYPE.bundle]: __('Starting at'),
        [PRODUCT_TYPE.grouped]: __('Starting at'),
        [PRODUCT_TYPE.downloadable]: __('Starting at'),
        [PRODUCT_TYPE.configurable]: __('As Low as')
    };

    renderPlaceholder() {
        const { mix } = this.props;

        return (
            <p block="ProductPrice" aria-label="Product Price" mix={ mix }>
                <TextPlaceholder mix={ { block: 'ProductPrice', elem: 'Placeholder' } } length="custom" />
            </p>
        );
    }

    getCurrencySchema() {
        const { isSchemaRequired, priceCurrency } = this.props;

        return isSchemaRequired ? { itemProp: 'priceCurrency', content: priceCurrency } : {};
    }

    getCurrentPriceSchema() {
        const {
            isSchemaRequired,
            variantsCount,
            price: {
                finalPrice: {
                    value: contentPrice = 0
                } = {}
            } = {}
        } = this.props;

        if (variantsCount > 1) {
            return isSchemaRequired ? { itemProp: 'lowPrice', content: contentPrice } : {};
        }

        return isSchemaRequired ? { itemProp: 'price', content: contentPrice } : {};
    }

    renderPrice(price, label) {
        const {
            discountPercentage
        } = this.props;

        const {
            value: priceValue,
            valueFormatted: priceFormatted = 0
        } = price;

        const { itemProp = null, content = null } = this.getCurrentPriceSchema();

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';

        // force unequal comparison - unsure of resulting type
        // eslint-disable-next-line
        if (priceValue == 0) {
            return null;
        }

        return (
            <PriceSemanticElementName block="ProductPrice" elem="Price">
                { this.renderPriceBadge(label) }
                <span
                  itemProp={ itemProp }
                  content={ content }
                  block="ProductPrice"
                  elem="PriceValue"
                >
                    { priceFormatted }
                </span>
            </PriceSemanticElementName>
        );
    }

    renderPriceBadge(label) {
        if (!label) {
            return null;
        }

        return <span mix={ { block: 'ProductPrice', elem: 'PriceBadge' } }>{ label }</span>;
    }

    renderSubPrice(price) {
        const {
            value: priceExclTax = 0,
            valueFormatted: priceExclTaxFormatted = 0
        } = price;

        if (!priceExclTax) {
            return null;
        }

        return (
            <span
              aria-label={ __('Current product price excl. tax') }
              block="ProductPrice"
              elem="SubPrice"
            >
                { __('Excl. tax: %s', priceExclTaxFormatted) }
            </span>
        );
    }

    renderOldPrice() {
        const {
            price: {
                originalPrice: {
                    value: originalPriceValue,
                    valueFormatted: originalPriceFormatted
                } = {}
            } = {},
            discountPercentage,
            isSchemaRequired,
            variantsCount
        } = this.props;

        if (discountPercentage === 0 || originalPriceValue === 0) {
            return null;
        }

        return (
            <del
              block="ProductPrice"
              elem="HighPrice"
              aria-label={ __('Old product price') }
              itemProp={ isSchemaRequired && variantsCount > 1 ? { itemProp: 'highPrice' } : null }
            >
                { originalPriceFormatted }
            </del>
        );
    }

    renderSchema() {
        const { isSchemaRequired } = this.props;

        if (isSchemaRequired) {
            const { itemProp = null, content = null } = this.getCurrencySchema();

            return (
                <meta itemProp={ itemProp } content={ content } />
            );
        }

        return null;
    }

    renderRequiredWithChangePrice() {
        const {
            configuration: {
                containsRequiredOptionsWithPrice = false
            } = {},
            priceType
        } = this.props;

        const { [priceType]: label } = this.priceLabelTypeMap;

        return (
            <>
                { label && containsRequiredOptionsWithPrice && this.renderPriceBadge(label) }
                { this.renderDefaultPrice() }
            </>
        );
    }

    renderBundlePrice() {
        const {
            originalPrice: {
                minFinalPrice = {},
                minFinalPrice: { value: minValue = 0 } = {},
                maxFinalPrice = {},
                maxFinalPrice: { value: maxValue = 0 } = {},
                minFinalPriceExclTax = {},
                maxFinalPriceExclTax = {},
                minRegularPrice = {},
                maxRegularPrice = {},
                minRegularPrice: { value: minRegularValue = 0 } = {},
                maxRegularPrice: { value: maxRegularValue = 0 } = {}
            }
        } = this.props;

        if (minValue === maxValue) {
            const renderer = (minValue === 0)
                ? this.renderDefaultPrice()
                : this.renderPriceWithTax(minFinalPrice, minFinalPriceExclTax);

            return (
                <>
                    { minValue < minRegularValue && this.renderRegularPrice(minRegularPrice) }
                    { renderer }
                    { this.renderTierPrice() }
                </>
            );
        }

        return (
            <>
                <div block="ProductPrice" elem="BundleFrom" mods={ { hasDiscount: minValue < minRegularValue } }>
                    { minValue > 0 && this.renderPriceBadge(__('from')) }
                    { minValue < minRegularValue && this.renderRegularPrice(minRegularPrice) }
                    { this.renderPriceWithTax(minFinalPrice, minFinalPriceExclTax) }
                </div>
                <div block="ProductPrice" elem="BundleTo" mods={ { hasDiscount: maxValue < maxRegularValue } }>
                    { maxValue > 0 && this.renderPriceBadge(__('to')) }
                    { maxValue < maxRegularValue && this.renderRegularPrice(maxRegularPrice) }
                    { this.renderPriceWithTax(maxFinalPrice, maxFinalPriceExclTax) }
                </div>
            </>
        );
    }

    renderRegularPrice(price) {
        const {
            value,
            valueFormatted
        } = price;

        if (!value || value <= 0 || !valueFormatted) {
            return null;
        }

        return (
            <del block="ProductPrice" elem="HighPrice">{ valueFormatted }</del>
        );
    }

    renderGroupedPrice() {
        const {
            originalPrice: {
                minFinalPrice = {},
                minFinalPriceExclTax = {}
            },
            priceType
        } = this.props;
        const { [priceType]: label } = this.priceLabelTypeMap;

        return (
            <>
                { this.renderPriceWithTax(minFinalPrice, minFinalPriceExclTax, label) }
            </>
        );
    }

    renderCustomisablePrice() {
        const {
            originalPrice: {
                minFinalPrice = {},
                minFinalPriceExclTax = {},
                minFinalPrice: { value: minValue = 0 } = {},
                maxFinalPrice: { value: maxValue = 0 } = {}
            },
            priceType
        } = this.props;

        if (minValue === maxValue) {
            return this.renderDefaultPrice();
        }

        const { [priceType]: label } = this.priceLabelTypeMap;

        return (
            <>
                { this.renderPriceWithTax(minFinalPrice, minFinalPriceExclTax, label) }
            </>
        );
    }

    renderConfigurablePrice() {
        const {
            originalPrice: {
                minFinalPrice: { value: minValue = 0 } = {},
                maxFinalPrice: { value: maxValue = 0 } = {}
            },
            configuration: {
                containsOptions = false
            } = {},
            price: {
                finalPriceExclTax = {},
                finalPrice = {}
            },
            priceType
        } = this.props;

        if (minValue === maxValue && !containsOptions) {
            return this.renderDefaultPrice();
        }

        const { [priceType]: label } = this.priceLabelTypeMap;

        return (
            <>
                { this.renderPriceWithTax(finalPrice, finalPriceExclTax, label) }
            </>
        );
    }

    renderDefaultPrice(defaultLabel = null) {
        const {
            price: { finalPrice = {}, finalPriceExclTax = {} } = {},
            label
        } = this.props;

        return (
            <>
                { this.renderOldPrice() }
                { this.renderPriceWithTax(finalPrice, finalPriceExclTax, defaultLabel || label) }
                { this.renderSchema() }
            </>
        );
    }

    renderPriceWithTax(basePrice, taxPrice, label) {
        return (
            <>
                { this.renderPrice(basePrice, label) }
                { this.renderSubPrice(taxPrice) }
            </>
        );
    }

    renderTierPrice() {
        const {
            tierPrice,
            price: {
                finalPrice: {
                    valueFormatted = 0
                } = {}
            } = {}
        } = this.props;

        if (!tierPrice || tierPrice === valueFormatted) {
            return null;
        }

        return (
            <p block="ProductPrice" elem="TierPrice">
                { __('As low as') }
                <strong>{ ` ${tierPrice}` }</strong>
            </p>
        );
    }

    render() {
        const {
            price: {
                finalPrice,
                originalPrice,
                finalPrice: {
                    value: finalPriceValue = 0
                } = {}
            } = {},
            priceType,
            isPreview,
            discountPercentage,
            mix
        } = this.props;

        if (!finalPrice || !originalPrice) {
            return this.renderPlaceholder();
        }

        const { [priceType]: renderer } = this.pricePreviewRenderMap;

        return (
            <div
              block="ProductPrice"
              mods={ { hasDiscount: discountPercentage !== 0, isPreview } }
              mix={ mix }
              aria-label={ `Product price: ${finalPriceValue}` }
            >
                { isPreview && renderer && renderer() }
                { (!isPreview || !renderer) && this.renderDefaultPrice() }
                { priceType !== PRODUCT_TYPE.bundle && this.renderTierPrice() }
            </div>
        );
    }
}

export default ProductPrice;
