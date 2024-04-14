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

import { ErrorInfo, ReactElement, ReactNode } from 'react';

import { PrintTypes } from 'Component/MyAccountOrderPrint/MyAccountOrderPrint.config';
import { PageMeta } from 'Store/Meta/Meta.type';
import { Device } from 'Type/Device.type';

import { RouterAfterItemType, RouterBeforeItemType, RouterSwitchItemType } from './Router.config';

export interface RouterContainerMapStateProps {
    isLoading: boolean;
    default_description: string;
    default_keywords: string;
    default_title: string;
    title_prefix: string;
    title_suffix: string;
    meta_title?: string;
    device: Device;
    isOffline: boolean;
    isBigOffline: boolean;
    status_code?: string;
    base_link_url: string;
    isMobile: boolean;
    canonical_url?: string;
    demo_notice: boolean;
}

export interface RouterContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
    setBigOfflineNotice: (isBig: boolean) => void;
    updateConfigDevice: (device: Device) => void;
    init: () => void;
}

export type RouterContainerProps = RouterContainerMapStateProps
& RouterContainerMapDispatchProps;

export interface RouterContainerState {
    currentUrl: string;
    isOnlyMainItems: boolean;
}

export interface RouterComponentProps {
    isBigOffline: boolean;
    currentUrl: string;
    setBigOfflineNotice: (isBig: boolean) => void;
    isOnlyMainItems: boolean;
    isMobile: boolean;
}

export type RouterContainerPropsKeys = 'isBigOffline'
| 'setBigOfflineNotice'
| 'isOnlyMainItems'
| 'currentUrl'
| 'isMobile';

export interface RouterComponentState {
    errorDetails: {
        err: Error;
        info: ErrorInfo;
    } | EmptyObject;
    hasError: boolean;
}

export interface RouterItem {
    component: ReactElement;
    position: number;
    name: RouterBeforeItemType | RouterSwitchItemType | RouterAfterItemType | PrintTypes;
    fallback?: ReactNode;
    inline?: boolean;
}
