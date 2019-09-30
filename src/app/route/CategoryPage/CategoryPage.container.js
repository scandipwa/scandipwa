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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { CategoryDispatcher } from 'Store/Category';
import { toggleOverlayByKey } from 'Store/Overlay';
import { changeHeaderState } from 'Store/Header';
import { CategoryTreeType } from 'Type/Category';
import { CATEGORY } from 'Component/Header';
import { HistoryType, LocationType, MatchType } from 'Type/Common';

import {
    ProductListInfoDispatcher,
    updateInfoLoadStatus
} from 'Store/ProductListInfo';

import {
    getUrlParam,
    getQueryParam,
    setQueryParams,
    clearQueriesFromUrl,
    convertQueryStringToKeyValuePairs
} from 'Util/Url';


import CategoryPage from './CategoryPage.component';

export const mapStateToProps = state => ({
    category: state.CategoryReducer.category,
    filters: state.ProductListInfoReducer.filters,
    sortFields: state.ProductListInfoReducer.sortFields,
    minPriceRange: state.ProductListInfoReducer.minPrice,
    maxPriceRange: state.ProductListInfoReducer.maxPrice,
    isInfoLoading: state.ProductListInfoReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    toggleOverlayByKey: key => dispatch(toggleOverlayByKey(key)),
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    requestCategory: options => CategoryDispatcher.handleData(dispatch, options),
    updateBreadcrumbs: breadcrumbs => ((Object.keys(breadcrumbs).length)
        ? BreadcrumbsDispatcher.updateWithCategory(breadcrumbs, dispatch)
        : BreadcrumbsDispatcher.update([], dispatch)),
    requestProductListInfo: options => ProductListInfoDispatcher.handleData(dispatch, options),
    updateLoadStatus: isLoading => dispatch(updateInfoLoadStatus(isLoading))
});

export class CategoryPageContainer extends PureComponent {
    static propTypes = {
        history: HistoryType.isRequired,
        category: CategoryTreeType.isRequired,
        minPriceRange: PropTypes.number.isRequired,
        maxPriceRange: PropTypes.number.isRequired,
        location: LocationType.isRequired,
        match: MatchType.isRequired,
        requestCategory: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        requestProductListInfo: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        updateLoadStatus: PropTypes.func.isRequired,
        filters: PropTypes.objectOf(PropTypes.shape).isRequired,
        sortFields: PropTypes.shape({
            options: PropTypes.array
        }).isRequired,
        isInfoLoading: PropTypes.bool.isRequired,
        categoryIds: PropTypes.number,
        isOnlyPlaceholder: PropTypes.bool,
        isSearchPage: PropTypes.bool
    };

    static defaultProps = {
        categoryIds: 0,
        isOnlyPlaceholder: false,
        isSearchPage: false
    };

    config = {
        defaultPriceRange: { min: 0, max: 300 },
        sortKey: 'name',
        sortDirection: 'ASC'
    };

    containerFunctions = {
        onSortChange: this.onSortChange.bind(this),
        getIsNewCategory: this.getIsNewCategory.bind(this),
        updateFilter: this.updateFilter.bind(this),
        getFilterUrl: this.getFilterUrl.bind(this),
        updatePriceRange: this.updatePriceRange.bind(this)
    };

    componentDidMount() {
        const { updateBreadcrumbs, isOnlyPlaceholder, updateLoadStatus } = this.props;

        if (isOnlyPlaceholder) updateLoadStatus(true);

        // request data only if URL does not match loaded category
        if (this.getIsNewCategory()) {
            this._requestCategoryWithPageList();
            updateBreadcrumbs({});
        } else {
            this._onCategoryUpdate();
        }
    }

    componentDidUpdate(prevProps) {
        const { category: { id }, categoryIds, location } = this.props;
        const { category: { id: prevId }, categoryIds: prevCategoryIds } = prevProps;

        // update breadcrumbs only if category has changed
        if (id !== prevId) this._onCategoryUpdate();

        // ComponentDidUpdate fires multiple times, to prevent getting same data we check that url has changed
        // getIsNewCategory prevents getting Category data, when sort or filter options have changed
        if ((this._urlHasChanged(location, prevProps) && this.getIsNewCategory()) || categoryIds !== prevCategoryIds) {
            this._requestCategoryWithPageList();
        }
    }

    onSortChange(sortDirection, sortKey) {
        const { location, history } = this.props;

        setQueryParams({ sortKey }, location, history);
        setQueryParams({ sortDirection }, location, history);
    }

    getFilterUrl(filterName, filterArray, isFull = true) {
        const { location: { pathname } } = this.props;
        const selectedFilters = this._getNewSelectedFilters(filterName, filterArray);
        return `${isFull ? `${pathname}?` : ''}${this._formatSelectedFiltersString(selectedFilters)}`;
    }

    getIsNewCategory() {
        const { category: { url_path } = {} } = this.props;
        return url_path !== this._getCategoryUrlPath();
    }

    containerProps = () => ({
        filter: this._getFilter(),
        search: this._getSearchParam(),
        selectedSort: this._getSelectedSortFromUrl(),
        selectedFilters: this._getSelectedFiltersFromUrl(),
        selectedPriceRange: this._getPriceRangeForSlider()
    });

    updateSearch(value) {
        const { location, history } = this.props;

        setQueryParams({
            search: value,
            page: ''
        }, location, history);
    }

    updatePriceRange(priceRange) {
        const { location, history } = this.props;

        setQueryParams({
            priceMax: priceRange.max,
            priceMin: priceRange.min,
            page: ''
        }, location, history);
    }

    updateFilter(filterName, filterArray) {
        const { location, history } = this.props;

        setQueryParams({
            customFilters: this.getFilterUrl(filterName, filterArray, false),
            page: ''
        }, location, history);
    }

    _getNewSelectedFilters(filterName, filterArray) {
        const prevCustomFilters = this._getSelectedFiltersFromUrl();
        prevCustomFilters[filterName] = filterArray;

        return Object.keys(prevCustomFilters)
            .reduce((accumulator, prevFilterName) => {
                if (prevCustomFilters[prevFilterName].length) {
                    const filterValues = prevCustomFilters[prevFilterName].sort().join(',');

                    accumulator.push(`${prevFilterName}:${filterValues}`);
                }

                return accumulator;
            }, [])
            .sort()
            .join(';');
    }

    _formatSelectedFiltersString(string) {
        const hasTrailingSemicolon = string[string.length - 1] === ';';
        const hasLeadingSemicolon = string[0] === ';';

        if (hasLeadingSemicolon) {
            return this._formatSelectedFiltersString(string.slice(0, -1));
        }

        if (hasTrailingSemicolon) {
            return string.slice(1);
        }

        return string;
    }

    _getSearchParam() {
        const search = getQueryParam('search', location);
        return search ? decodeURIComponent(search) : '';
    }

    _getSelectedPriceRangeFromUrl() {
        const { location } = this.props;
        const min = +getQueryParam('priceMin', location);
        const max = +getQueryParam('priceMax', location);
        return { min, max };
    }

    _getPriceRangeForSlider() {
        const { minPriceRange, maxPriceRange } = this.props;
        const { defaultPriceRange: { min: defaultMin, max: defaultMax } } = this.config;
        const { min, max } = this._getSelectedPriceRangeFromUrl();
        return { min: min || minPriceRange || defaultMin, max: max || maxPriceRange || defaultMax };
    }

    _getSelectedFiltersFromUrl() {
        const { location } = this.props;
        const selectedFiltersString = (getQueryParam('customFilters', location) || '').split(';');
        return selectedFiltersString.reduce((acc, filter) => {
            if (!filter) return acc;
            const [key, value] = filter.split(':');
            return { ...acc, [key]: value.split(',') };
        }, {});
    }

    _getSelectedSortFromUrl() {
        const { location } = this.props;
        const { sortKey: defaultSortKey, sortDirection: defaultSortDirection } = this.config;
        const sortDirection = getQueryParam('sortDirection', location) || defaultSortDirection;
        const sortKey = getQueryParam('sortKey', location) || defaultSortKey;
        return { sortDirection, sortKey };
    }

    _getCategoryUrlPath() {
        const { location, match } = this.props;
        const path = getUrlParam(match, location);
        return path.indexOf('search') === 0 ? null : path;
    }

    _getFilter() {
        const { categoryIds } = this.props;
        const categoryUrlPath = !categoryIds ? this._getCategoryUrlPath() : null;
        const customFilters = this._getSelectedFiltersFromUrl();
        const priceRange = this._getSelectedPriceRangeFromUrl();

        return {
            priceRange,
            categoryIds,
            customFilters,
            categoryUrlPath
        };
    }

    _getProductListOptions(currentPage) {
        const { categoryIds } = this.props;
        const categoryUrlPath = !categoryIds ? this._getCategoryUrlPath() : null;

        return {
            args: {
                filter: {
                    categoryUrlPath,
                    categoryIds
                }
            },
            currentPage
        };
    }

    _onCategoryUpdate() {
        this._updateBreadcrumbs();
        this._updateHeaderState();
    }

    _updateBreadcrumbs() {
        const { category = {}, updateBreadcrumbs } = this.props;
        updateBreadcrumbs(category);
    }

    _updateHeaderState() {
        const { changeHeaderState, category: { name }, history } = this.props;

        changeHeaderState({
            name: CATEGORY,
            title: name,
            onBackClick: () => history.push('/')
        });
    }

    _requestCategoryProductsInfo() {
        const { requestProductListInfo } = this.props;
        requestProductListInfo(this._getProductListOptions(1, false, true));
    }

    _requestCategory() {
        const { categoryIds, isSearchPage, requestCategory } = this.props;
        const categoryUrlPath = !categoryIds ? this._getCategoryUrlPath() : null;

        requestCategory({
            categoryUrlPath,
            isSearchPage,
            categoryIds
        });
    }

    _requestCategoryWithPageList() {
        this._requestCategory();
        this._requestCategoryProductsInfo();
    }

    _compareQueriesWithFilter(search, prevSearch, filter) {
        const currentParams = filter(convertQueryStringToKeyValuePairs(search));
        const previousParams = filter(convertQueryStringToKeyValuePairs(prevSearch));
        return JSON.stringify(currentParams) === JSON.stringify(previousParams);
    }

    _compareQueriesWithoutPage(search, prevSearch) {
        return this._compareQueriesWithFilter(
            search, prevSearch, ({ page, ...filteredParams }) => filteredParams
        );
    }

    _urlHasChanged(location, prevProps) {
        const { pathname, search } = location;
        const { location: { pathname: prevPathname, search: prevSearch } } = prevProps;
        const pathnameHasChanged = pathname !== prevPathname;
        const searchQueryHasChanged = !this._compareQueriesWithoutPage(search, prevSearch);

        return pathnameHasChanged || searchQueryHasChanged;
    }

    _clearFilters() {
        const { location, history } = this.props;
        const { sortKey: defaultSortKey, sortDirection: defaultSortDirection } = this.config;

        const sortDirection = getQueryParam('sortDirection', location) || defaultSortDirection;
        const sortKey = getQueryParam('sortKey', location) || defaultSortKey;
        const page = getQueryParam('page', location) || 1;

        clearQueriesFromUrl(history);
        setQueryParams({ sortKey, sortDirection, page }, location, history);
    }

    render() {
        const { pageSize } = this.config;

        return (
            <CategoryPage
              { ...this.props }
              pageSize={ pageSize }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer);
