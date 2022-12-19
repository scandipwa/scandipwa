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

import { Query } from '@tilework/opus';

import { MAX_NUMBER_OF_RECENT_PRODUCTS, RECENTLY_VIEWED_PRODUCTS } from 'Component/RecentlyViewedWidget/RecentlyViewedWidget.config';
import ProductListQuery from 'Query/ProductList.query';
import { ProductItem, ProductsQueryOutput } from 'Query/ProductList.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { updateRecentlyViewedProductsStore } from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import { NetworkError } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProducts } from 'Util/Product';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { convertToRecentlyViewedProduct } from './RecentlyViewedProducts.reducer';
import {
    RecentlyViewedProductItem,
    RecentlyViewedProductsDispatcherData,
    RecentlyViewedProductsDispatcherOptions,
} from './RecentlyViewedProducts.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/**
 * RecentlyViewedProducts Dispatcher
 * @class RecentlyViewedProductsDispatcher
 * @extends QueryDispatcher
 * @namespace Store/RecentlyViewedProducts/Dispatcher
 */
export class RecentlyViewedProductsDispatcher extends SimpleDispatcher {
    /**
     * Prepare recentlyViewedProducts query
     * @return {Query} RecentlyViewedProducts query
     * @memberof recentlyViewedProductsDispatcher
     * @param recentlyViewedProducts
     */
    _getRecentlyViewedProductsQuery(
        options: RecentlyViewedProductsDispatcherOptions,
    ): Query<'products', ProductsQueryOutput>[] {
        const { store } = options;
        const {
            recentProducts: {
                [ store ]: storeRecentProducts,
            } = {},
        } = options;

        if (!Array.isArray(storeRecentProducts)) {
            return [];
        }

        const recentlyViewedProductsSKUs = storeRecentProducts.reduce((productSKUs: string[], item) => {
            const { sku = '' } = item;

            return [...productSKUs, `${sku.replace(/ /g, '%20')}`];
        }, []);

        this.dispatch(updateRecentlyViewedProductsStore({
            isLoading: true,
        }));

        return [
            ProductListQuery.getQuery({
                args: {
                    filter: {
                        productsSkuArray: recentlyViewedProductsSKUs,
                    },
                },
                notRequireInfo: true,
            }),
        ];
    }

    async getRecentlyViewedProducts(
        options: RecentlyViewedProductsDispatcherOptions,
    ) {
        const rawQueries = this._getRecentlyViewedProductsQuery(options);

        try {
            const {
                products: { items },
            } = await fetchCancelableQuery<RecentlyViewedProductsDispatcherData>(rawQueries, 'recentlyViewedProducts');

            const {
                code: storeCode,
            } = this.storeState.ConfigReducer;

            this.updateRecentlyViewedProducts(items, storeCode);
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        __('Error fetching Recently Viewed Products Information!'),
                        err,
                    ),
                );
            }
        }
    }

    addRecentlyViewedProducts(product: RecentlyViewedProductItem, store: string) {
        const { RecentlyViewedProductsReducer: { recentlyViewedProducts = {} } } = this.storeState;
        const { sku: newSku } = product;

        const storeProducts = recentlyViewedProducts[store] ?? [];

        if (storeProducts?.length === MAX_NUMBER_OF_RECENT_PRODUCTS) {
            storeProducts.pop();
        }

        // Remove product from existing recentProducts to add it later in the beginning
        const newStoreRecentProducts = storeProducts.filter(({ sku }) => (newSku !== sku));

        newStoreRecentProducts.unshift(product);

        const newRecentProducts = {
            ...recentlyViewedProducts,
            [store]: newStoreRecentProducts,
        };

        BrowserDatabase.setItem(newRecentProducts, RECENTLY_VIEWED_PRODUCTS);

        this.dispatch(updateRecentlyViewedProductsStore({
            recentlyViewedProducts: newRecentProducts,
        }));
    }

    updateRecentlyViewedProducts(products: ProductItem[] = [], storeCode: string = '') {
        const { RecentlyViewedProductsReducer: { recentlyViewedProducts: recent = {} } } = this.storeState;

        const indexedProducts = convertToRecentlyViewedProduct(getIndexedProducts(products));
        const recentProductsFromStorage: Record<string, RecentlyViewedProductItem[]> = BrowserDatabase.getItem(
            RECENTLY_VIEWED_PRODUCTS,
        ) || { [storeCode]: [] };

        // Remove product from storage if it is not available
        recentProductsFromStorage[storeCode] = recentProductsFromStorage[storeCode]
            .filter((storageItem) => !indexedProducts.every((indexedItem) => indexedItem.id !== storageItem.id));

        BrowserDatabase.setItem(recentProductsFromStorage, RECENTLY_VIEWED_PRODUCTS);

        // Sort products same as it is localstorage recentlyViewedProducts
        const sortedRecentProducts = recentProductsFromStorage[storeCode].reduce(
            (acc: RecentlyViewedProductItem[], { sku }) => {
                const sortedProduct = indexedProducts.find((item) => item.sku === sku);

                if (sortedProduct) {
                    return [...acc, sortedProduct];
                }

                return acc;
            },
            [],
        );

        const updatedRecentViewedProducts = {
            ...recent,
            [storeCode]: sortedRecentProducts,
        };

        this.dispatch(updateRecentlyViewedProductsStore({
            recentlyViewedProducts: updatedRecentViewedProducts,
            isLoading: false,
        }));
    }
}

export default new RecentlyViewedProductsDispatcher();
