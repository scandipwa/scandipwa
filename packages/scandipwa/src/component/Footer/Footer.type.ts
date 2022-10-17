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

import { Mods } from 'Type/Common.type';
import { Device } from 'Type/Device.type';

export interface FooterContainerMapStateProps {
    copyright: string;
    device: Device;
    newsletterActive: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterContainerMapDispatchProps {}

export interface FooterContainerFunctions {
    onItemClick: () => void;
}

export type FooterContainerProps = FooterContainerMapStateProps
& FooterContainerMapDispatchProps
& {
    isVisibleOnMobile: boolean;
};

export interface FooterComponentProps {
    copyright: string;
    isVisibleOnMobile: boolean;
    device: Device;
    newsletterActive: boolean;
    onItemClick: () => void;
}

export type FooterContainerPropsKeys =
    | 'copyright'
    | 'isVisibleOnMobile'
    | 'device'
    | 'newsletterActive';

export interface FooterRenderColumn {
    title: string;
    items: FooterRenderColumnItem[];
    isItemsHorizontal?: boolean;
    columnActiveKey?: string;
    mods?: Mods;
}

export interface FooterRenderColumnItem {
    href?: string;
    title?: string;
    src?: string;
    render?: string;
}
