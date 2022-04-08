/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

export enum NavigationActionType {
    CHANGE_NAVIGATION_STATE = 'CHANGE_NAVIGATION_STATE',
    GOTO_PREVIOUS_NAVIGATION_STATE = 'GOTO_PREVIOUS_NAVIGATION_STATE'
}

export enum NavigationType {
    TOP_NAVIGATION_TYPE = 'TOP_NAVIGATION_TYPE',
    BOTTOM_NAVIGATION_TYPE = 'BOTTOM_NAVIGATION_TYPE'
}

export type NavigationState = {
    name: string;
    force?: boolean;
};

export interface ChangeNavigationStateAction extends AnyAction {
    type: NavigationActionType.CHANGE_NAVIGATION_STATE;
    navigationType: NavigationType;
    navigationState: NavigationState;
}

export interface GoToPreviousNavigationStateAction extends AnyAction {
    type: NavigationActionType.GOTO_PREVIOUS_NAVIGATION_STATE;
    navigationType: NavigationType;
}

export type NavigationAction = ChangeNavigationStateAction | GoToPreviousNavigationStateAction;

export type NavigationStore = {
    [NavigationType.TOP_NAVIGATION_TYPE]: {
        navigationState: NavigationState;
        navigationStateHistory: NavigationState[];
    };
    [NavigationType.BOTTOM_NAVIGATION_TYPE]: {
        navigationState: NavigationState;
        navigationStateHistory: NavigationState[];
    };
};

declare module 'Util/Store/type' {
    export interface RootState {
        NavigationReducer: NavigationStore;
    }
}
