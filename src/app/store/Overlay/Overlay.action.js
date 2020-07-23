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

export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';
export const HIDE_ACTIVE_OVERLAY = 'HIDE_ACTIVE_OVERLAY';

export const toggleOverlayByKey = (overlayKey) => ({
    type: TOGGLE_OVERLAY,
    overlayKey
});

export const hideActiveOverlay = () => ({
    type: HIDE_ACTIVE_OVERLAY
});
