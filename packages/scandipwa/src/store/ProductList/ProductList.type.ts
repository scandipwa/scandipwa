/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

import { ProductItem, ProductListOptionArgs, ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum ProductListActionType {
    APPEND_PAGE = 'APPEND_PAGE',
    UPDATE_PRODUCT_LIST_ITEMS = 'UPDATE_PRODUCT_LIST_ITEMS',
    UPDATE_LOAD_STATUS = 'UPDATE_LOAD_STATUS',
    UPDATE_PAGE_LOAD_STATUS = 'UPDATE_PAGE_LOAD_STATUS',
}

export interface AppendPageAction extends AnyAction {
    type: ProductListActionType.APPEND_PAGE;
    items: ProductItem[];
    currentPage: number;
}

export interface UpdateProductListItemsAction extends AnyAction {
    type: ProductListActionType.UPDATE_PRODUCT_LIST_ITEMS;
    items: ProductItem[];
    currentPage: number;
    total_pages: number;
    total_count: number;
    args: ProductListOptionArgs;
}

export interface UpdateLoadStatusAction extends AnyAction {
    type: ProductListActionType.UPDATE_LOAD_STATUS;
    isLoading: boolean;
}

export interface UpdatePageLoadingStatusAction extends AnyAction {
    type: ProductListActionType.UPDATE_PAGE_LOAD_STATUS;
}

export type ProductListAction = AppendPageAction
| UpdateProductListItemsAction
| UpdateLoadStatusAction
| UpdatePageLoadingStatusAction;

export interface ProductListStore {
    pages: Record<number, IndexedProduct[]>;
    totalItems: number;
    totalPages: number;
    isLoading: boolean;
    isPageLoading: boolean;
    currentArgs: ProductListOptionArgs;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductListReducer: ProductListStore;
    }
}

export interface ProductListDispatcherData {
    products: ProductsQueryOutput;
}
