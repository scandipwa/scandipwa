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
    UPDATE_CATEGORY_LIST,
    UPDATE_CURRENT_CATEGORY
} from './Category.action';

const initialState = {
    category: {},
    categoryList: {}
};

const CategoryReducer = (state = initialState, action) => {
    const {
        type,
        categoryList,
        categoryUrlPath,
        categoryIds,
        isSearchPage
    } = action;

    switch (type) {
    case UPDATE_CATEGORY_LIST:
        return {
            ...state,
            categoryList
        };

    case UPDATE_CURRENT_CATEGORY:
        const { categoryList: stateCategoryList } = state;
        const flattenedCategories = {};

        const deleteProperty = (key, { [key]: _, ...newObj }) => newObj;
        const flattenCategory = (category) => {
            const { children } = category;

            if (children) {
                children.forEach((element) => {
                    flattenCategory(element);
                    flattenedCategories[categoryUrlPath
                        ? element.url_path : element.id] = deleteProperty('children', element);
                });
            }
        };

        flattenCategory(stateCategoryList);

        if (isSearchPage) return { ...state, category: stateCategoryList };

        return {
            ...state,
            category: flattenedCategories[categoryUrlPath || categoryIds]
        };

    default:
        return state;
    }
};

export default CategoryReducer;
