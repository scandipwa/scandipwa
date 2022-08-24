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

import { Reducer } from 'redux';

import {
    NotificationAction,
    NotificationActionType,
    NotificationStore,
    NotificationType
} from './Notification.type';

/** @namespace Store/Notification/Reducer/getInitialState */
export const getInitialState = (): NotificationStore => ({
    notifications: {}
});

/** @namespace Store/Notification/Reducer/NotificationReducer */
export const NotificationReducer: Reducer<NotificationStore, NotificationAction> = (
    state = getInitialState(),
    action
) => {
    const notifications = { ...state.notifications };

    switch (action.type) {
    case NotificationActionType.SHOW_NOTIFICATION:
        const { msgType = NotificationType.INFO, msgText = '', msgDebug } = action;
        notifications[Date.now()] = { msgType, msgText, msgDebug };

        return {
            ...state,
            notifications
        };

    case NotificationActionType.HIDE_NOTIFICATION: {
        const { id: actionId = '' } = action;
        const { [actionId]: id, ...shownNotifications } = notifications;

        return {
            ...state,
            notifications: shownNotifications
        };
    }
    default:
        return state;
    }
};

export default NotificationReducer;
