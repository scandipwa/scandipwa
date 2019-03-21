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

import {
    UPDATE_CATEGORY_PRODUCT_LIST,
    UPDATE_CATEGORY_LIST,
    UPDATE_CURRENT_CATEGORY,
    APPEND_CATEGORY_PRODUCT_LIST,
    UPDATE_LOAD_STATUS
} from './Category.action';

const initialState = {
    items: [],
    totalItems: 0,
    category: {},
    categoryList: {},
    sortFields: {},
    filters: [],
    isLoading: true
};

const CategoryReducer = (state = initialState, action) => {
    const {
        totalItems,
        items,
        categoryList,
        sortFields,
        filters,
        isLoading,
        categoryUrlPath
    } = action;

    switch (action.type) {
    case UPDATE_CATEGORY_PRODUCT_LIST:
        return {
            ...state,
            totalItems,
            items,
            sortFields,
            filters
        };

    case APPEND_CATEGORY_PRODUCT_LIST:
        return {
            ...state,
            items: [
                ...state.items,
                ...items
            ]
        };

    case UPDATE_CATEGORY_LIST:
        return {
            ...state,
            categoryList
        };

    case UPDATE_CURRENT_CATEGORY:
        const { categoryList: stateCategoryList } = state;
        const flattendCategories = {};

        const deleteProperty = (key, { [key]: _, ...newObj }) => newObj;
        const flattenCategory = (category) => {
            const { children } = category;

            if (children) {
                children.forEach((element) => {
                    flattenCategory(element);
                    flattendCategories[element.url_path] = deleteProperty('children', element);
                });
            }
        };

        flattenCategory(stateCategoryList);

        return {
            ...state,
            category: flattendCategories[categoryUrlPath]
        };

    case UPDATE_LOAD_STATUS:
        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default CategoryReducer;
