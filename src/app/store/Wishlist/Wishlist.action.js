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

export const ADD_ITEM_TO_WISHLIST = 'ADD_ITEM_TO_WISHLIST';
export const REMOVE_ITEM_FROM_WISHLIST = 'REMOVE_ITEM_FROM_WISHLIST';
export const UPDATE_ALL_PRODUCTS_IN_WISHLIST = 'UPDATE_ALL_PRODUCTS_IN_WISHLIST';

/**
 * Add specified product to wishlist
 * @param  {Object} newProduct Product which should be removed
 * @return {void}
 */
const addItemToWishlist = newProduct => ({
    type: ADD_ITEM_TO_WISHLIST,
    newProduct
});

/**
 * Remove specified product from wishlist
 * @param  {Object} product Product which should be removed
 * @return {void}
 */
const removeItemFromWishlist = product => ({
    type: REMOVE_ITEM_FROM_WISHLIST,
    product
});

/**
 * Update all products in cart
 * @param  {Array} products Products that should be updated in wishlist
 * @return {void}
 */
const updateAllProductsInWishlist = products => ({
    type: UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    products
});

export {
    addItemToWishlist,
    removeItemFromWishlist,
    updateAllProductsInWishlist,
};
