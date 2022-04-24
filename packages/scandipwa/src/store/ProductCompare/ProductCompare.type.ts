/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import {
    ComparableAttribute,
    ComparableItem,
    ComparableProduct,
    CompareList
} from 'Query/ProductCompare.type';

export enum ProductCompareActionType {
    TOGGLE_COMPARE_LIST_LOADER = 'TOGGLE_COMPARE_LIST_LOADER',
    SET_COMPARE_LIST = 'SET_COMPARE_LIST',
    REMOVE_COMPARED_PRODUCT = 'REMOVE_COMPARED_PRODUCT',
    CLEAR_COMPARED_PRODUCTS = 'CLEAR_COMPARED_PRODUCTS',
    SET_COMPARED_PRODUCT_IDS = 'SET_COMPARED_PRODUCT_IDS',
    ADD_COMPARED_PRODUCT_ID = 'ADD_COMPARED_PRODUCT_ID',
    UPDATE_COMPARE_TOTALS = 'UPDATE_COMPARE_TOTALS'
}

export interface ToggleLoaderAction extends AnyAction {
    type: ProductCompareActionType.TOGGLE_COMPARE_LIST_LOADER;
    isLoading: boolean;
}

export interface SetCompareListAction extends AnyAction {
    type: ProductCompareActionType.SET_COMPARE_LIST;
    payload: CompareList;
}

export interface RemoveComparedProductAction extends AnyAction {
    type: ProductCompareActionType.REMOVE_COMPARED_PRODUCT;
    productId: number;
}

export interface ClearComparedProductsAction extends AnyAction {
    type: ProductCompareActionType.CLEAR_COMPARED_PRODUCTS;
}

export interface SetCompareListIdsAction extends AnyAction {
    type: ProductCompareActionType.SET_COMPARED_PRODUCT_IDS;
    productIds: number[];
}

export interface AddComparedProductIdsAction extends AnyAction {
    type: ProductCompareActionType.ADD_COMPARED_PRODUCT_ID;
    productId: number;
}

export interface UpdateCompareTotalsAction extends AnyAction {
    type: ProductCompareActionType.UPDATE_COMPARE_TOTALS;
    compareTotals: number;
}

export type ProductCompareAction = ToggleLoaderAction
| SetCompareListAction
| RemoveComparedProductAction
| ClearComparedProductsAction
| SetCompareListIdsAction
| AddComparedProductIdsAction
| UpdateCompareTotalsAction;

export type ProductCompareStore = {
    isLoading: boolean;
    count: number;
    attributes: ComparableAttribute[];
    products: ComparableProduct[];
    productIds: number[];
    items: ComparableItem[];
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductCompareReducer: ProductCompareStore;
    }
}
