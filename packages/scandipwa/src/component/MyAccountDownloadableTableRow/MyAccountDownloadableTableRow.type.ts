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

import { CustomerDownloadableProductExtended } from 'Component/MyAccountDownloadable/MyAccountDownloadable.type';
import { Device } from 'Type/Device.type';

export interface MyAccountDownloadableTableRowContainerMapStateProps {
    device: Device;
    isOpenInNewTab: boolean;
}

export interface MyAccountDownloadableTableRowContainerFunctions {
    onOrderIdClick: () => void;
}

export type MyAccountDownloadableTableRowContainerProps = MyAccountDownloadableTableRowContainerMapStateProps & {
    order: Partial<CustomerDownloadableProductExtended>;
};

export interface MyAccountDownloadableTableRowComponentProps {
    order: Partial<CustomerDownloadableProductExtended>;
    onOrderIdClick: () => void;
    isOpenInNewTab: boolean;
}
