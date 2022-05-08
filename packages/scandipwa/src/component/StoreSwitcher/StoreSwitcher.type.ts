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

export interface StoreSwitcherContainerMapStateProps {
    device: Device;
    currentStoreCode?: string;
}

export interface StoreSwitcherContainerMapDispatchProps {
    showErrorNotification: (message: string) => void;
}

export type StoreSwitcherContainerProps = StoreSwitcherContainerMapStateProps
& StoreSwitcherContainerMapDispatchProps
& {
    prevStoreCode?: string;
};

export interface StoreSwitcherContainerState {
    storeList: FormattedStore[];
    isOpened: boolean;
    storeLabel: string;
}

export interface StoreSwitcherComponentProps {
    currentStoreCode: string;
    device: Device;
    isOpened: boolean;
    storeLabel: string;
    storeList: FormattedStore[];
    handleStoreSelect: (storeCode: string) => void;
    onStoreSwitcherClick: () => void;
    onStoreSwitcherOutsideClick: () => void;
}

export interface FormattedStore {
    id: string;
    value: string;
    storeUrl: string;
    storeLinkUrl: string;
    label: string;
}
