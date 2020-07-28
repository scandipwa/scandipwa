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
    APPEND_PAGE,
    UPDATE_PRODUCT_LIST_ITEMS,
    UPDATE_LOAD_STATUS
} from 'Store/ProductList';
import { getIndexedProducts } from 'Util/Product';

export const initialState = {
    pages: {},
    totalItems: 0,
    totalPages: 0,
    isLoading: true
};

export const defaultConfig = {
    itemsPerPageCount: 12
};

const ProductListReducer = (state = initialState, action) => {
    const {
        type,
        items: initialItems = [],
        total_pages: totalPages,
        total_count: totalItems,
        currentPage,
        isLoading
    } = action;

    switch (type) {
    case APPEND_PAGE:
        return {
            ...state,
            pages: {
                ...state.pages,
                [currentPage]: getIndexedProducts(initialItems)
            }
        };

    case UPDATE_PRODUCT_LIST_ITEMS:
        return {
            ...state,
            isLoading: false,
            totalItems,
            totalPages,
            pages: { [currentPage]: getIndexedProducts(initialItems) }
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

export default ProductListReducer;
