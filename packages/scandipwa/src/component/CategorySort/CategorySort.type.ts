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

import { Category } from 'Query/Category.type';
import { SortFields } from 'Query/ProductList.type';
import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';
import { Category as MetaCategory } from 'Store/Meta/Meta.type';

export interface CategorySortContainerMapStateProps {
    sortFields: Partial<SortFields>;
    category: Partial<Category>;
}

export interface CategorySortContainerMapDispatchProps {
    updateMetaFromCategory: (category: MetaCategory) => void;
}

export interface CategorySortContainerFunctions {
    onSortChange: (value: string) => void;
}

export interface CategorySortContainerBaseProps {
    isCurrentCategoryLoaded: boolean;
}

export type CategorySortContainerProps = CategorySortContainerMapStateProps
& CategorySortContainerMapDispatchProps
& CategorySortContainerBaseProps;

export interface CategorySortComponentProps extends CategorySortContainerFunctions {
    isMatchingInfoFilter: boolean;
    sortDirection: SortDirections;
    sortKey: string;
    selectOptions: CategorySortOption[];
    isCurrentCategoryLoaded: boolean;
}

export type CategorySortComponentPropsKey =
| 'isCurrentCategoryLoaded'
| 'isMatchingInfoFilter'
| 'sortDirection'
| 'sortKey'
| 'selectOptions';

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
