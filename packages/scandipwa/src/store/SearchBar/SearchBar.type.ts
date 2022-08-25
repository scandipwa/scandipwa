/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */
import { AnyAction } from 'redux';

import { ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum SearchBarActionType {
    UPDATE_SEARCH_BAR = 'UPDATE_SEARCH_BAR',
    UPDATE_SEARCH_LOAD_STATUS = 'UPDATE_SEARCH_LOAD_STATUS',
    CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
}

export interface UpdateSearchBarAction extends AnyAction {
    type: SearchBarActionType.UPDATE_SEARCH_BAR;
    result: SearchBarDispatcherData;
}

export interface UpdateLoadStatusAction extends AnyAction {
    type: SearchBarActionType.UPDATE_SEARCH_LOAD_STATUS;
    isLoading: boolean;
}

export interface ClearSearchResultsAction extends AnyAction {
    type: SearchBarActionType.CLEAR_SEARCH_RESULTS;
}

export type SearchBarAction = UpdateSearchBarAction
| UpdateLoadStatusAction
| ClearSearchResultsAction;

export interface SearchBarStore {
    productsInSearch: IndexedProduct[];
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        SearchBarReducer: SearchBarStore;
    }
}

export interface SearchBarDispatcherData {
    products: ProductsQueryOutput;
}
