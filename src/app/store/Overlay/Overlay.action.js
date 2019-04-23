export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';
export const HIDE_ACTIVE_OVERLAY = 'HIDE_ACTIVE_OVERLAY';

export const toggleOverlayByKey = overlayKey => ({
    type: TOGGLE_OVERLAY,
    overlayKey
});

export const hideActiveOverlay = () => ({
    type: HIDE_ACTIVE_OVERLAY
});
