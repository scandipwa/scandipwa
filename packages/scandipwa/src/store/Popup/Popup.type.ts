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
import { AnyAction } from 'redux';

import { HideActiveOverlayAction, HideActivePopupAction } from 'Store/Overlay/Overlay.type';

export enum PopupActionType {
    SHOW_POPUP = 'SHOW_POPUP'
}

export interface ShowPopupAction<OverlayKey extends string, Payload> extends AnyAction {
    type: PopupActionType.SHOW_POPUP;
    overlayKey: OverlayKey;
    payload: Record<OverlayKey, Payload>;
}

export type PopupType = ShowPopupAction<string, unknown>
| HideActiveOverlayAction
| HideActivePopupAction;

export type PopupStore = {
    popupPayload: Record<string, unknown>;
    shouldPopupClose: boolean;
    payload: Record<string, unknown> | boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        PopupReducer: PopupStore;
    }
}
