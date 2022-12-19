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
    DEFAULT_STATE,
} from 'Component/NavigationAbstract/NavigationAbstract.container';

import {
    NavigationAction, NavigationActionType, NavigationStore, NavigationType,
} from './Navigation.type';

/** @namespace Store/Navigation/Reducer/getInitialState */
export const getInitialState = (): NavigationStore => ({
    [NavigationType.TOP_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE],
    },
    [NavigationType.BOTTOM_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE],
    },
});

/** @namespace Store/Navigation/Reducer/NavigationReducer */
export const NavigationReducer: Reducer<NavigationStore, NavigationAction> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (NavigationActionType.UPDATE_NAVIGATION_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default NavigationReducer;
