/* eslint-disable @scandipwa/scandipwa-guidelines/no-duplicate-namespaces */
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
import { ProductLink, ProductListOptions, ProductsQueryOutput } from 'Query/ProductList.type';
import LinkedProductsDispatcher from 'Store/LinkedProducts/LinkedProducts.dispatcher';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { updateProductDetails } from 'Store/Product/Product.action';
import { waitForPriorityLoad } from 'Util/Request/LowPriorityLoad';
import { QueryDispatcher } from 'Util/Request/QueryDispatcher';

import { ProductDispatcherData } from './Product.type';

/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 * @namespace Store/Product/Dispatcher
 */
export class ProductDispatcher extends QueryDispatcher<Partial<ProductListOptions>, ProductDispatcherData> {
    __construct(): void {
        super.__construct('Product');
    }

    onSuccess(data: ProductDispatcherData, dispatch: Dispatch): void {
        const { products: { items } } = data;

        /**
         * In case there are no items, or item count is
         * smaller then 0 => the product was not found.
         */
        if (!items || items.length <= 0) {
            dispatch(updateNoMatch(true));

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

        if (product_links.length > 0) {
            waitForPriorityLoad().then(/** @namespace Store/Product/Dispatcher/ProductDispatcher/onSuccess/waitForPriorityLoad/then */
                () => {
                    import(
                    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
                        'Store/LinkedProducts/LinkedProducts.dispatcher'
                    ).then(/** @namespace Store/Product/Dispatcher/ProductDispatcher/onSuccess/waitForPriorityLoad/then/then */
                        ({ default: dispatcher }) => dispatcher.handleData(dispatch, product_links),
                    );
                },
            );
        } else {
            waitForPriorityLoad().then(/** @namespace Store/Product/Dispatcher/ProductDispatcher/onSuccess/waitForPriorityLoad/then */
                () => {
                    import(
                        /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
                        'Store/LinkedProducts/LinkedProducts.dispatcher'
                    ).then(/** @namespace Store/Product/Dispatcher/ProductDispatcher/onSuccess/waitForPriorityLoad/then/then */
                        ({ default: dispatcher }) => dispatcher.clearLinkedProducts(dispatch),
                    );
                },
            );
            LinkedProductsDispatcher.clearLinkedProducts(dispatch);
        }

        dispatch(updateProductDetails(product));
    }

    onError(_: unknown, dispatch: Dispatch): void {
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options: Partial<ProductListOptions>): Query<'products', ProductsQueryOutput> {
        return ProductListQuery.getQuery(options);
    }
}

export default new ProductDispatcher();
