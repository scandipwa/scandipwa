/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { History, Location } from 'history';
import { match as Match } from 'react-router';

import { Category, CategoryQueryOptions } from 'Query/Category.type';
import {
    ProductAttributeFilterOptions,
    ProductListOptionArgs,
    ProductListOptions,
    SortFields,
} from 'Query/ProductList.type';
import { Category as BreadcrumbCategory } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { CategoryStore } from 'Store/Category/Category.type';
import { Category as MetaCategory } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { OfflineStore } from 'Store/Offline/Offline.type';
import { ProductListFilter } from 'Store/ProductList/ProductList.type';
import { HistoryState } from 'Util/History/History.type';

import {
    CategoryDisplayMode,
    CategoryPageLayout,
    SortDirections,
} from './CategoryPage.config';

export interface CategoryPageContainerMapStateProps {
    category: Partial<Category>;
    isOffline: boolean;
    filters: Record<string, ProductListFilter>;
    sortFields: Partial<SortFields>;
    currentArgs: ProductListOptionArgs;
    selectedInfoFilter: Partial<ProductAttributeFilterOptions>;
    isInfoLoading: boolean;
    totalPages: number;
    totalItems: number;
    plpType: string;
    isMobile: boolean;
    breadcrumbsWereUpdated: boolean;
    currentCategoryIds: number;
    selectedFilters: Record<string, string[]>;
    categoryIds: number;
}

export interface CategoryPageContainerMapDispatchProps {
    toggleOverlayByKey: (key: string) => void;
    changeHeaderState: (state: NavigationState) => void;
    changeNavigationState: (state: NavigationState) => void;
    requestCategory: (options: CategoryQueryOptions) => void;
    updateBreadcrumbs: (breadcrumbs: BreadcrumbCategory) => void;
    requestProductListInfo: (options: Partial<ProductListOptions>) => void;
    updateLoadStatus: (isLoading: boolean) => void;
    updateNoMatch: (options: { noMatch: boolean }) => void;
    updateOfflineStore: (state: Partial<OfflineStore>) => void;
    updateMetaFromCategory: (category: MetaCategory) => void;
    updateCategoryStore: (state: Partial<CategoryStore>) => void;
}

export interface CategoryPageContainerFunctions {
    onGridButtonClick: () => void;
    onListButtonClick: () => void;
    onFilterButtonClick: () => void;
}

export interface CategoryPageContainerBaseProps {
    history: History<HistoryState>;
    location: Location<HistoryState>;
    match: Match;
    isSearchPage: boolean;
    displayMode: CategoryDisplayMode;
}

export type CategoryPageContainerProps = CategoryPageContainerMapStateProps
& CategoryPageContainerMapDispatchProps
& CategoryPageContainerBaseProps;

export interface CategoryPageContainerState {
    currentCategoryIds: number;
    selectedLayoutType?: CategoryPageLayout;
    defaultPlpType?: CategoryPageLayout;
    activeLayoutType?: CategoryPageLayout;
    plpTypes: CategoryPageLayout[];
}

export interface CategoryPageComponentProps extends CategoryPageContainerFunctions {
    appliedFiltersCount: number;
    category: Partial<Category>;
    defaultPlpType: CategoryPageLayout;
    filter: ProductAttributeFilterOptions;
    search: string;
    filters: Record<string, ProductListFilter>;
    isContentFiltered: boolean;
    isCurrentCategoryLoaded: boolean;
    isMatchingInfoFilter: boolean;
    isMobile: boolean;
    plpTypes: CategoryPageLayout[];
    selectedSort: CategorySortOptions;
    totalPages: number;
    totalItems: number;
    selectedLayoutType?: CategoryPageLayout;
    activeLayoutType?: CategoryPageLayout;
    displayMode: CategoryDisplayMode;
}

export interface CategoryPageComponentState {
    activeLayoutType?: CategoryPageLayout;
}

export type CategoryPageContainerPropsKeys =
    | 'appliedFiltersCount'
    | 'category'
    | 'defaultPlpType'
    | 'filter'
    | 'filters'
    | 'isContentFiltered'
    | 'isCurrentCategoryLoaded'
    | 'isMatchingInfoFilter'
    | 'isMobile'
    | 'plpTypes'
    | 'selectedSort'
    | 'totalPages'
    | 'totalItems'
    | 'selectedLayoutType'
    | 'activeLayoutType'
    | 'displayMode';

export interface CategoryUrlParams {
    customFilters: string;
    priceMin: string;
    priceMax: string;
}

export interface CategorySortOptions {
    sortDirection: SortDirections;
    sortKey: string;
}
