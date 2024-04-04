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
import { RefObject } from 'react';
import { match as Match } from 'react-router';

import { Category, CategoryQueryOptions } from 'Query/Category.type';
import {
    ProductAttributeFilterOptions,
    ProductListOptionArgs,
    ProductListOptions,
    SortFields,
} from 'Query/ProductList.type';
import { Category as BreadcrumbCategory } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { Category as MetaCategory } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';
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
    scrollPosition?: number;
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
    setBigOfflineNotice: (isBig: boolean) => void;
    updateMetaFromCategory: (category: MetaCategory) => void;
    clearCategory: () => void;
    setScrollPosition: (scrollPosition: number) => void;
}

export interface CategoryPageContainerFunctions {
    onSortChange: (sortDirection: SortDirections, sortKey: string[]) => void;
    onGridButtonClick: () => void;
    onListButtonClick: () => void;
    onFilterButtonClick: () => void;
}

export interface CategoryPageContainerBaseProps {
    history: History<HistoryState>;
    location: Location<HistoryState>;
    match: Match;
    categoryIds: number;
    isSearchPage: boolean;
    displayMode: CategoryDisplayMode;
    categoryDefaultSortBy: string;
}

export type CategoryPageContainerProps = CategoryPageContainerMapStateProps
& CategoryPageContainerMapDispatchProps
& CategoryPageContainerBaseProps;

export interface CategoryPageContainerState {
    currentCategoryIds: number;
    breadcrumbsWereUpdated: boolean;
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
    isMatchingListFilter: boolean;
    isMobile: boolean;
    isSearchPage: boolean;
    plpTypes: CategoryPageLayout[];
    selectedFilters: Record<string, string[]>;
    selectedSort: CategorySortOptions;
    sortFields: Partial<SortFields>;
    totalPages: number;
    totalItems: number;
    selectedLayoutType?: CategoryPageLayout;
    activeLayoutType?: CategoryPageLayout;
    displayMode: CategoryDisplayMode;
    mobileBackdrop: RefObject<HTMLDivElement>;
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
    | 'isMatchingListFilter'
    | 'isMobile'
    | 'isSearchPage'
    | 'plpTypes'
    | 'selectedFilters'
    | 'selectedSort'
    | 'sortFields'
    | 'totalPages'
    | 'totalItems'
    | 'selectedLayoutType'
    | 'activeLayoutType'
    | 'displayMode'
    | 'mobileBackdrop';

export interface CategoryUrlParams {
    customFilters: string;
    priceMin: string;
    priceMax: string;
}

export interface CategorySortOptions {
    sortDirection: SortDirections;
    sortKey: string;
}
