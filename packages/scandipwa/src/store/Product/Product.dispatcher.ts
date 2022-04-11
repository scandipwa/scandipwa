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
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { updateProductDetails } from 'Store/Product/Product.action';
import { GQLProductInterface, GQLProductLinksInterface } from 'Type/Graphql.type';
import { Product, ProductBundle } from 'Type/ProductList.type';
import { QueryDispatcher } from 'Util/Request';

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
export class ProductDispatcher extends QueryDispatcher<ProductListOptions, ProductDispatcherData> {
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

        const product_links = (items as GQLProductInterface[]).reduce((links, product) => {
            const { product_links } = product;

            if (product_links) {
                (Object.values(product_links) as GQLProductLinksInterface[]).forEach((item) => {
                    links.push(item);
                });
            }

            return links;
        }, [] as GQLProductLinksInterface[]);

        LinkedProductsDispatcher.then(
            ({ default: dispatcher }) => {
                if (product_links.length > 0) {
                    dispatcher.handleData(dispatch, product_links);
                } else {
                    dispatcher.clearLinkedProducts(dispatch);
                }
            }
        );

        dispatch(updateProductDetails(product as unknown as Product | ProductBundle));
    }

    onError(_: unknown, dispatch: Dispatch): void {
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options: ProductListOptions): Query<'products', unknown, false> {
        return ProductListQuery.getQuery(options) as Query<'products', unknown, false>;
    }
}

export default new ProductDispatcher();
