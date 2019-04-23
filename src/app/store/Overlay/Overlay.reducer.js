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
