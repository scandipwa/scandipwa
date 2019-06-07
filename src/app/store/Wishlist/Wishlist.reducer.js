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
import {
    REMOVE_ITEM_FROM_WISHLIST,
    UPDATE_ALL_PRODUCTS_IN_WISHLIST,
    PRODUCT_TO_BE_REMOVED_AFTER_ADD
} from './Wishlist.action';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

const initialState = {
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    productToBeRemovedAfterAdd: ''
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
    const { products } = action;

    BrowserDatabase.setItem(
        products,
        PRODUCTS_IN_WISHLIST
    );

    return { productsInWishlist: products };
};

const WishlistReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case REMOVE_ITEM_FROM_WISHLIST:
        return {
            ...state,
            ...removeItemFromWishlist(action, state)
        };

    case UPDATE_ALL_PRODUCTS_IN_WISHLIST:
        return {
            ...state,
            ...updateAllProductsInWishlist(action)
        };

    case PRODUCT_TO_BE_REMOVED_AFTER_ADD:
        const { productToBeRemovedAfterAdd } = action;

        return {
            ...state,
            productToBeRemovedAfterAdd
        };

    default:
        return state;
    }
};

export default WishlistReducer;
