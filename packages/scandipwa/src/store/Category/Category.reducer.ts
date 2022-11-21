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

import { Reducer } from 'redux';

import {
    CategoryActionType,
    CategoryStore,
} from './Category.type';

/** @namespace Store/Category/Reducer/getInitialState */
export const getInitialState = (): CategoryStore => ({
    category: {},
    breadcrumbsWereUpdated: false,
    currentCategoryIds: -1,
    selectedFilters: {},
});

/** @namespace Store/Category/Reducer/CategoryReducer */
export const CategoryReducer: Reducer<
CategoryStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (CategoryActionType.UPDATE_CATEGORY_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default CategoryReducer;
