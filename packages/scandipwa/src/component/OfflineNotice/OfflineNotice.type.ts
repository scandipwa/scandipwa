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

import { OfflineStore } from 'Store/Offline/Offline.type';

export interface OfflineNoticeContainerMapStateProps {
    isOffline: boolean;
    isBig: boolean;
}

export interface OfflineNoticeContainerMapDispatchProps {
    updateOfflineStore: (state: Partial<OfflineStore>) => void;
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
