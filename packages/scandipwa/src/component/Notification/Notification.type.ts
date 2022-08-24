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

import { Notification } from 'Store/Notification/Notification.type';

export interface NotificationComponentProps {
    notificationId: string;
    notification: Notification<unknown>;
    onHideNotification: (id: string) => void;
    lifeTime: number;
    id: string;
}

export interface NotificationComponentState {
    isNotificationVisible: boolean;
}
