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
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

import {
    WishlistAction, WishlistActionType, WishlistStore,
} from './Wishlist.type';

export const PRODUCTS_IN_WISHLIST = 'wishlist_products';

/** @namespace Store/Wishlist/Reducer/getInitialState */
export const getInitialState = (): WishlistStore => ({
    productsInWishlist: BrowserDatabase.getItem(PRODUCTS_IN_WISHLIST) || {},
    isLoading: true,
});

/** @namespace Store/Wishlist/Reducer/deleteProperty */
export const deleteProperty = (key: string, { [key]: _, ...newObj }: Record<string, IndexedWishlistProduct>): Record<string, IndexedWishlistProduct> => newObj;

/** @namespace Store/Wishlist/Reducer/clearWishlist */
export const clearWishlist = (): { productsInWishlist: Record<string, IndexedWishlistProduct> } => {
    const productsInWishlist: Record<string, IndexedWishlistProduct> = {};

    BrowserDatabase.setItem(productsInWishlist, PRODUCTS_IN_WISHLIST);

    return { productsInWishlist };
};

/** @namespace Store/Wishlist/Reducer/WishlistReducer */
export const WishlistReducer: Reducer<
WishlistStore,
WishlistAction
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (WishlistActionType.UPDATE_WISHLIST_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default WishlistReducer;
