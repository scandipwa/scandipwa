/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

export const LOADING_TIME = 500;
export const SCROLL_DEBOUNCE_TIME = 300;
export const LAYOUT_KEY = 'layout';

export enum CategoryDisplayMode {
    PRODUCTS = 'PRODUCTS',
    CMS_BLOCK = 'PAGE',
    BOTH = 'PRODUCTS_AND_PAGE',
}

export enum CategoryPageLayout {
    GRID = 'grid',
    LIST = 'list',
}

export enum SortDirections {
    ASC = 'ASC',
    DESC = 'DESC',
}
