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

export const UPDATE_LINKED_PRODUCTS = 'UPDATE_LINKED_PRODUCTS';
/**
 * Update upsell products list (rewrite if already exists).
 * @param  {Array<String>} upsell List of products returned from fetch
 * @return {void}
 * @namespace Store/LinkedProducts/Action/updateLinkedProducts
 */
export const updateLinkedProducts = (linkedProducts) => ({
    type: UPDATE_LINKED_PRODUCTS,
    linkedProducts
});
