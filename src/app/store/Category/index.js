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

import CategoryReducer from './Category.reducer';
import CategoryDispatcher, { CategoryDispatcher as CategoryDispatcherClass } from './Category.dispatcher';
import {
    UPDATE_CATEGORY_PRODUCT_LIST,
    UPDATE_CATEGORY_LIST,
    APPEND_CATEGORY_PRODUCT_LIST,
    UPDATE_LOAD_STATUS,
    UPDATE_CURRENT_CATEGORY,
    updateCategoryProductList,
    updateCategoryList,
    appendCategoryProductList,
    updateLoadStatus,
    updateCurrentCategory
} from './Category.action';

export {
    CategoryReducer,
    CategoryDispatcher,
    CategoryDispatcherClass,
    UPDATE_CATEGORY_PRODUCT_LIST,
    UPDATE_CATEGORY_LIST,
    APPEND_CATEGORY_PRODUCT_LIST,
    UPDATE_LOAD_STATUS,
    UPDATE_CURRENT_CATEGORY,
    updateCategoryProductList,
    updateCategoryList,
    appendCategoryProductList,
    updateLoadStatus,
    updateCurrentCategory
};
