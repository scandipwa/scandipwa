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

import { OfflineActionType, SetBigOfflineNoticeAction, ShowOfflineNoticeAction } from './Offline.type';

/**
 * Show offline notice.
 * @param  {boolean} msgType
 * @return {void}
 * @namespace Store/Offline/Action/showOfflineNotice
 */
export const showOfflineNotice = (isOffline: boolean): ShowOfflineNoticeAction => ({
    type: OfflineActionType.SHOW_OFFLINE_NOTICE,
    isOffline
});

/**
 * Set offline notice size to big.
 * @param  {boolean} isBig
 * @return {void}
 * @namespace Store/Offline/Action/setBigOfflineNotice
 */
export const setBigOfflineNotice = (isBig: boolean): SetBigOfflineNoticeAction => ({
    type: OfflineActionType.SET_BIG_OFFLINE_NOTICE,
    isBig
});
