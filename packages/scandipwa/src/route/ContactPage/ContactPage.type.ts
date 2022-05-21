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

import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';

export interface ContactPageMapStateProps {
    isMobile: boolean;
}

export interface ContactPageMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    setHeaderState: (stateName: NavigationState) => void;
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

export type ContactPageContainerProps = ContactPageMapStateProps
& ContactPageMapDispatchProps
& RouteComponentProps;

export interface ContactPageContainerState {
    isLoading: boolean;
    isEnabled: boolean;
}

export interface ContactPageComponentProps {
    isMobile: boolean;
    isLoading: boolean;
    isEnabled: boolean;
}
