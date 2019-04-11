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
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    SET_BROWSER_PERMISSION
} from './Notification.action';

export const DEFAULT = 'default';
export const DENIED = 'denied';
export const GRANTED = 'granted';

let notificationId = 0;

const initialState = {
    nativeSupported: Boolean('Notification' in window && window.Notification),
    nativeGrantType: Notification.permission,
    notifications: {}
};

const NotificationReducer = (state = initialState, action) => {
    const notifications = { ...state.notifications };

    switch (action.type) {
    case SHOW_NOTIFICATION:
        const {
            msgType,
            msgText,
            msgDebug,
            options
        } = action;
        notifications[notificationId++] = {
            msgType,
            msgText,
            msgDebug,
            options
        };

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

    case SET_BROWSER_PERMISSION:
        const { value: nativeGranted } = action;

        return {
            ...state,
            nativeGranted
        };

    default:
        return state;
    }
};

export default NotificationReducer;
