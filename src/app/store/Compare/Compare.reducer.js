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

import BrowserDatabase from 'Util/BrowserDatabase';
import {
    ADD_PRODUCT_TO_COMPARE,
    REMOVE_PRODUCT_FROM_COMPARE,
    REMOVE_ALL_PRODUCTS_FROM_COMPARE,
    UPDATE_ALL_PRODUCTS_IN_COMPARE,
    UPDATE_COMPARE_LOAD_STATUS
} from './Compare.action';

export const PRODUCTS_IN_COMPARE = 'compare_products';

const initialState = {
    comparedProducts: [],
    areCompareProductsLoading: false
};

const updateAllProductsInCompare = (action) => {
    const { comparedProducts } = action || [];

    BrowserDatabase.setItem(
        comparedProducts || [],
        PRODUCTS_IN_COMPARE
    );

    return { comparedProducts: comparedProducts || [] };
};

const addProductToCompareList = (action) => {
    const { productToCompare, productToCompare: { id } } = action || {};
    const comparedProducts = BrowserDatabase.getItem(PRODUCTS_IN_COMPARE) || [];
    const isProductInCompareList = comparedProducts.find(({ id: existingId }) => existingId === id);

    if (!isProductInCompareList) {
        comparedProducts.push(productToCompare);
        BrowserDatabase.setItem(comparedProducts, PRODUCTS_IN_COMPARE);
    }

    return { comparedProducts };
};

const removeProductFromCompare = (action) => {
    const { sku, isRemovedOnBE } = action;
    const comparedProducts = BrowserDatabase.getItem(PRODUCTS_IN_COMPARE) || [];

    if (!isRemovedOnBE) return comparedProducts;

    const productWithoutRemoved = comparedProducts.filter(({ sku: existingSku }) => existingSku !== sku);

    BrowserDatabase.setItem(productWithoutRemoved, PRODUCTS_IN_COMPARE);

    return { comparedProducts: productWithoutRemoved };
};

const removeAllProductsFromCompare = (action) => {
    const { isRemovedAllOnBE } = action;
    const comparedProducts = BrowserDatabase.getItem(PRODUCTS_IN_COMPARE) || [];

    if (!isRemovedAllOnBE) return comparedProducts;

    BrowserDatabase.setItem([], PRODUCTS_IN_COMPARE);

    return initialState;
};

const CompareReducer = (state = initialState, action) => {
    const { type, areCompareProductsLoading } = action;
    switch (type) {
    case ADD_PRODUCT_TO_COMPARE:
        return {
            ...state,
            ...addProductToCompareList(action),
            areCompareProductsLoading
        };
    case REMOVE_PRODUCT_FROM_COMPARE:
        return {
            ...state,
            ...removeProductFromCompare(action),
            areCompareProductsLoading
        };
    case REMOVE_ALL_PRODUCTS_FROM_COMPARE:
        return {
            ...state,
            ...removeAllProductsFromCompare(action),
            areCompareProductsLoading
        };
    case UPDATE_ALL_PRODUCTS_IN_COMPARE:
        return {
            ...state,
            ...updateAllProductsInCompare(action),
            areCompareProductsLoading
        };
    case UPDATE_COMPARE_LOAD_STATUS:
        return {
            ...state,
            areCompareProductsLoading
        };

    default:
        return state;
    }
};

export default CompareReducer;
