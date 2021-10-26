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

import { UrlRewriteType } from 'Type/Router';
import { StockStatusType } from 'Type/StockStatus';

export const AttributeType = PropTypes.shape({
    attribute_code: PropTypes.string,
    attribute_type: PropTypes.string,
    attribute_value: PropTypes.string,
    attribute_label: PropTypes.string,
    attribute_options: PropTypes.objectOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    has_swatch: PropTypes.bool,
    is_boolean: PropTypes.bool
});

export const AttributesType = PropTypes.objectOf(AttributeType);

export const FilterAttributeType = PropTypes.shape({
    attribute_code: PropTypes.string,
    attribute_label: PropTypes.string,
    attribute_position: PropTypes.number,
    attribute_values: PropTypes.arrayOf(PropTypes.string),
    attribute_type: PropTypes.string,
    attribute_options: PropTypes.objectOf(PropTypes.shape({
        label: PropTypes.string,
        count: PropTypes.number,
        value_string: PropTypes.string,
        swatch_data: PropTypes.shape({ type: PropTypes.string, value: PropTypes.string })
    })),
    is_boolean: PropTypes.bool,
    has_swatch: PropTypes.bool
});

export const BreadcrumbsType = PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string,
        url_path: PropTypes.string
    })
);

export const ImageType = {
    path: PropTypes.string,
    url: PropTypes.string
};

export const CategoryType = PropTypes.shape({
    name: PropTypes.string,
    url_path: PropTypes.string,
    breadcrumbs: BreadcrumbsType
});

export const CategoriesType = PropTypes.arrayOf(CategoryType);

export const ThumbnailType = PropTypes.shape({
    height: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.string
});

export const MediaItemType = PropTypes.shape({
    thumbnail: ThumbnailType,
    file: PropTypes.string,
    video_content: PropTypes.shape({
        media_type: PropTypes.string,
        video_description: PropTypes.string,
        video_metadata: PropTypes.string,
        video_provider: PropTypes.string,
        video_title: PropTypes.string,
        video_url: PropTypes.string
    }),
    id: PropTypes.number,
    media_type: PropTypes.string,
    label: PropTypes.string
});

export const MediaType = PropTypes.arrayOf(MediaItemType);

export const PriceVariantType = PropTypes.shape({
    discount: PropTypes.shape({
        amount_off: PropTypes.number,
        percent_off: PropTypes.number
    }),
    final_price: PropTypes.shape({
        currency: PropTypes.string,
        value: PropTypes.number
    }),
    regular_price: PropTypes.shape({
        currency: PropTypes.string,
        value: PropTypes.number
    })
});

export const PriceType = PropTypes.shape({
    minimum_price: PriceVariantType,
    maximal_price: PriceVariantType
});

export const ProductLinksType = PropTypes.arrayOf(
    PropTypes.shape({
        link_type: PropTypes.string,
        linked_product_sku: PropTypes.string,
        position: PropTypes.number
    })
);

export const ReviewSummaryType = PropTypes.shape({
    rating_summary: PropTypes.number,
    review_count: PropTypes.number
});

export const RatingVoteType = PropTypes.shape({
    vote_id: PropTypes.number,
    rating_code: PropTypes.string,
    percent: PropTypes.number
});

export const ReviewsType = PropTypes.arrayOf(
    PropTypes.shape({
        review_id: PropTypes.number,
        nickname: PropTypes.string,
        title: PropTypes.string,
        detail: PropTypes.string,
        created_at: PropTypes.string,
        rating_votes: PropTypes.arrayOf(RatingVoteType)
    })
);

export const DescriptionType = PropTypes.shape({ html: PropTypes.string });

export const StockItemType = PropTypes.shape({
    in_stock: PropTypes.bool,
    min_sale_qty: PropTypes.number,
    max_sale_qty: PropTypes.number,
    qty_increments: PropTypes.number
});

export const OptionValueType = PropTypes.shape({
    option_type_id: PropTypes.number,
    price: PropTypes.number,
    price_type: PropTypes.string,
    sku: PropTypes.string,
    sort_order: PropTypes.number,
    title: PropTypes.string
});

export const OptionsType = PropTypes.arrayOf(
    PropTypes.shape({
        option_id: PropTypes.number,
        required: PropTypes.bool,
        sort_order: PropTypes.number,
        title: PropTypes.string,
        values: PropTypes.arrayOf(OptionValueType)
    })
);

export const ValueType = PropTypes.shape({
    uid: PropTypes.string,
    option_type_id: PropTypes.number,
    price: PropTypes.number,
    priceInclTax: PropTypes.number,
    priceExclTax: PropTypes.number,
    price_type: PropTypes.string,
    currency: PropTypes.string,
    sku: PropTypes.string,
    title: PropTypes.string,
    sort_order: PropTypes.number
});

export const OptionType = [{
    value: PropTypes.arrayOf(ValueType),
    title: PropTypes.string,
    required: PropTypes.bool,
    sort_order: PropTypes.number,
    type: PropTypes.string,
    uid: PropTypes.string
}];

export const PriceTierType = PropTypes.shape({
    discount: PropTypes.shape({ amount_off: PropTypes.number, percent_off: PropTypes.number }),
    final_price: PropTypes.shape({ currency: PropTypes.string, value: PropTypes.number }),
    quantity: PropTypes.number
});

export const ItemType = PropTypes.shape({
    attributes: AttributesType,
    configurable_options: AttributesType,
    id: PropTypes.number,
    image: ImageType,
    name: PropTypes.string,
    options: PropTypes.arrayOf(OptionType),
    price_range: PriceType,
    price_tiers: PropTypes.arrayOf(PriceTierType),
    ...ReviewSummaryType,
    review_summary: ReviewSummaryType,
    short_description: DescriptionType,
    sku: PropTypes.string,
    small_image: ImageType,
    special_from_date: PropTypes.string,
    special_to_date: PropTypes.string,
    stock_item: StockItemType,
    stock_status: StockStatusType,
    thumbnail: ImageType,
    type_id: PropTypes.string,
    uid: PropTypes.string,
    url: PropTypes.string,
    url_rewrites: PropTypes.arrayOf(UrlRewriteType)
});

export const ItemsType = PropTypes.arrayOf(ItemType);

ItemsType.variants = ItemsType;

export const PagesType = PropTypes.objectOf(ItemsType);

export const ItemOptionsType = PropTypes.arrayOf(
    PropTypes.shape({
        can_change_quantity: PropTypes.bool,
        id: PropTypes.number,
        is_default: PropTypes.bool,
        label: PropTypes.string,
        position: PropTypes.number,
        price: PropTypes.number,
        price_type: PropTypes.string,
        quantity: PropTypes.number
    })
);

export const ProductItemsType = PropTypes.arrayOf(
    PropTypes.shape({
        option_id: PropTypes.number,
        options: ItemOptionsType,
        position: PropTypes.number,
        required: PropTypes.bool,
        sku: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string
    })
);

export const ProductType = PropTypes.shape({
    canonical_url: PropTypes.string,
    categories: CategoriesType,
    description: DescriptionType,
    media_gallery_entries: MediaType,
    meta_description: PropTypes.string,
    meta_keyword: PropTypes.string,
    meta_title: PropTypes.string,
    product_links: ProductLinksType,
    special_price: PropTypes.number,
    url_key: PropTypes.string,
    quantity: PropTypes.number,
    items: ProductItemsType,
    reviews: ReviewsType,
    ...ItemType
});

export const DownloadableSamplesType = PropTypes.arrayOf(
    PropTypes.shape({
        sample_url: ProductType,
        sort_order: PropTypes.number,
        title: PropTypes.string
    })
);

export const PriceConfiguration = PropTypes.shape({
    containsOptions: PropTypes.bool,
    containsOptionsWithPrice: PropTypes.bool,
    containsRequiredOptions: PropTypes.bool,
    containsRequiredOptionsWithPrice: PropTypes.bool
});

export const MagentoProductType = PropTypes.shape({
    entered_options: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.string,
        value: PropTypes.string
    })),
    quantity: PropTypes.number,
    selected_options: PropTypes.arrayOf(PropTypes.string),
    sku: PropTypes.string
});
