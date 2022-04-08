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

import { PopupActionType } from 'Store/Popup/Popup.type';

import {
    OverlayAction,
    OverlayActionType,
    OverlayStore
} from './Overlay.type';

/** @namespace Store/Overlay/Reducer/getInitialState */
export const getInitialState = (): OverlayStore => ({
    activeOverlay: '',
    areOtherOverlaysOpen: false
});

/** @namespace Store/Overlay/Reducer/OverlayReducer */
export const OverlayReducer: Reducer<OverlayStore, OverlayAction> = (
    state = getInitialState(),
    action
) => {
    const { overlayKey } = action;
    const {
        activeOverlay: prevActiveOverlay
    } = state;

    switch (action.type) {
    case OverlayActionType.TOGGLE_OVERLAY:
    case PopupActionType.SHOW_POPUP:
        const activeOverlay = prevActiveOverlay === overlayKey ? '' : overlayKey;
        const areOtherOverlaysOpen = prevActiveOverlay !== '';

        return {
            ...state,
            activeOverlay,
            areOtherOverlaysOpen
        };

    case OverlayActionType.HIDE_ACTIVE_OVERLAY:
        return {
            ...state,
            activeOverlay: '',
            areOtherOverlaysOpen: false
        };

    default:
        return state;
    }
};

export default OverlayReducer;
