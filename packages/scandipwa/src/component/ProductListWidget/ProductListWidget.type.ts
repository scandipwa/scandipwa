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

import { ProductListOptions, ProductsQueryOutput } from 'Query/ProductList.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Mix } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';


export interface ProductListWidgetContainerMapStateProps {}

export interface ProductListWidgetContainerMapDispatchProps {
    updateNoMatch: (noMatch: boolean) => void;
    showNotification: (type: NotificationType, text: string, debug?: unknown) => void;
}

export interface ProductListWidgetContainerFunctions {
    requestProductList: (options: Partial<ProductListOptions>) => void;
    updateLoadStatus: (isLoading: boolean) => void;
    getIsNewCategory: () => boolean;
}

export type ProductListWidgetContainerProps = ProductListWidgetContainerMapDispatchProps
& {
    showPager: boolean;
    productsCount: number;
    productsPerPage: number;
    conditionsEncoded: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedFilters: any;
};

export interface ProductListWidgetContainerState {
    pages: Record<number, IndexedProduct[]>;
    totalItems: number;
    totalPages: number;
    isLoading: boolean;
}

export interface ProductListWidgetComponentProps
    extends ProductListWidgetAdaptProps, ProductListWidgetContainerFunctions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedFilters: any;
    title: string;
    pages: Record<number, IndexedProduct[]>;
    totalItems: number;
    totalPages: number;
    isLoading: boolean;
    isInfiniteLoaderEnabled: boolean;
    numberOfPlaceholders: number;
    mix: Mix;
    isWidget: boolean;
}

export type ProductListWidgetComponentContainerPropKeys = Pick<
ProductListWidgetComponentProps,
| 'selectedFilters'
| 'title'
| 'pages'
| 'totalItems'
| 'totalPages'
| 'isLoading'
| 'filter'
| 'pageSize'
| 'isPaginationEnabled'
| 'isInfiniteLoaderEnabled'
| 'numberOfPlaceholders'
| 'mix'
| 'isWidget'
>;

export interface ProductListWidgetQueryResult {
    products: ProductsQueryOutput;
}

export interface ProductListWidgetAdaptProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: any;
    pageSize: number;
    isPaginationEnabled: boolean;
}
