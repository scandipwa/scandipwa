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
    appendPage,
    updateLoadStatus,
    updatePageLoadingStatus,
    updateProductListItems,
} from 'Store/ProductList/ProductList.action';
import { NetworkError } from 'Type/Common.type';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ProductListDispatcherData } from './ProductList.type';

/**
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductList/Dispatcher
 */
export class ProductListDispatcher extends SimpleDispatcher {
    async getProductList(options: Partial<ProductListOptions>) {
        const { isNext } = options;

        if (!isNext) {
            this.dispatch(updateLoadStatus(true));
        } else {
            this.dispatch(updatePageLoadingStatus());
        }

        try {
            const {
                products: {
                    items = [],
                    total_count = 0,
                    page_info: { total_pages = 0 } = {},
                } = {},
            } = await fetchCancelableQuery<ProductListDispatcherData>(ProductListQuery.getQuery(options), 'ProductList');

            const { args = {}, isNext } = options;
            const { currentPage = 0 } = args;

            if (isNext) {
                this.dispatch(
                    appendPage(
                        items,
                        currentPage,
                    ),
                );

                return;
            }

            this.dispatch(
                updateProductListItems(
                    items,
                    currentPage,
                    total_count,
                    total_pages,
                    args,
                ),
            );
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Product List!'), err));
                this.dispatch(updateNoMatch(true));
            }
        }
    }
}

export default new ProductListDispatcher();
