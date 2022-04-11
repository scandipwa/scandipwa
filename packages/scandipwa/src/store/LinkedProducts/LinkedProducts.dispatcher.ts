/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import ProductListQuery from 'Query/ProductList.query';
import { ProductListOptions } from 'Query/Query.type';
import { updateLinkedProducts } from 'Store/LinkedProducts/LinkedProducts.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { GQLProductInterface, GQLProductLinksInterface, GQLProducts } from 'Type/Graphql.type';
import {
    LinkedProducts, LinkedProductType, Product, ProductBundle
} from 'Type/ProductList.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct, IndexedProduct } from 'Util/Product';
import { fetchQuery, QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

export const LINKED_PRODUCTS = 'LINKED_PRODUCTS';

export type LinkedProductsDispatcherData = {
    products: GQLProducts;
};

/**
 * Linked Prodcts List Dispatcher
 * @class LinkedProductsDispatcher
 * @extends QueryDispatcher
 * @namespace Store/LinkedProducts/Dispatcher
 */
export class LinkedProductsDispatcher extends QueryDispatcher<
GQLProductLinksInterface[],
LinkedProductsDispatcherData
> {
    __construct(): void {
        super.__construct('LinkedProducts', ONE_MONTH_IN_SECONDS);
    }

    onSuccess(data: LinkedProductsDispatcherData, dispatch: Dispatch, product_links: GQLProductLinksInterface[]): void {
        const linkedProducts = this._processResponse(data, product_links);

        BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);
        dispatch(updateLinkedProducts(linkedProducts));
    }

    onError(error: unknown, dispatch: Dispatch): void {
        dispatch(showNotification(NotificationType.ERROR, __('Error fetching LinkedProducts!'), error));
    }

    /**
     * Prepare LinkedProducts query
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     * @param product_links
     */
    prepareRequest(product_links: GQLProductLinksInterface[]): Query<string, unknown, boolean>[] {
        const relatedSKUs = product_links.reduce((links, link) => {
            const { linked_product_sku } = link;

            return [...links, `${ linked_product_sku?.replace(/ /g, '%20') }`];
        }, [] as string[]);

        return [
            ProductListQuery.getQuery({
                args: {
                    filter: {
                        productsSkuArray: relatedSKUs
                    }
                },
                notRequireInfo: true
            } as unknown as ProductListOptions)
        ] as Query<string, unknown, boolean>[];
    }

    /**
     * Clear linked products list
     * @param {{productsSkuArray: Array<String>}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     */
    clearLinkedProducts(dispatch: Dispatch, updateCrossSell = false): void {
        const linkedProducts = {
            upsell: { total_count: 0, items: [] },
            related: { total_count: 0, items: [] },
            crosssell: { total_count: 0, items: [] }
        };

        BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);

        dispatch(updateLinkedProducts({
            ...linkedProducts,
            updateCrossSell
        }));
    }

    async fetchCrossSellProducts(dispatch: Dispatch, product_links: GQLProductLinksInterface[]): Promise<void> {
        const query = this.prepareRequest(product_links);
        const data = await fetchQuery(query) as LinkedProductsDispatcherData;
        const { crosssell } = this._processResponse(data, product_links);
        const linkedProducts = (
            BrowserDatabase.getItem(LINKED_PRODUCTS) || {}
        ) as Partial<Record<LinkedProductType, LinkedProducts>> & {
            updateCrossSell?: boolean | undefined;
        };

        Object.assign(linkedProducts, {
            crosssell,
            updateCrossSell: true
        });

        dispatch(updateLinkedProducts(linkedProducts));
    }

    clearCrossSellProducts(dispatch: Dispatch): void {
        const linkedProducts = (
            BrowserDatabase.getItem(LINKED_PRODUCTS) || {}
        ) as Partial<Record<LinkedProductType, LinkedProducts>> & {
            updateCrossSell?: boolean | undefined;
        };

        Object.assign(linkedProducts, {
            crosssell: { total_count: 0, items: [] },
            updateCrossSell: true
        });

        dispatch(updateLinkedProducts(linkedProducts));
    }

    _processResponse(
        data: LinkedProductsDispatcherData,
        product_links: GQLProductLinksInterface[]
    ): Record<LinkedProductType, {
            total_count: number;
            items: IndexedProduct[];
        }> {
        const { products: { items } } = data;

        const indexedBySku = (items as GQLProductInterface[]).reduce((acc, item) => {
            const { sku } = item as { sku: string };

            acc[sku] = getIndexedProduct(item as unknown as Product | ProductBundle);

            return acc;
        }, {} as Record<string, IndexedProduct>);

        const linkedProducts = product_links.reduce((acc, link) => {
            const {
                linked_product_sku,
                link_type
            } = link as { linked_product_sku: string; link_type: LinkedProductType };

            if (indexedBySku[linked_product_sku] && acc[link_type]) {
                acc[link_type].items.push(
                    indexedBySku[linked_product_sku]
                );

                acc[link_type].total_count++;
            }

            return acc;
        }, {
            upsell: { total_count: 0, items: [] },
            related: { total_count: 0, items: [] },
            crosssell: { total_count: 0, items: [] },
            associated: { total_count: 0, items: [] }
        } as Record<LinkedProductType, { total_count: number; items: IndexedProduct[] }>);

        return linkedProducts;
    }
}

export default new LinkedProductsDispatcher();
