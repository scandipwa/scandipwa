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
import {
    appendPage,
    updateProductListItems,
    updateLoadStatus
} from 'Store/ProductList';
import { showNotification } from 'Store/Notification';
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

    // eslint-disable-next-line consistent-return
    onSuccess(data, dispatch, options) {
        const { products: { items } } = data;

        const {
            currentPage,
            isNext
        } = options;

        if (isNext) {
            return dispatch(appendPage(items, currentPage));
        }

        dispatch(updateProductListItems(items, currentPage));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Product List!', error));
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options, dispatch) {
        if (!options.isNext) dispatch(updateLoadStatus(true));

        return ProductListQuery.getQuery({
            ...options,
            notRequireInfo: true
        });
    }
}

export default new ProductListDispatcher();
