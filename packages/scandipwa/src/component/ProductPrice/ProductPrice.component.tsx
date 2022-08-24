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

import { PureComponent } from 'react';

import { ProductType } from 'Component/Product/Product.config';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { FormattedMoney } from 'Util/Product/Product.type';

import { DisplayProductPricesInCatalog } from './ProductPrice.config';
import { CurrencySchema, PriceSchema, ProductPriceComponentProps } from './ProductPrice.type';

import './ProductPrice.style';

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Component
 */
export class ProductPrice extends PureComponent<ProductPriceComponentProps> {
    static defaultProps: Partial<ProductPriceComponentProps> = {
        price: {},
        priceType: ProductType.SIMPLE,
        originalPrice: {},
        priceCurrency: GQLCurrencyEnum.USD,
        discountPercentage: 0,
        isPreview: false,
        isSchemaRequired: false,
        variantsCount: 0,
        mix: {},
        tierPrice: {},
        label: '',
        configuration: {},
        displayTaxInPrice: DisplayProductPricesInCatalog.INCL_TAX
    };

    pricePreviewRenderMap = {
        [ProductType.SIMPLE]: this.renderDefaultPrice.bind(this),
        [ProductType.VIRTUAL]: this.renderDefaultPrice.bind(this),
        [ProductType.BUNDLE]: this.renderBundlePrice.bind(this),
        [ProductType.GROUPED]: this.renderGroupedPrice.bind(this),
        [ProductType.DOWNLOADABLE]: this.renderDefaultPrice.bind(this),
        [ProductType.CONFIGURABLE]: this.renderConfigurablePrice.bind(this)
    };

    priceLabelTypeMap = {
        [ProductType.SIMPLE]: __('Starting at'),
        [ProductType.VIRTUAL]: __('Starting at'),
        [ProductType.BUNDLE]: __('Starting at'),
        [ProductType.GROUPED]: __('Starting at'),
        [ProductType.DOWNLOADABLE]: __('Starting at'),
        [ProductType.CONFIGURABLE]: __('As Low as')
    };

    renderPlaceholder(): ReactElement {
        const { mix } = this.props;

        return (
            <p block="ProductPrice" aria-label="Product Price" mix={ mix }>
                <TextPlaceholder
                  mix={ { block: 'ProductPrice', elem: 'Placeholder' } }
                  length={ TextPlaceHolderLength.CUSTOM }
                />
            </p>
        );
    }

    getCurrencySchema(): Partial<CurrencySchema> {
        const { isSchemaRequired, priceCurrency } = this.props;

        return isSchemaRequired ? { itemProp: 'priceCurrency', content: priceCurrency } : {};
    }

    getCurrentPriceSchema(): Partial<PriceSchema> {
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

    renderPrice(price: Partial<FormattedMoney>, label: string | ReactElement): ReactElement {
        const {
            discountPercentage
        } = this.props;

        const {
            value: priceValue,
            valueFormatted: priceFormatted = 0
        } = price;

        const { itemProp, content } = this.getCurrentPriceSchema();

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';

        if ((!priceValue && priceValue !== 0)) {
            return null;
        }

        return (
            <PriceSemanticElementName block="ProductPrice" elem="Price">
                { this.renderPriceBadge(label) }
                <span
                  itemScope
                  block="ProductPrice"
                  elem="PriceValue"
                >
                    <meta itemProp={ itemProp } content={ String(content) } />
                    { priceFormatted }
                </span>
            </PriceSemanticElementName>
        );
    }

    renderPriceBadge(label: string | ReactElement): ReactElement {
        if (!label) {
            return null;
        }

        return <span mix={ { block: 'ProductPrice', elem: 'PriceBadge' } }>{ label }</span>;
    }

    renderSubPrice(price: Partial<FormattedMoney>): ReactElement {
        const {
            value: priceExclTax = 0,
            valueFormatted: priceExclTaxFormatted = 0
        } = price;

        if (!priceExclTax && priceExclTax !== 0) {
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

    renderOldPrice(): ReactElement {
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
              itemProp={ isSchemaRequired && variantsCount > 1 ? 'highPrice' : undefined }
            >
                { originalPriceFormatted }
            </del>
        );
    }

    renderSchema(): ReactElement {
        const { isSchemaRequired } = this.props;

        if (isSchemaRequired) {
            const { itemProp, content } = this.getCurrencySchema();

            return (
                <meta itemProp={ itemProp } content={ content } />
            );
        }

        return null;
    }

    renderRequiredWithChangePrice(): ReactElement {
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

    renderBundlePrice(): ReactElement {
        const {
            originalPrice: {
                minFinalPrice = {} as FormattedMoney,
                minFinalPrice: { value: minValue = 0 } = {},
                maxFinalPrice = {} as FormattedMoney,
                maxFinalPrice: { value: maxValue = 0 } = {},
                minFinalPriceExclTax = {} as FormattedMoney,
                maxFinalPriceExclTax = {} as FormattedMoney,
                minRegularPrice = {} as FormattedMoney,
                maxRegularPrice = {} as FormattedMoney,
                minRegularPrice: { value: minRegularValue = 0 } = {},
                maxRegularPrice: { value: maxRegularValue = 0 } = {}
            }
        } = this.props;

        if (minValue === maxValue) {
            const renderer = (minValue === 0)
                ? this.renderDefaultPrice()
                : this.renderPriceWithOrWithoutTax(minFinalPrice, minFinalPriceExclTax);

            return (
                <>
                    { minValue < minRegularValue && this.renderRegularPrice(minRegularPrice) }
                    { renderer }
                </>
            );
        }

        return (
            <>
                <div block="ProductPrice" elem="BundleFrom" mods={ { hasDiscount: minValue < minRegularValue } }>
                    { minValue > 0 && this.renderPriceBadge(__('from')) }
                    { minValue < minRegularValue && this.renderRegularPrice(minRegularPrice) }
                    { this.renderPriceWithOrWithoutTax(minFinalPrice, minFinalPriceExclTax) }
                </div>
                <div block="ProductPrice" elem="BundleTo" mods={ { hasDiscount: maxValue < maxRegularValue } }>
                    { maxValue > 0 && this.renderPriceBadge(__('to')) }
                    { maxValue < maxRegularValue && this.renderRegularPrice(maxRegularPrice) }
                    { this.renderPriceWithOrWithoutTax(maxFinalPrice, maxFinalPriceExclTax) }
                </div>
            </>
        );
    }

    renderRegularPrice(price: FormattedMoney): ReactElement {
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

    renderGroupedPrice(): ReactElement {
        const {
            originalPrice: {
                minFinalPrice = {},
                minFinalPriceExclTax = {}
            },
            priceType
        } = this.props;
        const { [priceType]: label } = this.priceLabelTypeMap;

        return this.renderPriceWithOrWithoutTax(minFinalPrice, minFinalPriceExclTax, label);
    }

    renderCustomisablePrice(): ReactElement {
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

        return this.renderPriceWithOrWithoutTax(minFinalPrice, minFinalPriceExclTax, label);
    }

    renderConfigurablePrice(): ReactElement {
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

        return this.renderPriceWithOrWithoutTax(finalPrice, finalPriceExclTax, label);
    }

    renderDefaultPrice(defaultLabel: string | null = null): ReactElement {
        const {
            price: { finalPrice = {}, finalPriceExclTax = {} } = {},
            label
        } = this.props;

        return (
            <>
                { this.renderOldPrice() }
                { this.renderPriceWithOrWithoutTax(finalPrice, finalPriceExclTax, defaultLabel || label) }
                { this.renderSchema() }
            </>
        );
    }

    renderPriceWithOrWithoutTax(
        basePrice: Partial<FormattedMoney>,
        taxPrice: Partial<FormattedMoney>,
        label?: string | ReactElement
    ): ReactElement {
        const { displayTaxInPrice } = this.props;

        if (displayTaxInPrice === DisplayProductPricesInCatalog.INCL_TAX) {
            return this.renderPrice(basePrice, label);
        }

        if (displayTaxInPrice === DisplayProductPricesInCatalog.EXCL_TAX) {
            return this.renderPrice(taxPrice, label);
        }

        return (
            <>
                { this.renderPrice(basePrice, label) }
                { this.renderSubPrice(taxPrice) }
            </>
        );
    }

    renderTierPrice(): ReactElement {
        const {
            tierPrice: {
                valueFormatted: tierPriceFormatted,
                value: tierPriceValue
            },
            price: {
                finalPrice: {
                    value
                } = {}
            } = {}
        } = this.props;

        if (!tierPriceFormatted || tierPriceValue >= value) {
            return null;
        }

        return (
            <p block="ProductPrice" elem="TierPrice">
                { __('As low as') }
                <strong>{ ` ${tierPriceFormatted}` }</strong>
            </p>
        );
    }

    render(): ReactElement {
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
                { priceType !== ProductType.BUNDLE && this.renderTierPrice() }
            </div>
        );
    }
}

export default ProductPrice;
