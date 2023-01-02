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

import { Device } from 'Type/Device.type';

export interface NewVersionPopupContainerMapStateProps {
    device: Device;
}

export interface NewVersionPopupContainerMapDispatchProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showPopup: (payload: any) => void;
    goToPreviousHeaderState: () => void;
    hideActiveOverlay: () => void;
}

export interface NewVersionPopupContainerFunctions {
    toggleNewVersion: () => void;
    handleDismiss: () => void;
}

export type NewVersionPopupContainerProps = NewVersionPopupContainerMapStateProps
& NewVersionPopupContainerMapDispatchProps;

export interface NewVersionPopupComponentProps {
    toggleNewVersion: () => void;
    handleDismiss: () => void;
}

export interface NewVersionPopupComponentState {}

export interface NewVersionPopupContainerState {}
