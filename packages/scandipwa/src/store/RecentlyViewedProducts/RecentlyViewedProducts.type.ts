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

import { AnyAction } from 'redux';

import { ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum RecentlyViewedProductsActionType {
    UPDATE_RECENTLY_VIEWED_PRODUCTS_STORE = 'UPDATE_RECENTLY_VIEWED_PRODUCTS_STORE',
}

export interface UpdateRecentlyViewedProductsStoreAction extends AnyAction {
    type: RecentlyViewedProductsActionType.UPDATE_RECENTLY_VIEWED_PRODUCTS_STORE;
    state: Partial<RecentlyViewedProductsStore>;
}

export type RecentlyViewedProductsAction = UpdateRecentlyViewedProductsStoreAction;

export interface RecentlyViewedProductsStore {
    recentlyViewedProducts: Record<string, RecentlyViewedProductItem[]>;
    isLoading: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        RecentlyViewedProductsReducer: RecentlyViewedProductsStore;
    }
}

export interface RecentlyViewedProductsDispatcherOptions {
    store: string;
    recentProducts: Record<string, RecentlyViewedProductItem[]>;
}

export interface RecentlyViewedProductsDispatcherData {
    products: ProductsQueryOutput;
}

export type RecentlyViewedProductItem = Omit<
IndexedProduct,
| 'canonical_url'
| 'categories'
| 'configurable_options'
| 'description'
| 'items'
| 'meta_description'
| 'meta_keyword'
| 'meta_title'
| 'options'
| 'product_links'
| 'reviews'
| 'short_description'
| 'variants'
>;
