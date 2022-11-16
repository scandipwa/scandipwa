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

import CategoryQuery from 'Query/Category.query';
import { CategoryQueryOptions } from 'Query/Category.type';
import { updateCategoryStore } from 'Store/Category/Category.action';
import { updateNoMatchStore } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { CategoryDispatcherData } from './Category.type';

/**
 * Category Dispatcher
 * @class CategoryDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Category/Dispatcher
 */
export class CategoryDispatcher extends SimpleDispatcher {
    async getCategory(
        options: CategoryQueryOptions,
    ){
        const { isSearchPage } = options;

        try {
            const {
                category,
                category: {
                    id,
                },
            } = await fetchCancelableQuery<CategoryDispatcherData>(CategoryQuery.getQuery(options), 'Category');

            if (!id && !isSearchPage) {
                this.dispatch(updateNoMatchStore({ noMatch: true }));
            }

            this.dispatch(updateCategoryStore({ category }));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                if (!isSearchPage) {
                    this.dispatch(updateNoMatchStore({ noMatch: true }));
                    this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Category!'), err));
                } else {
                    this.dispatch(updateCategoryStore({
                        category: {
                            id: 'all-products',
                        },
                    }));
                }
            }
        }
    }
}

export default new CategoryDispatcher();
