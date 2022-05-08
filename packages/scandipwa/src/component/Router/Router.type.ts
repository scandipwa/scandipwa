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

import { ErrorInfo, ReactElement } from 'react';

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
}

export interface RouterContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
    updateConfigDevice: (device: Device) => void;
    init: () => void;
}

export type RouterContainerProps = RouterContainerMapStateProps
& RouterContainerMapDispatchProps;

export interface RouterComponentProps {
    isBigOffline: boolean;
}

export interface RouterComponentState {
    errorDetails: {
        err: Error;
        info: ErrorInfo;
    } | Record<string, never>;
    hasError: boolean;
}

export type RouterItem = {
    component: ReactElement;
    position: number;
    name: RouterBeforeItemType | RouterSwitchItemType | RouterAfterItemType;
};
