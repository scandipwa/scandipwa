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

import {
    TOGGLE_OVERLAY,
    HIDE_ACTIVE_OVERLAY
} from './Overlay.action';

const initialState = {
    activeOverlay: '',
    areOtherOverlaysOpen: false
};

const OverlayReducer = (state = initialState, action) => {
    switch (action.type) {
    case TOGGLE_OVERLAY:
        const { overlayKey } = action;
        const { activeOverlay: prevActiveOverlay } = state;
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

    default:
        return state;
    }
};

export default OverlayReducer;
