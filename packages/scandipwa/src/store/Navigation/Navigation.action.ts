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

import {
    ChangeNavigationStateAction,
    GoToPreviousNavigationStateAction,
    NavigationActionType,
    NavigationState,
    NavigationType
} from './Navigation.type';

/** @namespace Store/Navigation/Action/changeNavigationState */
export const changeNavigationState = (
    navigationType: NavigationType,
    navigationState: NavigationState
): ChangeNavigationStateAction => ({
    type: NavigationActionType.CHANGE_NAVIGATION_STATE,
    navigationType,
    navigationState
});

/** @namespace Store/Navigation/Action/goToPreviousNavigationState */
export const goToPreviousNavigationState = (navigationType: NavigationType): GoToPreviousNavigationStateAction => ({
    type: NavigationActionType.GOTO_PREVIOUS_NAVIGATION_STATE,
    navigationType
});
