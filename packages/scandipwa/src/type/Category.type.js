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

import { MetaTitleType } from 'Type/Common.type';

export const BreadcrumbsType = PropTypes.arrayOf(
    PropTypes.shape({
        category_name: PropTypes.string,
        category_url: PropTypes.string,
        category_level: PropTypes.number
    })
);

export const CategoryFragment = {
    id: PropTypes.number,
    breadcrumbs: BreadcrumbsType,
    description: PropTypes.string,
    image: PropTypes.string,
    meta_description: PropTypes.string,
    meta_title: MetaTitleType,
    name: PropTypes.string,
    product_count: PropTypes.number,
    url_key: PropTypes.string,
    url_path: PropTypes.string,
    display_mode: PropTypes.string
};

export const CategoryTreeType = PropTypes.shape({
    ...CategoryFragment,
    children: PropTypes.arrayOf(PropTypes.shape(CategoryFragment))
});

export const SelectedFiltersType = PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string));

export const FilterType = PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string)
);

export const FilterInputType = PropTypes.shape({
    categoryIds: PropTypes.number,
    categoryUrlPath: PropTypes.string,
    customFilters: SelectedFiltersType,
    priceRange: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }),
    condtions: PropTypes.string
});

export const SortFieldsType = PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
});
