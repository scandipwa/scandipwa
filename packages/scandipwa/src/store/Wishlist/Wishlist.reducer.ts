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

import { Reducer } from 'redux';

import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedParameteredProducts } from 'Util/Product';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

import {
    UpdateAllProductsInWishlistAction,
    WishlistAction, WishlistActionType, WishlistStore
} from './Wishlist.type';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

/** @namespace Store/Wishlist/Reducer/getInitialState */
export const getInitialState = (): WishlistStore => ({
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    isLoading: true
});

/** @namespace Store/Wishlist/Reducer/deleteProperty */
export const deleteProperty = (
    key: string, { [key]: _, ...newObj }: Record<string, IndexedWishlistProduct>
): Record<string, IndexedWishlistProduct> => newObj;

/** @namespace Store/Wishlist/Reducer/removeItemFromWishlist */
export const removeItemFromWishlist = (
    item_id: string,
    { productsInWishlist: initialProducts }: WishlistStore
): { productsInWishlist: Record<string, IndexedWishlistProduct> } => {
    const productsInWishlist = deleteProperty(item_id, initialProducts) || {};

    BrowserDatabase.setItem(
        productsInWishlist,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist };
};

/** @namespace Store/Wishlist/Reducer/clearWishlist */
export const clearWishlist = (): { productsInWishlist: Record<string, IndexedWishlistProduct> } => {
    const productsInWishlist: Record<string, IndexedWishlistProduct> = {};

    BrowserDatabase.setItem(productsInWishlist, PRODUCTS_IN_WISHLIST);

    return { productsInWishlist };
};

/** @namespace Store/Wishlist/Reducer/updateAllProductsInWishlist */
export const updateAllProductsInWishlist = (action: UpdateAllProductsInWishlistAction): WishlistStore => {
    const { products: initialProducts } = action;

    const products = getIndexedParameteredProducts(initialProducts);

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist: products, isLoading: false };
};

/** @namespace Store/Wishlist/Reducer/WishlistReducer */
export const WishlistReducer: Reducer<
WishlistStore,
WishlistAction
> = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case WishlistActionType.REMOVE_ITEM_FROM_WISHLIST:
        const { item_id } = action;

        return {
            ...state,
            isLoading: false,
            ...removeItemFromWishlist(item_id, state)
        };

    case WishlistActionType.CLEAR_WISHLIST:
        return {
            ...state,
            ...clearWishlist()
        };

    case WishlistActionType.UPDATE_ALL_PRODUCTS_IN_WISHLIST:
        return {
            ...state,
            ...updateAllProductsInWishlist(action)
        };

    case WishlistActionType.UPDATE_IS_LOADING_IN_WISHLIST:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default WishlistReducer;
