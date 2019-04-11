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
export const SET_BROWSER_PERMISSION = 'SET_BROWSER_PERMISSION';

/**
 * Show notification (append to notification to global notification map).
 * @param  {String} msgType
 * @param  {String} msgText
 * @param  {any} msgDebug
 * @return {void}
 */
const showNotification = (msgType, msgText, msgDebug, options) => ({
    type: SHOW_NOTIFICATION,
    msgType,
    msgText,
    msgDebug,
    options
});

/**
 * Hide notification with specific id (drop notification from global list).
 * @param  {number} id
 * @return {void}
 */
const hideNotification = id => ({
    type: HIDE_NOTIFICATION,
    id
});

const setBrowserPermission = value => ({
    type: SET_BROWSER_PERMISSION,
    value
});

export {
    showNotification,
    hideNotification,
    setBrowserPermission
};
