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

import { Page } from 'Component/Header/Header.config';
import { MyAccountAddressPopupAction } from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { MyAccountAddressPopupPayload } from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.type';
import { VIDEO_POPUP_ID } from 'Component/VideoPopup/VideoPopup.config';
import { VideoPopupPayload } from 'Component/VideoPopup/VideoPopup.type';
import {
    HideActiveOverlayAction,
    HideActivePopupAction
} from 'Store/Overlay/Overlay.type';

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
    popupPayload: PopupPayload;
    shouldPopupClose: boolean;
    payload: Record<string, unknown>;
};

export type PopupPayload = {
    [MyAccountAddressPopupAction.ADDRESS_POPUP_ID]: MyAccountAddressPopupPayload;
    [Page.CUSTOMER_ACCOUNT]: unknown;
    [VIDEO_POPUP_ID]: VideoPopupPayload;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        PopupReducer: PopupStore;
    }
}
