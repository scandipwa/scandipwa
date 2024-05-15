// @ts-nocheck
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

import { ProductItem, ProductListOptionArgs } from 'Query/ProductList.type';

import {
    AppendPageAction,
    ProductListActionType, ResetFilterAction, UpdateLoadStatusAction, UpdatePageLoadingStatusAction, UpdateProductListItemsAction,
} from './ProductList.type';

/**
 * Append page to the list.
 * @param {Array<Object>} items List of products returned from fetch
 * @param {Number} minPrice Minimal products price returned from fetch
 * @param {Number} maxPrice Maximal products price returned from fetch
 * @param {Number} currentPage Number of requested page
 * @namespace Store/ProductList/Action/appendPage
 */
export const appendPage = (items: ProductItem[], currentPage: number): AppendPageAction => ({
    type: ProductListActionType.APPEND_PAGE,
    items,
    currentPage,
});

/**
 * Update product list with new list (rewrite if already exists).
 * @param {Array<Object>} items List of products returned from fetch
 * @param {Number} currentPage Number of requested page
 * @param {Number} total_count Number of requested page
 * @return {void}
 * @namespace Store/ProductList/Action/updateProductListItems
 */
export const updateProductListItems = (
    items: ProductItem[],
    currentPage: number,
    total_count: number,
    total_pages: number,
    args: ProductListOptionArgs,
): UpdateProductListItemsAction => ({
    type: ProductListActionType.UPDATE_PRODUCT_LIST_ITEMS,
    items,
    currentPage,
    total_pages,
    total_count,
    args,
});

/**
 * Update loading status
 * @param {Boolean} status Loading indication boolean
 * @return {void}
 * @namespace Store/ProductList/Action/updateLoadStatus
 */
export const updateLoadStatus = (status: boolean): UpdateLoadStatusAction => ({
    type: ProductListActionType.UPDATE_LOAD_STATUS,
    isLoading: status,
});

/** @namespace Store/ProductList/Action/updatePageLoadingStatus */
export const updatePageLoadingStatus = (): UpdatePageLoadingStatusAction => ({
    type: ProductListActionType.UPDATE_PAGE_LOAD_STATUS,
});

/** @namespace Store/ProductList/Action/resetFilters */
export const resetFilters = (): ResetFilterAction => ({
    type: ProductListActionType.RESET_FILTERS,
});
