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

import {
    RecentlyViewedProductItem,
    RecentlyViewedProductsDispatcherOptions,
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.type';

export interface RecentlyViewedWidgetContainerMapStateProps {
    recentProducts: Record<string, RecentlyViewedProductItem[]>;
    isLoading: boolean;
    store: string;
}

export interface RecentlyViewedWidgetContainerMapDispatchProps {
    updateRecentViewedProductsInfo: (options: RecentlyViewedProductsDispatcherOptions) => void;
}

export interface RecentlyViewedWidgetContainerBaseProps {
    pageSize: number;
}

export type RecentlyViewedWidgetContainerProps = RecentlyViewedWidgetContainerMapStateProps
& RecentlyViewedWidgetContainerMapDispatchProps
& RecentlyViewedWidgetContainerBaseProps;

export interface RecentlyViewedWidgetContainerState {
    siblingsHaveBrands: boolean;
    siblingsHavePriceBadge: boolean;
    siblingsHaveTierPrice: boolean;
    siblingsHaveConfigurableOptions: boolean;
}

export interface RecentlyViewedWidgetComponentProps {
    products: RecentlyViewedProductItem[];
    isLoading: boolean;
    pageSize: number;
}
