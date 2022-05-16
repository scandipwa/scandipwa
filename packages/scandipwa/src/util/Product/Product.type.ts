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

import { ProductOption } from 'Component/Product/Product.type';
import { ImageType } from 'Component/ProductGallery/ProductGallery.config';
import {
    AttributeWithValue,
    AttributeWithValueOption,
    BundleItem,
    BundleOption,
    ConfigurableProductOptions,
    CustomizableFieldValue,
    CustomizableFileValue,
    CustomizableProductFragmentOptions,
    CustomizableSelectionValue,
    GroupedProductItem,
    ProductItem,
    ProductReview,
    SwatchData
} from 'Query/ProductList.type';
import { Merge } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

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
Omit<
CustomizableProductFragmentOptions,
'checkboxValues' | 'dropdownValues' | 'fieldValues' | 'areaValues' | 'fileValues'
>,
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

export type IndexedBaseProduct<T> = Merge<T, {
    configurable_options?: IndexedConfigurableOptions;
    variants?: IndexedVariant[];
    options?: IndexedCustomOption[];
    attributes?: Record<string, AttributeWithValue>;
    reviews?: ProductReview[];
    review_summary?: ReviewSummary;
    items?: IndexedBundleItem[] | GroupedProductItem[];
    // !FIXME: This prop is alway undefined. Added for compatibility with the legacy code.
    productOptionsData?: Record<string, string | string[]>;
}>;

export type IndexedProduct = IndexedBaseProduct<Partial<ProductItem>>;

export type IndexedBundleOption = Merge<BundleOption, {
    regularOptionPrice: number;
    regularOptionPriceExclTax: number;
    finalOptionPrice: number;
    finalOptionPriceExclTax: number;
}>;

export type IndexedBundleItem = Merge<BundleItem, {
    options?: IndexedBundleOption[];
}>;

export type IndexedAttributeWithValueOption = Merge<AttributeWithValueOption, {
    swatch_data: SwatchData | null;
}>;

export interface BuyRequestBundleOptions {
    bundle_option: Record<string, string | Record<string, string>>;
    bundle_option_qty: Record<string, number>;
}

export interface BuyRequestCustomizableOptions {
    options: Record<string, string | string[] | Record<string, string>>;
}

export interface BuyRequestDownloadableOptions {
    links: string[];
}

export interface BuyRequestConfigurableOptions {
    super_attribute: Record<string, string>;
}

export type PriceLabels = {
    baseLabel?: string;
    priceLabel: string;
};

export type ProductTransformData = {
    sku: string;
    quantity: number;
    selected_options: string[];
    entered_options: ProductOption[];
};

export interface FormattedMoney {
    value: number;
    currency: GQLCurrencyEnum;
    valueFormatted: string;
}

export interface ProductExtractBasePrice {
    finalPrice: FormattedMoney;
    finalPriceExclTax: FormattedMoney;
    originalPrice: FormattedMoney;
    originalPriceExclTax: FormattedMoney;
    discount: { percentOff: number };
}

export interface ProductExtractOriginalPrice {
    minRegularPrice: FormattedMoney;
    minFinalPrice: FormattedMoney;
    minFinalPriceExclTax: FormattedMoney;
    maxRegularPrice: FormattedMoney;
    maxFinalPrice: FormattedMoney;
    maxFinalPriceExclTax: FormattedMoney;
}

export interface ProductExtractPriceConfiguration {
    containsOptions: boolean;
    containsOptionsWithPrice: boolean;
    containsRequiredOptions: boolean;
    containsRequiredOptionsWithPrice: boolean;
}

export interface ProductExtractPrice {
    price: ProductExtractBasePrice;
    originalPrice: ProductExtractOriginalPrice;
    configuration: ProductExtractPriceConfiguration;
}

export type ProductExtractImage = Record<ImageType, { url?: string }>;

export interface TransformedBundleOption {
    id: string;
    name: string;
    value: string;
    label?: string;
    subLabel: string;
    sort_order: number;
    isAvailable: boolean;
    isDefault: boolean;
}
