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
import { ProductListOptions } from 'Query/ProductList.type';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    updateInfoLoadStatus,
    updateProductListInfo,
} from 'Store/ProductListInfo/ProductListInfo.action';
import { NetworkError } from 'Type/Common.type';
import { fetchQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ProductListInfoDispatcherData } from './ProductListInfo.type';

/**
 * Product List Info Dispatcher
 * @class ProductListInfoDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductListInfo/Dispatcher
 */
export class ProductListInfoDispatcher extends SimpleDispatcher {
    async getProductListInfo(
        options: Partial<ProductListOptions>,
    ) {
        this.dispatch(updateInfoLoadStatus(true));

        try {
            const rawQueries = ProductListQuery.getQuery({
                ...options,
                requireInfo: true,
            });

            const { products } = await fetchQuery<ProductListInfoDispatcherData>(rawQueries, 'ProductListInfo');

            const {
                args: {
                    filter = {},
                } = {},
            } = options;

            this.dispatch(updateProductListInfo(products, filter));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Product List Information!'), err));
                this.dispatch(updateNoMatch(true));
            }
        }
    }
}

export default new ProductListInfoDispatcher();
