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
    ClearSearchResults,
    SearchBarActionType,
    SearchBarResult,
    UpdateLoadStatus,
    UpdateSearchBar
} from './SearchBar.type';

/** @namespace Store/SearchBar/Action/updateSearchBar */
export const updateSearchBar = (result: SearchBarResult): UpdateSearchBar => ({
    type: SearchBarActionType.UPDATE_SEARCH_BAR,
    result
});

/** @namespace Store/SearchBar/Action/updateLoadStatus */
export const updateLoadStatus = (status: boolean): UpdateLoadStatus => ({
    type: SearchBarActionType.UPDATE_SEARCH_LOAD_STATUS,
    isLoading: status
});

/** @namespace Store/SearchBar/Action/clearSearchResults */
export const clearSearchResults = (): ClearSearchResults => ({
    type: SearchBarActionType.CLEAR_SEARCH_RESULTS
});
