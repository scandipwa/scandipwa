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
import { Action } from 'redux';

import { HIDE_ACTIVE_OVERLAY, HIDE_ACTIVE_POPUP } from 'Store/Overlay/Overlay.action';

import { SHOW_POPUP } from './Popup.action';

export type PopupStore = {
    popupPayload: Record<string, unknown>;
    shouldPopupClose: boolean;
    payload: Record<string, unknown> | boolean;
};

export type PopupAction = Action<typeof HIDE_ACTIVE_OVERLAY | typeof HIDE_ACTIVE_POPUP | typeof SHOW_POPUP>;

declare module 'Util/Store/type' {
    export interface RootState {
        PopupReducer: PopupStore;
    }
}
