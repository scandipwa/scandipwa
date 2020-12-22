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
    UPDATE_LOAD_STATUS,
    UPDATE_PAGE_LOAD_STATUS,
    UPDATE_PRODUCT_LIST_ITEMS
} from 'Store/ProductList/ProductList.action';
import { getIndexedProducts } from 'Util/Product';

/** @namespace Store/ProductList/Reducer/getInitialState */
export const getInitialState = () => ({
    pages: {},
    totalItems: 0,
    totalPages: 0,
    isLoading: true,
    currentArgs: {}
});

export const defaultConfig = {
    itemsPerPageCount: 12
};

/** @namespace Store/ProductList/Reducer */
export const ProductListReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        items: initialItems = [],
        total_pages: totalPages,
        total_count: totalItems,
        currentPage,
        isLoading,
        args: currentArgs
    } = action;

    switch (type) {
    case APPEND_PAGE:
        return {
            ...state,
            isPageLoading: false,
            pages: {
                ...state.pages,
                [currentPage]: getIndexedProducts(initialItems)
            }
        };

    case UPDATE_PRODUCT_LIST_ITEMS:
        return {
            ...state,
            currentArgs,
            isLoading: false,
            totalItems,
            totalPages,
            pages: { [currentPage]: getIndexedProducts(initialItems) }
        };

    case UPDATE_PAGE_LOAD_STATUS:
        return {
            ...state,
            isPageLoading: true
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
