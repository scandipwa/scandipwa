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
    DEFAULT_STATE
} from 'Component/NavigationAbstract/NavigationAbstract.container';

import {
    NavigationAction,
    NavigationActionType,
    NavigationStore,
    NavigationType
} from './Navigation.type';

/** @namespace Store/Navigation/Reducer/getInitialState */
export const getInitialState = (): NavigationStore => ({
    [NavigationType.TOP_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE]
    },
    [NavigationType.BOTTOM_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE]
    }
});

/** @namespace Store/Navigation/Reducer/NavigationReducer */
export const NavigationReducer: Reducer<NavigationStore, NavigationAction> = (
    state = getInitialState(),
    action
) => {
    const { navigationType, navigationState } = action;

    const {
        [navigationType]: {
            navigationStateHistory,
            navigationState: prevNavigationState
        }
    } = state;

    switch (action.type) {
    case NavigationActionType.CHANGE_NAVIGATION_STATE:
        const { name: nextName, force = false } = navigationState;
        const { name: prevName } = prevNavigationState;

        if (nextName === prevName && !force) {
            navigationStateHistory[navigationStateHistory.length - 1] = navigationState;
        } else {
            navigationStateHistory.push(navigationState);
        }

        return {
            ...state,
            [navigationType]: {
                navigationStateHistory,
                navigationState
            }
        };

    case NavigationActionType.GOTO_PREVIOUS_NAVIGATION_STATE:
        navigationStateHistory.pop();
        const newNavigationState = navigationStateHistory.slice(-1)[0];

        if (!newNavigationState) {
            return state;
        }

        return {
            ...state,
            [navigationType]: {
                navigationStateHistory,
                navigationState: newNavigationState
            }
        };

    default:
        return state;
    }
};

export default NavigationReducer;
