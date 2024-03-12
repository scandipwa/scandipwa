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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { CATEGORY_FILTER_OVERLAY_ID } from 'Component/CategoryFilterOverlay/CategoryFilterOverlay.config';
import { Page } from 'Component/Header/Header.config';
import { NavigationTabsMap } from 'Component/NavigationTabs/NavigationTabs.config';
import {
    FilterPriceRange,
    ProductAttributeFilterOptions,
} from 'Query/ProductList.type';
import BreadcrumbsDispatcher from 'Store/Breadcrumbs/Breadcrumbs.dispatcher';
import { updateCurrentCategory } from 'Store/Category/Category.action';
import CategoryDispatcher from 'Store/Category/Category.dispatcher';
import MetaDispatcher from 'Store/Meta/Meta.dispatcher';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import NoMatchDispatcher from 'Store/NoMatch/NoMatch.dispatcher';
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { updateInfoLoadStatus } from 'Store/ProductListInfo/ProductListInfo.action';
import ProductListInfoDispatcher from 'Store/ProductListInfo/ProductListInfo.dispatcher';
import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getFiltersCount } from 'Util/Category';
import history from 'Util/History';
import { debounce } from 'Util/Request/Debounce';
import { waitForPriorityLoad } from 'Util/Request/LowPriorityLoad';
import { RootState } from 'Util/Store/Store.type';
import {
    appendWithStoreCode,
    getQueryParam,
    setQueryParams,
} from 'Util/Url';

import CategoryPage from './CategoryPage.component';
import {
    CategoryDisplayMode,
    CategoryPageLayout,
    LAYOUT_KEY,
    LOADING_TIME,
    SortDirections,
} from './CategoryPage.config';
import {
    CategoryPageComponentProps,
    CategoryPageContainerFunctions,
    CategoryPageContainerMapDispatchProps,
    CategoryPageContainerMapStateProps,
    CategoryPageContainerProps,
    CategoryPageContainerPropsKeys,
    CategoryPageContainerState,
    CategorySortOptions,
    CategoryUrlParams,
} from './CategoryPage.type';

/** @namespace Route/CategoryPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CategoryPageContainerMapStateProps => ({
    category: state.CategoryReducer.category,
    isOffline: state.OfflineReducer.isOffline,
    filters: state.ProductListInfoReducer.filters,
    sortFields: state.ProductListInfoReducer.sortFields,
    currentArgs: state.ProductListReducer.currentArgs,
    selectedInfoFilter: state.ProductListInfoReducer.selectedFilter,
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages,
    totalItems: state.ProductListReducer.totalItems,
    plpType: state.ConfigReducer.plp_list_mode,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Route/CategoryPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CategoryPageContainerMapDispatchProps => ({
    toggleOverlayByKey: (key) => dispatch(toggleOverlayByKey(key)),
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
    changeNavigationState: (state) => dispatch(changeNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE, state)),
    requestCategory: (options) => CategoryDispatcher.handleData(dispatch, options),
    updateBreadcrumbs: (breadcrumbs) => ((Object.keys(breadcrumbs).length)
        ? BreadcrumbsDispatcher.updateWithCategory(breadcrumbs, dispatch)
        : BreadcrumbsDispatcher.update([], dispatch)
    ),
    requestProductListInfo: (options) => ProductListInfoDispatcher.handleData(dispatch, options),
    updateLoadStatus: (isLoading) => dispatch(updateInfoLoadStatus(isLoading)),
    updateNoMatch: (options) => NoMatchDispatcher.updateNoMatch(dispatch, options),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig)),
    updateMetaFromCategory: (category) => MetaDispatcher.updateWithCategory(category, dispatch),
    clearCategory: () => dispatch(updateCurrentCategory({})),
});

/** @namespace Route/CategoryPage/Container */
export class CategoryPageContainer<
P extends CategoryPageContainerProps = CategoryPageContainerProps,
S extends CategoryPageContainerState = CategoryPageContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CategoryPageContainerProps> = {
        categoryIds: -1,
        isSearchPage: false,
        currentArgs: {},
        selectedInfoFilter: {},
        plpType: '',
        displayMode: CategoryDisplayMode.PRODUCTS,
    };

    config = {
        sortKey: 'name',
        sortDirection: SortDirections.ASC,
    };

    containerFunctions: CategoryPageContainerFunctions = {
        onSortChange: this.onSortChange.bind(this),
        onGridButtonClick: this.onGridButtonClick.bind(this),
        onListButtonClick: this.onListButtonClick.bind(this),
        onFilterButtonClick: this.onFilterButtonClick.bind(this),
    };

    __construct(props: P): void {
        super.__construct?.(props);

        this.state = {
            currentCategoryIds: -1,
            breadcrumbsWereUpdated: false,
            selectedLayoutType: undefined,
            defaultPlpType: undefined,
            activeLayoutType: undefined,
            plpTypes: [] as CategoryPageLayout[],
        } as S;

        this.setOfflineNoticeSize = this.setOfflineNoticeSize.bind(this);
    }

    static getDerivedStateFromProps(
        props: CategoryPageContainerProps,
        state: CategoryPageContainerState,
    ): Partial<CategoryPageContainerState> | null {
        const {
            currentCategoryIds,
            defaultPlpType,
            plpTypes,
        } = state;

        const {
            category: { id },
            plpType,
        } = props;

        const update = {};

        /**
         * Determine default plpType and the other ones
         */
        if (!defaultPlpType || !plpTypes) {
            if (plpType.match('-')) {
                const plpTypes = plpType.split('-');

                Object.assign(update, { defaultPlpType: plpTypes[0], plpTypes });
            } else {
                Object.assign(update, { defaultPlpType: plpType, plpTypes: [plpType] });
            }
        }

        /**
         * If the category we expect to load is loaded - reset it
         */
        if (currentCategoryIds === id) {
            Object.assign(update, { currentCategoryIds: -1 });
        }

        if (!Object.keys(update).length) {
            return null;
        }

        return update;
    }

    componentDidMount(): void {
        const {
            categoryIds,
            category: {
                id,
            },
        } = this.props;

        scrollToTop();

        /**
         * Always make sure the navigation show / hide mode (on scroll)
         * is activated when entering the category page.
         * */
        this.updateNavigationState();

        /**
         * Always update the history, ensure the history contains category
         */
        this.updateHistory();

        /**
         * Make sure to update header state, if the category visited
         * was already loaded.
         */
        if (categoryIds === id) {
            this.updateBreadcrumbs();
            this.updateHeaderState();
            this.updateMeta();
        } else {
            /**
             * Still update header and breadcrumbs, but ignore
             * the category data, as it is outdated
             */
            this.updateHeaderState(true);
            this.updateBreadcrumbs(true);
        }
    }

    componentDidUpdate(prevProps: CategoryPageContainerProps): void {
        const {
            isOffline,
            categoryIds,
            category: {
                id,
            },
            currentArgs: {
                filter,
                currentPage,
            } = {},
        } = this.props;

        const {
            breadcrumbsWereUpdated,
        } = this.state;

        const {
            categoryIds: prevCategoryIds,
            category: {
                id: prevId,
            },
            currentArgs: {
                filter: prevFilter,
                currentPage: prevPage,
            } = {},
        } = prevProps;

        // TODO: category scrolls up when coming from PDP

        if (isOffline) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        /**
         * If the URL rewrite has been changed, make sure the category ID
         * will persist in the history state.
         */
        if (categoryIds !== prevCategoryIds) {
            this.updateHistory();
        }

        /**
         * If the currently loaded category ID does not match the ID of
         * category from URL rewrite, request category.
         */
        if (categoryIds !== id) {
            waitForPriorityLoad().then(
            /** @namespace Route/CategoryPage/Container/CategoryPageContainer/componentDidUpdate/waitForPriorityLoad/then */
                () => this.requestCategory(),
            );
        }

        /**
         * If category ID was changed => it is loaded => we need to
         * update category specific information, i.e. breadcrumbs.
         *
         * Or if the breadcrumbs were not yet updated after category request,
         * and the category ID expected to load was loaded, update data.
         */
        const categoryChange = id !== prevId
            || (!breadcrumbsWereUpdated && id === categoryIds)
            || currentPage !== prevPage;

        if (categoryChange) {
            this.checkIsActive();
            this.updateMeta();
            this.updateBreadcrumbs();
            this.updateHeaderState();
        }

        /*
        ** if category wasn't changed we still need to update meta for correct robots meta tag [#928](https://github.com/scandipwa/scandipwa-theme/issues/928)
        */
        if (!categoryChange
            && filter?.customFilters
            && prevFilter?.customFilters
            && Object.keys(filter.customFilters).length !== Object.keys(prevFilter.customFilters).length
        ) {
            this.updateMeta();
        }
    }

    onGridButtonClick(): void {
        BrowserDatabase.setItem(CategoryPageLayout.GRID, LAYOUT_KEY);
        this.setState({ selectedLayoutType: CategoryPageLayout.GRID });
    }

    onListButtonClick(): void {
        BrowserDatabase.setItem(CategoryPageLayout.LIST, LAYOUT_KEY);
        this.setState({ selectedLayoutType: CategoryPageLayout.LIST });
    }

    onSortChange(sortDirection: SortDirections, sortKey: string[]): void {
        const { location } = history;

        setQueryParams({ sortKey: sortKey.join(','), sortDirection, page: '' }, location, history);
        this.updateMeta();
    }

    onFilterButtonClick(): void {
        const { toggleOverlayByKey } = this.props;

        toggleOverlayByKey(CATEGORY_FILTER_OVERLAY_ID);
    }

    setOfflineNoticeSize(): void {
        const { setBigOfflineNotice, isInfoLoading } = this.props;

        if (isInfoLoading) {
            setBigOfflineNotice(true);
        } else {
            setBigOfflineNotice(false);
        }
    }

    getIsMatchingListFilter(): boolean {
        const {
            currentArgs: {
                currentPage,
                sort,
                filter,
            } = {},
        } = this.props;
        const { location } = history;

        /**
         * ? implementation bellow blinks, implementation with categoryIds check only does not show loading when selecting filters.
         * TODO: resolve it to be a combination of these two behaviour
         */

        // Data used to request category matches current data
        return JSON.stringify(filter) === JSON.stringify(this.getFilter())
            && JSON.stringify(sort) === JSON.stringify(this.getSelectedSortFromUrl())
            && currentPage === +(getQueryParam('page', location) || 1);
    }

    getIsMatchingInfoFilter(): boolean {
        const {
            categoryIds,
            selectedInfoFilter: {
                // TODO
                categoryIds: selectedCategoryIds = window.actionName?.id,
            },
        } = this.props;

        // Requested category is equal to current category
        return categoryIds === selectedCategoryIds;
    }

    getAppliedFiltersCount(): number {
        const {
            selectedInfoFilter: { customFilters = {} },
        } = this.props;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return getFiltersCount(customFilters as Record<string, any[]>);
    }

    isCurrentCategoryLoaded(): boolean {
        const {
            categoryIds,
            category: {
                id,
            },
            isSearchPage,
        } = this.props;

        return isSearchPage || categoryIds === id;
    }

    containerProps(): Pick<CategoryPageComponentProps, CategoryPageContainerPropsKeys> {
        const {
            category,
            filters,
            isMobile,
            sortFields,
            totalPages,
            totalItems,
            isSearchPage,
            displayMode,
        } = this.props;

        const {
            selectedLayoutType,
            activeLayoutType,
        } = this.state;

        return {
            appliedFiltersCount: this.getAppliedFiltersCount(),
            category,
            defaultPlpType: this.getDefaultPlpType(),
            filter: this.getFilter(),
            filters,
            isContentFiltered: this.isContentFiltered(),
            isCurrentCategoryLoaded: this.isCurrentCategoryLoaded(),
            isMatchingInfoFilter: this.getIsMatchingInfoFilter(),
            isMatchingListFilter: this.getIsMatchingListFilter(),
            isMobile,
            isSearchPage,
            plpTypes: this.getPlpTypes(),
            selectedFilters: this.getSelectedFiltersFromUrl(),
            selectedSort: this.getSelectedSortFromUrl(),
            sortFields,
            totalPages,
            totalItems,
            selectedLayoutType,
            activeLayoutType,
            displayMode,
        };
    }

    isContentFiltered(): boolean {
        const {
            customFilters,
            priceMin,
            priceMax,
        } = this.urlStringToObject();

        return !!(customFilters || priceMin || priceMax);
    }

    urlStringToObject(): Partial<CategoryUrlParams> {
        const { location: { search } } = history;

        return search.substr(1).split('&').reduce((acc: Partial<CategoryUrlParams>, part) => {
            const [key, value] = part.split('=');

            return { ...acc, [key]: value };
        }, {});
    }

    getSelectedFiltersFromUrl(): Record<string, string[]> {
        const { location } = history;
        const selectedFiltersString = (getQueryParam('customFilters', location, false) || '').split(';');

        return selectedFiltersString.reduce((acc, filter) => {
            if (!filter) {
                return acc;
            }
            const [key, value] = filter.split(':');

            return { ...acc, [ key ]: value.split(',') };
        }, {});
    }

    getSelectedSortFromUrl(): CategorySortOptions {
        const {
            sortFields: {
                options = [],
            },
            categoryDefaultSortBy,
            isSearchPage,
        } = this.props;
        const { location } = history;

        const {
            sortKey: classDefaultSortKey,
            sortDirection: defaultSortDirection,
        } = this.config;

        /**
         * Default SORT DIRECTION is taken from (sequentially):
         * - URL param "sortDirection"
         * - CategoryPage class property "config"
         */
        const sortDirection: SortDirections = (getQueryParam('sortDirection', location) as SortDirections)
            || defaultSortDirection;

        /**
         * Default SORT KEY is taken from (sequentially):
         * - URL param "sortKey"
         * - Category default sort key (Magento 2 configuration)
         * - Product Listing Sort By (Magento 2 configuration)
         * - CategoryPage class property "config"
         * (used when global default sort key does not exist for current category)
         */
        const isClassSortKeyAvailable = !!options.find(
            (sortOption) => sortOption.value === classDefaultSortKey,
        );

        const fallbackSortKey = isClassSortKeyAvailable ? classDefaultSortKey : options[0]?.value;
        const defaultSortKey = isSearchPage ? fallbackSortKey : window.storeConfig?.catalog_default_sort_by || fallbackSortKey;
        const configSortKey = categoryDefaultSortBy || defaultSortKey;
        const sortKey = getQueryParam('sortKey', location) || configSortKey;

        return {
            sortDirection,
            sortKey,
        };
    }

    getSelectedPriceRangeFromUrl(): FilterPriceRange {
        const { location } = history;
        const min = +getQueryParam('priceMin', location);
        const max = +getQueryParam('priceMax', location);

        return { min, max };
    }

    getDefaultPlpType(): CategoryPageLayout {
        const {
            defaultPlpType = CategoryPageLayout.GRID,
        } = this.state;

        return defaultPlpType;
    }

    getPlpTypes(): CategoryPageLayout[] {
        const { plpTypes } = this.state;

        return plpTypes;
    }

    getFilter(): ProductAttributeFilterOptions {
        const { categoryIds } = this.props;
        const customFilters = this.getSelectedFiltersFromUrl();
        const priceRange = this.getSelectedPriceRangeFromUrl();

        if (categoryIds === -1) {
            return {
                priceRange,
                customFilters,
            };
        }

        return {
            priceRange,
            customFilters,
            categoryIds,
        };
    }

    updateHistory(): void {
        const {
            categoryIds,
        } = this.props;

        const {
            location: {
                search,
                pathname,
                state = {},
            },
        } = history;

        const { category } = state;

        /**
         * Prevent pushing non-existent category into the state
         */
        if (categoryIds === -1) {
            return;
        }

        if (category !== categoryIds) {
            history.replace({
                pathname,
                search,
                state: {
                    ...state,
                    category: categoryIds,
                },
            });
        }
    }

    checkIsActive(): void {
        const {
            category: { is_active },
            updateNoMatch,
        } = this.props;

        if (!is_active) {
            updateNoMatch({ noMatch: true });
        }
    }

    getCanonicalWithPageNumber(canonical_url?: string) {
        if (!canonical_url) {
            return null;
        }

        const pageNumber = getQueryParam('page', history?.location);

        if (pageNumber) {
            return canonical_url.concat(`?page=${pageNumber}`);
        }

        return canonical_url;
    }

    updateMeta(): void {
        const {
            updateMetaFromCategory,
            category,
            category: {
                canonical_url,
            } = {},
        } = this.props;

        const meta_robots = history.location.search
            ? ''
            : 'follow, index';

        updateMetaFromCategory({
            ...category,
            meta_robots,
            canonical_url: this.getCanonicalWithPageNumber(canonical_url),
        });
    }

    updateBreadcrumbs(isUnmatchedCategory = false): void {
        const { updateBreadcrumbs, category } = this.props;
        const {
            id = 0,
            url = '',
            name = '',
            breadcrumbs = [],
            is_active = false,
        } = isUnmatchedCategory ? {} : category;

        updateBreadcrumbs({
            id: Number(id),
            url,
            name,
            breadcrumbs,
            is_active,
        });

        this.setState({ breadcrumbsWereUpdated: true });
    }

    updateNavigationState(): void {
        const { changeNavigationState } = this.props;

        changeNavigationState({ name: NavigationTabsMap.MENU_TAB });
    }

    updateHeaderState(isUnmatchedCategory = false): void {
        const {
            changeHeaderState,
            category: {
                name,
            },
        } = this.props;

        const { category } = history?.location?.state || {};

        const onBackClick = category
            ? () => history.goBack()
            : () => history.push(appendWithStoreCode('/menu'));

        /**
         * Ensure the name is not set if the category IDs do not
         * match. Otherwise, the previous value is displayed.
         */
        const title = isUnmatchedCategory ? undefined : name;

        changeHeaderState({
            name: Page.CATEGORY,
            title,
            onBackClick,
        });
    }

    requestCategory(): void {
        const {
            categoryIds,
            isSearchPage,
            requestCategory,
        } = this.props;

        const {
            currentCategoryIds,
        } = this.state;

        /**
         * Prevent non-existent category from being requested
         */
        if (categoryIds === -1) {
            return;
        }

        /**
         * Do not request a category again! We are still waiting for
         * a requested category to load!
         */
        if (categoryIds === currentCategoryIds) {
            return;
        }

        /**
         * Update current category to track if it is loaded or not - useful,
         * to prevent category from requesting itself multiple times.
         */
        this.setState({
            currentCategoryIds: categoryIds,
            breadcrumbsWereUpdated: false,
        });

        requestCategory({
            isSearchPage,
            categoryIds,
        });
    }

    render(): ReactElement {
        return (
            <CategoryPage
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    CategoryPageContainer,
);
