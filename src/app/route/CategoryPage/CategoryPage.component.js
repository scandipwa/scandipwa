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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryProductList from 'Component/CategoryProductList';
import ContentWrapper from 'Component/ContentWrapper';
import CategoryDetails from 'Component/CategoryDetails';
import CategoryPagination from 'Component/CategoryPagination';
import CategoriesList from 'Component/CategoriesList';
import ProductSort from 'Component/ProductSort';
import TextPlaceholder from 'Component/TextPlaceholder';
import CategoryShoppingOptions from 'Component/CategoryShoppingOptions';
import Meta from 'Component/Meta';
import {
    getUrlParam, getQueryParam, setQueryParams, clearQueriesFromUrl, convertQueryStringToKeyValuePairs
} from 'Util/Url';
import { CategoryTreeType } from 'Type/Category';
import { PagesType } from 'Type/ProductList';
import './CategoryPage.style';

class CategoryPage extends Component {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
        this.requestPage = this.requestPage.bind(this);
        this.requestNextPage = this.requestNextPage.bind(this);

        this.state = {
            sortKey: 'name',
            sortDirection: 'ASC',
            defaultPriceRange: { min: 0, max: 300 },
            pageSize: 12
        };
    }

    componentDidMount() {
        const { updateBreadcrumbs, isOnlyPlaceholder, updateLoadStatus } = this.props;

        if (!isOnlyPlaceholder) {
            if (this.isNewCategory()) updateBreadcrumbs({});
            else this.updateBreadcrumbs();

            this.requestCategoryWithPageList();
        } else {
            updateLoadStatus(true);
        }
    }

    componentDidUpdate(prevProps) {
        const { location, category: { id }, categoryIds } = this.props;
        const { category: { id: prevId }, categoryIds: prevCategoryIds } = prevProps;

        // update breadcrumbs only if category has changed
        if (id !== prevId) this.updateBreadcrumbs();

        // update category only if route or search query has been changed
        if (this.urlHasChanged(location, prevProps) || categoryIds !== prevCategoryIds) {
            this.requestCategoryWithPageList(this.shouldChangePrdoductListInfo(location, prevProps));
        }
    }

    /**
     * Set request query parameters on sort by change
     * @param {String} key sort by key
     * @return {void}
     */
    onGetKey(key) {
        const { location, history } = this.props;

        setQueryParams({ sortKey: key }, location, history);
    }

    /**
     * Set request query parameters on sort direction change
     * @param {String} direction sort directions
     * @return {void}
     */
    onGetSortDirection(direction) {
        const { location, history } = this.props;
        const { sortKey } = this.state;

        setQueryParams({ sortKey }, location, history);
        setQueryParams({ sortDirection: direction }, location, history);
    }

    /**
     * Get Total Page Count and Current Page Number
     * @return {{totalPages: Number, currentPage: Number, productsLoaded: Number}}
     */
    getPageParams() {
        const { totalItems, pages } = this.props;
        const { pageSize } = this.state;
        const pageFromUrl = getQueryParam('page', location) || 1;

        const totalPages = Math.ceil(totalItems / pageSize);
        const currentPage = parseInt(totalPages < pageFromUrl ? totalPages : pageFromUrl, 10);
        const productsLoaded = Object.values(pages).reduce((accumulator, page) => accumulator + page.length, 0);

        return { totalPages, currentPage, productsLoaded };
    }

    /**
     * Get price max and min from browser url
     * @return {{min: Number, max: Number}} values selected in price filter
     */
    getPriceRangeFromUrl() {
        const { location } = this.props;
        const { defaultPriceRange: { min, max } } = this.state;

        const priceMinFromUrl = getQueryParam('priceMin', location);
        const priceMaxFromUrl = getQueryParam('priceMax', location);

        return {
            min: priceMinFromUrl ? parseInt(priceMinFromUrl, 10) : min,
            max: priceMaxFromUrl ? parseInt(priceMaxFromUrl, 10) : max
        };
    }

    /**
     * Get specific filter from url
     * @param {String} filterName Name of the filter
     * @return {Boolean}
     */
    getFilterFromUrl(filterName) {
        return this.getCustomFiltersFromUrl()[filterName] || [];
    }

    /**
     * Get custom fitler parametrs from browser url
     * @return {Object} object of custom filter parametrs
     */
    getCustomFiltersFromUrl() {
        const { location } = this.props;
        const customFilters = {};
        const customFiltersString = getQueryParam('customFilters', location);

        if (customFiltersString) {
            customFiltersString.split(';').forEach((filter) => {
                const [key, value] = filter.split(':');
                customFilters[key] = value.split(',');
            });
        }

        return customFilters;
    }

    /**
     * Get current category path
     * @return {String} path to current category
     */
    getCategoryUrlPath() {
        const { location, match } = this.props;
        const path = getUrlParam(match, location);
        return path.indexOf('search') === 0 ? null : path;
    }

    /**
     * Get search parameter for request
     * @return {String} search request parameter
     */
    getSearchParam() {
        const search = getQueryParam('search', location);
        return search ? decodeURIComponent(search) : '';
    }

    /**
     * Check if url was changed
     * @return {Boolean}
     */
    urlHasChanged(location, prevProps) {
        const pathnameHasChanged = location.pathname !== prevProps.location.pathname;
        const searchQueryHasChanged = !this.compareQueriesWithoutPage(location.search, prevProps.location.search);

        return pathnameHasChanged || searchQueryHasChanged;
    }

    /**
     * Compares queries with specified filter passed in callback
     * @returns {Boolean}
     */
    compareQueriesWithFilter(currentQuery, previousQuery, callback) {
        const currentParams = callback(convertQueryStringToKeyValuePairs(currentQuery));
        const previousParams = callback(convertQueryStringToKeyValuePairs(previousQuery));

        return JSON.stringify(currentParams) === JSON.stringify(previousParams);
    }

    /**
     * Compares queries ignoring page number
     * @return {Boolean}
     */
    compareQueriesWithoutPage(currentQuery, previousQuery) {
        const removePage = (params) => {
            const { page, ...filteredParams } = params;
            return filteredParams;
        };

        return this.compareQueriesWithFilter(currentQuery, previousQuery, removePage);
    }

    /**
     * Compares queries ignoring sortKey and sortDirection
     * @return {Boolean}
     */
    compareQueriesWithoutSort(currentQuery, previousQuery) {
        const removeSortKeyAndDirection = (params) => {
            const { sortKey, sortDirection, ...filteredParams } = params;

            return filteredParams;
        };

        return this.compareQueriesWithFilter(currentQuery, previousQuery, removeSortKeyAndDirection);
    }

    /**
     * Prepare and dispatch Category, ProductList and ProductListInfo requests
     * @param {Boolean} shouldRequestProductListInfo
     * @return {void}
     */
    requestCategoryWithPageList(shouldRequestProductListInfo = true) {
        const currentPage = getQueryParam('page', location) || 1;

        this.requestCategory();

        // Requests only Product List info and then Product List without info
        if (shouldRequestProductListInfo) this.requestCategoryProductsInfo();
        this.requestPage(currentPage);
    }

    /**
     * Prepare and dispatch category request
     * @return {void}
     */
    requestCategory() {
        const { categoryIds, isSearchPage, requestCategory } = this.props;
        const categoryUrlPath = !categoryIds ? this.getCategoryUrlPath() : null;

        requestCategory({
            categoryUrlPath,
            isSearchPage: isSearchPage || false,
            categoryIds
        });
    }

    /**
     * Check if Category url path changed
     * @return {Boolean}
     */
    isNewCategory() {
        const { category } = this.props;
        return category.url_path !== this.getCategoryUrlPath();
    }

    /**
     * Dispatch breadcrumbs update
     * @return {void}
     */
    updateBreadcrumbs() {
        const { category, updateBreadcrumbs } = this.props;
        const shouldUpdate = Object.keys(category).length;
        if (shouldUpdate) updateBreadcrumbs(category);
    }

    /**
     * Update Query search parameter
     * @return {void}
     */
    updateSearch(value) {
        const { location, history } = this.props;

        setQueryParams({
            search: value,
            page: ''
        }, location, history);
    }

    /**
     * Sets page number in address bar
     * @param {Number} pageNumber
     */
    updatePage(pageNumber) {
        const { location, history } = this.props;

        setQueryParams({
            page: pageNumber === 1 ? '' : pageNumber
        }, location, history);
    }

    /**
     * Update Query parameters for price range
     * @return {void}
     */
    updatePriceRange(priceRange) {
        const { location, history } = this.props;

        setQueryParams({
            priceMax: priceRange.max,
            priceMin: priceRange.min,
            page: ''
        }, location, history);
    }

    /**
     * Update Query parameters for custom filters
     * @return {void}
     */
    updateFilter(filterName, filterArray) {
        const { location, history } = this.props;
        const prevCustomFilters = this.getCustomFiltersFromUrl();

        prevCustomFilters[filterName] = filterArray;

        const customFiltersString = Object.keys(prevCustomFilters)
            .reduce((accumulator, prevFilterName) => {
                if (prevCustomFilters[prevFilterName].length) {
                    const filterValues = prevCustomFilters[prevFilterName].sort().join(',');

                    accumulator.push(`${prevFilterName}:${filterValues}`);
                }

                return accumulator;
            }, [])
            .sort()
            .join(';');

        let customFilters;

        const hasTrailingSemicolon = customFiltersString[customFiltersString.length - 1] === ';';
        const hasLeadingSemicolon = customFiltersString[0] === ';';

        customFilters = hasTrailingSemicolon ? customFiltersString.slice(0, -1) : customFiltersString;
        customFilters = hasLeadingSemicolon ? customFilters.slice(1) : customFilters;

        setQueryParams({
            customFilters,
            page: ''
        }, location, history);
    }

    /**
     * Increase page number, cannot exceed calculated page amount.
     * @param {Number} pageNumber
     * @param {Boolean} isNext
     * @return {void}
     */
    requestPage(pageNumber, isNext = false) {
        const { requestProductList } = this.props;

        const currentPage = pageNumber || 1;
        const options = this._getProductListOptions(currentPage, isNext);

        requestProductList(options);
    }

    requestNextPage(pageNumber) {
        this.requestPage(pageNumber, true);
    }

    requestCategoryProductsInfo() {
        const { requestProductListInfo } = this.props;

        const options = this._getProductListOptions(1, false);
        requestProductListInfo(options);
    }

    shouldChangePrdoductListInfo(location, prevProps) {
        return this.isNewCategory() || !this.compareQueriesWithoutSort(location.search, prevProps.location.search);
    }

    _getProductListOptions(currentPage, isNext) {
        const {
            location,
            categoryIds
        } = this.props;

        const {
            sortKey,
            pageSize,
            sortDirection
        } = this.state;

        const categoryUrlPath = !categoryIds ? this.getCategoryUrlPath() : null;
        const customFilters = this.getCustomFiltersFromUrl();
        const priceRange = this.getPriceRangeFromUrl();
        const querySortDirection = getQueryParam('sortDirection', location);
        const querySortKey = getQueryParam('sortKey', location);
        const search = this.getSearchParam();

        const options = {
            categoryIds,
            categoryUrlPath,
            currentPage,
            customFilters,
            // TODO: adding configurable data request (as in PDP) to query, should make a seperate/more specific query
            getConfigurableData: true,
            isNext,
            pageSize,
            priceRange,
            search,
            sortDirection: querySortDirection || sortDirection,
            sortKey: querySortKey || sortKey
        };

        this.setState({
            sortKey: querySortKey || sortKey,
            sortDirection: querySortDirection || sortDirection
        });

        return options;
    }

    /**
     * Clear all filters
     * @return {void}
     */
    clearFilters(location, history) {
        const { sortKey, sortDirection } = this.state;
        const page = getQueryParam('page', location) || 1;

        clearQueriesFromUrl(history);
        setQueryParams(
            {
                sortKey,
                sortDirection,
                page
            }, location, history
        );
    }

    renderItemCount() {
        const { totalItems, isInfoLoading, isPagesLoading } = this.props;
        const { productsLoaded } = this.getPageParams();

        return (
            <p block="CategoryPage" elem="ItemsCount">
                { isInfoLoading
                    ? <TextPlaceholder length="short" />
                    : (
                        <>
                            <span>{ !isPagesLoading ? productsLoaded : 0 }</span>
                            { __(' / %s items showing', totalItems) }
                        </>
                    )
                }
            </p>
        );
    }

    renderCategoryDetails() {
        const { category } = this.props;
        return <CategoryDetails category={ category } />;
    }

    render() {
        const {
            category,
            pages,
            minPriceRange,
            maxPriceRange,
            sortFields,
            filters,
            location,
            match,
            history,
            isPagesLoading,
            isInfoLoading,
            isSearchPage
        } = this.props;

        const {
            sortKey,
            sortDirection
        } = this.state;

        const isLoading = isPagesLoading || isInfoLoading;
        const { options = {} } = sortFields;
        const updatedSortFields = Object.values(options).map(({ value: id, label }) => ({ id, label }));
        const customFilters = this.getCustomFiltersFromUrl();
        const search = getQueryParam('search', location) || '';
        const { totalPages, currentPage } = this.getPageParams();

        return (
            <main block="CategoryPage">
                <ContentWrapper
                  wrapperMix={ { block: 'CategoryPage', elem: 'Wrapper' } }
                  label={ __('Category page') }
                >
                    <Meta metaObject={ category } />
                    <aside block="CategoryPage" elem="Options">
                        <CategoryShoppingOptions
                          availableFilters={ filters }
                          minPriceValue={ minPriceRange }
                          maxPriceValue={ maxPriceRange }
                          priceValue={ this.getPriceRangeFromUrl() }
                          showSearch={ !isSearchPage }
                          searchValue={ search }
                          customFiltersValues={ customFilters }
                          updatePriceRange={ priceRange => this.updatePriceRange(priceRange) }
                          updateFilter={ (filterName, filterArray) => this.updateFilter(filterName, filterArray) }
                          updateSearch={ value => this.updateSearch(value) }
                          clearFilters={ () => this.clearFilters(location, history) }
                          sortKey={ sortKey }
                          sortDirection={ sortDirection }
                          location={ location }
                          history={ history }
                        />
                        <CategoriesList
                          availableFilters={ filters }
                          currentCategory={ category }
                          location={ location }
                          match={ match }
                        />
                    </aside>
                    { this.renderCategoryDetails() }
                    <aside block="CategoryPage" elem="Miscellaneous">
                        { this.renderItemCount() }
                        <ProductSort
                          onGetKey={ key => this.onGetKey(key) }
                          onGetSortDirection={ direction => this.onGetSortDirection(direction) }
                          sortFields={ !isInfoLoading && updatedSortFields }
                          value={ sortKey }
                          sortDirection={ sortDirection }
                        />
                    </aside>
                    <CategoryProductList
                      pages={ pages }
                      isLoading={ isLoading }
                      totalPages={ totalPages }
                      customFilters={ customFilters }
                      loadPage={ this.requestNextPage }
                      updatePage={ this.updatePage }
                    />
                    { !isInfoLoading && (
                        <CategoryPagination
                          history={ history }
                          location={ location }
                          category={ category }
                          totalPages={ totalPages }
                          currentPage={ currentPage }
                          ariaLabel={ __('Catalog navigation') }
                          getPage={ this.requestPage }
                        />
                    ) }
                </ContentWrapper>
            </main>
        );
    }
}

CategoryPage.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    category: CategoryTreeType.isRequired,
    pages: PagesType.isRequired,
    totalItems: PropTypes.number.isRequired,
    minPriceRange: PropTypes.number.isRequired,
    maxPriceRange: PropTypes.number.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    requestCategory: PropTypes.func.isRequired,
    requestProductList: PropTypes.func.isRequired,
    requestProductListInfo: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    updateLoadStatus: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape).isRequired,
    sortFields: PropTypes.shape({
        options: PropTypes.array
    }).isRequired,
    isInfoLoading: PropTypes.bool.isRequired,
    isPagesLoading: PropTypes.bool.isRequired,
    categoryIds: PropTypes.number,
    isOnlyPlaceholder: PropTypes.bool,
    isSearchPage: PropTypes.bool
};

CategoryPage.defaultProps = {
    categoryIds: 0,
    isOnlyPlaceholder: false,
    isSearchPage: false
};

export default CategoryPage;
