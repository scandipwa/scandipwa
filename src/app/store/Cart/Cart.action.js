/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const UPDATE_TOTALS = 'UPDATE_TOTALS';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 */
const addProductToCart = (newProduct, quantity) => ({
    type: ADD_PRODUCT_TO_CART,
    newProduct,
    quantity
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
 * Update totatals block
 * @param  {Object} totals Object of calculated totals
 * @return {void}
 */
const updateTotals = totals => ({
    type: UPDATE_TOTALS,
    totals
});

export { addProductToCart, removeProductFromCart, updateTotals };
