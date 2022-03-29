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

export interface PriceItemType {
    currency: string;
    value: number;
    valueFormatted: string;
}

export interface DiscountType {
    amount_off: number;
    percent_off: number;
}

export interface PriceVariantType {
    discount?: DiscountType;
    final_price?: PriceItemType;
    regular_price?: PriceItemType;
}

export interface PriceType {
    minimum_price?: PriceVariantType;
    maximal_price?: PriceVariantType;
}

export interface OriginalPriceType {
    minRegularPrice?: PriceItemType;
    minFinalPrice?: PriceItemType;
    minFinalPriceExclTax?: PriceItemType;
    maxRegularPrice?: PriceItemType;
    maxFinalPrice?: PriceItemType;
    maxFinalPriceExclTax?: PriceItemType;
}

export interface ProductPriceType {
    price?: {
        finalPrice?: PriceItemType;
        finalPriceExclTax?: PriceItemType;
        originalPrice?: PriceItemType;
        originalPriceExclTax?: PriceItemType;
        discount?: DiscountType;
    };
    originalPrice?: OriginalPriceType;
    configuration?: {
        containsOptions?: false;
        containsOptionsWithPrice?: false;
        containsRequiredOptions?: false;
        containsRequiredOptionsWithPrice?: false;
    };
}

export type TierPricesType = {
    discount?: DiscountType;
    final_price?: {
        currency?: string;
        value?: number;
    };
    quantity?: number;
}[];
