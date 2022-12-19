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

import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { updateNavigationStore } from './Navigation.action';
import { NavigationState, NavigationType } from './Navigation.type';

/**
 * My account actions
 * @class MyAccount
 * @namespace Store/Navigation/Dispatcher */
export class NavigationDispatcher extends SimpleDispatcher {
    changeNavigationState(navigationType: NavigationType, navigationState: NavigationState) {
        if (!navigationType) {
            return;
        }

        const {
            NavigationReducer: {
                [navigationType]: {
                    navigationStateHistory,
                    navigationState: prevNavigationState,
                },
            },
        } = this.storeState;
        const { name: nextName, force = false } = navigationState;
        const { name: prevName } = prevNavigationState;

        if (nextName === prevName && !force) {
            navigationStateHistory[navigationStateHistory.length - 1] = navigationState;
        } else {
            navigationStateHistory.push(navigationState);
        }

        this.dispatch(updateNavigationStore({
            [navigationType]: {
                navigationStateHistory,
                navigationState,
            },
        }));
    }

    goToPreviousNavigationState(navigationType: NavigationType) {
        if (!navigationType) {
            return;
        }

        const {
            NavigationReducer: {
                [navigationType]: {
                    navigationStateHistory,
                },
            },
        } = this.storeState;

        navigationStateHistory.pop();
        const newNavigationState = navigationStateHistory.slice(-1)[0];

        if (!newNavigationState) {
            return;
        }

        this.dispatch(updateNavigationStore({
            [navigationType]: {
                navigationStateHistory,
                navigationState: newNavigationState,
            },
        }));
    }
}

export default new NavigationDispatcher();
