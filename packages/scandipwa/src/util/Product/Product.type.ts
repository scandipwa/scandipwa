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

import { PriceItem } from 'Type/Price.type';
import { Product } from 'Type/ProductList.type';

import { IndexedVariant } from './Product';

export enum QtyFields {
    SALABLE_QTY = 'salable_qty',
    MIN_SALE_QTY = 'min_sale_qty',
    MAX_SALE_QTY = 'max_sale_qty'
}

export enum QtyDefault {
    DEFAULT_MIN_PRODUCTS = 1,
    DEFAULT_MAX_PRODUCTS = 999
}

export type FormattedProduct = Omit<Product, 'variants'> & {
    variants?: IndexedVariant[];
};

export type AdjustedPrices = Record<string, AdjustedPrice>;

export type FormattedPriceConfiguration = {
    containsOptions: boolean;
    containsOptionsWithPrice: boolean;
    containsRequiredOptions: boolean;
    containsRequiredOptionsWithPrice: boolean;
};

export type FormattedPrice = {
    price: {
        finalPrice: PriceItem;
        finalPriceExclTax: PriceItem;
        originalPrice: PriceItem;
        originalPriceExclTax: PriceItem;
        discount: {
            percentOff: number;
        };
    };
    originalPrice: {
        minRegularPrice: PriceItem;
        minFinalPrice: PriceItem;
        minFinalPriceExclTax: PriceItem;
        maxRegularPrice: PriceItem;
        maxFinalPrice: PriceItem;
        maxFinalPriceExclTax: PriceItem;
    };
    configuration: FormattedPriceConfiguration;
};

export type EnteredOption = {
    uid: string;
    value: string;
};

export type FormattedAdjustedPrices = {
    downloadable: {
        exclTax: number;
        inclTax: number;
        requiresDiscountCalculations: boolean;
        hasDiscountCalculated: boolean;
    };
    bundle: {
        exclTax: number;
        inclTax: number;
        requiresDiscountCalculations: boolean;
        hasDiscountCalculated: boolean;
    };
    config: {
        exclTax: number;
        inclTax: number;
        requiresDiscountCalculations: boolean;
    };
};

export type AdjustedPrice = {
    exclTax: number;
    inclTax: number;
    hasDiscountCalculated: boolean;
    requiresDiscountCalculations: boolean;
};

export type IndexedOption = AttributeOption & {
    swatch_data: SwatchData | null;
};

export type IndexedConfigurableOption = Attribute & {
    attribute_values: string[];
    values: {
        value_index: number;
    }[];
};

export type IndexedVariant = Omit<ItemShape, 'attributes'> & {
    attributes: Record<string, Attribute>;
};

export type IndexedCustomOption = Omit<Option, 'value' | keyof OptionTypes> & {
    value: Value[];
};

export type FormattedBundleOptions = Pick<BundleOption, 'option_id'> & BundleOptionSelection;
