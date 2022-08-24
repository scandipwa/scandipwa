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

import { RouteComponentProps } from 'react-router';

import { Notification } from 'Store/Notification/Notification.type';

export interface NotificationListContainerMapStateProps {
    notifications: Record<string, Notification<unknown>>;
}

export interface NotificationListContainerMapDispatchProps {
    onHideNotification: (id: string) => void;
}

export type NotificationListComponentProps = NotificationListContainerMapStateProps
& NotificationListContainerMapDispatchProps
& RouteComponentProps;
