/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';

export interface CategorySortContainerProps {
    sortFields: CategorySortField[];
    isMatchingInfoFilter: boolean;
    onSortChange: (sortDirection: SortDirections, sortKey: string[]) => void;
    sortKey: string;
    sortDirection: SortDirections;
}

export interface CategorySortComponentProps {
    isMatchingInfoFilter: boolean;
    onSortChange: (sortDirection: SortDirections, sortKey: string[]) => void;
    sortDirection: SortDirections;
    sortKey: string;
    selectOptions: CategorySortOption[];
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
