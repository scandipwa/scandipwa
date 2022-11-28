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

import {
    ProductListActionType,
    ProductListStore,
    UpdateProductListStoreAction,
} from './ProductList.type';

/** @namespace Store/ProductList/Action/updateProductListStore */
export const updateProductListStore = (state: Partial<ProductListStore>): UpdateProductListStoreAction => ({
    type: ProductListActionType.UPDATE_PRODUCT_LIST_STORE,
    state,
});
