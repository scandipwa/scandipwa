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

import { ProductListOptionArgs, ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum ProductListActionType {
    UPDATE_PRODUCT_LIST_STORE = 'UPDATE_PRODUCT_LIST_STORE',
}

export interface UpdateProductListStoreAction extends AnyAction {
    type: ProductListActionType.UPDATE_PRODUCT_LIST_STORE;
    state: Partial<ProductListStore>;
}

export interface ProductListStore {
    pages: Record<number, IndexedProduct[]>;
    totalItems: number;
    totalPages: number;
    isLoading: boolean;
    isPageLoading: boolean;
    currentArgs: ProductListOptionArgs;
    searchCriteria: string;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductListReducer: ProductListStore;
    }
}

export interface ProductListDispatcherData {
    products: ProductsQueryOutput;
}
