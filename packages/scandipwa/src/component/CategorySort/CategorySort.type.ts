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

import { SortFields } from 'Query/ProductList.type';
import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';

export interface CategorySortContainerMapStateProps {
    sortFields: Partial<SortFields>;
}

export interface CategorySortContainerMapDispatchProps {}

export interface CategorySortContainerBaseProps {
    // sortFields: CategorySortField[];
    isMatchingInfoFilter: boolean;
    onSortChange: (sortDirection: SortDirections, sortKey: string[]) => void;
    sortKey: string;
    sortDirection: SortDirections;
    isCurrentCategoryLoaded: boolean;
}

export type CategorySortContainerProps = CategorySortContainerMapStateProps
& CategorySortContainerMapDispatchProps
& CategorySortContainerBaseProps;

export interface CategorySortComponentProps {
    isMatchingInfoFilter: boolean;
    onSortChange: (sortDirection: SortDirections, sortKey: string[]) => void;
    sortDirection: SortDirections;
    sortKey: string;
    selectOptions: CategorySortOption[];
    isCurrentCategoryLoaded: boolean;
}

export interface CategorySortField {
    id: string;
    label: string;
}

export interface CategorySortOptionLabelMap {
    asc: string;
    desc: string;
}

export interface CategorySortOption {
    id: string;
    name: string;
    value: string;
    label: string;
}
