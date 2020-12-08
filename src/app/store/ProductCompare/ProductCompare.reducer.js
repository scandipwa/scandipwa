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
    CLEAR_COMPARED_PRODUCTS,
    REMOVE_COMPARED_PRODUCT,
    SET_COMPARE_LIST,
    TOGGLE_COMPARE_LIST_LOADER
} from './ProductCompare.action';

/** @namespace Store/ProductCompare/Reducer/getInitialState */
export const getInitialState = () => ({
    isLoading: false,
    count: 0,
    products: []
});

/** @namespace Store/ProductCompare/Reducer */
export const ProductCompareReducer = (state = getInitialState(), action) => {
    const { type } = action;

    switch (type) {
    case TOGGLE_COMPARE_LIST_LOADER: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    }

    case SET_COMPARE_LIST: {
        const { count = 0, products = [] } = action;

        return {
            ...state,
            count,
            products
        };
    }

    case REMOVE_COMPARED_PRODUCT: {
        const { sku } = action;
        const { count, products } = state;

        return {
            ...state,
            count: count - 1,
            products: products.filter((product) => product.sku !== sku)
        };
    }

    case CLEAR_COMPARED_PRODUCTS: {
        return {
            ...state,
            count: 0,
            products: []
        };
    }

    default:
        return state;
    }
};

export default ProductCompareReducer;
