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
import { updateCurrentCategory } from 'Store/Category/Category.action';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import { fetchQuery } from 'Util/Request/BroadCast';
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
            } = await fetchQuery<CategoryDispatcherData>(CategoryQuery.getQuery(options), 'Category');

            if (!id && !isSearchPage) {
                this.dispatch(updateNoMatch(true));
            }

            this.dispatch(updateCurrentCategory(category));
        } catch (err) {
            if (!(err as NetworkError).message.includes('abort')) {
                if (!isSearchPage) {
                    this.dispatch(updateNoMatch(true));
                    this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Category!'), err));
                } else {
                    this.dispatch(updateCurrentCategory({
                        id: 'all-products',
                    }));
                }
            }
        }
    }
}

export default new CategoryDispatcher();
