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

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const UPDATE_TOTALS = 'UPDATE_TOTALS';
export const APPLY_COUPON_TO_CART = 'APPLY_COUPON_TO_CART';
export const REMOVE_COUPON_FROM_CART = 'REMOVE_COUPON_FROM_CART';
export const UPDATE_SHIPPING_PRICE = 'UPDATE_SHIPPING_PRICE';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 * @namespace Store/Cart/Action/addProductToCart
 */
export const addProductToCart = (newProduct) => ({
    type: ADD_PRODUCT_TO_CART,
    newProduct
});

/**
 * Remove specified product from cart
 * @param  {Object} product Product which should be removed
 * @return {void}
 * @namespace Store/Cart/Action/removeProductFromCart
 */
export const removeProductFromCart = (product) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    product
});

/**
 * Update totals block
 * @param  {Object} totals Object of calculated totals
 * @return {void}
 * @namespace Store/Cart/Action/updateTotals
 */
export const updateTotals = (cartData) => ({
    type: UPDATE_TOTALS,
    cartData
});

/**
 * Update shipment price in totals block
 * @param {Object} data
 * @return {void}
 * @namespace Store/Cart/Action/updateShippingPrice
 */
export const updateShippingPrice = (data) => ({
    type: UPDATE_SHIPPING_PRICE,
    data
});

/**
 * Apply coupon to cart
 * @param  {String} string Coupon code
 * @return {void}
 * @namespace Store/Cart/Action/applyCouponToCart
 */
export const applyCouponToCart = (couponCode) => ({
    type: APPLY_COUPON_TO_CART,
    couponCode
});

/**
 * Remove coupon from cart
 * @return {void}
 * @namespace Store/Cart/Action/removeCouponFromCart
 */
export const removeCouponFromCart = () => ({
    type: REMOVE_COUPON_FROM_CART
});
