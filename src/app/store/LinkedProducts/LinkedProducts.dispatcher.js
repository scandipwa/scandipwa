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
import { getIndexedProducts } from 'Util/Product';
import { QueryDispatcher } from 'Util/Request';
import { ProductListQuery } from 'Query';

export const LINKED_PRODUCTS = 'LINKED_PRODUCTS';

/**
 * Define array slice params to determine the number of products to show
 * @type {number}
 */
const ARRAY_START = 0;
const ARRAY_END = 6;

/**
 * Linked Prodcts List Dispatcher
 * @class LinkedProductsDispatcher
 * @extends QueryDispatcher
 */
export class LinkedProductsDispatcher extends QueryDispatcher {
    constructor() {
        super('LinkedProducts', ONE_MONTH_IN_SECONDS);
    }

    onSuccess({ upsell = {}, related = {}, crossSell = {} }, dispatch) {
        const { items: upsellItems = [] } = upsell;
        const { items: relatedItems = [] } = related;
        const { items: crossSellItems = [] } = crossSell;

        const linkedProducts = {
            upsell: { ...upsell, items: getIndexedProducts(upsellItems) },
            related: { ...related, items: getIndexedProducts(relatedItems) },
            crossSell: { ...crossSell, items: getIndexedProducts(crossSellItems) }
        };

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
        const { upsell, related, crosssell } = product_links.reduce((types, link) => {
            const { linked_product_sku, link_type } = link;
            const { [link_type]: links = [] } = types;

            return {
                ...types,
                [link_type]: [...links, `"${ linked_product_sku.replace(/ /g, '%20') }"`]
            };
        }, {});

        const queries = [];

        const query = related_type => ProductListQuery.getQuery({
            args: {
                filter: {
                    productsSkuArray: related_type.slice(ARRAY_START, ARRAY_END)
                }
            }
        });

        if (upsell) {
            queries.push(query(upsell).setAlias('upsell'));
        }
        if (related) {
            queries.push(query(related).setAlias('related'));
        }
        if (crosssell) {
            queries.push(query(crosssell).setAlias('crossSell'));
        }

        return queries;
    }

    /**
     * Clear linked products list
     * @param {{productsSkuArray: Array<String>}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof LinkedProductsDispatcher
     */
    clearLinkedProducts(dispatch) {
        dispatch(updateLinkedProducts({ linkedProducts: { upsell: {}, related: {}, crossSell: {} } }));
    }
}

export default new LinkedProductsDispatcher();
