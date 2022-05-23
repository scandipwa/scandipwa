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

import { History, Location } from 'history';

import { ProductAttributeFilterOptions, ProductListOptions } from 'Query/ProductList.type';
import { CategorySortOptions } from 'Route/CategoryPage/CategoryPage.type';
import { Mix } from 'Type/Common.type';
import { Device } from 'Type/Device.type';
import { HistoryState } from 'Util/History/History.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductListContainerMapStateProps {
    device: Device;
}

export interface ProductListContainerMapDispatchProps {
    requestProductListInfo: (options: Partial<ProductListOptions>) => void;
}

export interface ProductListContainerBaseProps {
    history: History<HistoryState>;
    location: Location<HistoryState>;
    pages: Record<number, IndexedProduct[]>;
    pageSize?: number;
    isLoading: boolean;
    isPageLoading: boolean;
    totalItems: number;
    requestProductList: (options: Partial<ProductListOptions>) => void;
    selectedFilters: Record<string, string[]>;
    isPreventRequest: boolean;
    isInfiniteLoaderEnabled?: boolean;
    isPaginationEnabled?: boolean;
    filter: ProductAttributeFilterOptions;
    search: string;
    sort: CategorySortOptions | null;
    noAttributes?: boolean;
    noVariants?: boolean;
    isWidget?: boolean;
    mix: Mix;
    title?: string;
    totalPages: number;
}

export type ProductListContainerProps = ProductListContainerMapStateProps
& ProductListContainerMapDispatchProps
& ProductListContainerBaseProps;

export interface ProductListContainerState {
    pagesCount: number;
}

export interface ProductListComponentProps {
    device: Device;
    isLoading: boolean;
    isPaginationEnabled: boolean;
    isWidget: boolean;
    mix: Mix;
    pages: Record<number, IndexedProduct[]>;
    selectedFilters: Record<string, string[]>;
    title: string;
    totalPages: number;
    currentPage: number;
    isShowLoading: boolean;
    isVisible: boolean;
    requestPage: (currentPage?: number, isNext?: boolean) => void;
    isInfiniteLoaderEnabled: boolean;
    loadPrevPage: () => void;
    loadPage: (next?: boolean) => void;
    updatePage: (pageNumber: number) => void;
}

export type ProductListComponentContainerPropKeys =
    | 'device'
    | 'isLoading'
    | 'isPaginationEnabled'
    | 'isWidget'
    | 'mix'
    | 'pages'
    | 'selectedFilters'
    | 'title'
    | 'totalPages'
    | 'currentPage'
    | 'isShowLoading'
    | 'isVisible'
    | 'requestPage'
    | 'isInfiniteLoaderEnabled';

export interface PageBounds {
    maxPage: number;
    minPage: number;
    totalPages: number;
    loadedPagesCount: number;
}

export interface PageProps {
    items: IndexedProduct[];
    keys: number[];
    pageNumber: number;
    selectedFilters: Record<string, string[]>;
    wrapperRef?: (elm: HTMLElement | null) => void;
    key: number;
}
