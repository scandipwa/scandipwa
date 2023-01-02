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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import CategoryQuery from 'Query/Category.query';
import { Category, CategoryQueryOptions } from 'Query/Category.type';
import { updateCurrentCategory } from 'Store/Category/Category.action';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import { QueryDispatcher } from 'Util/Request';

import { CategoryDispatcherData } from './Category.type';

/**
 * Category Dispatcher
 * @class CategoryDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Category/Dispatcher
 */
export class CategoryDispatcher extends QueryDispatcher<CategoryQueryOptions, CategoryDispatcherData> {
    __construct(): void {
        super.__construct('Category');
    }

    onSuccess(
        data: CategoryDispatcherData,
        dispatch: Dispatch,
        { isSearchPage }: CategoryQueryOptions,
    ): void {
        const {
            category,
            category: { id },
        } = data;

        if (!id && !isSearchPage) {
            dispatch(updateNoMatch(true));
        }

        dispatch(updateCurrentCategory(category));
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch, { isSearchPage }: CategoryQueryOptions): void {
        if (!isSearchPage) {
            dispatch(updateNoMatch(true));
            dispatch(showNotification(NotificationType.ERROR, __('Error fetching Category!'), error));
        } else {
            dispatch(updateCurrentCategory({
                id: 'all-products',
            }));
        }
    }

    prepareRequest(
        options: CategoryQueryOptions,
    ): Query<'category', Category, false> {
        return CategoryQuery.getQuery(options);
    }
}

export default new CategoryDispatcher();
