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

export const SHOW_POPUP = 'SHOW_POPUP';

/** @namespace Store/Popup/Action/showPopup */
export const showPopup = (overlayKey, payload) => ({
    type: SHOW_POPUP,
    overlayKey,
    payload: { [overlayKey]: payload }
});
