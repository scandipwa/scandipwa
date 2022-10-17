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

import { ProductAttributeFilterOptions, ProductListOptions } from 'Query/ProductList.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { CategorySortOptions } from 'Route/CategoryPage/CategoryPage.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface CategoryProductListContainerMapStateProps {
    pages: Record<number, IndexedProduct[]>;
    isOffline: boolean;
    isLoading: boolean;
    isPageLoading: boolean;
    totalItems: number;
    totalPages: number;
}

export interface CategoryProductListContainerMapDispatchProps {
    requestProductList: (options: Partial<ProductListOptions>) => void;
    updateLoadStatus: (isLoading: boolean) => void;
}

export interface CategoryProductListContainerFunctions {
    requestProductList: (options: Partial<ProductListOptions>) => void;
}

export interface CategoryProductListContainerBaseProps {
    isMatchingListFilter: boolean;
    isMatchingInfoFilter: boolean;
    layout: CategoryPageLayout;
    filter: ProductAttributeFilterOptions;
    isCurrentCategoryLoaded: boolean;
    search: string;
    sort: CategorySortOptions;
    selectedFilters: Record<string, string[]>;
    isPlp: boolean;
}

export type CategoryProductListContainerProps = CategoryProductListContainerMapStateProps
& CategoryProductListContainerMapDispatchProps
& CategoryProductListContainerBaseProps;

export type CategoryProductListContainerPropKeys =
    | 'filter'
    | 'isPageLoading'
    | 'pages'
    | 'search'
    | 'selectedFilters'
    | 'sort'
    | 'totalItems'
    | 'totalPages'
    | 'isLoading'
    | 'isPreventRequest'
    | 'mix'
    | 'isPlp';
