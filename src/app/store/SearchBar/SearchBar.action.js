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

export const UPDATE_SEARCH_BAR = 'UPDATE_SEARCH_BAR';
export const UPDATE_SEARCH_LOAD_STATUS = 'UPDATE_SEARCH_LOAD_STATUS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export const updateSearchBar = (result) => ({
    type: UPDATE_SEARCH_BAR,
    result
});

export const updateLoadStatus = (status) => ({
    type: UPDATE_SEARCH_LOAD_STATUS,
    isLoading: status
});

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});
