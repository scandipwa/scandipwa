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

import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Device } from 'Type/Device.type';

export interface ProductComparePageContainerMapStateProps {
    device: Device;
    isLoading: boolean;
}

export interface ProductComparePageContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    setHeaderState: (stateName: NavigationState) => void;
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

export type ProductComparePageContainerProps = ProductComparePageContainerMapStateProps
& ProductComparePageContainerMapDispatchProps
& RouteComponentProps;

export interface ProductComparePageComponentState {}

export interface ProductComparePageContainerState {}

export interface ProductComparePageComponentProps {
    isLoading: boolean;
}
