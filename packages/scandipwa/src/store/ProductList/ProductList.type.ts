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

import {
    AggregationOption,
    ProductAttributeFilterOptions,
    ProductListOptionArgs,
    ProductsQueryOutput,
    SortFields,
} from 'Query/ProductList.type';
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
    minPrice: number;
    maxPrice: number;
    sortFields: Partial<SortFields>;
    filters: Record<string, ProductListFilter>;
    selectedFilter: Partial<ProductAttributeFilterOptions>;
}

export interface ProductListFilter {
    attribute_id: number;
    attribute_code: string;
    attribute_label: string;
    attribute_position: number;
    attribute_values: string[];
    attribute_type: string;
    attribute_options: Record<string, AggregationOption>;
    is_boolean: boolean;
    has_swatch: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductListReducer: ProductListStore;
    }
}

export interface ProductListDispatcherData {
    products: ProductsQueryOutput;
}
