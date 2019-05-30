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
export const UPDATE_ALL_PRODUCTS_IN_CART = 'UPDATE_ALL_PRODUCTS_IN_CART';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 */
const addProductToCart = newProduct => ({
    type: ADD_PRODUCT_TO_CART,
    newProduct
});

/**
 * Remove specified product from cart
 * @param  {Object} product Product which should be removed
 * @return {void}
 */
const removeProductFromCart = product => ({
    type: REMOVE_PRODUCT_FROM_CART,
    product
});

/**
 * Update all products in cart
 * @param  {Array} product Product which should be removed
 * @return {void}
 */
const updateAllProductsInCart = products => ({
    type: UPDATE_ALL_PRODUCTS_IN_CART,
    products
});

/**
 * Update totals block
 * @param  {Object} totals Object of calculated totals
 * @return {void}
 */
const updateTotals = cartData => ({
    type: UPDATE_TOTALS,
    cartData
});

export {
    addProductToCart,
    removeProductFromCart,
    updateTotals,
    updateAllProductsInCart
};
