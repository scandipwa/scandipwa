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

import {
    ProductListInfoActionType,
    ProductListInfoStore,
    UpdateProductListInfoStoreAction,
} from './ProductListInfo.type';

/** @namespace Store/ProductListInfo/Action/updateProductListInfoStore */
export const updateProductListInfoStore = (state: Partial<ProductListInfoStore>): UpdateProductListInfoStoreAction => ({
    type: ProductListInfoActionType.UPDATE_PRODUCT_LIST_INFO_STORE,
    state,
});
