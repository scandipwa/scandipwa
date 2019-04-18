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

import {
    UPDATE_SEARCH_BAR,
    UPDATE_SEARCH_LOAD_STATUS,
    CLEAR_SEARCH_RESULTS
} from './SearchBar.action';

const initialState = {
    productsInSearch: [],
    isLoading: false
};

const SearchBarReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_SEARCH_BAR:
        const { result: { products: { items } } } = action;

        return {
            ...state,
            productsInSearch: items
        };

    case UPDATE_SEARCH_LOAD_STATUS:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    case CLEAR_SEARCH_RESULTS:
        return {
            ...state,
            productsInSearch: initialState.productsInSearch
        };

    default:
        return state;
    }
};

export default SearchBarReducer;
