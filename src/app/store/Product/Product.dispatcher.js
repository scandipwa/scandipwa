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

import { QueryDispatcher } from 'Util/Request';
import { ProductListQuery } from 'Query';
import { updateProductDetails } from 'Store/Product';
import { updateNoMatch } from 'Store/NoMatch';
import { LinkedProductsDispatcher } from 'Store/LinkedProducts';

/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 */
export class ProductDispatcher extends QueryDispatcher {
    constructor() {
        super('Product');
    }

    onSuccess(data, dispatch) {
        const { products: { items } } = data;

        if (!(items && items.length > 0)) {
            return dispatch(updateNoMatch(true));
        }

        const [product] = items;

        if (items.length > 0) {
            const product_links = items.reduce((links, product) => {
                const { product_links } = product;

                if (product_links) {
                    Object.values(product_links).forEach((item) => {
                        links.push(item);
                    });
                }

                return links;
            }, []);

            if (product_links.length !== 0) {
                LinkedProductsDispatcher.handleData(dispatch, product_links);
            }
        }

        return dispatch(updateProductDetails(product));
    }

    onError(_, dispatch) {
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options) {
        return ProductListQuery.getQuery(options);
    }
}

export default new ProductDispatcher();
