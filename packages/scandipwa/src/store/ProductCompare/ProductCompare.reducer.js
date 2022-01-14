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

import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';

import {
    CLEAR_COMPARED_PRODUCTS,
    SET_COMPARE_LIST,
    SET_COMPARED_PRODUCT_IDS,
    TOGGLE_COMPARE_LIST_LOADER,
    UPDATE_COMPARE_TOTALS
} from './ProductCompare.action';

export const COMPARE_LIST_PRODUCTS = 'compare_list_products';

/** @namespace Store/ProductCompare/Reducer/getInitialState */
export const getInitialState = () => {
    const compareListProducts = BrowserDatabase.getItem(COMPARE_LIST_PRODUCTS) || [];

    return {
        isLoading: false,
        count: 0,
        attributes: [],
        products: [],
        productIds: compareListProducts,
        items: []
    };
};

/** @namespace Store/ProductCompare/Reducer/ProductCompareReducer */
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
        const { item_count = 0, items = [], attributes = [] } = action;

        const products = items.map((item) => ({
            ...item.product,
            attributes: []
        }));
        const productIds = products.map((product) => product.id);

        BrowserDatabase.setItem(
            productIds,
            COMPARE_LIST_PRODUCTS
        );

        return {
            ...state,
            count: item_count,
            attributes,
            products,
            productIds,
            items
        };
    }

    case UPDATE_COMPARE_TOTALS: {
        const { compareTotals = 0 } = action;

        return {
            ...state,
            count: compareTotals
        };
    }

    case CLEAR_COMPARED_PRODUCTS: {
        BrowserDatabase.setItem(
            [],
            COMPARE_LIST_PRODUCTS
        );

        return {
            ...state,
            count: 0,
            products: [],
            productIds: [],
            items: [],
            attributes: []
        };
    }

    case SET_COMPARED_PRODUCT_IDS: {
        const { productIds } = action;

        BrowserDatabase.setItem(
            productIds,
            COMPARE_LIST_PRODUCTS
        );

        return {
            ...state,
            productIds
        };
    }

    default:
        return state;
    }
};

export default ProductCompareReducer;
