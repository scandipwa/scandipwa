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

import { NoMatchStore } from './NoMatch.type';

/** @namespace Store/NoMatch/Reducer/getInitialState */
export const getInitialState = (): NoMatchStore => ({
    noMatch: false,
});

/** @namespace Store/NoMatch/Reducer/NoMatchReducer */
export const NoMatchReducer: Reducer<NoMatchStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState } = action;

    return {
        ...state,
        ...newState,
    };
};

export default NoMatchReducer;
