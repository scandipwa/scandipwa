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
    UpdateCurrentCategoryAction,
} from './Category.type';

/** @namespace Store/Category/Reducer/getInitialState */
export const getInitialState = (): CategoryStore => ({
    category: {},
});

/** @namespace Store/Category/Reducer/CategoryReducer */
export const CategoryReducer: Reducer<
CategoryStore,
UpdateCurrentCategoryAction
> = (
    state = getInitialState(),
    { type, category },
) => {
    switch (type) {
    case CategoryActionType.UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            category: { ...category },
        };

    default:
        return state;
    }
};

export default CategoryReducer;
