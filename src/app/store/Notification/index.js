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

import NotificationReducer from './Notification.reducer';
import {
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    SET_BROWSER_PERMISSION,
    showNotification,
    hideNotification,
    setBrowserPermission
} from './Notification.action';

export const DEFAULT = 'default';
export const DENIED = 'denied';
export const GRANTED = 'granted';

export {
    showNotification,
    SET_BROWSER_PERMISSION,
    setBrowserPermission,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    hideNotification,
    NotificationReducer
};
