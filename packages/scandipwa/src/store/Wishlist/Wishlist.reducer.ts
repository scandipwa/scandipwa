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
    pageInfo: {
        currentPage: 1,
        totalPages: 1,
        totalProducts: BrowserDatabase.getItem(WISHLIST_ITEM_COUNT) || 0,
    },
    isLoading: true,
});

/** @namespace Store/Wishlist/Reducer/deleteProperty */
export const deleteProperty = (
    key: string,
    { [key]: _, ...newObj }: Record<string, IndexedWishlistProduct>,
): Record<string, IndexedWishlistProduct> => newObj;

/** @namespace Store/Wishlist/Reducer/removeItemFromWishlist */
export const removeItemFromWishlist = (
    item_id: string,
    {
        productsInWishlist: initialProducts,
        pageInfo: {
            totalProducts: initTotalProducts,
        },
        pageInfo,
    }: WishlistStore,
): Partial<WishlistStore> => {
    const productsInWishlist = deleteProperty(item_id, initialProducts) || {};
    // Cannot be less than 0
    const totalProducts = Math.max(initTotalProducts - 1, 0);

    BrowserDatabase.setItem(
        productsInWishlist,
        PRODUCTS_IN_WISHLIST,
    );

    BrowserDatabase.setItem(totalProducts, WISHLIST_ITEM_COUNT);

    return {
        productsInWishlist,
        pageInfo: {
            ...pageInfo,
            totalProducts,
        },
    };
};

/** @namespace Store/Wishlist/Reducer/clearWishlist */
export const clearWishlist = (): WishlistStore => {
    const productsInWishlist: Record<string, IndexedWishlistProduct> = {};

    BrowserDatabase.setItem(productsInWishlist, PRODUCTS_IN_WISHLIST);
    BrowserDatabase.setItem(0, WISHLIST_ITEM_COUNT);

    return {
        productsInWishlist,
        isLoading: false,
        pageInfo: {
            currentPage: 1,
            totalPages: 1,
            totalProducts: 0,
        },
    };
};

/** @namespace Store/Wishlist/Reducer/updateAllProductsInWishlist */
export const updateAllProductsInWishlist = (
    action: UpdateAllProductsInWishlistAction,
): WishlistStore => {
    const {
        products: initialProducts,
        pageInfo: {
            current_page,
            total_pages,
        },
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
        isLoading: false,
        pageInfo: {
            currentPage: current_page,
            totalPages: total_pages,
            totalProducts: itemCount,
        },
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
