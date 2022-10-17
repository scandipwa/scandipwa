/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Reducer } from 'redux';

import { getIndexedProducts } from 'Util/Product';

import { SearchBarAction, SearchBarActionType, SearchBarStore } from './SearchBar.type';

/** @namespace Store/SearchBar/Reducer/getInitialState */
export const getInitialState = (): SearchBarStore => ({
    productsInSearch: [],
    isLoading: true,
});

/** @namespace Store/SearchBar/Reducer/SearchBarReducer */
export const SearchBarReducer: Reducer<
SearchBarStore,
SearchBarAction
> = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case SearchBarActionType.UPDATE_SEARCH_BAR:
        const { result: { products: { items: initialItems } } } = action;

        return {
            ...state,
            productsInSearch: getIndexedProducts(initialItems),
        };

    case SearchBarActionType.UPDATE_SEARCH_LOAD_STATUS:
        const { isLoading } = action;

        return {
            ...state,
            isLoading,
        };

    case SearchBarActionType.CLEAR_SEARCH_RESULTS:
        return {
            ...state,
            productsInSearch: getInitialState().productsInSearch,
        };

    default:
        return state;
    }
};

export default SearchBarReducer;
