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

export const BreadcrumbsType = PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string,
        url_path: PropTypes.string
    })
);

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

export const MediaType = PropTypes.arrayOf(
    PropTypes.shape({
        thumbnail: ThumbnailType,
        content: PropTypes.any,
        video_content: PropTypes.any,
        id: PropTypes.number,
        media_type: PropTypes.string,
        label: PropTypes.string
    })
);

export const PriceVariantType = PropTypes.shape({
    amount: PropTypes.shape({
        currency: PropTypes.string,
        value: PropTypes.number
    })
});

export const PriceType = PropTypes.shape({
    minimalPrice: PriceVariantType,
    regularPrice: PriceVariantType
});

export const ProductLinksType = PropTypes.arrayOf(
    PropTypes.shape({
        link_type: PropTypes.string,
        linked_product_sku: PropTypes.string,
        position: PropTypes.number
    })
);

export const ProductType = PropTypes.shape({
    canonical_url: PropTypes.string,
    categories: CategoriesType,
    description: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.shape({ url: PropTypes.string }),
    image_label: PropTypes.string,
    media_gallery_entries: MediaType,
    meta_description: PropTypes.string,
    meta_keyword: PropTypes.string,
    meta_title: PropTypes.string,
    name: PropTypes.string,
    price: PriceType,
    product_links: ProductLinksType,
    short_description: PropTypes.shape({ html: PropTypes.string }),
    small_image: PropTypes.shape({ url: PropTypes.string }),
    small_image_label: PropTypes.shape({ label: PropTypes.string }),
    special_price: PropTypes.number,
    thumbnail: PropTypes.shape({ url: PropTypes.string }),
    thumbnail_label: PropTypes.shape({ label: PropTypes.string }),
    tier_prices: PropTypes.string,
    url_key: PropTypes.string,
    quantity: PropTypes.number
});

export const FilterType = PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string)
);

export const ItemsType = PropTypes.arrayOf(ProductType);
