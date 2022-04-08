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

import { Reducer } from 'react';

import { NotificationAction, NotificationActionType, NotificationStore } from './Notification.type';

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
        const { msgType, msgText, msgDebug } = action;
        notifications[Date.now()] = { msgType, msgText, msgDebug };

        return {
            ...state,
            notifications
        };

    case NotificationActionType.HIDE_NOTIFICATION:
        const { [action.id]: id, ...shownNotifications } = notifications;

        return {
            ...state,
            notifications: shownNotifications
        };

    default:
        return state;
    }
};

export default NotificationReducer;
