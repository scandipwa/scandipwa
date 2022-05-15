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

import { Reducer } from 'redux';

import { getIndexedProducts } from 'Util/Product';

import { ProductListAction, ProductListActionType, ProductListStore } from './ProductList.type';

/** @namespace Store/ProductList/Reducer/getInitialState */
export const getInitialState = (): ProductListStore => ({
    pages: {},
    totalItems: 0,
    totalPages: 0,
    isLoading: true,
    isPageLoading: false,
    currentArgs: {}
});

export const defaultConfig = {
    itemsPerPageCount: 12
};

/** @namespace Store/ProductList/Reducer/ProductListReducer */
export const ProductListReducer: Reducer<ProductListStore, ProductListAction> = (
    state: ProductListStore = getInitialState(),
    action: ProductListAction
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
    case ProductListActionType.APPEND_PAGE:
        return {
            ...state,
            isPageLoading: false,
            pages: {
                ...state.pages,
                [currentPage]: getIndexedProducts(initialItems)
            }
        };

    case ProductListActionType.UPDATE_PRODUCT_LIST_ITEMS:
        return {
            ...state,
            currentArgs,
            isLoading: false,
            totalItems,
            totalPages,
            pages: { [currentPage]: getIndexedProducts(initialItems) }
        };

    case ProductListActionType.UPDATE_PAGE_LOAD_STATUS:
        return {
            ...state,
            isPageLoading: true
        };

    case ProductListActionType.UPDATE_LOAD_STATUS:
        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default ProductListReducer;
