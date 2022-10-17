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

export interface CmsBlock {
    content: string;
    disabled: boolean;
    title: string;
    identifier: string;
}

export interface Breadcrumb {
    category_name: string;
    category_level: number;
    category_url: string;
    category_is_active: boolean;
}

export interface CategoryTree {
    id: number | string;
    url: string;
    name: string;
    image: string;
    url_key: string;
    url_path: string;
    is_active: boolean;
    meta_title: string;
    description: string;
    canonical_url: string;
    product_count: number;
    meta_keywords: string;
    default_sort_by: string;
    meta_description: string;
    landing_page: number;
    display_mode: string;
    is_anchor: boolean;
    cms_block: CmsBlock;
    breadcrumbs: Breadcrumb[];
}

export interface Category extends CategoryTree {
    children: CategoryTree[];
}

export interface CategoryQueryOptions {
    categoryIds: number;
    isSearchPage?: boolean;
}
