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

import { Device } from 'Type/Device.type';

export interface InstallPromptContainerMapStateProps {
    device: Device;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InstallPromptContainerMapDispatchProps {}

export interface InstallPromptContainerFunctions {
    handleAppInstall: () => void;
    handleBannerClose: () => void;
}

export type InstallPromptContainerProps = InstallPromptContainerMapStateProps
& InstallPromptContainerMapDispatchProps;

export interface InstallPromptContainerState {
    isBannerClosed: boolean;
    hasInstallPromptEvent: boolean;
}

export interface InstallPromptComponentProps {
    device: Device;
    isBannerClosed: boolean;
    hasInstallPromptEvent: boolean;
    handleAppInstall: () => void;
    handleBannerClose: () => void;
}
