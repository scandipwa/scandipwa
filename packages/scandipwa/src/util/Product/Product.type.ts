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

import {
    AttributeWithValue,
    BundleItem,
    BundleOption,
    ConfigurableProductOptions,
    CustomizableFieldValue,
    CustomizableFileValue,
    CustomizableProductFragmentOptions,
    CustomizableSelectionValue,
    ProductItem,
    ProductReview
} from 'Query/ProductList.type';
import { Merge } from 'Type/Common.type';

export enum QtyFields {
    SALABLE_QTY = 'salable_qty',
    MIN_SALE_QTY = 'min_sale_qty',
    MAX_SALE_QTY = 'max_sale_qty'
}

export const DEFAULT_MIN_PRODUCTS = 1;

export const DEFAULT_MAX_PRODUCTS = 999;

export type IndexedConfigurableOption = ConfigurableProductOptions & AttributeWithValue & {
    attribute_values: string[];
};

export type IndexedConfigurableOptions = Record<string, IndexedConfigurableOption>;

export type IndexedVariant = Merge<ProductItem, {
    attributes: Record<string, AttributeWithValue>;
}>;

export type IndexedCustomOption = Merge<
CustomizableProductFragmentOptions,
{
    value: CustomizableSelectionValue[]
    | CustomizableFieldValue[]
    | CustomizableFieldValue[]
    | CustomizableFileValue[]
    | Omit<
    CustomizableProductFragmentOptions,
    'checkboxValues' | 'dropdownValues' | 'fieldValues' | 'areaValues' | 'fileValues'
    >;
}>;

export type ReviewSummary = {
    rating_summary: number;
    review_count: number;
};

export type IndexedProduct<T extends Partial<ProductItem> = Partial<ProductItem>> = Merge<T, {
    configurable_options?: IndexedConfigurableOptions;
    variants?: IndexedVariant[];
    options?: IndexedCustomOption[];
    attributes?: Record<string, AttributeWithValue>;
    reviews?: ProductReview[] | null;
    review_summary?: ReviewSummary;
    items?: BundleItem[] | IndexedBundleItem[];
}>;

export type IndexedBundleOption = Merge<BundleOption, {
    regularOptionPrice: number;
    regularOptionPriceExclTax: number;
    finalOptionPrice: number;
    finalOptionPriceExclTax: number;
}>;

export type IndexedBundleItem = Merge<BundleItem, {
    options?: IndexedBundleOption[];
}>;
