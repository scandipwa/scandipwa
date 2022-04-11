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
import { AnyAction } from 'redux';

import { Product } from 'Type/ProductList.type';

export enum WishlistActionType {
    CLEAR_WISHLIST = 'CLEAR_WISHLIST',
    UPDATE_ITEM_OPTIONS = 'UPDATE_ITEM_OPTIONS',
    REMOVE_ITEM_FROM_WISHLIST = 'REMOVE_ITEM_FROM_WISHLIST',
    UPDATE_ALL_PRODUCTS_IN_WISHLIST = 'UPDATE_ALL_PRODUCTS_IN_WISHLIST',
    UPDATE_IS_LOADING_IN_WISHLIST = 'UPDATE_IS_LOADING_IN_WISHLIST'
}

export interface RemoveItemFromWishlist extends AnyAction {
    type: WishlistActionType.REMOVE_ITEM_FROM_WISHLIST;
    item_id: number;
}

export interface UpdateAllProductsInWishlist extends AnyAction {
    type: WishlistActionType.UPDATE_ALL_PRODUCTS_IN_WISHLIST;
    products: Record<string, Product>;
}

export interface UpdateIsLoading extends AnyAction {
    type: WishlistActionType.UPDATE_IS_LOADING_IN_WISHLIST;
    isLoading: boolean;
}

export interface ClearWishlist extends AnyAction {
    type: WishlistActionType.CLEAR_WISHLIST;
}

export type WishlistAction = RemoveItemFromWishlist
| UpdateAllProductsInWishlist
| UpdateIsLoading
| ClearWishlist;

export type WishlistStore = {
    productsInWishlist: Record<string, Product>;
    isLoading: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        WishlistReducer: WishlistStore;
    }
}
