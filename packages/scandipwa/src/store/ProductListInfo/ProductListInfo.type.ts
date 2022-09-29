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
    AggregationOption, ProductAttributeFilterOptions, ProductsQueryOutput, SortFields,
} from 'Query/ProductList.type';

export enum ProductListInfoActionType {
    UPDATE_PRODUCT_LIST_INFO = 'UPDATE_PRODUCT_LIST_INFO',
    UPDATE_INFO_LOAD_STATUS = 'UPDATE_INFO_LOAD_STATUS',
}

export interface UpdateProductListInfoAction extends AnyAction {
    type: ProductListInfoActionType.UPDATE_PRODUCT_LIST_INFO;
    products: ProductsQueryOutput;
    selectedFilter: Partial<ProductAttributeFilterOptions>;
}

export interface UpdateInfoLoadStatusAction extends AnyAction {
    type: ProductListInfoActionType.UPDATE_INFO_LOAD_STATUS;
    isLoading: boolean;
}

export type ProductListInfoAction = UpdateProductListInfoAction | UpdateInfoLoadStatusAction;

export interface ProductListInfoStore {
    minPrice: number;
    maxPrice: number;
    sortFields: Partial<SortFields>;
    filters: Record<string, ProductListFilter>;
    selectedFilter: Partial<ProductAttributeFilterOptions>;
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        ProductListInfoReducer: ProductListInfoStore;
    }
}

export interface ProductListInfoDispatcherData {
    products: ProductsQueryOutput;
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
