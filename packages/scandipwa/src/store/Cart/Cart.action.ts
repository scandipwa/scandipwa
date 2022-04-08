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

import { GQLPaymentTotals, GQLQuoteData } from 'Type/Graphql.type';
import { Product } from 'Type/ProductList.type';

import {
    AddProductToCartAction,
    ApplyCouponToCartAction,
    CartActionType,
    RemoveCouponFromCartAction,
    RemoveProductFromCartAction,
    UpdateIsLoadingCartAction,
    UpdateShippingPriceAction,
    UpdateTotalsAction
} from './Cart.type';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 * @namespace Store/Cart/Action/addProductToCart
 */
export const addProductToCart = (newProduct: Product): AddProductToCartAction => ({
    type: CartActionType.ADD_PRODUCT_TO_CART,
    newProduct
});

/**
 * Remove specified product from cart
 * @param  {Object} product Product which should be removed
 * @return {void}
 * @namespace Store/Cart/Action/removeProductFromCart
 */
export const removeProductFromCart = (product: Product): RemoveProductFromCartAction => ({
    type: CartActionType.REMOVE_PRODUCT_FROM_CART,
    product
});

/**
 * Update totals block
 * @param  {Object} totals Object of calculated totals
 * @return {void}
 * @namespace Store/Cart/Action/updateTotals
 */
export const updateTotals = (cartData: GQLQuoteData): UpdateTotalsAction => ({
    type: CartActionType.UPDATE_TOTALS,
    cartData
});

/**
 * Update shipment price in totals block
 * @param {Object} data
 * @return {void}
 * @namespace Store/Cart/Action/updateShippingPrice
 */
export const updateShippingPrice = (data: GQLPaymentTotals): UpdateShippingPriceAction => ({
    type: CartActionType.UPDATE_SHIPPING_PRICE,
    data
});

/**
 * Apply coupon to cart
 * @param  {String} string Coupon code
 * @return {void}
 * @namespace Store/Cart/Action/applyCouponToCart
 */
export const applyCouponToCart = (couponCode: string): ApplyCouponToCartAction => ({
    type: CartActionType.APPLY_COUPON_TO_CART,
    couponCode
});

/**
 * Remove coupon from cart
 * @return {void}
 * @namespace Store/Cart/Action/removeCouponFromCart
 */
export const removeCouponFromCart = (): RemoveCouponFromCartAction => ({
    type: CartActionType.REMOVE_COUPON_FROM_CART
});

/** @namespace Store/Cart/Action/updateIsLoadingCart */
export const updateIsLoadingCart = (isLoading: boolean): UpdateIsLoadingCartAction => ({
    type: CartActionType.UPDATE_IS_LOADING_CART,
    isLoading
});
