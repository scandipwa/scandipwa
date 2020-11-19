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

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

/**
 * Show notification (append to notification to global notification map).
 * @param  {String} msgType
 * @param  {String} msgText
 * @param  {any} msgDebug
 * @return {void}
 * @namespace Store/Notification/Action/showNotification
 */
export const showNotification = (msgType, msgText, msgDebug) => ({
    type: SHOW_NOTIFICATION,
    msgType,
    msgText,
    msgDebug
});

/**
 * Hide notification with specific id (drop notification from global list).
 * @param  {number} id
 * @return {void}
 * @namespace Store/Notification/Action/hideNotification
 */
export const hideNotification = (id) => ({
    type: HIDE_NOTIFICATION,
    id
});
