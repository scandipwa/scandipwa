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
import { TotalsObject } from 'Query/Checkout.type';
import { ProductItem } from 'Query/ProductList.type';
import { Merge } from 'Type/Common.type';
import { GQLCartItemInput } from 'Type/Graphql.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum CartActionType {
    ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
    REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
    UPDATE_TOTALS = 'UPDATE_TOTALS',
    APPLY_COUPON_TO_CART = 'APPLY_COUPON_TO_CART',
    REMOVE_COUPON_FROM_CART = 'REMOVE_COUPON_FROM_CART',
    UPDATE_SHIPPING_PRICE = 'UPDATE_SHIPPING_PRICE',
    UPDATE_IS_LOADING_CART = 'UPDATE_IS_LOADING_CART',
}

export interface AddProductToCartAction extends AnyAction {
    type: CartActionType.ADD_PRODUCT_TO_CART;
    newProduct: ProductItem;
}

export interface RemoveProductFromCartAction extends AnyAction {
    type: CartActionType.REMOVE_PRODUCT_FROM_CART;
    product: ProductItem;
}

export interface UpdateTotalsAction extends AnyAction {
    type: CartActionType.UPDATE_TOTALS;
    cartData: Partial<QuoteData>;
}

export interface UpdateShippingPriceAction extends AnyAction {
    type: CartActionType.UPDATE_SHIPPING_PRICE;
    data: TotalsObject;
}

export interface ApplyCouponToCartAction extends AnyAction {
    type: CartActionType.APPLY_COUPON_TO_CART;
    couponCode: string;
}

export interface RemoveCouponFromCartAction extends AnyAction {
    type: CartActionType.REMOVE_COUPON_FROM_CART;
}

export interface UpdateIsLoadingCartAction extends AnyAction {
    type: CartActionType.UPDATE_IS_LOADING_CART;
    isLoading: boolean;
}

export type CartAction = AddProductToCartAction
| RemoveProductFromCartAction
| UpdateTotalsAction
| UpdateShippingPriceAction
| ApplyCouponToCartAction
| RemoveCouponFromCartAction
| UpdateIsLoadingCartAction;

export interface CartStore {
    isLoading: boolean;
    cartTotals: CartTotals;
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
