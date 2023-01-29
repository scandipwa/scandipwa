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
import {
    ProductLink,
    ProductsQueryOutput,
} from 'Query/ProductList.type';
import { updateLinkedProducts } from 'Store/LinkedProducts/LinkedProducts.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';
import { IndexedProduct } from 'Util/Product/Product.type';
import { fetchQuery, QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { LINKED_PRODUCTS } from './LinkedProducts.reducer';
import {
    LinkedProducts,
    LinkedProductsDispatcherData,
    LinkedProductsMap,
    LinkedProductType,
} from './LinkedProducts.type';

/**
 * Linked Prodcts List Dispatcher
 * @class LinkedProductsDispatcher
 * @extends QueryDispatcher
 * @namespace Store/LinkedProducts/Dispatcher
 */
export class LinkedProductsDispatcher extends QueryDispatcher<
ProductLink[],
LinkedProductsDispatcherData
> {
    __construct(): void {
        super.__construct('LinkedProducts', ONE_MONTH_IN_SECONDS);
    }

    onSuccess(data: LinkedProductsDispatcherData, dispatch: Dispatch, product_links: ProductLink[]): void {
        const linkedProducts = this._processResponse(data, product_links);

        BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);
        dispatch(updateLinkedProducts(linkedProducts));
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch): void {
        dispatch(showNotification(NotificationType.ERROR, __('Error fetching LinkedProducts!'), error));
    }

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
    clearLinkedProducts(dispatch: Dispatch, updateCrossSell = false): void {
        const linkedProducts = {
            upsell: { total_count: 0, items: [] },
            related: { total_count: 0, items: [] },
            crosssell: { total_count: 0, items: [] },
        };

        BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);

        dispatch(updateLinkedProducts({
            ...linkedProducts,
            updateCrossSell,
        }));
    }

    async fetchCrossSellProducts(dispatch: Dispatch, product_links: ProductLink[]): Promise<void> {
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

        dispatch(updateLinkedProducts(linkedProducts));
    }

    clearCrossSellProducts(dispatch: Dispatch): void {
        const linkedProducts: LinkedProductsMap & {
            updateCrossSell?: boolean;
        } = BrowserDatabase.getItem(LINKED_PRODUCTS) || {};

        Object.assign(linkedProducts, {
            crosssell: { total_count: 0, items: [] },
            updateCrossSell: true,
        });

        dispatch(updateLinkedProducts(linkedProducts));
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
}

export default new LinkedProductsDispatcher();
