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

import ProductListQuery from 'Query/ProductList.query';
import { ProductLink, ProductListOptions } from 'Query/ProductList.type';
import { updateNoMatchStore } from 'Store/NoMatch/NoMatch.action';
import { updateProductStore } from 'Store/Product/Product.action';
import { NetworkError } from 'Type/Common.type';
import { getIndexedProduct } from 'Util/Product';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ProductDispatcherData } from './Product.type';

export const LinkedProductsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/LinkedProducts/LinkedProducts.dispatcher'
);

/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 * @namespace Store/Product/Dispatcher
 */
export class ProductDispatcher extends SimpleDispatcher {
    async getProduct(options: Partial<ProductListOptions>) {
        const rawQueries = ProductListQuery.getQuery(options);

        try {
            const { products: { items } } = await fetchCancelableQuery<ProductDispatcherData>(rawQueries, 'Product');

            /**
             * In case there are no items, or item count is
             * smaller then 0 => the product was not found.
             */
            if (!items || items.length <= 0) {
                this.dispatch(updateNoMatchStore({ noMatch: true }));

                return;
            }

            const [product] = items;

            const product_links = items.reduce((links: ProductLink[], product) => {
                const { product_links } = product;

                if (product_links) {
                    Object.values(product_links).forEach((item) => {
                        links.push(item);
                    });
                }

                return links;
            }, []);

            LinkedProductsDispatcher.then(
                ({ default: dispatcher }) => {
                    if (product_links.length > 0) {
                        dispatcher.getLinkedProducts(product_links);
                    } else {
                        dispatcher.clearLinkedProducts();
                    }
                },
            );

            this.dispatch(updateProductStore({ product: getIndexedProduct(product) }));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(updateNoMatchStore({ noMatch: true }));
            }
        }
    }
}

export default new ProductDispatcher();
