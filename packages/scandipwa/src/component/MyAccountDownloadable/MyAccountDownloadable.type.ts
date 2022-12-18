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

import { CustomerDownloadableProduct } from 'Query/Order.type';
import { Device } from 'Type/Device.type';

export interface MyAccountDownloadableContainerStateProps {
    device: Device;
}

export interface MyAccountDownloadableContainerDispatchProps {
    showErrorNotification: (message: string) => Promise<void>;
    showSuccessNotification: (message: string) => Promise<void>;
}

export type MyAccountDownloadableContainerProps =
    MyAccountDownloadableContainerStateProps & MyAccountDownloadableContainerDispatchProps;

export interface MyAccountDownloadableContainerState {
    items: CustomerDownloadableProduct[];
    isLoading: boolean;
}

export type CustomerDownloadableProductExtended = Omit<
CustomerDownloadableProduct,
'date' | 'status' | 'remaining_downloads'
> & {
    id: number;
    status_label: string;
    created_at: string;
    downloads: number;
};

export interface MyAccountDownloadableComponentProps {
    items: CustomerDownloadableProductExtended[];
    isLoading: boolean;
}
