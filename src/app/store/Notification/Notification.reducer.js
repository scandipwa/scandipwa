/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './Notification.action';

let notificationId = 0;

const initialState = {
    notifications: {}
};

const NotificationReducer = (state = initialState, action) => {
    const notifications = { ...state.notifications };

    switch (action.type) {
    case SHOW_NOTIFICATION:
        const { msgType, msgText, msgDebug } = action;
        notifications[notificationId++] = { msgType, msgText, msgDebug };

        return {
            ...state,
            notifications
        };

    case HIDE_NOTIFICATION:
        delete notifications[action.id];

        return {
            ...state,
            notifications
        };

    default:
        return state;
    }
};

export default NotificationReducer;
