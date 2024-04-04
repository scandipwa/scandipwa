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
    device: Device;
    demo_notice: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DemoNoticeContainerMapDispatchProps {}

export interface DemoNoticeComponentProps {
    device: Device;
    demo_notice: boolean;
}
