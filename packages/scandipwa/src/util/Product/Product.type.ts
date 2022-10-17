/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
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
    ProductStockItem,
    RatingsBreakdown,
    SwatchData,
} from 'Query/ProductList.type';
import { WishlistProduct } from 'Store/Wishlist/Wishlist.type';
import { Merge } from 'Type/Common.type';
import { GQLCurrencyEnum, GQLProductStockStatus } from 'Type/Graphql.type';
import { DateRangeAttribute, YearRangeAttribute } from 'Util/Form/Form.type';

export enum QtyFields {
    SALABLE_QTY = 'salable_qty',
    MIN_SALE_QTY = 'min_sale_qty',
    MAX_SALE_QTY = 'max_sale_qty',
}

export const DEFAULT_MIN_PRODUCTS = 1;

export const DEFAULT_MAX_PRODUCTS = 999;

export type IndexedConfigurableOption = Merge<
Merge<ConfigurableProductOptions, IndexedAttributeWithValue>,
{
    attribute_values: string[];
}
>;

export type IndexedConfigurableOptions = Record<string, IndexedConfigurableOption>;

export type IndexedVariant = Merge<ProductItem, {
    attributes: Record<string, IndexedAttributeWithValue>;
}>;

export type CleanCustomizableProductFragmentOptions = Omit<
CustomizableProductFragmentOptions,
'CustomizableAreaOption' | 'CustomizableCheckboxOption' | 'CustomizableDateOption' | 'CustomizableDropDownOption'
| 'CustomizableFieldOption' | 'CustomizableFileOption' | 'CustomizableMultipleOption' | 'CustomizableRadioOption'
| 'checkboxValues' | 'dropdownValues' | 'fieldValues' | 'areaValues' | 'fileValues'
>;

export type IndexedCustomOptionValue = CustomizableSelectionValue
| CustomizableFieldValue
| CustomizableFileValue;

export type IndexedCustomOption = Merge<
CleanCustomizableProductFragmentOptions,
{
    value: IndexedCustomOptionValue[] | CleanCustomizableProductFragmentOptions;
}
>;

export interface ReviewSummary {
    rating_summary: number;
    review_count: number;
}

export type IndexedBaseProduct<T> = Merge<T, {
    configurable_options?: IndexedConfigurableOptions;
    variants?: IndexedVariant[];
    options?: IndexedCustomOption[];
    attributes?: Record<string, IndexedAttributeWithValue>;
    reviews?: IndexedReview[];
    review_summary?: ReviewSummary;
    items?: IndexedBundleItem[] | GroupedProductItem[];
    // !FIXME: This prop is alway undefined. Added for compatibility with the legacy code.
    productOptionsData?: Record<string, string | string[]>;
}>;

export type IndexedProduct = IndexedBaseProduct<Partial<ProductItem>> & {
    parent?: IndexedBaseProduct<Partial<ProductItem>>;
};

export type IndexedWishlistProduct = IndexedBaseProduct<Partial<WishlistProduct>>;

export type IndexedBundleOption = Merge<BundleOption, {
    regularOptionPrice: number;
    regularOptionPriceExclTax: number;
    finalOptionPrice: number;
    finalOptionPriceExclTax: number;
}>;

export type IndexedBundleItem = Merge<BundleItem, {
    options?: IndexedBundleOption[];
}>;

export type IndexedAttributeWithValue = Merge<AttributeWithValue, {
    attribute_options: Record<string, IndexedAttributeWithValueOption>;
}>;

export type IndexedAttributeWithValueOption = Merge<AttributeWithValueOption, {
    swatch_data: SwatchData | null;
}>;

export type IndexedReview = Merge<ProductReview, {
    rating_votes: RatingVote[];
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

export interface PriceLabels {
    baseLabel?: string;
    priceLabel: string;
}

export interface ProductTransformData {
    sku: string;
    quantity: number;
    selected_options: string[];
    entered_options: ProductOption[];
}

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

export type ProductExtractImage = Record<ImageType, { url?: string } | undefined>;

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

export type RatingVote = RatingsBreakdown & { percent: number };

export interface NoneRadioOption {
    title: string;
    label: string;
    uid: string;
    price: number;
    finalOptionPrice: number;
    can_change_quantity: boolean;
    priceInclTax: number;
    is_default: boolean;
}

export interface TransformedCustomizableOptions {
    id: string;
    name: string;
    value: string;
    label?: string;
    subLabel: string;
    sort_order: number;
}

export type GetYearRangeAttributes<IsYear extends boolean = false> = IsYear extends true
    ? YearRangeAttribute
    : DateRangeAttribute;

export interface StockCheckProduct {
    type_id: string;
    stock_status: GQLProductStockStatus;
    stock_item?: ProductStockItem;
    items?: Partial<StockCheckProduct>[];
    variants?: Partial<StockCheckProduct>[];
}
