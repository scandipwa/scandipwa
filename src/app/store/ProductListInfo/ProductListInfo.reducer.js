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
    UPDATE_PRODUCT_LIST_INFO,
    UPDATE_INFO_LOAD_STATUS
} from 'Store/ProductListInfo';

const initialState = {
    totalItems: 0,
    minPrice: 300,
    maxPrice: 0,
    sortFields: {},
    filters: [],
    isLoading: true
};

const ProductListReducer = (state = initialState, action) => {
    const {
        totalItems,
        minPrice,
        maxPrice,
        sortFields,
        filters,
        isLoading
    } = action;

    switch (action.type) {
    case UPDATE_PRODUCT_LIST_INFO:
        return {
            ...state,
            filters,
            totalItems,
            sortFields,
            minPrice: Math.min(state.minPrice, minPrice),
            maxPrice: Math.max(state.maxPrice, maxPrice)
        };

    case UPDATE_INFO_LOAD_STATUS:
        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default ProductListReducer;
