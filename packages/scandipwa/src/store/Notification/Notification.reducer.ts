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
    NotificationActionType,
    NotificationStore,
} from './Notification.type';

/** @namespace Store/Notification/Reducer/getInitialState */
export const getInitialState = (): NotificationStore => ({
    notifications: {},
});

/** @namespace Store/Notification/Reducer/NotificationReducer */
export const NotificationReducer: Reducer<NotificationStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (NotificationActionType.UPDATE_NOTIFICTION_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default NotificationReducer;
