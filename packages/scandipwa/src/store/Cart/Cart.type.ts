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

import { AnyAction } from 'redux';

import { GQLPaymentTotals, GQLQuoteData } from 'Type/Graphql.type';
import { Product } from 'Type/ProductList.type';

export enum CartActionType {
    ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
    REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
    UPDATE_TOTALS = 'UPDATE_TOTALS',
    APPLY_COUPON_TO_CART = 'APPLY_COUPON_TO_CART',
    REMOVE_COUPON_FROM_CART = 'REMOVE_COUPON_FROM_CART',
    UPDATE_SHIPPING_PRICE = 'UPDATE_SHIPPING_PRICE',
    UPDATE_IS_LOADING_CART = 'UPDATE_IS_LOADING_CART'
}

export interface AddProductToCartAction extends AnyAction {
    type: CartActionType.ADD_PRODUCT_TO_CART;
    newProduct: Product;
}

export interface RemoveProductFromCartAction extends AnyAction {
    type: CartActionType.REMOVE_PRODUCT_FROM_CART;
    product: Product;
}

export interface UpdateTotalsAction extends AnyAction {
    type: CartActionType.UPDATE_TOTALS;
    cartData: GQLQuoteData;
}

export interface UpdateShippingPriceAction extends AnyAction {
    type: CartActionType.UPDATE_SHIPPING_PRICE;
    data: GQLPaymentTotals;
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

export type CartStore = {
    isLoading: boolean;
    cartTotals: Record<string, unknown>;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CartReducer: CartStore;
    }
}
