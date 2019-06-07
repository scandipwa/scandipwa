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

import WishlistReducer, { PRODUCTS_IN_WISHLIST } from './Wishlist.reducer';
import WishlistDispatcher, { WishlistDispatcher as WishlistDispatcherClass } from './Wishlist.dispatcher';
import {
    REMOVE_ITEM_FROM_WISHLIST,
    UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    PRODUCT_TO_BE_REMOVED_AFTER_ADD,
    removeItemFromWishlist,
    updateAllProductsInWishlist,
    productToBeRemovedAfterAdd
} from './Wishlist.action';

export {
    WishlistReducer,
    WishlistDispatcher,
    WishlistDispatcherClass,
    PRODUCTS_IN_WISHLIST,
    REMOVE_ITEM_FROM_WISHLIST,
    UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    PRODUCT_TO_BE_REMOVED_AFTER_ADD,
    removeItemFromWishlist,
    updateAllProductsInWishlist,
    productToBeRemovedAfterAdd
};
