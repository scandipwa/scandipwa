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

import history from 'Util/History';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';
import { getQueryParam } from 'Util/Url';

import { getFilter } from './Filters';
import { getSelectedSortFromUrl } from './Sort';

/** @namespace Util/Category/getIsMatchingInfoFilter */
export const getIsMatchingInfoFilter = (): boolean => {
    if (isSearchPage()) {
        const { currentArgs: { search: currentSearch } } = (getStore().getState() as RootState).ProductListReducer;

        // if the search requested is equal to search from URL
        return getSearchQuery() === currentSearch;
    }

    const {
        ProductListInfoReducer: {
            selectedFilter: {
                categoryIds: selectedCategoryIds,
            },
        },
        CategoryReducer: {
            categoryIds,
        },
    } = getStore().getState() as RootState;

    // Requested category is equal to current category
    return categoryIds === selectedCategoryIds;
};

/** @namespace Util/Category/getIsMatchingListFilter */
export const getIsMatchingListFilter = (): boolean => {
    const {
        currentArgs: {
            currentPage,
            sort,
            filter,
            search: currentSearch,
        } = {},
    } = (getStore().getState() as RootState).ProductListReducer;
    const { location } = history;

    /**
     * ? implementation bellow blinks, implementation with categoryIds check only does not show loading when selecting filters.
     * TODO: resolve it to be a combination of these two behaviour
     */

    // Data used to request category matches current data
    const isMatchingListFilter = JSON.stringify(filter) === JSON.stringify(getFilter())
    && JSON.stringify(sort) === JSON.stringify(getSelectedSortFromUrl())
    && currentPage === +(getQueryParam('page', location) || 1);

    if (!isSearchPage()) {
        return isMatchingListFilter;
    }

    // Data used to request category matches current data
    return isMatchingListFilter && currentSearch === getSearchQuery();
};

/** @namespace Util/Category/isSearchPage */
export const isSearchPage = (): boolean => {
    const { location: { pathname } } = history;

    return pathname.includes('/search/');
};

/** @namespace Util/Category/getSearchQuery */
export const getSearchQuery = (): string => {
    const { location: { pathname } } = history;

    const pathnameArray = pathname.split('/');
    const searchQuery = pathnameArray[(pathnameArray.indexOf('search')) + 1];

    return searchQuery;
};
