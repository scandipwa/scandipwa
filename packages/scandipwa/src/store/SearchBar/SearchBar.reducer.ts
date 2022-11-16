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

import { SearchBarStore } from './SearchBar.type';

/** @namespace Store/SearchBar/Reducer/getInitialState */
export const getInitialState = (): SearchBarStore => ({
    productsInSearch: [],
    isLoading: true,
});

/** @namespace Store/SearchBar/Reducer/SearchBarReducer */
export const SearchBarReducer: Reducer<
SearchBarStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState } = action;

    return {
        ...state,
        ...newState,
    };
};

export default SearchBarReducer;
