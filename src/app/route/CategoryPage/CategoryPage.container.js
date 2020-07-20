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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { CATEGORY } from 'Component/Header/Header.config';
import { MENU_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import {
    updateInfoLoadStatus
} from 'Store/ProductListInfo/ProductListInfo.action';
import { CategoryTreeType } from 'Type/Category';
import { HistoryType, LocationType, MatchType } from 'Type/Common';
import { debounce } from 'Util/Request';
import {
    clearQueriesFromUrl,
    convertQueryStringToKeyValuePairs, getQueryParam, getUrlParam,
    setQueryParams
} from 'Util/Url';

import CategoryPage from './CategoryPage.component';

const ProductListInfoDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductListInfo/ProductListInfo.dispatcher'
);

const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
const CategoryDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Category/Category.dispatcher'
);
const MetaDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Meta/Meta.dispatcher'
);
const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

export const mapStateToProps = (state) => ({
    category: state.CategoryReducer.category,
    isOffline: state.OfflineReducer.isOffline,
    filters: state.ProductListInfoReducer.filters,
    sortFields: state.ProductListInfoReducer.sortFields,
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages
});

export const mapDispatchToProps = (dispatch) => ({
    toggleOverlayByKey: (key) => dispatch(toggleOverlayByKey(key)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    changeNavigationState: (state) => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, state)),
    requestCategory: (options) => CategoryDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    ),
    updateBreadcrumbs: (breadcrumbs) => ((Object.keys(breadcrumbs).length)
        ? BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateWithCategory(breadcrumbs, dispatch)
        )
        : BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update([], dispatch)
        )
    ),
    requestProductListInfo: (options) => ProductListInfoDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    ),
    updateLoadStatus: (isLoading) => dispatch(updateInfoLoadStatus(isLoading)),
    updateNoMatch: (options) => NoMatchDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateNoMatch(dispatch, options)
    ),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig)),
    updateMetaFromCategory: (category) => MetaDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWithCategory(category, dispatch)
    )
});

export const UPDATE_FILTERS_FREQUENCY = 0;
export const LOADING_TIME = 500;

export class CategoryPageContainer extends PureComponent {
    static propTypes = {
        history: HistoryType.isRequired,
        category: CategoryTreeType.isRequired,
        location: LocationType.isRequired,
        match: MatchType.isRequired,
        requestCategory: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        changeNavigationState: PropTypes.func.isRequired,
        requestProductListInfo: PropTypes.func.isRequired,
        setBigOfflineNotice: PropTypes.func.isRequired,
        updateMetaFromCategory: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        updateLoadStatus: PropTypes.func.isRequired,
        updateNoMatch: PropTypes.func.isRequired,
        filters: PropTypes.objectOf(PropTypes.shape).isRequired,
        sortFields: PropTypes.shape({
            options: PropTypes.array
        }).isRequired,
        isNotRespectInfoLoading: PropTypes.bool,
        isInfoLoading: PropTypes.bool.isRequired,
        isOffline: PropTypes.bool.isRequired,
        categoryIds: PropTypes.number,
        isOnlyPlaceholder: PropTypes.bool,
        isSearchPage: PropTypes.bool
    };

    static defaultProps = {
        categoryIds: 0,
        isOnlyPlaceholder: false,
        isNotRespectInfoLoading: false,
        isSearchPage: false
    };

    config = {
        sortKey: 'name',
        sortDirection: 'ASC'
    };

    containerFunctions = {
        onSortChange: this.onSortChange.bind(this),
        getIsNewCategory: this.getIsNewCategory.bind(this),
        updateFilter: this.updateFilter.bind(this),
        getFilterUrl: this.getFilterUrl.bind(this)
    };

    componentDidMount() {
        const {
            location: { pathname },
            updateBreadcrumbs,
            isOnlyPlaceholder,
            updateLoadStatus,
            history
        } = this.props;

        if (isOnlyPlaceholder) {
            updateLoadStatus(true);
        }

        if (pathname === '/category' || pathname === '/category/') {
            history.push('/');
            return;
        }

        // request data only if URL does not match loaded category
        if (this.getIsNewCategory()) {
            this._requestCategoryWithPageList();
            updateBreadcrumbs({});
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        } else {
            this._onCategoryUpdate();
        }
    }

    componentDidUpdate(prevProps) {
        const {
            category: {
                id
            },
            isOffline
        } = this.props;

        const {
            category: {
                id: prevId
            }
        } = prevProps;

        if (isOffline) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        // update breadcrumbs only if category has changed
        if (id !== prevId) {
            this._onCategoryUpdate();
        }

        this._updateData(prevProps);
    }

    onSortChange(sortDirection, sortKey) {
        const { location, history } = this.props;

        setQueryParams({ sortKey }, location, history);
        setQueryParams({ sortDirection }, location, history);
    }

    setOfflineNoticeSize = () => {
        const { setBigOfflineNotice } = this.props;
        const isInfoLoading = this.getIsInfoLoading();

        if (isInfoLoading) {
            setBigOfflineNotice(true);
        } else {
            setBigOfflineNotice(false);
        }
    };

    getFilterUrl(filterName, filterArray, isFull = true) {
        const { location: { pathname } } = this.props;
        const selectedFilters = this._getNewSelectedFiltersString(filterName, filterArray);
        const customFilters = isFull ? `${pathname}?customFilters=` : '';
        const formattedFilters = this._formatSelectedFiltersString(selectedFilters);

        return `${ customFilters }${ formattedFilters }`;
    }

    getIsNewCategory() {
        const { category: { url } = {} } = this.props;
        const currentUrl = `/${this._getCategoryUrlPath()}`;
        return url !== currentUrl;
    }

    getIsInfoLoading() {
        const {
            isNotRespectInfoLoading,
            isInfoLoading
        } = this.props;

        if (isNotRespectInfoLoading) {
            return false;
        }

        return isInfoLoading;
    }

    containerProps = () => ({
        filter: this._getFilter(),
        search: this._getSearchParam(),
        selectedSort: this._getSelectedSortFromUrl(),
        selectedFilters: this._getSelectedFiltersFromUrl(),
        isContentFiltered: this.isContentFiltered(),
        isInfoLoading: this.getIsInfoLoading()
    });

    isContentFiltered() {
        const { customFilters, priceMin, priceMax } = this.urlStringToObject();
        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject() {
        const { location: { search } } = this.props;
        return search.substr(1).split('&').reduce((acc, part) => {
            const [key, value] = part.split('=');
            return { ...acc, [key]: value };
        }, {});
    }

    updateSearch(value) {
        const { location, history } = this.props;

        setQueryParams({
            search: value,
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

    _updateData(prevProps) {
        const {
            categoryIds,
            location: {
                search,
                pathname
            }
        } = this.props;

        const {
            categoryIds: prevCategoryIds,
            location: {
                search: prevSearch,
                pathname: prevPathname
            }
        } = prevProps;

        // ComponentDidUpdate fires multiple times, to prevent getting same data we check that url has changed
        // getIsNewCategory prevents getting Category data, when sort or filter options have changed
        if (!categoryIds && this._urlHasChanged(location, prevProps) && this.getIsNewCategory()) {
            this._requestCategoryWithPageList();
            return;
        }

        if (categoryIds !== prevCategoryIds && this.getIsNewCategory()) {
            this._requestCategoryWithPageList();
            return;
        }

        if (
            pathname === prevPathname
            && !this._compareQueriesByFilters(search, prevSearch)
        ) {
            this._requestCategoryProductsInfo();
        }
    }

    _getNewSelectedFiltersString(filterName, filterArray) {
        const prevCustomFilters = this._getSelectedFiltersFromUrl();
        const customFilers = {
            ...prevCustomFilters,
            [filterName]: filterArray
        };

        return Object.entries(customFilers)
            .reduce((accumulator, [filterKey, filterValue]) => {
                if (filterValue.length) {
                    const filterValues = filterValue.sort().join(',');

                    accumulator.push(`${filterKey}:${filterValues}`);
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

    _getSelectedFiltersFromUrl() {
        const { location } = this.props;
        const selectedFiltersString = (getQueryParam('customFilters', location) || '').split(';');

        return selectedFiltersString.reduce((acc, filter) => {
            if (!filter) {
                return acc;
            }
            const [key, value] = filter.split(':');
            return { ...acc, [key]: value.split(',') };
        }, {});
    }

    _getSelectedSortFromUrl() {
        const { location, category: { default_sort_by } } = this.props;
        const { sortKey: globalDefaultSortKey, sortDirection: defaultSortDirection } = this.config;
        const sortDirection = getQueryParam('sortDirection', location) || defaultSortDirection;
        const defaultSortKey = default_sort_by || globalDefaultSortKey;
        const sortKey = getQueryParam('sortKey', location) || defaultSortKey;
        return { sortDirection, sortKey };
    }

    _getCategoryUrlPath() {
        const { location, match } = this.props;
        const path = getUrlParam(match, location);
        return path.indexOf('search') === 0 ? null : path;
    }

    _getSelectedPriceRangeFromUrl() {
        const { location } = this.props;
        const min = +getQueryParam('priceMin', location);
        const max = +getQueryParam('priceMax', location);
        return { min, max };
    }

    _getFilter() {
        const { categoryIds } = this.props;
        const categoryUrlPath = !categoryIds ? this._getCategoryUrlPath() : null;
        const customFilters = this._getSelectedFiltersFromUrl();
        const priceRange = this._getSelectedPriceRangeFromUrl();

        const filters = {
            priceRange,
            categoryIds,
            customFilters,
            categoryUrlPath
        };

        return filters;
    }

    _getProductListOptions(currentPage) {
        const { categoryIds } = this.props;
        const categoryUrlPath = !categoryIds ? this._getCategoryUrlPath() : null;
        const customFilters = this._getSelectedFiltersFromUrl();

        const options = {
            args: {
                filter: {
                    categoryUrlPath,
                    categoryIds,
                    customFilters
                }
            },
            currentPage
        };

        return options;
    }

    _onCategoryUpdate() {
        const {
            category,
            updateNoMatch,
            updateMetaFromCategory
        } = this.props;

        const { is_active, isLoading } = category;

        if (!isLoading && !is_active) {
            updateNoMatch({ noMatch: true });
        } else {
            updateMetaFromCategory(category);
            this._updateBreadcrumbs();
        }

        this._updateHeaderState();
        this._updateNavigationState();
        this._updateHistory();
    }

    _updateHistory() {
        const {
            history,
            location,
            categoryIds
        } = this.props;

        const {
            search,
            pathname,
            state = {}
        } = location;

        const { category } = state;

        if (category !== categoryIds) {
            history.replace({
                pathname,
                search,
                state: {
                    ...state,
                    category: categoryIds
                }
            });
        }
    }

    _updateBreadcrumbs() {
        const {
            category = {},
            updateBreadcrumbs
        } = this.props;

        updateBreadcrumbs(category);
    }

    _updateNavigationState() {
        const { changeNavigationState } = this.props;

        changeNavigationState({
            name: MENU_TAB,
            isVisibleOnScroll: true
        });
    }

    _updateHeaderState() {
        const {
            changeHeaderState,
            category: {
                name
            },
            history
        } = this.props;

        const { location: { state: { isFromCategory } = {} } } = history;

        const onBackClick = isFromCategory
            ? () => history.goBack()
            : () => history.push('/menu');

        changeHeaderState({
            name: CATEGORY,
            title: name,
            onBackClick
        });
    }

    _requestCategoryProductsInfo() {
        const { requestProductListInfo } = this.props;
        requestProductListInfo(this._getProductListOptions(1));
    }

    _requestCategory() {
        const {
            categoryIds,
            isSearchPage,
            requestCategory,
            isOnlyPlaceholder
        } = this.props;

        // do not request category if this is a placeholder
        if (isOnlyPlaceholder) {
            return;
        }

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
            search,
            prevSearch,
            ({ page, ...filteredParams }) => filteredParams
        );
    }

    _compareQueriesByFilters(search, prevSearch) {
        return this._compareQueriesWithFilter(
            search,
            prevSearch,
            ({ customFilters }) => customFilters
        );
    }

    _urlHasChanged(location, prevProps) {
        const {
            pathname,
            search
        } = location;

        const {
            location: {
                pathname: prevPathname,
                search: prevSearch
            }
        } = prevProps;

        const pathnameHasChanged = pathname !== prevPathname;
        const searchQueryHasChanged = !this._compareQueriesWithoutPage(search, prevSearch);

        return pathnameHasChanged || searchQueryHasChanged;
    }

    _clearFilters() {
        const {
            location,
            history
        } = this.props;

        const {
            sortKey: defaultSortKey,
            sortDirection: defaultSortDirection
        } = this.config;

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
