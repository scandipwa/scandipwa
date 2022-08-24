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
import { AnyAction } from 'redux';

import { PriceRange, ProductItem } from 'Query/ProductList.type';
import { WishlistItem } from 'Query/Wishlist.type';
import { Merge } from 'Type/Common.type';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

export enum WishlistActionType {
    CLEAR_WISHLIST = 'CLEAR_WISHLIST',
    UPDATE_ITEM_OPTIONS = 'UPDATE_ITEM_OPTIONS',
    REMOVE_ITEM_FROM_WISHLIST = 'REMOVE_ITEM_FROM_WISHLIST',
    UPDATE_ALL_PRODUCTS_IN_WISHLIST = 'UPDATE_ALL_PRODUCTS_IN_WISHLIST',
    UPDATE_IS_LOADING_IN_WISHLIST = 'UPDATE_IS_LOADING_IN_WISHLIST'
}

export interface RemoveItemFromWishlistAction extends AnyAction {
    type: WishlistActionType.REMOVE_ITEM_FROM_WISHLIST;
    item_id: string;
}

export interface UpdateAllProductsInWishlistAction extends AnyAction {
    type: WishlistActionType.UPDATE_ALL_PRODUCTS_IN_WISHLIST;
    products: Record<string, WishlistProduct>;
}

export interface UpdateIsLoadingAction extends AnyAction {
    type: WishlistActionType.UPDATE_IS_LOADING_IN_WISHLIST;
    isLoading: boolean;
}

export interface ClearWishlistAction extends AnyAction {
    type: WishlistActionType.CLEAR_WISHLIST;
}

export type WishlistAction = RemoveItemFromWishlistAction
| UpdateAllProductsInWishlistAction
| UpdateIsLoadingAction
| ClearWishlistAction;

export interface WishlistStore {
    productsInWishlist: Record<string, IndexedWishlistProduct>;
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        WishlistReducer: WishlistStore;
    }
}

export type WishlistProduct = Merge<ProductItem, {
    price_range?: PriceRange;
    quantity: number;
    configurableVariantIndex?: string;
    wishlist: Merge<Partial<WishlistItem>, {
        quantity: number;
    }>;
}>;
