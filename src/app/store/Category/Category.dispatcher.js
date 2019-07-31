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

/* eslint-disable no-param-reassign */

import { QueryDispatcher } from 'Util/Request';
import { CategoryQuery } from 'Query';
import { updateCurrentCategory } from 'Store/Category';
import { showNotification } from 'Store/Notification';
import { updateNoMatch } from 'Store/NoMatch';

/**
 * Category Dispatcher
 * @class CategoryDispatcher
 * @extends QueryDispatcher
 */
export class CategoryDispatcher extends QueryDispatcher {
    constructor() {
        super('Category', 86400);
    }

    onSuccess(data, dispatch, { isSearchPage }) {
        const { category = {}, category: { id } } = data;
        if (!id && !isSearchPage) dispatch(updateNoMatch(true));
        dispatch(updateCurrentCategory(category));
    }

    onError(error, dispatch, { isSearchPage }) {
        if (!isSearchPage) {
            dispatch(updateNoMatch(true));
            dispatch(showNotification('error', 'Error fetching Category!', error));
        } else {
            dispatch(updateCurrentCategory({ id: 'all-products' }));
        }
    }

    /**
     * Prepare Category query
     * @param  {{search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @param {Function} dispatch
     * @return {Query} Category query
     * @memberof CategoryDispatcher
     */
    prepareRequest(options) {
        return CategoryQuery.getQuery(options);
    }
}

export default new CategoryDispatcher();
