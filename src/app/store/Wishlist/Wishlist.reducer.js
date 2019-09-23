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
    REMOVE_ITEM_FROM_WISHLIST,
    UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    UPDATE_IS_LOADING_IN_WISHLIST
} from './Wishlist.action';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

export const initialState = {
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    isLoading: true
};

const removeItemFromWishlist = ({ sku }, { productsInWishlist: initialProducts }) => {
    const deleteProperty = (key, { [key]: _, ...newObj }) => newObj;
    const productsInWishlist = deleteProperty(sku, initialProducts) || {};

    BrowserDatabase.setItem(
        productsInWishlist,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist };
};

const updateAllProductsInWishlist = (action) => {
    const { products: initialProducts } = action;

    const products = getIndexedParameteredProducts(initialProducts);

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist: products, isLoading: false };
};

const WishlistReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case REMOVE_ITEM_FROM_WISHLIST:
        return {
            ...state,
            isLoading: false,
            ...removeItemFromWishlist(action, state)
        };

    case UPDATE_ALL_PRODUCTS_IN_WISHLIST:
        return {
            ...state,
            isLoading: false,
            ...updateAllProductsInWishlist(action)
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
