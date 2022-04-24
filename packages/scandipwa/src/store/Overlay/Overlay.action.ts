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
    HideActiveOverlayAction,
    HideActivePopupAction,
    OverlayActionType,
    ToggleOverlayByKeyAction
} from './Overlay.type';

/** @namespace Store/Overlay/Action/toggleOverlayByKey */
export const toggleOverlayByKey = (overlayKey: string): ToggleOverlayByKeyAction => ({
    type: OverlayActionType.TOGGLE_OVERLAY,
    overlayKey
});

/** @namespace Store/Overlay/Action/hideActiveOverlay */
export const hideActiveOverlay = (): HideActiveOverlayAction => ({
    type: OverlayActionType.HIDE_ACTIVE_OVERLAY
});

/** @namespace Store/Overlay/Action/hideActivePopup */
export const hideActivePopup = (shouldPopupClose = true): HideActivePopupAction => ({
    type: OverlayActionType.HIDE_ACTIVE_POPUP,
    payload: shouldPopupClose
});
