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

import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedParameteredProducts } from 'Util/Product';

import {
    CLEAR_WISHLIST,
    REMOVE_ITEM_FROM_WISHLIST,
    UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    UPDATE_IS_LOADING_IN_WISHLIST,
    UPDATE_ITEM_OPTIONS
} from './Wishlist.action';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

export const initialState = {
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    isLoading: true
};

export const deleteProperty = (key, { [key]: _, ...newObj }) => newObj;

export const removeItemFromWishlist = ({ item_id }, { productsInWishlist: initialProducts }) => {
    const productsInWishlist = deleteProperty(item_id, initialProducts) || {};

    BrowserDatabase.setItem(
        productsInWishlist,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist };
};

export const clearWishlist = () => {
    const productsInWishlist = {};

    BrowserDatabase.setItem(productsInWishlist, PRODUCTS_IN_WISHLIST);
    return { productsInWishlist };
};

export const updateAllProductsInWishlist = (action) => {
    const { products: initialProducts } = action;

    const products = getIndexedParameteredProducts(initialProducts);

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist: products, isLoading: false };
};

export const updateItemOptions = (options, { productsInWishlist }) => {
    const { item_id } = options;
    const cleanedOptions = deleteProperty('item_id', options) || {};

    const products = {
        ...productsInWishlist,
        [item_id]: {
            ...productsInWishlist[item_id],
            wishlist: {
                ...productsInWishlist[item_id].wishlist,
                ...cleanedOptions
            }
        }
    };

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist: products };
};

export const WishlistReducer = (state = initialState, action) => {
    const { type, options } = action;

    switch (type) {
    case REMOVE_ITEM_FROM_WISHLIST:
        return {
            ...state,
            isLoading: false,
            ...removeItemFromWishlist(action, state)
        };

    case CLEAR_WISHLIST:
        return {
            ...state,
            ...clearWishlist()
        };

    case UPDATE_ALL_PRODUCTS_IN_WISHLIST:
        return {
            ...state,
            isLoading: false,
            ...updateAllProductsInWishlist(action)
        };

    case UPDATE_ITEM_OPTIONS:
        return {
            ...state,
            ...updateItemOptions(options, state)
        };

    case UPDATE_IS_LOADING_IN_WISHLIST:
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
