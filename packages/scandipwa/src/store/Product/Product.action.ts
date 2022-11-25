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

import {
    ProductActionType,
    ProductStore,
    UpdateProductStoreAction,
} from './Product.type';

/** @namespace Store/Product/Action/updateProductStore */
export const updateProductStore = (state: Partial<ProductStore>): UpdateProductStoreAction => ({
    type: ProductActionType.UPDATE_PRODUCT_STORE,
    state,
});
