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

import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { updateNotificationStore } from './Notification.action';
import { NotificationType } from './Notification.type';

/** @namespace Store/Notification/Dispatcher */
export class NotificationDispatcher extends SimpleDispatcher {
    showNotification<T>(
        msgType: NotificationType,
        msgText: string,
        msgDebug?: T,
    ): void {
        const {
            NotificationReducer: {
                notifications = {},
            } = {},
        } = this.storeState;

        notifications[Date.now()] = { msgType, msgText, msgDebug };

        this.dispatch(updateNotificationStore({ notifications }));
    }

    hideNotification(actionId: string): void {
        const {
            NotificationReducer: {
                notifications = {},
            } = {},
        } = this.storeState;

        const { [actionId]: id, ...shownNotifications } = notifications;

        this.dispatch(updateNotificationStore({ notifications: shownNotifications }));
    }
}

export default new NotificationDispatcher();
