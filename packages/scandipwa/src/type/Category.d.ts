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

export * from './Category.js';

export interface CategoryBreadcrumb {
    category_name: string,
    category_url: string,
    category_level: number
}

export type CategoryBreadcrumbs = CategoryBreadcrumb[]

export interface Category {
    id: number,
    breadcrumbs: CategoryBreadcrumbs,
    description: string,
    image: string,
    meta_description: string,
    meta_title: string,
    name: string,
    product_count: number,
    url_key: string,
    url_path: string,
    display_mode: string
}
export interface CategoryTree extends Category {
    children: Category[]
}
