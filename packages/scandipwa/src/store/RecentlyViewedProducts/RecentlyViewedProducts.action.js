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

export const UPDATE_RECENTLY_VIEWED_PRODUCTS = 'UPDATE_RECENTLY_VIEWED_PRODUCTS';
export const ADD_RECENTLY_VIEWED_PRODUCT = 'ADD_RECENTLY_VIEWED_PRODUCT';

/**
 * Add RecentlyViewed product into list.
 * @param  {Object} product Product returned from fetch
 * @param  {String} store code
 * @return {void}
 * @namespace Store/RecentlyViewedProducts/Action/addRecentlyViewedProduct
 */
export const addRecentlyViewedProduct = (product, store) => ({
    type: ADD_RECENTLY_VIEWED_PRODUCT,
    product,
    store
});

/**
 * Update RecentlyViewed products list.
 * @param  {Object} product Product returned from fetch
 * @return {void}
 * @namespace Store/RecentlyViewedProducts/Action/updateRecentlyViewedProducts
 */
export const updateRecentlyViewedProducts = (products, storeCode) => ({
    type: UPDATE_RECENTLY_VIEWED_PRODUCTS,
    products,
    storeCode
});
