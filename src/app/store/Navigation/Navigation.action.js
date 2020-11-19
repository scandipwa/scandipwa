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

export const CHANGE_NAVIGATION_STATE = 'CHANGE_NAVIGATION_STATE';
export const GOTO_PREVIOUS_NAVIGATION_STATE = 'GOTO_PREVIOUS_NAVIGATION_STATE';

/** @namespace Store/Navigation/Action/changeNavigationState */
export const changeNavigationState = (navigationType, navigationState) => ({
    type: CHANGE_NAVIGATION_STATE,
    navigationType,
    navigationState
});

/** @namespace Store/Navigation/Action/goToPreviousNavigationState */
export const goToPreviousNavigationState = (navigationType) => ({
    type: GOTO_PREVIOUS_NAVIGATION_STATE,
    navigationType
});
