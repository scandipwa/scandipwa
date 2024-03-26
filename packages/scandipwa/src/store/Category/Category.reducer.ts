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
    CategoryAction,
    CategoryActionType,
    CategoryStore,
} from './Category.type';

/** @namespace Store/Category/Reducer/getInitialState */
export const getInitialState = (): CategoryStore => ({
    category: {},
    scrollPosition: 0,
});

/** @namespace Store/Category/Reducer/CategoryReducer */
export const CategoryReducer: Reducer<
CategoryStore,
CategoryAction
> = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case CategoryActionType.UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            category: { ...action.category },
        };

    case CategoryActionType.SET_SCROLL_POSITION:
        return {
            ...state,
            scrollPosition: action.payload,
        };

    default:
        return state;
    }
};

export default CategoryReducer;
