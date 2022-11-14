/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { RouteComponentProps } from 'react-router';

import {
    MyAccountOverlayComponentProps,
    MyAccountOverlayContainerFunctions,
    MyAccountOverlayContainerMapDispatchProps,
    MyAccountOverlayContainerProps,
} from 'Component/MyAccountOverlay/MyAccountOverlay.type';
import { BreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { HistoryState } from 'Util/History/History.type';

export interface LoginAccountContainerMapDispatchProps extends MyAccountOverlayContainerMapDispatchProps {
    updateBreadcrumbsStore: (state: Partial<BreadcrumbsStore>) => void;
    showNotification: (type: NotificationType, message: string) => void;
}

export type LoginAccountContainerProps = LoginAccountContainerMapDispatchProps
& MyAccountOverlayContainerProps
& RouteComponentProps<EmptyObject, EmptyObject, HistoryState>;

export interface LoginAccountContainerFunctions extends MyAccountOverlayContainerFunctions {
    onCreateAccountClick: () => void;
}

export interface LoginAccountComponentProps extends MyAccountOverlayComponentProps {
    onCreateAccountClick: () => void;
}
