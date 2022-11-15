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

import ProductListQuery from 'Query/ProductList.query';
import { ProductsQueryOutput } from 'Query/ProductList.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    updateLoadStatus,
    updateRecentlyViewedProducts,
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import { NetworkError } from 'Type/Common.type';
import { fetchQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import {
    RecentlyViewedProductsDispatcherData,
    RecentlyViewedProductsDispatcherOptions,
} from './RecentlyViewedProducts.type';

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

        this.dispatch(updateLoadStatus(true));

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
            } = await fetchQuery<RecentlyViewedProductsDispatcherData>(rawQueries, 'recentlyViewedProducts');

            const {
                code: storeCode,
            } = this.storeState.ConfigReducer;

            this.dispatch(updateRecentlyViewedProducts(items, storeCode));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(showNotification(
                    NotificationType.ERROR,
                    __('Error fetching Recently Viewed Products Information!'),
                    err,
                ));
            }
        }
    }
}

export default new RecentlyViewedProductsDispatcher();
