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

import { CompareList } from 'Query/ProductCompare.type';

import {
    AddComparedProductIdsAction,
    ClearComparedProductsAction,
    ProductCompareActionType,
    RemoveComparedProductAction,
    SetCompareListAction,
    SetCompareListIdsAction,
    ToggleLoaderAction,
    UpdateCompareTotalsAction
} from './ProductCompare.type';

/** @namespace Store/ProductCompare/Action/toggleLoader */
export const toggleLoader = (isLoading: boolean): ToggleLoaderAction => ({
    type: ProductCompareActionType.TOGGLE_COMPARE_LIST_LOADER,
    isLoading
});

/** @namespace Store/ProductCompare/Action/setCompareList */
export const setCompareList = (payload: CompareList): SetCompareListAction => ({
    type: ProductCompareActionType.SET_COMPARE_LIST,
    payload
});

/** @namespace Store/ProductCompare/Action/removeComparedProduct */
export const removeComparedProduct = (productId: number): RemoveComparedProductAction => ({
    type: ProductCompareActionType.REMOVE_COMPARED_PRODUCT,
    productId
});

/** @namespace Store/ProductCompare/Action/clearComparedProducts */
export const clearComparedProducts = (): ClearComparedProductsAction => ({
    type: ProductCompareActionType.CLEAR_COMPARED_PRODUCTS
});

/** @namespace Store/ProductCompare/Action/setCompareListIds */
export const setCompareListIds = (productIds: number[]): SetCompareListIdsAction => ({
    type: ProductCompareActionType.SET_COMPARED_PRODUCT_IDS,
    productIds
});

/** @namespace Store/ProductCompare/Action/addComparedProductIds */
export const addComparedProductIds = (productId: number): AddComparedProductIdsAction => ({
    type: ProductCompareActionType.ADD_COMPARED_PRODUCT_ID,
    productId
});

/** @namespace Store/ProductCompare/Action/updateCompareTotals */
export const updateCompareTotals = (compareTotals: number): UpdateCompareTotalsAction => ({
    type: ProductCompareActionType.UPDATE_COMPARE_TOTALS,
    compareTotals
});
