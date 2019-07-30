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
import {
    updateCategoryList, updateCurrentCategory
} from 'Store/Category';
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

    onSuccess(data, dispatch, options) {
        const { category } = data;

        const {
            categoryUrlPath, isSearchPage, categoryIds
        } = {
            ...options,
            ...{ categoryUrlPath: (options.isSearchPage ? 'all-products' : options.categoryUrlPath) }
        };
        if (category && !category.url_path && isSearchPage) category.url_path = 'all-products';

        if (category
            && !this._isCategoryExists(category, categoryUrlPath, categoryIds)
            && !isSearchPage) dispatch(updateNoMatch(true));

        dispatch(updateCategoryList(category));
        dispatch(updateCurrentCategory(categoryUrlPath, categoryIds, isSearchPage));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Category!', error));
        dispatch(updateNoMatch(true));
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

    /**
     * Check if category exists in master category
     * @param {Object} masterCategory
     * @param {String} categoryUrlPath current category url path
     * @return {Boolean}
     */
    _isCategoryExists(masterCategory, categoryUrlPath, categoryIds) {
        const flattendCategories = [];

        const flattenCategory = (category) => {
            const { children } = category;

            if (children) {
                children.forEach((element) => {
                    const { id, url_path } = element;
                    flattenCategory(element);
                    flattendCategories.push(categoryUrlPath ? url_path : id);
                });
            }
        };

        flattenCategory(masterCategory);

        return flattendCategories.includes(categoryUrlPath || parseInt(categoryIds, 10));
    }
}

export default new CategoryDispatcher();
