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

import { Reducer } from 'react';

import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';

import {
    ProductCompareAction,
    ProductCompareActionType,
    ProductCompareStore
} from './ProductCompare.type';

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
        items: []
    };
};

/** @namespace Store/ProductCompare/Reducer/ProductCompareReducer */
export const ProductCompareReducer: Reducer<ProductCompareStore, ProductCompareAction> = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case ProductCompareActionType.TOGGLE_COMPARE_LIST_LOADER: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    }

    case ProductCompareActionType.SET_COMPARE_LIST: {
        const { item_count = 0, items = [], attributes = [] } = action.payload;

        const products = items.map((item) => ({
            ...(item?.product || {}),
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
        } as ProductCompareStore;
    }

    case ProductCompareActionType.UPDATE_COMPARE_TOTALS: {
        const { compareTotals = 0 } = action;

        return {
            ...state,
            count: compareTotals
        };
    }

    case ProductCompareActionType.CLEAR_COMPARED_PRODUCTS: {
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

    case ProductCompareActionType.SET_COMPARED_PRODUCT_IDS: {
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
