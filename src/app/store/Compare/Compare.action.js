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

export const ADD_PRODUCT_TO_COMPARE = 'ADD_PRODUCT_TO_COMPARE';
export const REMOVE_PRODUCT_FROM_COMPARE = 'REMOVE_PRODUCT_FROM_COMPARE';
export const UPDATE_ALL_PRODUCTS_IN_COMPARE = 'UPDATE_ALL_PRODUCTS_IN_COMPARE';
export const UPDATE_COMPARE_LOAD_STATUS = 'UPDATE_COMPARE_LOAD_STATUS';
export const REMOVE_ALL_PRODUCTS_FROM_COMPARE = 'REMOVE_ALL_PRODUCTS_FROM_COMPARE';

const updateAllProductsInCompare = (comparedProducts, areCompareProductsLoading) => ({
    type: UPDATE_ALL_PRODUCTS_IN_COMPARE,
    comparedProducts,
    areCompareProductsLoading
});

const addProductToCompare = productToCompare => ({
    type: ADD_PRODUCT_TO_COMPARE,
    productToCompare
});

const removeProductFromCompare = (sku, isRemovedOnBE) => ({
    type: REMOVE_PRODUCT_FROM_COMPARE,
    sku,
    isRemovedOnBE
});

const removeAllProductsFromCompare = isRemovedAllOnBE => ({
    type: REMOVE_ALL_PRODUCTS_FROM_COMPARE,
    isRemovedAllOnBE
});

const updateCompareLoadStatus = areCompareProductsLoading => ({
    type: UPDATE_COMPARE_LOAD_STATUS,
    areCompareProductsLoading
});

export {
    updateAllProductsInCompare,
    addProductToCompare,
    removeProductFromCompare,
    removeAllProductsFromCompare,
    updateCompareLoadStatus
};
