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
    CategoryStore,
} from './Category.type';

/** @namespace Store/Category/Reducer/getInitialState */
export const getInitialState = (): CategoryStore => ({
    category: {},
});

/** @namespace Store/Category/Reducer/CategoryReducer */
export const CategoryReducer: Reducer<
CategoryStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState } = action;

    return {
        ...state,
        ...newState,
    };
};

export default CategoryReducer;
