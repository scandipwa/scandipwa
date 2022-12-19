/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { MouseEvent } from 'react';
import { AnyAction } from 'redux';

export enum NavigationActionType {
    UPDATE_NAVIGATION_STORE = 'UPDATE_NAVIGATION_STORE',
}

export enum NavigationType {
    TOP_NAVIGATION_TYPE = 'TOP_NAVIGATION_TYPE',
    BOTTOM_NAVIGATION_TYPE = 'BOTTOM_NAVIGATION_TYPE',
}

export interface NavigationState {
    force?: boolean;
    hiddenElements?: string[];
    isHidden?: boolean;
    isHiddenOnMobile?: boolean;
    name: string;
    onBackClick?: (e: MouseEvent) => void;
    onCancelClick?: (e?: MouseEvent) => void;
    onCloseClick?: (e?: MouseEvent) => void;
    onEditClick?: (e?: MouseEvent) => void;
    onOkClick?: (e?: MouseEvent) => void;
    shouldNotGoToPrevState?: boolean;
    title?: string;
}

export interface UpdateNavigationStoreAction extends AnyAction {
    type: NavigationActionType.UPDATE_NAVIGATION_STORE;
    state: Partial<NavigationState>;
}

export type NavigationAction = UpdateNavigationStoreAction;

export interface NavigationStore {
    [NavigationType.TOP_NAVIGATION_TYPE]: {
        navigationState: NavigationState;
        navigationStateHistory: NavigationState[];
    };
    [NavigationType.BOTTOM_NAVIGATION_TYPE]: {
        navigationState: NavigationState;
        navigationStateHistory: NavigationState[];
    };
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        NavigationReducer: NavigationStore;
    }
}
