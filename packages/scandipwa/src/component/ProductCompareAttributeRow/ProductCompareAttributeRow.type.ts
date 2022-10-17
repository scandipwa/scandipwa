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

export interface ProductCompareAttributeRowContainerMapStateProps {
    device: Device;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductCompareAttributeRowContainerMapDispatchProps {}

export interface ProductCompareAttributeRowContainerBaseProps {
    title: string;
    values: string[];
}

export type ProductCompareAttributeRowContainerProps = ProductCompareAttributeRowContainerMapStateProps
& ProductCompareAttributeRowContainerMapDispatchProps
& ProductCompareAttributeRowContainerBaseProps;

export interface ProductCompareAttributeRowComponentProps {
    title: string;
    values: string[];
    device: Device;
}
