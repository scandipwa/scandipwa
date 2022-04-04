/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export type PriceItem = {
    currency: string;
    value: number;
    valueFormatted?: string;
};

export type Discount = {
    amount_off: number;
    percent_off: number;
};

export type PriceVariant = {
    discount: Discount;
    final_price: PriceItem;
    final_price_excl_tax: PriceItem;
    regular_price: PriceItem;
    regular_price_excl_tax: PriceItem;
    default_final_price: PriceItem;
    default_final_price_excl_tax: PriceItem;
    default_price: PriceItem;
};

export type PriceRange = {
    minimum_price: PriceVariant;
    maximum_price: PriceVariant;
};

export type OriginalPrice = {
    minRegularPrice?: PriceItem;
    minFinalPrice?: PriceItem;
    minFinalPriceExclTax?: PriceItem;
    maxRegularPrice?: PriceItem;
    maxFinalPrice?: PriceItem;
    maxFinalPriceExclTax?: PriceItem;
};

export type ProductPrice = {
    price?: {
        finalPrice?: PriceItem;
        finalPriceExclTax?: PriceItem;
        originalPrice?: PriceItem;
        originalPriceExclTax?: PriceItem;
        discount?: Discount;
    };
    originalPrice?: OriginalPrice;
    configuration?: {
        containsOptions?: false;
        containsOptionsWithPrice?: false;
        containsRequiredOptions?: false;
        containsRequiredOptionsWithPrice?: false;
    };
};

export type TierPrices = {
    discount?: Discount;
    final_price?: {
        currency?: string;
        value?: number;
    };
    quantity?: number;
}[];
