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

import {
    CartItem, CartShippingAddress, CartTotals as QuoteData, Region,
} from 'Query/Cart.type';
import { Merge } from 'Type/Common.type';
import { GQLCartItemInput } from 'Type/Graphql.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum CartActionType {
    UPDATE_CART_STORE = 'UPDATE_CART_STORE',
}

export interface UpdateCartStoreAction extends AnyAction {
    type: CartActionType.UPDATE_CART_STORE;
    state: Partial<CartStore>;
}

export interface CartStore {
    isLoading: boolean;
    cartTotals: CartTotals;
    areDetailsLoaded: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CartReducer: CartStore;
    }
}

export type IndexedCartItem = Merge<CartItem, {
    product: IndexedProduct;
}>;

export type CartTotals = Merge<
Partial<QuoteData>,
{
    items?: IndexedCartItem[];
    count?: number;
    shipping_addresses: Partial<CartShippingAddress>;
}
>;

export interface AddProductToCartOptions {
    cartId?: string;
    products: GQLCartItemInput[];
}

export interface UpdateProductInCartOptions {
    quantity: number;
    uid: string;
    cartId: string;
}

export interface CheckoutAddress {
    country_id?: string;
    region?: Region;
    region_id?: number;
    street?: string[];
    city?: string;
    firstname?: string;
    lastname?: string;
    postcode?: string;
    telephone?: string;
    vat_id?: string;
}
