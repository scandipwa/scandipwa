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

import { SHOW_POPUP } from 'Store/Popup/Popup.action';

import {
    HIDE_ACTIVE_OVERLAY,
    HIDE_OVERLAY,
    TOGGLE_OVERLAY
} from './Overlay.action';

export const initialState = {
    activeOverlay: '',
    areOtherOverlaysOpen: false
};

export const OverlayReducer = (state = initialState, action) => {
    const { overlayKey } = action;
    const {
        activeOverlay: prevActiveOverlay
    } = state;

    switch (action.type) {
    case TOGGLE_OVERLAY:
    case SHOW_POPUP:
        const activeOverlay = prevActiveOverlay === overlayKey ? '' : overlayKey;
        const areOtherOverlaysOpen = prevActiveOverlay !== '';

        return {
            ...state,
            activeOverlay,
            areOtherOverlaysOpen
        };

    case HIDE_ACTIVE_OVERLAY:
        return {
            ...state,
            activeOverlay: '',
            areOtherOverlaysOpen: false
        };

        case HIDE_OVERLAY:
            const overlayActive = prevActiveOverlay === overlayKey ? '' : -1;
            if(overlayActive === -1) {
                return state;
            }
            return {
                ...state,
                activeOverlay: overlayActive
            };
        default:
            return state;
    }
};

export default OverlayReducer;
