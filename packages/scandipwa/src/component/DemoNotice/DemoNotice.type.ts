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

export interface DemoNoticeContainerMapStateProps {
    isDemoNoticeEnabled: boolean;
    device: Device;
}

export interface DemoNoticeContainerMapDispatchProps {}

export type DemoNoticeComponentProps = {
    isDemoNoticeEnabled: boolean;
    device: Device;
};
