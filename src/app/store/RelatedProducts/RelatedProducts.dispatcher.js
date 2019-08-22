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
import { showNotification } from 'Store/Notification';
import { updateRelatedProducts } from 'Store/RelatedProducts';
import { ProductListQuery } from 'Query';

/**
 * Related Prodcts List Dispatcher
 * @class RelatedProductsDispatcher
 * @extends QueryDispatcher
 */
export class RelatedProductsDispatcher extends QueryDispatcher {
    constructor() {
        super('RelatedProducts');
    }

    onSuccess(data, dispatch) {
        dispatch(updateRelatedProducts(data));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching RelatedProducts!', error));
    }

    /**
     * Prepare RelatedProducts query
     * @param {{productsSkuArray: Array<String|Number>}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof RelatedProductsDispatcher
     */
    prepareRequest(options) {
        return ProductListQuery.getQuery(options);
    }

    /**
     * Clear realated products list
     * @param {{productsSkuArray: Array<String>}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof RelatedProductsDispatcher
     */
    clearRelatedProducts(dispatch) {
        dispatch(updateRelatedProducts({ products: {} }));
    }
}

export default new RelatedProductsDispatcher();
