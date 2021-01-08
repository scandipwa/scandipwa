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

import { getIndexedProducts } from 'Util/Product';

import {
    ADD_COMPARED_PRODUCT_ID,
    CLEAR_COMPARED_PRODUCTS,
    REMOVE_COMPARED_PRODUCT,
    SET_COMPARE_LIST,
    SET_COMPARED_PRODUCT_IDS,
    TOGGLE_COMPARE_LIST_LOADER
} from './ProductCompare.action';

/** @namespace Store/ProductCompare/Reducer/getInitialState */
export const getInitialState = () => ({
    isLoading: false,
    count: 0,
    products: [],
    productIds: []
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
            products: getIndexedProducts(products)
        };
    }

    case REMOVE_COMPARED_PRODUCT: {
        const { productId } = action;
        const { count, products, productIds } = state;

        return {
            ...state,
            count: count - 1,
            products: products.filter(({ id }) => id !== productId),
            productIds: productIds.filter((id) => id !== productId)
        };
    }

    case CLEAR_COMPARED_PRODUCTS: {
        return {
            ...state,
            count: 0,
            products: [],
            productIds: []
        };
    }

    case SET_COMPARED_PRODUCT_IDS: {
        const { productIds } = action;
        return {
            ...state,
            productIds
        };
    }

    case ADD_COMPARED_PRODUCT_ID: {
        const { productId } = action;
        const { productIds } = state;
        return {
            ...state,
            productIds: [...productIds, productId]
        };
    }

    default:
        return state;
    }
};

export default ProductCompareReducer;
