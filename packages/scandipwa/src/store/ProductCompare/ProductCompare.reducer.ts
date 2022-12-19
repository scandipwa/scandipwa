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

import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';

import { ProductCompareActionType, ProductCompareStore } from './ProductCompare.type';

export const COMPARE_LIST_PRODUCTS = 'compare_list_products';

/** @namespace Store/ProductCompare/Reducer/getInitialState */
export const getInitialState = (): ProductCompareStore => {
    const compareListProducts = BrowserDatabase.getItem<number[]>(COMPARE_LIST_PRODUCTS) || [];

    return {
        isLoading: false,
        count: 0,
        attributes: [],
        products: [],
        productIds: compareListProducts,
        items: [],
    };
};

/** @namespace Store/ProductCompare/Reducer/ProductCompareReducer */
export const ProductCompareReducer: Reducer<ProductCompareStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (ProductCompareActionType.UPDATE_PRODUCT_COMPARE_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default ProductCompareReducer;
