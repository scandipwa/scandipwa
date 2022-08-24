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

import { AnyAction } from 'redux';

import { ProductItem, ProductsQueryOutput } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export enum RecentlyViewedProductsActionType {
    UPDATE_RECENTLY_VIEWED_PRODUCTS = 'UPDATE_RECENTLY_VIEWED_PRODUCTS',
    ADD_RECENTLY_VIEWED_PRODUCT = 'ADD_RECENTLY_VIEWED_PRODUCT',
    UPDATE_LOAD_STATUS = 'UPDATE_LOAD_STATUS'
}

export interface AddRecentlyViewedProductAction extends AnyAction {
    type: RecentlyViewedProductsActionType.ADD_RECENTLY_VIEWED_PRODUCT;
    product: RecentlyViewedProductItem;
    store: string;
}

export interface UpdateRecentlyViewedProductsAction extends AnyAction {
    type: RecentlyViewedProductsActionType.UPDATE_RECENTLY_VIEWED_PRODUCTS;
    products?: ProductItem[];
    storeCode?: string;
}

export interface UpdateLoadStatusAction extends AnyAction {
    type: RecentlyViewedProductsActionType.UPDATE_LOAD_STATUS;
    isLoading: boolean;
}

export type RecentlyViewedProductsAction = AddRecentlyViewedProductAction
| UpdateRecentlyViewedProductsAction
| UpdateLoadStatusAction;

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
