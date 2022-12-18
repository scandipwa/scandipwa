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

import {
    NotificationActionType,
    NotificationStore,
    UpdateNotificationStoreAction,
} from './Notification.type';

/** @namespace Store/Notification/Action/updateNotificationStore */
export const updateNotificationStore = (state: Partial<NotificationStore>): UpdateNotificationStoreAction => ({
    type: NotificationActionType.UPDATE_NOTIFICTION_STORE,
    state,
});
