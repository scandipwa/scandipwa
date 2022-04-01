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

import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from './Notification.action';

/** @namespace Store/Notification/Reducer/getInitialState */
export const getInitialState = () => ({
    notifications: {},
    isNotificationVisable: false
});

/** @namespace Store/Notification/Reducer/NotificationReducer */
export const NotificationReducer = (
    state = getInitialState(),
    action
) => {
    const notifications = { ...state.notifications };

    switch (action.type) {
    case SHOW_NOTIFICATION:
        const { msgType, msgText, msgDebug } = action;
        notifications[Date.now()] = { msgType, msgText, msgDebug };

        return {
            ...state,
            notifications,
            isNotificationVisable: true
        };

    case HIDE_NOTIFICATION:
        const { [action.id]: id, ...shownNotifications } = notifications;

        return {
            ...state,
            notifications: shownNotifications,
            isNotificationVisable: false
        };

    default:
        return state;
    }
};

export default NotificationReducer;
