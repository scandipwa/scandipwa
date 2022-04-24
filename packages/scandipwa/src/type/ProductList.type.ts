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

import { StockStatus } from 'Component/Product/Stock.config';
import { MetaTitle } from 'Type/Common.type';
import { PriceRange } from 'Type/Price.type';
import { UrlRewrite } from 'Type/Router.type';

import {
    GQLBundleProduct,
    GQLConfigurableProduct,
    GQLDownloadableProduct,
    GQLGroupedProduct,
    GQLSimpleProduct,
    GQLVirtualProduct
} from './Graphql.type';

export type Attribute = {
    attribute_id?: number;
    attribute_code: string;
    attribute_type?: string;
    attribute_value: string;
    attribute_label: string;
    attribute_options?: {
        label: string;
        value: string;
    }[];
    attribute_group_id?: string;
    attribute_group_name?: string;
};

export type AttributeOption = {
    label?: string;
    count?: number;
    value_string?: string;
    swatch_data?: SwatchData;
};

export type SwatchData = {
    type?: string;
    value?: string;
};

export type ConfigurableAttribute = {
    attribute_code: string;
    attribute_values: {
        value_index: number;
    }[];
};

export type FilterAttribute = {
    attribute_code?: string;
    attribute_label?: string;
    attribute_position?: number;
    attribute_values?: string[];
    attribute_type?: string;
    attribute_options?: Record<string, AttributeOption>;
    is_boolean?: boolean;
    has_swatch?: boolean;
};

export type Breadcrumb = {
    name?: string;
    url_path?: string;
};

export type Image = {
    path?: string;
    url?: string;
};

export type ProductCategory = {
    id: number;
    name?: string;
    url_path?: string;
    breadcrumbs?: Breadcrumb[];
};

export type Thumbnail = {
    height?: string;
    type?: string;
    url?: string;
    width?: string;
};

export type MediaItem = {
    thumbnail?: Thumbnail;
    file?: string;
    video_content?: {
        media_type?: string;
        video_description?: string;
        video_metadata?: string;
        video_provider?: string;
        video_title?: string;
        video_url?: string;
    };
    id?: number;
    media_type?: string;
    label?: string;
};

export type Media = MediaItem[];

export type ProductLinks = {
    link_type?: string;
    linked_product_sku?: string;
    position?: number;
}[];

export type ReviewSummaryShape = {
    rating_summary?: number;
    review_count?: number;
};

export type RatingVote = {
    vote_id?: number;
    rating_code?: string;
    percent?: number;
    value: number;
};

export type Review = {
    review_id?: number;
    nickname?: string;
    title?: string;
    detail?: string;
    created_at?: string;
    rating_votes?: RatingVote[];
    average_rating: number;
};

export type Reviews = {
    items: Review[];
};

export type DescriptionType = {
    html?: string;
};

export type StockItem = {
    in_stock?: boolean;
    min_sale_qty?: number;
    max_sale_qty?: number;
    qty?: number;
    qty_increments?: number;
};

export type OptionValue = {
    option_type_id?: number;
    price?: number;
    price_type?: string;
    sku?: string;
    sort_order?: number;
    title?: string;
};

export type Options = {
    option_id?: number;
    required?: boolean;
    sort_order?: number;
    title?: string;
    values?: OptionValue[];
}[];

export type Value = {
    uid?: string;
    option_type_id?: number;
    price?: number;
    priceInclTax?: number;
    priceExclTax?: number;
    price_type?: string;
    currency?: string;
    sku?: string;
    title?: string;
    sort_order?: number;
};

export type PriceTier = {
    discount?: {
        amount_off?: number;
        percent_off?: number;
    };
    final_price: {
        currency: string;
        value: number;
    };
    quantity?: number;
};

export type CustomizableOptionShape = {
    price: number;
    priceInclTax: number;
    priceExclTax: number;
    price_type: string;
    currency: string;
    sku: string;
};

export type CustomizableOption = CustomizableOptionShape & {
    uid: string;
    option_type_id: number;
    title: string;
    sort_order?: number;
    position: number;
    value?: {
        priceExclTax: number;
        priceInclTax: number;
    };
};

export type InputOption = CustomizableOptionShape & {
    max_characters?: number;
};

export type FileOption = CustomizableOptionShape & {
    file_extension?: string;
};

export type CustomizableOptions = FileOption | InputOption | CustomizableOption[];

export type ItemUrlRewriteParameter = {
    name?: string;
    value?: string;
};

export type ItemUrlRewrite = {
    parameters?: ItemUrlRewriteParameter[];
    url?: string;
};

export type ItemShape = ReviewSummaryShape & {
    attributes: Attribute[];
    configurable_options: ConfigurableAttribute[];
    id: number;
    image: Image;
    name: string;
    options: Option[] | null;
    price_range: PriceRange;
    price_tiers: PriceTier;
    reviews: Reviews;
    short_description: DescriptionType;
    sku: string;
    small_image: Image;
    special_from_date: string;
    special_to_date: string;
    stock_item: StockItem;
    stock_status: StockStatus;
    thumbnail: Image;
    type_id: string;
    uid: string;
    url: string;
    url_rewrites: UrlRewrite[];
    salable_qty: number;
    upsell_products?: Product[] | null;
};

export type Item = ItemShape;

export type Items = ItemShape[];

export type Pages = Record<string, Items>;

export type Quantity = number | Record<string, number>;

export type ItemOptionProduct = {
    name: string;
    stock_status: string;
    price_range: PriceRange;
    dynamic_price: boolean;
    type_id: string;
};

export type ItemOption = {
    can_change_quantity?: boolean;
    id?: number;
    is_default: boolean;
    label?: string;
    position: number;
    price?: number;
    price_type?: string;
    quantity: Quantity;
    uid: string;
    product: Product;
    regularOptionPrice?: number;
    regularOptionPriceExclTax?: number;
    finalOptionPrice: number;
    finalOptionPriceExclTax: number;
};

export type ProductBundleItem = {
    option_id?: number;
    options: ItemOption[];
    position?: number;
    required?: boolean;
    sku?: string;
    title?: string;
    type?: string;
};

export type ProductGroupedItems = {
    position: number;
    qty: number;
    product: ItemShape;
}[];

// Refactore to separate types
export interface Product extends ItemShape {
    canonical_url?: string;
    categories?: ProductCategory[];
    description?: DescriptionType;
    media_gallery_entries?: Media;
    meta_description?: string;
    meta_keyword?: string;
    meta_title?: MetaTitle;
    product_links?: ProductLinks;
    special_price?: number;
    url_key?: string;
    quantity?: number;
    variants?: ProductVariant[];
    items?: unknown[];
    downloadable_product_links?: ProductDownloadableLink[];
    dynamic_price?: boolean;
    bundle_options?: BundleOption[];
}

export interface ProductGrouped extends Product {
    items: ProductGroupedItems;
}

export type BundleOptionSelection = {
    final_option_price?: number;
    final_option_price_excl_tax?: number;
    name?: string;
    regular_option_price?: number;
    regular_option_price_excl_tax?: number;
    selection_id?: number;
};

// export type BundleOption = {
//     option_id?: number;
//     price?: number;
//     qty?: number;
//     selection_details: BundleOptionSelection[];
//     title?: string;
// };

export interface ProductBundle extends Product {
    items: ProductBundleItem[];
    dynamic_price: boolean;
}

export type ProductDownloadable = Product & {
    downloadable_product_links: ProductDownloadableLink[];
};

export type ProductDownloadableLink = {
    price: number;
    sample_url?: string;
    sort_order?: number;
    title?: string;
    uid: string;
};

export type ProductVariant = {
    product: ItemShape;
};

export type PriceConfiguration = {
    containsOptions?: boolean;
    containsOptionsWithPrice?: boolean;
    containsRequiredOptions?: boolean;
    containsRequiredOptionsWithPrice?: boolean;
};

export type MagentoProduct = {
    entered_options?: {
        uid?: string;
        value?: string;
    }[];
    quantity?: Quantity;
    selected_options?: string[];
    sku?: string;
};

export type ProductCardProps = {
    siblingsHaveBrands?: boolean;
    siblingsHavePriceBadge?: boolean;
    siblingsHaveTierPrice?: boolean;
    siblingsHaveConfigurableOptions?: boolean;
};

export type OptionTypes = {
    checkboxValues?: Value[];
    dropdownValues?: Value[];
    fieldValues?: Value[];
    areaValues?: Value[];
    fileValues?: Value[];
};

export type Option = OptionTypes & {
    value?: CustomizableOptions;
    title?: string;
    required?: boolean;
    sort_order?: number;
    type?: string;
    uid?: string;
};

export type ProductInterface = GQLBundleProduct
& GQLConfigurableProduct
& GQLSimpleProduct
& GQLDownloadableProduct
& GQLGroupedProduct
& GQLVirtualProduct;
