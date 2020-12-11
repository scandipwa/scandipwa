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

import { HIDE_ACTIVE_OVERLAY } from 'Store/Overlay/Overlay.action';

import { SHOW_POPUP } from './Popup.action';

/** @namespace Store/Popup/Reducer/getInitialState */
export const getInitialState = () => ({
    popupPayload: {}
});

/** @namespace Store/Popup/Reducer */
export const PopupReducer = (
    state = getInitialState(),
    action
) => {
    const { payload, type } = action;

    switch (type) {
    case SHOW_POPUP:
        return { ...state, popupPayload: payload };
    case HIDE_ACTIVE_OVERLAY:
        return { ...state, popupPayload: {} };
    default:
        return state;
    }
};

export default PopupReducer;
