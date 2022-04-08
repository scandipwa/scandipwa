/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

export enum NotificationActionType {
    SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
    HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
}

export enum NotificationType {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success'
}

export type Notification<T> = {
    msgType: NotificationType;
    msgText: string;
    msgDebug?: T;
};

export interface ShowNotificationAction<T> extends AnyAction {
    type: NotificationActionType.SHOW_NOTIFICATION;
    msgType: NotificationType;
    msgText: string;
    msgDebug?: T;
}

export interface HideNotificationAction extends AnyAction {
    type: NotificationActionType.HIDE_NOTIFICATION;
    id: number;
}

export type NotificationAction = ShowNotificationAction<unknown> | HideNotificationAction;

export type NotificationStore = {
    notifications: Record<string, Notification<unknown>>;
};

declare module 'Util/Store/type' {
    export interface RootState {
        NotificationReducer: NotificationStore;
    }
}
