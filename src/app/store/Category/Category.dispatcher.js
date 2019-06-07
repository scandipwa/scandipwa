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
import { CategoryQuery, ProductListQuery } from 'Query';
import {
    updateCategoryProductList, updateCategoryList, appendCategoryProductList, updateLoadStatus, updateCurrentCategory
} from 'Store/Category';
import { updateNoMatch } from 'Store/NoMatch';

/**
 * Product List Dispatcher
 * @class CategoryDispatcher
 * @extends QueryDispatcher
 */
export class CategoryDispatcher extends QueryDispatcher {
    constructor() {
        super('ProductList', 86400);
    }

    onSuccess(data, dispatch, options) {
        const {
            category,
            products: {
                items,
                total_count,
                sort_fields,
                filters
            }
        } = data;

        const { categoryUrlPath, categoryIds } = options;

        if (category
            && !this._isCategoryExists(category, categoryUrlPath, categoryIds)) return dispatch(updateNoMatch(true));

        if (category) { // If category details are updated, reset all data
            dispatch(updateCategoryProductList(items, total_count, sort_fields, filters));
            dispatch(updateCategoryList(category));
            dispatch(updateCurrentCategory(categoryUrlPath, categoryIds));
        } else if (filters || sort_fields) {
            dispatch(updateCategoryProductList(items, total_count, sort_fields, filters));
        } else {
            dispatch(appendCategoryProductList(items, total_count));
        }

        dispatch(updateLoadStatus(false));
    }

    onError(error, dispatch) {
        console.error(error);
        dispatch(updateNoMatch(true));
    }

    /**
     * Prepare ProductList query
     * @param  {{search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @param {Function} dispatch
     * @return {Query} ProductList query
     * @memberof CategoryDispatcher
     */
    prepareRequest(options, dispatch) {
        const {
            currentPage, previousPage, pageSize, productsLoaded, isCategoryLoaded, categoryUrlPath, categoryIds
        } = options;
        const query = [];

        if (!isCategoryLoaded) {
            query.push(CategoryQuery.getQuery(options));
        } else {
            dispatch(updateCurrentCategory(categoryUrlPath, categoryIds));
        }

        if (currentPage > 1) {
            if (previousPage === currentPage) {
                dispatch(updateLoadStatus(true));
            }

            if (productsLoaded && productsLoaded / pageSize === currentPage - 1) { // We are loading next page of products!
                options.isNextPage = true;
                return ProductListQuery.getQuery(options); // Product should only be requested
            }

            options.pageSize = pageSize * currentPage; // load all products before current page
            options.currentPage = 1; // set page to one, because a bigger list is loading
            // Both will be requested
        } else if (this._areCustomFiltersPresent(options) || this._isOneOfSortFiltersPresent(options)) {
            dispatch(updateLoadStatus(true));
            query.push(ProductListQuery.getQuery(options));
            return query;
        }

        query.push(ProductListQuery.getQuery(options));

        // TODO: default pagesize should be taken from some global config
        // this fixes paginated loading while working as expected when changing categories
        if (options.pageSize < 13) {
            dispatch(updateLoadStatus(true));
        }

        return query;
    }

    /**
     * Check if custom filters exists
     * @param {{Object}} customFilters Loading indication boolean
     * @return {Boolean}
     */
    _areCustomFiltersPresent({ customFilters }) {
        return Object.keys(customFilters).length;
    }

    /**
     * Check if custom filters exists
     * @param {{Object}} customFilters Loading indication boolean
     * @return {Boolean}
     */
    _isOneOfSortFiltersPresent({ sortKey, sortDirection }) {
        return !!sortKey || !!sortDirection;
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
