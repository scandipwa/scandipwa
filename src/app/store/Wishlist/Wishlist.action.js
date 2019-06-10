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

export const REMOVE_ITEM_FROM_WISHLIST = 'REMOVE_ITEM_FROM_WISHLIST';
export const UPDATE_ALL_PRODUCTS_IN_WISHLIST = 'UPDATE_ALL_PRODUCTS_IN_WISHLIST';
export const PRODUCT_TO_BE_REMOVED_AFTER_ADD = 'PRODUCT_TO_BE_REMOVED_AFTER_ADD';

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
 * Update all products in wishlist
 * @param  {Array} products Products that should be updated in wishlist
 * @return {void}
 */
const updateAllProductsInWishlist = products => ({
    type: UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    products
});

const productToBeRemovedAfterAdd = product => ({
    type: PRODUCT_TO_BE_REMOVED_AFTER_ADD,
    productToBeRemovedAfterAdd: product
});

export {
    removeItemFromWishlist,
    updateAllProductsInWishlist,
    productToBeRemovedAfterAdd
};
