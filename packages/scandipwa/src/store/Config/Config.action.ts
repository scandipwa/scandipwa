/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Device } from 'Type/Device.type';

import {
    ConfigActionType,
    ConfigStore,
    UpdateConfigAction,
    UpdateConfigDeviceAction
} from './Config.type';

/** @namespace Store/Config/Action/updateConfig */
export const updateConfig = (config: Partial<ConfigStore>): UpdateConfigAction => ({
    type: ConfigActionType.UPDATE_CONFIG,
    config
});

/** @namespace Store/Config/Action/updateConfigDevice */
export const updateConfigDevice = (device: Device): UpdateConfigDeviceAction => ({
    type: ConfigActionType.UPDATE_CONFIG_DEVICE,
    device
});
