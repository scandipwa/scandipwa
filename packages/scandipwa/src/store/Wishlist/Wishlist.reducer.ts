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

import { Reducer } from 'redux';

import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedParameteredProducts } from 'Util/Product';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

import {
    UpdateAllProductsInWishlistAction,
    WishlistAction,
    WishlistActionType,
    WishlistStore,
} from './Wishlist.type';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

export const WISHLIST_ITEM_COUNT = 'wishlist_item_count';

/** @namespace Store/Wishlist/Reducer/getInitialState */
export const getInitialState = (): WishlistStore => ({
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    productCount: 0,
    isLoading: true,
});

/** @namespace Store/Wishlist/Reducer/deleteProperty */
export const deleteProperty = (key: string, { [key]: _, ...newObj }: Record<string, IndexedWishlistProduct>): Record<string, IndexedWishlistProduct> => newObj;

/** @namespace Store/Wishlist/Reducer/removeItemFromWishlist */
export const removeItemFromWishlist = (
    item_id: string,
    {
        productsInWishlist: initialProducts,
        productCount: initialProductCount,
    }: WishlistStore,
): Partial<WishlistStore> => {
    const productsInWishlist = deleteProperty(item_id, initialProducts) || {};
    const productCount = initialProductCount - 1;

    BrowserDatabase.setItem(
        productsInWishlist,
        PRODUCTS_IN_WISHLIST,
    );

    BrowserDatabase.setItem(productCount, PRODUCTS_IN_WISHLIST);

    return {
        productsInWishlist,
        productCount,
    };
};

/** @namespace Store/Wishlist/Reducer/clearWishlist */
export const clearWishlist = (): Partial<WishlistStore> => {
    const productsInWishlist: Record<string, IndexedWishlistProduct> = {};

    BrowserDatabase.setItem(productsInWishlist, PRODUCTS_IN_WISHLIST);
    BrowserDatabase.setItem(0, WISHLIST_ITEM_COUNT);

    return {
        productsInWishlist,
        productCount: 0,
    };
};

/** @namespace Store/Wishlist/Reducer/updateAllProductsInWishlist */
export const updateAllProductsInWishlist = (action: UpdateAllProductsInWishlistAction): WishlistStore => {
    const {
        products: initialProducts,
        itemCount,
    } = action;

    const products = getIndexedParameteredProducts(initialProducts);

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_WISHLIST,
    );

    BrowserDatabase.setItem(itemCount, WISHLIST_ITEM_COUNT);

    return {
        productsInWishlist: products,
        productCount: itemCount,
        isLoading: false,
    };
};

/** @namespace Store/Wishlist/Reducer/WishlistReducer */
export const WishlistReducer: Reducer<
WishlistStore,
WishlistAction
> = (
    state = getInitialState(),
    action,
) => {
    const { type } = action;

    switch (type) {
    case WishlistActionType.REMOVE_ITEM_FROM_WISHLIST:
        const { item_id } = action;

        return {
            ...state,
            isLoading: false,
            ...removeItemFromWishlist(item_id, state),
        };

    case WishlistActionType.CLEAR_WISHLIST:
        return {
            ...state,
            ...clearWishlist(),
        };

    case WishlistActionType.UPDATE_ALL_PRODUCTS_IN_WISHLIST:
        return {
            ...state,
            ...updateAllProductsInWishlist(action),
        };

    case WishlistActionType.UPDATE_IS_LOADING_IN_WISHLIST:
        const { isLoading } = action;

        return {
            ...state,
            isLoading,
        };

    default:
        return state;
    }
};

export default WishlistReducer;
