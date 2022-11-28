/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Reducer } from 'redux';

import {
    ProductListActionType,
    ProductListStore,
    UpdateProductListStoreAction,
} from './ProductList.type';

/** @namespace Store/ProductList/Reducer/getInitialState */
export const getInitialState = (): ProductListStore => ({
    pages: {},
    totalItems: 0,
    totalPages: 0,
    isLoading: true,
    isPageLoading: false,
    currentArgs: {},
    searchCriteria: '',
});

export const defaultConfig = {
    itemsPerPageCount: 12,
};

/** @namespace Store/ProductList/Reducer/ProductListReducer */
export const ProductListReducer: Reducer<ProductListStore, UpdateProductListStoreAction> = (
    state: ProductListStore = getInitialState(),
    action: UpdateProductListStoreAction,
) => {
    const { state: newState, type } = action;

    if (ProductListActionType.UPDATE_PRODUCT_LIST_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default ProductListReducer;
