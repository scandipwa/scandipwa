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

export const TOGGLE_COMPARE_LIST_LOADER = 'TOGGLE_COMPARE_LIST_LOADER';
export const SET_COMPARE_LIST = 'SET_COMPARE_LIST';
export const REMOVE_COMPARED_PRODUCT = 'REMOVE_COMPARED_PRODUCT';
export const CLEAR_COMPARED_PRODUCTS = 'CLEAR_COMPARED_PRODUCTS';
export const SET_COMPARED_PRODUCT_IDS = 'SET_COMPARED_PRODUCT_IDS';
export const ADD_COMPARED_PRODUCT_ID = 'ADD_COMPARED_PRODUCT_ID';

/** @namespace Store/ProductCompare/Action/toggleLoader */
export const toggleLoader = (isLoading) => ({
    type: TOGGLE_COMPARE_LIST_LOADER,
    isLoading
});

/** @namespace Store/ProductCompare/Action/setCompareList */
export const setCompareList = (payload) => ({
    type: SET_COMPARE_LIST,
    ...payload
});

/** @namespace Store/ProductCompare/Action/removeComparedProduct */
export const removeComparedProduct = (productId) => ({
    type: REMOVE_COMPARED_PRODUCT,
    productId
});

/** @namespace Store/ProductCompare/Action/clearComparedProducts */
export const clearComparedProducts = () => ({
    type: CLEAR_COMPARED_PRODUCTS
});

/** @namespace Store/ProductCompare/Action/clearComparedProducts/setComparedProductIds */
export const setCompareListIds = (productIds) => ({
    type: SET_COMPARED_PRODUCT_IDS,
    productIds
});

/** @namespace Store/ProductCompare/Action/clearComparedProducts/addComparedProductIds */
export const addComparedProductIds = (productId) => ({
    type: ADD_COMPARED_PRODUCT_ID,
    productId
});
