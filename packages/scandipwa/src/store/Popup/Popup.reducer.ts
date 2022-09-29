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
import { Reducer } from 'redux';

import { OverlayActionType } from 'Store/Overlay/Overlay.type';

import {
    PopupActionType,
    PopupStore,
    PopupType,
} from './Popup.type';

/** @namespace Store/Popup/Reducer/getInitialState */
export const getInitialState = (): PopupStore => ({
    popupPayload: {},
    shouldPopupClose: false,
    payload: {},
});

/** @namespace Store/Popup/Reducer/PopupReducer */
export const PopupReducer: Reducer<
PopupStore,
PopupType
> = (
    state = getInitialState(),
    action,
) => {
    const { payload, type } = action;

    switch (type) {
    case PopupActionType.SHOW_POPUP:
        return { ...state, popupPayload: payload };
    case OverlayActionType.HIDE_ACTIVE_OVERLAY:
        return { ...state, popupPayload: {} };
    case OverlayActionType.HIDE_ACTIVE_POPUP:
        return { ...state, shouldPopupClose: payload };
    default:
        return state;
    }
};

export default PopupReducer;
