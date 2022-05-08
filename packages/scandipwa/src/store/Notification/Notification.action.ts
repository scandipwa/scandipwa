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
    HideNotificationAction,
    NotificationActionType,
    NotificationType,
    ShowNotificationAction
} from './Notification.type';

/**
 * Show notification (append to notification to global notification map).
 * @param  {String} msgType
 * @param  {String} msgText
 * @param  {any} msgDebug
 * @return {void}
 * @namespace Store/Notification/Action/showNotification
 */
export const showNotification = <T>(
    msgType: NotificationType,
    msgText: string,
    msgDebug?: T
): ShowNotificationAction<T> => ({
        type: NotificationActionType.SHOW_NOTIFICATION,
        msgType,
        msgText,
        msgDebug
    });

/**
 * Hide notification with specific id (drop notification from global list).
 * @param  {string} id
 * @return {void}
 * @namespace Store/Notification/Action/hideNotification
 */
export const hideNotification = (id: string): HideNotificationAction => ({
    type: NotificationActionType.HIDE_NOTIFICATION,
    id
});
