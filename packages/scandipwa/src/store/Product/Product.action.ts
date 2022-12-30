/* eslint-disable import/prefer-default-export */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { ProductItem } from 'Query/ProductList.type';

import { ProductActionType, UpdateProductDetailsAction } from './Product.type';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 * @namespace Store/Product/Action/updateProductDetails
 */
export const updateProductDetails = (product: ProductItem): UpdateProductDetailsAction => ({
    type: ProductActionType.UPDATE_PRODUCT_DETAILS,
    product,
});

/** @namespace Store/Product/Action/updateActiveTab */
export const updateActiveTab = (activeTab: string): UpdateProductDetailsAction => ({
    type: ProductActionType.UPDATE_ACTIVE_PRODUCT_TAB,
    activeTab,
});
