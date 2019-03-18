/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import {
    UPDATE_CATEGORY_PRODUCT_LIST,
    UPDATE_CATEGORY_DETAILS,
    APPEND_CATEGORY_PRODUCT_LIST,
    UPDATE_LOAD_STATUS
} from './Category.action';

const initialState = {
    items: [],
    totalItems: 0,
    category: {},
    sortFields: {},
    filters: [],
    isLoading: true
};

const CategoryReducer = (state = initialState, action) => {
    const {
        totalItems,
        items,
        category,
        sortFields,
        filters,
        isLoading
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

    case UPDATE_CATEGORY_DETAILS:
        return {
            ...state,
            category
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
