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

export * from './ProductList.js';

export interface Attribute {
    attribute_code: string,
    attribute_type: string,
    attribute_value: string,
    attribute_label: string,
    attribute_options: {
        label: string,
        value: string
    }[]
}

export interface ProductCategoryBreadcrumb {
    name: string,
    url_path: string
}

export type ProductCategoryBreadcrumbs = ProductCategoryBreadcrumb[]

export interface ProductCategory {
    name: string,
    url_path: string,
    breadcrumbs: ProductCategoryBreadcrumbs
}

export type Categories = ProductCategory[]

export interface Thumbnail {
    height: string,
    type: string,
    url: string,
    width: string
}

export interface MediaItem {
    thumbnail: Thumbnail,
    file: string,
    content: Record<string, string>
    video_content: Record<string, string>
    id: number,
    media_type: string
    label: string
}

export type Media = MediaItem[]

export interface PriceVariant {
    discount: {
        amount_off: number,
        percent_off: number
    },
    final_price: {
        currency: string,
        value: number
    }
    regular_price: {
        currency: string,
        value: number
    }
}

export interface Price {
    minimum_price: PriceVariant,
    maximal_price: PriceVariant
}

export interface ProductLink {
    link_type: string,
    linked_product_sku: string,
    position: number
}

export type ProductLinks = ProductLink[]

export interface ReviewSummary {
    rating_summary: number
    review_count: number
}
export interface RatingVote {
    vote_id: number,
    rating_code: string,
    percent: number
}

export interface Review {
    review_id: number,
    nickname: string,
    title: string,
    detail: string,
    created_at: string,
    rating_votes: RatingVote[]
}

export type Reviews = Review[]

export interface OptionValue {
    option_type_id: number,
    price: number,
    price_type: string,
    sku: string,
    sort_order: number,
    title: string
}

export interface ProductOption {
    option_id: number,
    required: boolean,
    sort_order: number,
    title: string,
    values: OptionValue[]
}

export type ProductOptions = ProductOption[]

export type Items = Record<string, unknown>[]

export type Pages = Record<string, Items>

export interface ItemOption {
    can_change_quantity: boolean,
    id: number,
    is_default: boolean,
    label: string,
    position: number,
    price: number,
    price_type: string,
    product: Product,
    quantity: number
}

export type ItemOptions = ItemOption[]

export interface ProductItem {
    option_id: number,
    options: ItemOptions,
    position: number,
    required: boolean,
    sku: string,
    title: string,
    type: string
}

export type ProductItems = ProductItem[]
export interface Product {
    canonical_url: string,
    categories: Categories,
    description: { html: string }
    id: number,
    image: { url: string }
    image_label: string,
    media_gallery_entries: Media,
    meta_description: string,
    meta_keyword: string,
    meta_title: string,
    name: string,
    price_range: Price,
    product_links: ProductLinks,
    short_description: { html: string }
    small_image: { url: string }
    small_image_label: { label: string },
    special_price: number,
    special_from_date: string,
    special_to_date: string,
    thumbnail: { url: string }
    thumbnail_label: { label: string }
    price_tiers: {
        discount: { amount_off: number, percent_off: number },
        final_price: { currency: string, value: number },
        quantity: number
    }[],
    url_key: string,
    quantity: number,
    review_summary: ReviewSummary,
    options: ProductOptions,
    items: ProductItems,
    reviews: Reviews
}

export type Filter = string[]

export interface FilterInput {
    categoryIds: number,
    categoryUrlPath: string,
    customFilters: string[],
    priceRange: {
        min: number,
        max: number
    },
    condtions: string
}

export interface DownloadableSample {
    sample_url: string,
    sort_order: number,
    title: string
}

export type DownloadableSamples = DownloadableSample[]
