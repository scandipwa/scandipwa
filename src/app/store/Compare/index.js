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

import CompareReducer, { PRODUCTS_IN_COMPARE } from './Compare.reducer';
import CompareDispatcher from './Compare.dispatcher';
import {
    ADD_PRODUCT_TO_COMPARE,
    REMOVE_PRODUCT_FROM_COMPARE,
    REMOVE_ALL_PRODUCTS_FROM_COMPARE,
    UPDATE_ALL_PRODUCTS_IN_COMPARE,
    UPDATE_COMPARE_LOAD_STATUS,
    updateAllProductsInCompare,
    addProductToCompare,
    removeProductFromCompare,
    removeAllProductsFromCompare,
    updateCompareLoadStatus
} from './Compare.action';

export {
    CompareReducer,
    CompareDispatcher,
    PRODUCTS_IN_COMPARE,
    ADD_PRODUCT_TO_COMPARE,
    REMOVE_PRODUCT_FROM_COMPARE,
    REMOVE_ALL_PRODUCTS_FROM_COMPARE,
    UPDATE_ALL_PRODUCTS_IN_COMPARE,
    UPDATE_COMPARE_LOAD_STATUS,
    addProductToCompare,
    removeProductFromCompare,
    removeAllProductsFromCompare,
    updateAllProductsInCompare,
    updateCompareLoadStatus
};
