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

export const CLEAR_WISHLIST = 'CLEAR_WISHLIST';
export const UPDATE_ITEM_OPTIONS = 'UPDATE_ITEM_OPTIONS';
export const REMOVE_ITEM_FROM_WISHLIST = 'REMOVE_ITEM_FROM_WISHLIST';
export const UPDATE_ALL_PRODUCTS_IN_WISHLIST = 'UPDATE_ALL_PRODUCTS_IN_WISHLIST';
export const UPDATE_IS_LOADING_IN_WISHLIST = 'UPDATE_IS_LOADING_IN_WISHLIST';

/**
 * Remove specified product from wishlist
 * @param  {Object} product Product which should be removed
 * @return {void}
 * @namespace Store/Wishlist/Action/removeItemFromWishlist
 */
export const removeItemFromWishlist = (item_id) => ({
    type: REMOVE_ITEM_FROM_WISHLIST,
    item_id
});

/**
 * Update all products in wishlist
 * @param  {Array} products Products that should be updated in wishlist
 * @return {void}
 * @namespace Store/Wishlist/Action/updateAllProductsInWishlist
 */
export const updateAllProductsInWishlist = (products) => ({
    type: UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    products
});

/** @namespace Store/Wishlist/Action/updateIsLoading */
export const updateIsLoading = (isLoading) => ({
    type: UPDATE_IS_LOADING_IN_WISHLIST,
    isLoading
});

/** @namespace Store/Wishlist/Action/updateItemOptions */
export const updateItemOptions = (options) => ({
    type: UPDATE_ITEM_OPTIONS,
    options
});

/** @namespace Store/Wishlist/Action/clearWishlist */
export const clearWishlist = () => ({
    type: CLEAR_WISHLIST
});
