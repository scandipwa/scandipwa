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
import { updateCurrentCategory } from 'Store/Category/Category.action';
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
    // clearQueriesFromUrl,
    // convertQueryStringToKeyValuePairs,
    getQueryParam,
    // getUrlParam,
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
    selectedListFilter: state.ProductListReducer.selectedFilter,
    selectedInfoFilter: state.ProductListInfoReducer.selectedFilter,
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
    ),
    clearCategory: () => dispatch(updateCurrentCategory({}))
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
        selectedListFilter: PropTypes.shape({
            categoryIds: PropTypes.number
        }),
        selectedInfoFilter: PropTypes.shape({
            categoryIds: PropTypes.number
        }),
        isNotRespectInfoLoading: PropTypes.bool,
        isInfoLoading: PropTypes.bool.isRequired,
        isOffline: PropTypes.bool.isRequired,
        categoryIds: PropTypes.number,
        isSearchPage: PropTypes.bool
    };

    static defaultProps = {
        categoryIds: -1,
        isNotRespectInfoLoading: false,
        isSearchPage: false,
        selectedListFilter: {},
        selectedInfoFilter: {}
    };

    config = {
        sortKey: 'name',
        sortDirection: 'ASC'
    };

    containerFunctions = {
        onSortChange: this.onSortChange.bind(this)
    };

    componentDidMount() {
        const {
            categoryIds,
            category: {
                id
            }
        } = this.props;

        /**
         * Always make sure the navigation show / hide mode (on scroll)
         * is activated when entering the category page
         * */
        this.updateNavigationState();

        /**
         * Make sure to update header state, if the category visited
         * was already loaded.
         */
        if (categoryIds === id) {
            this.updateBreadcrumbs();
            this.updateHeaderState();
        }
    }

    componentDidUpdate(prevProps) {
        // const { isOffline } = this.props;

        // if (isOffline) {
        //     debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        // }

        //     const { is_active, isLoading } = category;

        //     if (!isLoading && !is_active) {
        //         updateNoMatch({ noMatch: true });
        //     } else {
        //         updateMetaFromCategory(category);
        //         this._updateBreadcrumbs();
        //     }

        const {
            categoryIds,
            category: {
                id
            }
        } = this.props;

        const {
            categoryIds: prevCategoryIds,
            category: {
                id: prevId
            }
        } = prevProps;

        /**
         * If the URL rewrite has been changed, make sure the category ID
         * will persist in the history state.
         */
        if (categoryIds !== prevCategoryIds) {
            this.updateHistory();
        }

        /**
         * If the currently loaded category ID does not match the ID of
         * category ID from URL rewrite, request category.
         */
        if (categoryIds !== id) {
            this.requestCategory();
        }

        /**
         * If category ID was changed => it is loaded => we need to
         * update category specific information, i.e. breadcrumbs
         */
        if (id !== prevId) {
            this.updateBreadcrumbs();
            this.updateHeaderState();
        }
    }

    onSortChange(sortDirection, sortKey) {
        const { location, history } = this.props;

        setQueryParams({ sortKey }, location, history);
        setQueryParams({ sortDirection }, location, history);
    }

    // setOfflineNoticeSize = () => {
    //     const { setBigOfflineNotice } = this.props;
    //     const isInfoLoading = this.getIsInfoLoading();

    //     if (isInfoLoading) {
    //         setBigOfflineNotice(true);
    //     } else {
    //         setBigOfflineNotice(false);
    //     }
    // };

    getIsMatchingListFilter() {
        const {
            categoryIds,
            selectedListFilter: {
                categoryIds: selectedCategoryIds
            }
        } = this.props;

        // Requested category is equal to current category
        return categoryIds === selectedCategoryIds;
    }

    getIsMatchingInfoFilter() {
        const {
            categoryIds,
            selectedInfoFilter: {
                categoryIds: selectedCategoryIds
            }
        } = this.props;

        // Requested category is equal to current category
        return categoryIds === selectedCategoryIds;
    }

    containerProps = () => ({
        filter: this.getFilter(),
        isMatchingListFilter: this.getIsMatchingListFilter(),
        isMatchingInfoFilter: this.getIsMatchingInfoFilter(),
        search: this.getSearchParam(),
        selectedSort: this.getSelectedSortFromUrl(),
        selectedFilters: this.getSelectedFiltersFromUrl(),
        isContentFiltered: this.isContentFiltered()
    });

    isContentFiltered() {
        const {
            customFilters,
            priceMin,
            priceMax
        } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject() {
        const { location: { search } } = this.props;

        return search.substr(1).split('&').reduce((acc, part) => {
            const [key, value] = part.split('=');
            return { ...acc, [key]: value };
        }, {});
    }

    getSearchParam() {
        const search = getQueryParam('search', location);
        return search ? decodeURIComponent(search) : '';
    }

    getSelectedFiltersFromUrl() {
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

    getSelectedSortFromUrl() {
        const {
            location,
            category: {
                default_sort_by
            }
        } = this.props;

        const {
            sortKey: globalDefaultSortKey,
            sortDirection: defaultSortDirection
        } = this.config;

        /**
         * Default SORT DIRECTION is taken from (sequentially):
         * - URL param "sortDirection"
         * - CategoryPage class property "config"
         * */
        const sortDirection = getQueryParam('sortDirection', location) || defaultSortDirection;

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
            sortKey
        };
    }

    getSelectedPriceRangeFromUrl() {
        const { location } = this.props;
        const min = +getQueryParam('priceMin', location);
        const max = +getQueryParam('priceMax', location);
        return { min, max };
    }

    getFilter() {
        const { categoryIds } = this.props;
        const customFilters = this.getSelectedFiltersFromUrl();
        const priceRange = this.getSelectedPriceRangeFromUrl();

        const filters = {
            priceRange,
            customFilters
        };

        // TODO: rework this, as it breaks update logic
        if (!customFilters.category_id) {
            filters.categoryIds = categoryIds;
        }

        return filters;
    }

    updateHistory() {
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

    updateBreadcrumbs() {
        const { updateBreadcrumbs, category } = this.props;
        updateBreadcrumbs(category);
    }

    updateNavigationState() {
        const { changeNavigationState } = this.props;

        changeNavigationState({
            name: MENU_TAB,
            isVisibleOnScroll: true
        });
    }

    updateHeaderState() {
        const {
            changeHeaderState,
            category: {
                name
            },
            history
        } = this.props;

        const isFromCategory = history?.location?.state;

        const onBackClick = isFromCategory
            ? () => history.goBack()
            : () => history.push('/menu');

        changeHeaderState({
            name: CATEGORY,
            title: name,
            onBackClick
        });
    }

    requestCategory() {
        const {
            categoryIds,
            isSearchPage,
            requestCategory
        } = this.props;

        requestCategory({
            isSearchPage,
            categoryIds
        });
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
