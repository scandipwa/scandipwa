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

import { match as Match } from 'react-router';

import { SortFields } from 'Query/ProductList.type';
import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';
import {
    CategoryPageComponentProps,
    CategoryPageComponentState,
    CategoryPageContainerBaseProps,
    CategoryPageContainerMapDispatchProps,
    CategoryPageContainerMapStateProps,
    CategoryPageContainerPropsKeys,
    CategoryPageContainerState
} from 'Route/CategoryPage/CategoryPage.type';
import { PageMeta } from 'Store/Meta/Meta.type';

export interface SearchPageContainerMapStateProps extends CategoryPageContainerMapStateProps {
    minPriceRange: number;
    maxPriceRange: number;
}

export interface SearchPageContainerMapDispatchProps extends CategoryPageContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
}

export interface SearchPageContainerBaseProps extends CategoryPageContainerBaseProps {
    match: Match;
}

export type SearchPageContainerProps = SearchPageContainerMapStateProps
& SearchPageContainerMapDispatchProps
& SearchPageContainerBaseProps;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchPageContainerState extends CategoryPageContainerState {}

export interface SearchPageComponentProps extends CategoryPageComponentProps {
    search: string;
    sortFields: SortFields;
}

export type SearchPageComponentContainerPropKeys = CategoryPageContainerPropsKeys
| 'search'
| 'sortFields';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchPageComponentState extends CategoryPageComponentState {}

export interface SearchPageContainerConfig {
    sortKey: string;
    sortDirection: SortDirections;
}
