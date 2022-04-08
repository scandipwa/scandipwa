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

import { Product } from 'Type/ProductList.type';

import {
    ClearWishlist,
    RemoveItemFromWishlist,
    UpdateAllProductsInWishlist,
    UpdateIsLoading,
    WishlistActionType
} from './Wishlist.type';

/**
 * Remove specified product from wishlist
 * @param  {Object} product Product which should be removed
 * @return {void}
 * @namespace Store/Wishlist/Action/removeItemFromWishlist
 */
export const removeItemFromWishlist = (
    item_id: number
): RemoveItemFromWishlist => ({
    type: WishlistActionType.REMOVE_ITEM_FROM_WISHLIST,
    item_id
});

/**
 * Update all products in wishlist
 * @param  {Array} products Products that should be updated in wishlist
 * @return {void}
 * @namespace Store/Wishlist/Action/updateAllProductsInWishlist
 */
export const updateAllProductsInWishlist = (
    products: Record<string, Product>
): UpdateAllProductsInWishlist => ({
    type: WishlistActionType.UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    products
});

/** @namespace Store/Wishlist/Action/updateIsLoading */
export const updateIsLoading = (
    isLoading: boolean
): UpdateIsLoading => ({
    type: WishlistActionType.UPDATE_IS_LOADING_IN_WISHLIST,
    isLoading
});

/** @namespace Store/Wishlist/Action/clearWishlist */
export const clearWishlist = (): ClearWishlist => ({
    type: WishlistActionType.CLEAR_WISHLIST
});
