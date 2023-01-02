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

export interface OfflineNoticeContainerMapStateProps {
    isOffline: boolean;
    isBig: boolean;
}

export interface OfflineNoticeContainerMapDispatchProps {
    showOfflineNotice: (isOffline: boolean) => void;
    setBigOfflineNotice: (isBig: boolean) => void;
}

export interface OfflineNoticeContainerBaseProps {
    isPage?: boolean;
}

export type OfflineNoticeContainerProps = OfflineNoticeContainerMapStateProps
& OfflineNoticeContainerMapDispatchProps
& OfflineNoticeContainerBaseProps
& RouteComponentProps;

export interface OfflineNoticeComponentProps {
    isPage?: boolean;
    isBig: boolean;
}

export type OfflineNoticeContainerPropsKeys =
| 'isBig'
| 'isPage';

export interface OfflineNoticeComponentState {}

export interface OfflineNoticeContainerState {}
