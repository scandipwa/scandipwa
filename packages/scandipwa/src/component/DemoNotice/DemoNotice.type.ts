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

import { Device } from 'Type/Device.type';

export interface DemoNoticeContainerMapStateProps {
    isDemoNoticeEnabled: boolean;
    device: Device;
}

export interface DemoNoticeContainerMapDispatchProps {}

export interface DemoNoticeComponentProps {
    isDemoNoticeEnabled: boolean;
    device: Device;
}

export interface DemoNoticeComponentState {}
