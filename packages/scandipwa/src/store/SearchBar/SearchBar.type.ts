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
    UPDATE_SEARCH_BAR_STORE = 'UPDATE_SEARCH_BAR_STORE',
}

export interface UpdateSearchBarStoreAction extends AnyAction {
    type: SearchBarActionType.UPDATE_SEARCH_BAR_STORE;
    state: Partial<SearchBarStore>;
}

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
