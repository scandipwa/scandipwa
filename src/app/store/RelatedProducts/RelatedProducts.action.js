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

export const UPDATE_RELATED_PRODUCTS = 'UPDATE_RELATED_PRODUCTS';

/**
 * Update related products list (rewrite if already exists).
 * @param  {Array<String>} relatedProducts List of products returned from fetch
 * @return {void}
 */
export const updateRelatedProducts = relatedProducts => ({
    type: UPDATE_RELATED_PRODUCTS,
    relatedProducts
});
