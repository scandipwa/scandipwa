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
import { AnyAction } from 'redux';

import { Product } from 'Type/ProductList.type';

export type SearchBarResult = {
    products: {
        items: Product[];
    };
};

export enum SearchBarActionType {
    UPDATE_SEARCH_BAR = 'UPDATE_SEARCH_BAR',
    UPDATE_SEARCH_LOAD_STATUS = 'UPDATE_SEARCH_LOAD_STATUS',
    CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
}

export interface UpdateSearchBar extends AnyAction {
    type: SearchBarActionType.UPDATE_SEARCH_BAR;
    result: SearchBarResult;
}

export interface UpdateLoadStatus extends AnyAction {
    type: SearchBarActionType.UPDATE_SEARCH_LOAD_STATUS;
    isLoading: boolean;
}

export interface ClearSearchResults extends AnyAction {
    type: SearchBarActionType.CLEAR_SEARCH_RESULTS;
}

export type SearchBarAction = UpdateSearchBar
| UpdateLoadStatus
| ClearSearchResults;

// TODO Check util return for indexed products and set correct type
export type SearchBarStore = {
    productsInSearch: unknown[];
    isLoading: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        SearchBarReducer: SearchBarStore;
    }
}
