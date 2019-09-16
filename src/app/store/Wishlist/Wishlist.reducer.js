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
    PRODUCT_TO_BE_REMOVED_AFTER_ADD,
    UPDATE_IS_LOADING_IN_WISHLIST
} from './Wishlist.action';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

export const initialState = {
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    productToBeRemovedAfterAdd: '',
    isLoading: true
};

const removeItemFromWishlist = (action, state) => {
    const { product } = action;
    const { productsInWishlist } = state;
    const deleteProperty = (key, { [key]: _, ...newObj }) => newObj;
    const newProductsInWishlist = deleteProperty(product.id, productsInWishlist) || {};

    BrowserDatabase.setItem(
        newProductsInWishlist,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist: newProductsInWishlist };
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

    case PRODUCT_TO_BE_REMOVED_AFTER_ADD:
        const { productToBeRemovedAfterAdd } = action;

        return {
            ...state,
            isLoading: false,
            productToBeRemovedAfterAdd
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
