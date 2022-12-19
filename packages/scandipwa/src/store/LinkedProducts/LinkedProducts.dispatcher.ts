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
import { ProductLink, ProductsQueryOutput } from 'Query/ProductList.type';
import { updateLinkedProductsStore } from 'Store/LinkedProducts/LinkedProducts.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';
import { IndexedProduct } from 'Util/Product/Product.type';
import { fetchQuery } from 'Util/Request';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import {
    LinkedProducts,
    LinkedProductsDispatcherData,
    LinkedProductsMap,
    LinkedProductType,
} from './LinkedProducts.type';

export const LINKED_PRODUCTS = 'LINKED_PRODUCTS';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/**
 * Linked Prodcts List Dispatcher
 * @class LinkedProductsDispatcher
 * @extends QueryDispatcher
 * @namespace Store/LinkedProducts/Dispatcher
 */
export class LinkedProductsDispatcher extends SimpleDispatcher {
    /**
     * Prepare LinkedProducts query
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     * @param product_links
     */
    prepareRequest(product_links: ProductLink[]): Query<'products', ProductsQueryOutput>[] {
        const relatedSKUs = product_links.reduce((links: string[], link) => {
            const { linked_product_sku } = link;

            return [...links, linked_product_sku];
        }, []);

        return [
            ProductListQuery.getQuery({
                args: {
                    filter: {
                        productsSkuArray: relatedSKUs,
                    },
                },
                notRequireInfo: true,
            }),
        ];
    }

    /**
     * Clear linked products list
     * @param {{productsSkuArray: Array<String>}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     */
    clearLinkedProducts(updateCrossSell = false): void {
        const linkedProducts = {
            upsell: { total_count: 0, items: [] },
            related: { total_count: 0, items: [] },
            crosssell: { total_count: 0, items: [] },
        };

        BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);

        this.dispatch(updateLinkedProductsStore({
            linkedProducts: {
                ...linkedProducts,
                updateCrossSell,
            },
        }));
    }

    async fetchCrossSellProducts(product_links: ProductLink[]): Promise<void> {
        const query = this.prepareRequest(product_links);
        const data = await fetchQuery(query);
        const { crosssell } = this._processResponse(data, product_links);
        const linkedProducts: LinkedProductsMap & {
            updateCrossSell?: boolean;
        } = BrowserDatabase.getItem(LINKED_PRODUCTS) || {};

        Object.assign(linkedProducts, {
            crosssell,
            updateCrossSell: true,
        });

        this.dispatch(updateLinkedProductsStore({ linkedProducts }));
    }

    clearCrossSellProducts(): void {
        const linkedProducts: LinkedProductsMap & {
            updateCrossSell?: boolean;
        } = BrowserDatabase.getItem(LINKED_PRODUCTS) || {};

        Object.assign(linkedProducts, {
            crosssell: { total_count: 0, items: [] },
            updateCrossSell: true,
        });

        this.dispatch(updateLinkedProductsStore({ linkedProducts }));
    }

    _processResponse(
        data: LinkedProductsDispatcherData,
        product_links: ProductLink[],
    ): Record<LinkedProductType, LinkedProducts> {
        const { products: { items } } = data;

        const indexedBySku = items.reduce((acc: Record<string, IndexedProduct>, item) => {
            const { sku } = item;

            acc[sku] = getIndexedProduct(item);

            return acc;
        }, {});

        const linkedProducts = product_links.reduce((acc: Record<LinkedProductType, LinkedProducts>, link) => {
            const {
                linked_product_sku,
                link_type,
            } = link as { linked_product_sku: string; link_type: LinkedProductType };

            if (indexedBySku[linked_product_sku] && acc[link_type]) {
                acc[link_type].items.push(
                    indexedBySku[linked_product_sku],
                );

                acc[link_type].total_count++;
            }

            return acc;
        }, {
            upsell: { total_count: 0, items: [] },
            related: { total_count: 0, items: [] },
            crosssell: { total_count: 0, items: [] },
            associated: { total_count: 0, items: [] },
        });

        return linkedProducts;
    }

    async getLinkedProducts(product_links: ProductLink[]) {
        const rawQueries = this.prepareRequest(product_links);

        try {
            const result = await fetchCancelableQuery<LinkedProductsDispatcherData>(rawQueries, 'LinkedProducts');

            const linkedProducts = this._processResponse(result, product_links);

            BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);
            this.dispatch(updateLinkedProductsStore({ linkedProducts }));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        __('Error fetching LinkedProducts!'),
                        err,
                    ),
                );
            }
        }
    }

    updateLinkedStore(linkedProducts: LinkedProductsMap & { updateCrossSell?: boolean }) {
        const {
            LinkedProductsReducer: {
                linkedProducts: {
                    [LinkedProductType.CROSS_SELL]: prevCrossSell,
                },
            },
        } = this.storeState;

        const {
            [LinkedProductType.UPSELL]: upsell,
            [LinkedProductType.RELATED]: related,
            [LinkedProductType.CROSS_SELL]: crosssell,
            updateCrossSell = false,
        } = linkedProducts || {};

        if (updateCrossSell) {
            return updateLinkedProductsStore({
                linkedProducts: {
                    [LinkedProductType.UPSELL]: upsell,
                    [LinkedProductType.RELATED]: related,
                    [LinkedProductType.CROSS_SELL]: crosssell,
                },
            });
        }

        return updateLinkedProductsStore({
            linkedProducts: {
                [LinkedProductType.UPSELL]: upsell,
                [LinkedProductType.RELATED]: related,
                [LinkedProductType.CROSS_SELL]: {
                    ...prevCrossSell,
                    ...related,
                    items: Object.values({
                        ...(prevCrossSell?.items || []),
                        ...(crosssell?.items || []),
                    }),
                } as LinkedProducts,
            },
        });
    }
}

export default new LinkedProductsDispatcher();
