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
import { Reducer } from 'redux';

import { HIDE_ACTIVE_OVERLAY, HIDE_ACTIVE_POPUP } from 'Store/Overlay/Overlay.action';

import { SHOW_POPUP } from './Popup.action';
import { PopupAction, PopupStore } from './type';

/** @namespace Store/Popup/Reducer/getInitialState */
export const getInitialState = (): PopupStore => ({
    popupPayload: {},
    shouldPopupClose: false,
    payload: {}
});

/** @namespace Store/Popup/Reducer/PopupReducer */
export const PopupReducer: Reducer<
PopupStore,
PopupAction & PopupStore
> = (
    state = getInitialState(),
    action
) => {
    const { payload, type } = action;

    switch (type) {
    case SHOW_POPUP:
        return { ...state, popupPayload: payload };
    case HIDE_ACTIVE_OVERLAY:
        return { ...state, popupPayload: {} };
    case HIDE_ACTIVE_POPUP:
        return { ...state, shouldPopupClose: payload };
    default:
        return state;
    }
};

export default PopupReducer;
