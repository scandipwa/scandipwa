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

import ProductListReducer from './ProductList.reducer';
import ProductListDispatcher, { ProductListDispatcher as ProductListDispatcherClass } from './ProductList.dispatcher';
import {
    APPEND_PAGE,
    UPDATE_PRODUCT_LIST_ITEMS,
    UPDATE_LOAD_STATUS,
    appendPage,
    updateProductListItems,
    updateLoadStatus
} from './ProductList.action';

export {
    ProductListReducer,
    ProductListDispatcher,
    ProductListDispatcherClass,
    APPEND_PAGE,
    UPDATE_PRODUCT_LIST_ITEMS,
    UPDATE_LOAD_STATUS,
    appendPage,
    updateProductListItems,
    updateLoadStatus
};
