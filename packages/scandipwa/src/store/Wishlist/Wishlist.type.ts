/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */
import { AnyAction } from 'redux';

import { PriceRange, ProductItem } from 'Query/ProductList.type';
import { WishlistItem } from 'Query/Wishlist.type';
import { Merge } from 'Type/Common.type';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

export enum WishlistActionType {
    UPDATE_WISHLIST_STORE = 'UPDATE_WISHLIST_STORE',
}

export interface UpdateWishlistStoreAction extends AnyAction {
    type: WishlistActionType.UPDATE_WISHLIST_STORE;
    state: Partial<WishlistStore>;
}

export type WishlistAction = UpdateWishlistStoreAction;

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
