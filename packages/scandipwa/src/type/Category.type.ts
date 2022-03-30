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

import { MetaTitle } from 'Type/Common.type';

export type Breadcrumbs = {
    category_name?: string;
    category_url?: string;
    category_level?: number;
}[];

export type CategoryFragment = {
    id: number,
    breadcrumbs: Breadcrumbs,
    description: string,
    image: string,
    meta_description: string,
    meta_title: MetaTitle,
    name: string,
    product_count: number,
    url_key: string,
    url_path: string,
    display_mode: string
}

export type CategoryTree = CategoryFragment & {
    children?: CategoryFragment[];
}

export type SelectedFilters = Record<string, string[]>;

export type Filter = Record<string, string[]>;

export type FilterInput = {
    categoryIds?: number;
    categoryUrlPath?: string;
    customFilters?: SelectedFilters;
    priceRange?: {
        min?: number;
        max?: number;
    };
    conditions?: string;
}

export type SortFields = {
    options?: {
        label?: string;
        value?: string;
    }[];
}
