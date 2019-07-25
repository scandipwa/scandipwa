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
import { appendPage, updateProductList, updateLoadStatus } from 'Store/ProductList';
import { updateNoMatch } from 'Store/NoMatch';

/**
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 */
export class ProductListDispatcher extends QueryDispatcher {
    constructor() {
        super('ProductList', 86400);
    }

    onSuccess(data, dispatch, options) {
        const {
            products: {
                items,
                total_count,
                min_price,
                max_price,
                sort_fields,
                filters
            }
        } = data;

        const { currentPage, isNext } = options;

        if (isNext) {
            dispatch(appendPage(items, min_price, max_price, currentPage));
        } else {
            dispatch(updateProductList(items, total_count, min_price, max_price, sort_fields, filters, currentPage));
            dispatch(updateLoadStatus(false));
        }
    }

    onError(error, dispatch) {
        console.error(error);
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options, dispatch) {
        if (!options.isNext) dispatch(updateLoadStatus(true));
        return ProductListQuery.getQuery(options);
    }
}

export default new ProductListDispatcher();
