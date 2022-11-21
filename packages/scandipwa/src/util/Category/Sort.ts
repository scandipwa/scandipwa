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

import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';
import { CategorySortOptions } from 'Route/CategoryPage/CategoryPage.type';
import history from 'Util/History';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';
import { getQueryParam } from 'Util/Url';

export const config = {
    sortKey: 'name',
    sortDirection: SortDirections.ASC,
};

/** @namespace Util/Category/Sort/getSelectedSortFromUrl */
export const getSelectedSortFromUrl = (): CategorySortOptions => {
    const {
        category: {
            default_sort_by,
        },
    } = (getStore().getState() as RootState).CategoryReducer;
    const { location } = history;

    const {
        sortKey: globalDefaultSortKey,
        sortDirection: defaultSortDirection,
    } = config;

    /**
     * Default SORT DIRECTION is taken from (sequentially):
     * - URL param "sortDirection"
     * - CategoryPage class property "config"
     * */
    const sortDirection: SortDirections = (getQueryParam('sortDirection', location) as SortDirections)
        || defaultSortDirection;

    /**
     * Default SORT KEY is taken from (sequentially):
     * - URL param "sortKey"
     * - Category default sort key (Magento 2 configuration)
     * - CategoryPage class property "config"
     * */
    const defaultSortKey = default_sort_by || globalDefaultSortKey;
    const sortKey = getQueryParam('sortKey', location) || defaultSortKey;

    return {
        sortDirection,
        sortKey,
    };
};
