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
import { CategoryQuery } from 'Query';
import { updateCurrentCategory } from 'Store/Category';
import { showNotification } from 'Store/Notification';
import { updateNoMatch } from 'Store/NoMatch';

/**
 * Category Dispatcher
 * @class CategoryDispatcher
 * @extends QueryDispatcher
 */
export class CategoryDispatcher extends QueryDispatcher {
    constructor() {
        super('Category');
    }

    onSuccess(data, dispatch, { isSearchPage }) {
        const { category = {}, category: { id } } = data;
        if (!id && !isSearchPage) dispatch(updateNoMatch(true));
        dispatch(updateCurrentCategory(category));
    }

    onError(error, dispatch, { isSearchPage }) {
        if (!isSearchPage) {
            dispatch(updateNoMatch(true));
            dispatch(showNotification('error', 'Error fetching Category!', error));
        } else {
            dispatch(updateCurrentCategory({ id: 'all-products' }));
        }
    }

    prepareRequest(options) {
        return CategoryQuery.getQuery(options);
    }
}

export default new CategoryDispatcher();
