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
import { Dispatch } from 'redux';

import ProductListQuery from 'Query/ProductList.query';
import { ProductsQueryOutput } from 'Query/ProductList.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    updateLoadStatus,
    updateRecentlyViewedProducts,
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import { NetworkError } from 'Type/Common.type';
import { QueryDispatcher } from 'Util/Request/QueryDispatcher';
import { getStoreState } from 'Util/Store';

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
export class RecentlyViewedProductsDispatcher extends QueryDispatcher<
RecentlyViewedProductsDispatcherOptions,
RecentlyViewedProductsDispatcherData
> {
    __construct(): void {
        super.__construct('recentlyViewedProducts');
    }

    onSuccess({ products: { items } }: RecentlyViewedProductsDispatcherData, dispatch: Dispatch): void {
        const state = getStoreState();
        const {
            code: storeCode = '',
        } = state.ConfigReducer || {};

        dispatch(updateRecentlyViewedProducts(items, storeCode));
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch): void {
        dispatch(showNotification(
            NotificationType.ERROR,
            __('Error fetching Recently Viewed Products Information!'),
            error,
        ));
    }

    /**
     * Prepare recentlyViewedProducts query
     * @return {Query} RecentlyViewedProducts query
     * @memberof recentlyViewedProductsDispatcher
     * @param recentlyViewedProducts
     */
    prepareRequest(
        options: RecentlyViewedProductsDispatcherOptions,
        dispatch: Dispatch,
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

        dispatch(updateLoadStatus(true));

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
}

export default new RecentlyViewedProductsDispatcher();
