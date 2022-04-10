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

import { Reducer } from 'redux';

import {
    NoMatchActionType,
    NoMatchStore,
    UpdateNoMatchAction
} from './NoMatch.type';

/** @namespace Store/NoMatch/Reducer/getInitialState */
export const getInitialState = (): NoMatchStore => ({
    noMatch: false
});

/** @namespace Store/NoMatch/Reducer/NoMatchReducer */
export const NoMatchReducer: Reducer<NoMatchStore, UpdateNoMatchAction> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case NoMatchActionType.UPDATE_NOMATCH:
        const { noMatch } = action;

        return { noMatch };

    default:
        return state;
    }
};

export default NoMatchReducer;
