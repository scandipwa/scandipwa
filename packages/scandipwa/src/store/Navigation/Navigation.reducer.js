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

import {
    DEFAULT_STATE
} from 'Component/NavigationAbstract/NavigationAbstract.container';

import {
    CHANGE_NAVIGATION_STATE,
    GOTO_PREVIOUS_NAVIGATION_STATE
} from './Navigation.action';

export const TOP_NAVIGATION_TYPE = 'TOP_NAVIGATION_TYPE';
export const BOTTOM_NAVIGATION_TYPE = 'BOTTOM_NAVIGATION_TYPE';

/** @namespace Store/Navigation/Reducer/getInitialState */
export const getInitialState = () => ({
    [TOP_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE]
    },
    [BOTTOM_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE]
    }
});

/** @namespace Store/Navigation/Reducer */
export const NavigationReducer = (
    state = getInitialState(),
    action
) => {
    const { navigationType, navigationState } = action;

    const {
        [navigationType]: {
            navigationStateHistory,
            navigationState: prevNavigationState
        } = {}
    } = state;

    switch (action.type) {
    case CHANGE_NAVIGATION_STATE:
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

    case GOTO_PREVIOUS_NAVIGATION_STATE:
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
