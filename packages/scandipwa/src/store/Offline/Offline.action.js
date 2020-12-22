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

export const SHOW_OFFLINE_NOTICE = 'SHOW_OFFLINE_NOTICE';
export const SET_BIG_OFFLINE_NOTICE = 'SET_BIG_OFFLINE_NOTICE';

/**
 * Show offline notice.
 * @param  {boolean} msgType
 * @return {void}
 * @namespace Store/Offline/Action/showOfflineNotice
 */
export const showOfflineNotice = (isOffline) => ({
    type: SHOW_OFFLINE_NOTICE,
    isOffline
});

/**
 * Set offline notice size to big.
 * @param  {boolean} isBig
 * @return {void}
 * @namespace Store/Offline/Action/setBigOfflineNotice
 */
export const setBigOfflineNotice = (isBig) => ({
    type: SET_BIG_OFFLINE_NOTICE,
    isBig
});
