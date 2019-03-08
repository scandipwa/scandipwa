/* eslint-disable no-param-reassign */

import { RequestDispatcher } from 'Util/Request';
import { CategoryQuery, ProductListQuery } from 'Query';
import {
    updateCategoryProductList, updateCategoryDetails, appendCategoryProductList, updateLoadStatus
} from 'Store/Category';
import { updateNoMatch } from 'Store/NoMatch';

/**
 * Product List Dispatcher
 * @class CategoryDispatcher
 * @extends RequestDispatcher
 */
class CategoryDispatcher extends RequestDispatcher {
    constructor() {
        super('ProductList', 86400);
    }

    onSuccess(data, dispatch) {
        const {
            category,
            products: {
                items,
                total_count,
                sort_fields,
                filters
            }
        } = data;

        if (category) { // If category details are updated, reset all data
            dispatch(updateCategoryProductList(items, total_count, sort_fields, filters));
            dispatch(updateCategoryDetails(category));
        } else if (filters || sort_fields) {
            dispatch(updateCategoryProductList(items, total_count, sort_fields, filters));
        } else {
            dispatch(appendCategoryProductList(items, total_count));
        }

        dispatch(updateLoadStatus(false));
    }

    onError(error, dispatch) {
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
            currentPage, previousPage, pageSize, productsLoaded
        } = options;

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

            return [
                ProductListQuery.getQuery(options),
                CategoryQuery.getQuery(options)
            ];
        }

        // TODO: default pagesize should be taken from some global config
        // this fixes paginated loading while working as expected when changing categories
        if (options.pageSize < 13) {
            dispatch(updateLoadStatus(true));
        }

        return [
            ProductListQuery.getQuery(options),
            CategoryQuery.getQuery(options)
        ];
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
}

export default new CategoryDispatcher();
