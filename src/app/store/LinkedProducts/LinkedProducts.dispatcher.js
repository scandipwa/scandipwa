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

import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { updateLinkedProducts } from 'Store/LinkedProducts';
import { showNotification } from 'Store/Notification';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProduct } from 'Util/Product';
import { QueryDispatcher } from 'Util/Request';
import { ProductListQuery } from 'Query';

export const LINKED_PRODUCTS = 'LINKED_PRODUCTS';

/**
 * Linked Prodcts List Dispatcher
 * @class LinkedProductsDispatcher
 * @extends QueryDispatcher
 */
export class LinkedProductsDispatcher extends QueryDispatcher {
    constructor() {
        super('LinkedProducts', ONE_MONTH_IN_SECONDS);
    }

    currentProductLinks = [];

    onSuccess(data, dispatch, product_links) {
        const { products: { items } } = data;

        const indexedBySku = items.reduce((acc, item) => {
            const { sku } = item;
            acc[sku] = getIndexedProduct(item);
            return acc;
        }, {});

        const linkedProducts = product_links.reduce((acc, link) => {
            const { linked_product_sku, link_type } = link;

            if (indexedBySku[linked_product_sku]) {
                acc[link_type].items.push(
                    indexedBySku[linked_product_sku]
                );

                acc[link_type].total_count++;
            }

            return acc;
        }, {
            upsell: { total_count: 0, items: [] },
            related: { total_count: 0, items: [] },
            crosssell: { total_count: 0, items: [] }
        });

        BrowserDatabase.setItem(linkedProducts, LINKED_PRODUCTS);
        dispatch(updateLinkedProducts(linkedProducts));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching LinkedProducts!', error));
    }

    /**
     * Prepare LinkedProducts query
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     * @param product_links
     */
    prepareRequest(product_links) {
        if (JSON.stringify(this.currentProductLinks) === JSON.stringify(product_links)) {
            return null;
        }

        this.currentProductLinks = product_links;

        const relatedSKUs = product_links.reduce((links, link) => {
            const { linked_product_sku } = link;
            return [...links, `"${ linked_product_sku.replace(/ /g, '%20') }"`];
        }, []);

        return [
            ProductListQuery.getQuery({
                args: {
                    filter: {
                        productsSkuArray: relatedSKUs
                    }
                }
            })
        ];
    }

    /**
     * Clear linked products list
     * @param {{productsSkuArray: Array<String>}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     */
    clearLinkedProducts(dispatch) {
        dispatch(updateLinkedProducts({
            linkedProducts: { upsell: [], related: [], crosssell: [] }
        }));
    }
}

export default new LinkedProductsDispatcher();
