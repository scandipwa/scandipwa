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

import { ShowPopupAction } from 'Store/Popup/Popup.type';

export enum OverlayActionType {
    TOGGLE_OVERLAY = 'TOGGLE_OVERLAY',
    HIDE_ACTIVE_OVERLAY = 'HIDE_ACTIVE_OVERLAY',
    HIDE_ACTIVE_POPUP = 'HIDE_ACTIVE_POPUP'
}

export interface ToggleOverlayByKeyAction extends AnyAction {
    type: OverlayActionType.TOGGLE_OVERLAY;
    overlayKey: string;
}

export interface HideActiveOverlayAction extends AnyAction {
    type: OverlayActionType.HIDE_ACTIVE_OVERLAY;
}

export interface HideActivePopupAction extends AnyAction {
    type: OverlayActionType.HIDE_ACTIVE_POPUP;
    payload: boolean;
}

export type OverlayAction = ToggleOverlayByKeyAction
| HideActiveOverlayAction
| HideActivePopupAction
| ShowPopupAction<string, unknown>;

export type OverlayStore = {
    activeOverlay: string;
    areOtherOverlaysOpen: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        OverlayReducer: OverlayStore;
    }
}
