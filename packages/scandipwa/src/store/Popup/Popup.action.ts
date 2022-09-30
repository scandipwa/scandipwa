/* eslint-disable import/prefer-default-export */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PopupActionType, ShowPopupAction } from './Popup.type';

/** @namespace Store/Popup/Action/showPopup */
export const showPopup = <T>(overlayKey: string, payload: T): ShowPopupAction<string, T> => ({
    type: PopupActionType.SHOW_POPUP,
    overlayKey,
    payload: { [overlayKey]: payload },
});
