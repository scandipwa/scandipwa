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

import { ProductListInfoActionType, ProductListInfoStore } from './ProductListInfo.type';

/** @namespace Store/ProductListInfo/Reducer/getInitialState */
export const getInitialState = (): ProductListInfoStore => ({
    minPrice: 0,
    maxPrice: 0,
    sortFields: {},
    filters: {},
    isLoading: true,
    selectedFilter: {},
});

/** @namespace Store/ProductListInfo/Reducer/ProductListReducer */
export const ProductListReducer: Reducer<ProductListInfoStore> = (
    state: ProductListInfoStore = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (ProductListInfoActionType.UPDATE_PRODUCT_LIST_INFO_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default ProductListReducer;
