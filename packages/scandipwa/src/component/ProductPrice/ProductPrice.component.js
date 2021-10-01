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
import { MixType } from 'Type/Common';

import './ProductPrice.style';

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Component
 */
export class ProductPrice extends PureComponent {
    static propTypes = {
        price: PropTypes.object,
        priceType: PropTypes.oneOf(Object.values(PRODUCT_TYPE)),
        originalPrice: PropTypes.object,
        tierPrice: PropTypes.string,
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
        label: ''
    };

    pricePreviewRenderMap = {
        [PRODUCT_TYPE.simple]: this.renderCustomisablePrice.bind(this),
        [PRODUCT_TYPE.virtual]: this.renderCustomisablePrice.bind(this),
        [PRODUCT_TYPE.bundle]: this.renderBundlePrice.bind(this),
        [PRODUCT_TYPE.grouped]: this.renderGroupedPrice.bind(this),
        [PRODUCT_TYPE.downloadable]: this.renderCustomisablePrice.bind(this),
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

    renderBundlePrice() {
        const {
            originalPrice: {
                minFinalPrice = {},
                minFinalPrice: { value: minValue = 0 } = {},
                maxFinalPrice = {},
                maxFinalPrice: { value: maxValue = 0 } = {},
                minFinalPriceExclTax = {},
                maxFinalPriceExclTax = {}
            }
        } = this.props;

        if (minValue === maxValue) {
            if (minValue === 0) {
                return this.renderDefaultPrice();
            }

            return this.renderPriceWithTax(minFinalPrice, minFinalPriceExclTax);
        }

        return (
            <>
                { this.renderPriceWithTax(minFinalPrice, minFinalPriceExclTax, __('from')) }
                { this.renderPriceWithTax(maxFinalPrice, maxFinalPriceExclTax, __('to')) }
            </>
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
                minFinalPrice = {},
                minFinalPrice: { value: minValue = 0 } = {},
                maxFinalPrice: { value: maxValue = 0 } = {}
            },
            price: { finalPriceExclTax = {} },
            priceType
        } = this.props;

        if (minValue === maxValue) {
            return this.renderDefaultPrice();
        }

        const { [priceType]: label } = this.priceLabelTypeMap;

        return (
            <>
                { this.renderPriceWithTax(minFinalPrice, finalPriceExclTax, label) }
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

    renderPriceWithTax(basePrice, texPrice, label) {
        return (
            <>
                { this.renderPrice(basePrice, label) }
                { this.renderSubPrice(texPrice) }
            </>
        );
    }

    renderTierPrice() {
        const { tierPrice } = this.props;

        if (!tierPrice) {
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
            <p
              block="ProductPrice"
              mods={ { hasDiscount: discountPercentage !== 0, isPreview } }
              mix={ mix }
              aria-label={ `Product price: ${finalPriceValue}` }
            >
                { isPreview && renderer && renderer() }
                { (!isPreview || !renderer) && this.renderDefaultPrice() }
                { this.renderTierPrice() }
            </p>
        );
    }
}

export default ProductPrice;
