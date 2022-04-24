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

import { ProductItem } from 'Query/ProductList.type';

import {
    AddRecentlyViewedProductAction,
    RecentlyViewedProductsActionType,
    UpdateLoadStatusAction,
    UpdateRecentlyViewedProductsAction
} from './RecentlyViewedProducts.type';

/**
 * Add RecentlyViewed product into list.
 * @param  {Object} product Product returned from fetch
 * @param  {String} store code
 * @return {void}
 * @namespace Store/RecentlyViewedProducts/Action/addRecentlyViewedProduct
 */
export const addRecentlyViewedProduct = (
    product: ProductItem,
    store: string
): AddRecentlyViewedProductAction => ({
    type: RecentlyViewedProductsActionType.ADD_RECENTLY_VIEWED_PRODUCT,
    product,
    store
});

/**
 * Update RecentlyViewed products list.
 * @param  {Object} product Product returned from fetch
 * @return {void}
 * @namespace Store/RecentlyViewedProducts/Action/updateRecentlyViewedProducts
 */
export const updateRecentlyViewedProducts = (
    products: ProductItem[],
    storeCode: string
): UpdateRecentlyViewedProductsAction => ({
    type: RecentlyViewedProductsActionType.UPDATE_RECENTLY_VIEWED_PRODUCTS,
    products,
    storeCode
});

/**
 * Update loading status
 * @param {Boolean} status Loading indication boolean
 * @return {void}
 * @namespace Store/RecentlyViewedProducts/Action/updateLoadStatus
 */
export const updateLoadStatus = (status: boolean): UpdateLoadStatusAction => ({
    type: RecentlyViewedProductsActionType.UPDATE_LOAD_STATUS,
    isLoading: status
});
