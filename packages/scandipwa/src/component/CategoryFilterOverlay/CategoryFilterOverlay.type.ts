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

import { History, Location } from 'history';

import { NavigationState } from 'Store/Navigation/Navigation.type';
import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';
import { ReactElement } from 'Type/Common.type';

export interface CategoryFilterOverlayContainerMapStateProps {
    isInfoLoading: boolean;
    isProductsLoading: boolean;
    totalPages: number;
    availableFilters: Record<string, ProductListFilter>;
    isCategoryAnchor: boolean;
    customFiltersValues: Record<string, string[]>;
}

export interface CategoryFilterOverlayContainerMapDispatchProps {
    hideActiveOverlay: () => void;
    goToPreviousHeaderState: () => void;
    goToPreviousNavigationState: () => void;
    changeHeaderState: (state: NavigationState) => void;
    changeNavigationState: (state: NavigationState) => void;
}

export interface CategoryFilterOverlayContainerFunctions {
    onSeeResultsClick: () => void;
    onVisible: () => void;
    onHide: () => void;
    toggleCustomFilter: (requestVar: string, value: string | number | boolean) => void;
    getFilterUrl: (filterKey: string, value: string) => string;
}

export interface CategoryFilterOverlayContainerBaseProps {
    history: History;
    renderPlaceholder: (block: string) => ReactElement;
    location: Location;
}

export type CategoryFilterOverlayContainerProps = CategoryFilterOverlayContainerMapStateProps
& CategoryFilterOverlayContainerMapDispatchProps
& CategoryFilterOverlayContainerBaseProps;

export interface CategoryFilterOverlayComponentProps {
    availableFilters: Record<string, ProductListFilter>;
    isCategoryAnchor: boolean;
    isInfoLoading: boolean;
    isProductsLoading: boolean;
    totalPages: number;
    customFiltersValues: Record<string, string[]>;
    areFiltersEmpty: boolean;
    isContentFiltered: boolean;
    onSeeResultsClick: () => void;
    onVisible: () => void;
    onHide: () => void;
    toggleCustomFilter: (requestVar: string, value: string | number | boolean) => void;
    getFilterUrl: (filterKey: string, value: string) => string;
}

export type CategoryFilterComponentContainerPropsKey =
    | 'availableFilters'
    | 'isCategoryAnchor'
    | 'isInfoLoading'
    | 'isProductsLoading'
    | 'totalPages'
    | 'customFiltersValues'
    | 'areFiltersEmpty'
    | 'isContentFiltered';
