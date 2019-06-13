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
import CategoriesList from 'Component/CategoriesList';
import ProductSort from 'Component/ProductSort';
import TextPlaceholder from 'Component/TextPlaceholder';
import CategoryShoppingOptions from 'Component/CategoryShoppingOptions';
import Meta from 'Component/Meta';
import {
    getUrlParam, getQueryParam, setQueryParams, clearQueriesFromUrl
} from 'Util/Url';
import { CategoryTreeType } from 'Type/Category';
import { ItemsType } from 'Type/ProductList';
import './CategoryPage.style';

class CategoryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'name',
            sortDirection: 'ASC',
            defaultPriceRange: { min: 0, max: 300 },
            minPriceRange: 0,
            maxPriceRange: 300,
            previousPage: 0,
            pageSize: 12
        };
    }

    componentDidMount() {
        const { updateBreadcrumbs, isOnlyPlaceholder, updateLoadStatus } = this.props;

        if (!isOnlyPlaceholder) {
            if (this.isNewCategory()) updateBreadcrumbs({});
            else this.updateBreadcrumbs();

            this.requestCategory();
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
        if (this.urlHasChanged(location, prevProps) || categoryIds !== prevCategoryIds) this.requestCategory();
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
     * Check if url was changed
     * @return {Boolean}
     */
    urlHasChanged(location, prevProps) {
        const pathnameHasChanged = location.pathname !== prevProps.location.pathname;
        const searchQueryHasChanged = location.search !== prevProps.location.search;

        return pathnameHasChanged || searchQueryHasChanged;
    }

    /**
     * Prepare and dispatch category request
     * @return {void}
     */
    requestCategory() {
        const {
            requestCategory,
            location,
            isSearchPage,
            items,
            category,
            categoryIds
        } = this.props;
        const {
            sortKey,
            sortDirection,
            previousPage,
            pageSize,
            search
        } = this.state;
        const categoryUrlPath = !categoryIds ? this.getCategoryUrlPath() : null;
        const currentPage = getQueryParam('page', location) || 1;
        const priceRange = this.getPriceRangeFromUrl();
        const customFilters = this.getCustomFiltersFromUrl();
        const querySortKey = getQueryParam('sortKey', location);
        const querySortDirection = getQueryParam('sortDirection', location);
        const options = {
            search: search || getQueryParam('search', location),
            isSearchPage: isSearchPage || false,
            categoryUrlPath,
            currentPage,
            previousPage,
            pageSize,
            priceRange,
            customFilters,
            categoryIds,
            sortKey: querySortKey || sortKey,
            sortDirection: querySortDirection || sortDirection,
            productsLoaded: items.length,
            // TODO: adding configurable data request (as in PDP) to query, should make a seperate/more specific query
            getConfigurableData: true,
            isCategoryLoaded: (!!Object.entries(category).length)
        };

        const stateUpdate = {
            previousPage: currentPage
        };

        if (querySortKey) {
            stateUpdate.sortKey = querySortKey;
        }

        if (querySortDirection) {
            stateUpdate.sortDirection = querySortDirection;
        }

        this.setState(stateUpdate);

        requestCategory(options);
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

        this.setState({ search: value });
        setQueryParams({
            search: value,
            page: ''
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
     * @return {void}
     */
    increasePage() {
        const {
            location,
            history,
            isLoading,
            totalItems
        } = this.props;
        const { pageSize } = this.state;
        const pageFromUrl = getQueryParam('page', location) || 1;
        const totalPages = Math.floor(totalItems / pageSize);
        const currentPage = totalPages < pageFromUrl ? totalPages : pageFromUrl;

        if (!isLoading) {
            setQueryParams({ page: parseInt(currentPage, 10) + 1 }, location, history);
        }
    }

    /**
     * Clear all filters
     * @return {void}
     */
    clearFilters(location, history) {
        const { sortKey, sortDirection } = this.state;
        const page = getQueryParam('page', location) || 1;
        const search = getQueryParam('search', location) || '';
        clearQueriesFromUrl(history);
        setQueryParams(
            {
                sortKey,
                sortDirection,
                search,
                page
            }, location, history
        );
    }

    renderItemCount() {
        const { items, totalItems, isLoading } = this.props;

        return (
            <p block="CategoryPage" elem="ItemsCount">
                {isLoading
                    ? <TextPlaceholder length="short" />
                    : (
                        <>
                            <span>{ items.length }</span>
                            { __(' / %s items showing', totalItems) }
                        </>
                    )
                }
            </p>
        );
    }

    render() {
        const {
            category,
            categoryList,
            items,
            totalItems,
            sortFields,
            filters,
            location,
            match,
            history,
            isLoading,
            isSearchPage
        } = this.props;

        const {
            sortKey,
            sortDirection,
            minPriceRange,
            maxPriceRange,
            search
        } = this.state;

        const { options } = sortFields;

        const updatedSortFields = options && Object.values(options).map(option => ({
            id: option.value,
            label: option.label
        }));

        const customFilters = this.getCustomFiltersFromUrl();

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
                              searchValue={ search || getQueryParam('search', location) || '' }
                              updateSearch={ value => this.updateSearch(value) }
                              customFiltersValues={ customFilters }
                              updatePriceRange={ priceRange => this.updatePriceRange(priceRange) }
                              updateFilter={ (filterName, filterArray) => this.updateFilter(filterName, filterArray) }
                              clearFilters={ () => this.clearFilters(location, history) }
                              sortKey={ sortKey }
                              sortDirection={ sortDirection }
                              location={ location }
                              history={ history }
                            />
                        <CategoriesList
                          availableFilters={ filters }
                          category={ categoryList }
                          currentCategory={ category }
                          location={ location }
                          match={ match }
                        />
                    </aside>
                    <CategoryDetails
                      category={ category }
                    />
                    <aside block="CategoryPage" elem="Miscellaneous">
                        { this.renderItemCount() }
                        <ProductSort
                          onGetKey={ key => this.onGetKey(key) }
                          onGetSortDirection={ direction => this.onGetSortDirection(direction) }
                          sortFields={ !isLoading && updatedSortFields }
                          value={ sortKey }
                          sortDirection={ sortDirection }
                        />
                    </aside>
                    <CategoryProductList
                      items={ items }
                      customFilters={ customFilters }
                      totalItems={ totalItems }
                      increasePage={ () => this.increasePage() }
                      isLoading={ isLoading }
                    />
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
    categoryList: CategoryTreeType.isRequired,
    items: ItemsType.isRequired,
    totalItems: PropTypes.number.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired,
    requestCategory: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape).isRequired,
    sortFields: PropTypes.shape({
        options: PropTypes.array
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
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
