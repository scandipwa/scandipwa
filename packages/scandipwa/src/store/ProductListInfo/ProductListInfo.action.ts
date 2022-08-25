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

import { ProductAttributeFilterOptions, ProductsQueryOutput } from 'Query/ProductList.type';

import {
    ProductListInfoActionType,
    UpdateInfoLoadStatusAction,
    UpdateProductListInfoAction
} from './ProductListInfo.type';

/** @namespace Store/ProductListInfo/Action/updateProductListInfo */
export const updateProductListInfo = (
    products: ProductsQueryOutput,
    filter: Partial<ProductAttributeFilterOptions>
): UpdateProductListInfoAction => ({
    type: ProductListInfoActionType.UPDATE_PRODUCT_LIST_INFO,
    products,
    selectedFilter: filter
});

/**
 * Update loading status
 * @param {Boolean} status Loading indication boolean
 * @return {void}
 * @namespace Store/ProductListInfo/Action/updateInfoLoadStatus
 */
export const updateInfoLoadStatus = (status: boolean): UpdateInfoLoadStatusAction => ({
    type: ProductListInfoActionType.UPDATE_INFO_LOAD_STATUS,
    isLoading: status
});
