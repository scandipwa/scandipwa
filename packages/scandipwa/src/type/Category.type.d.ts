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

import { MetaTitleType } from 'Type/Common.type';

export type BreadcrumbsType = {
    category_name?: string;
    category_url?: string;
    category_level?: number;
}[];

export interface CategoryFragment {
    id: number,
    breadcrumbs: BreadcrumbsType,
    description: string,
    image: string,
    meta_description: string,
    meta_title: MetaTitleType,
    name: string,
    product_count: number,
    url_key: string,
    url_path: string,
    display_mode: string
}

export interface CategoryTreeType extends CategoryFragment {
    children?: CategoryFragment[];
}

export type SelectedFiltersType = Record<string, string[]>;

export type FilterType = Record<string, string[]>;

export interface FilterInputType {
    categoryIds?: number;
    categoryUrlPath?: string;
    customFilters?: SelectedFiltersType;
    priceRange?: {
        min?: number;
        max?: number;
    };
    conditions?: string;
}

export interface SortFieldsType {
    options?: {
        label?: string;
        value?: string;
    }[];
}
