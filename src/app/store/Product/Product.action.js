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

export const UPDATE_PRODUCT_DETAILS = 'UPDATE_PRODUCT_DETAILS';
export const UPDATE_GROUPED_PRODUCT_QUANTITY = 'UPDATE_GROUPED_PRODUCT_QUANTITY';
export const CLEAR_GROUPED_PRODUCT_QUANTITY = 'CLEAR_GROUPED_PRODUCT_QUANTITY';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 */
export const updateProductDetails = product => ({
    type: UPDATE_PRODUCT_DETAILS,
    product
});
/**
 * Update quantity of grouped product
 * @param  {Object} product
 * @param  {Number} quantity new product quantity
 * @return {void}
 */
export const updateGroupedProductQuantity = (product, quantity) => ({
    type: UPDATE_GROUPED_PRODUCT_QUANTITY,
    product,
    quantity
});

/**
 * Clear quantity of grouped product
 * @return {void}
 */
export const clearGroupedProductQuantity = () => ({
    type: CLEAR_GROUPED_PRODUCT_QUANTITY
});
