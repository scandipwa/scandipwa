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

<<<<<<< HEAD:packages/scandipwa/src/store/Config/Config.action.ts
import { Device } from 'Type/Device.type';

import {
    ConfigActionType,
    ConfigStore,
    UpdateConfigAction,
    UpdateConfigDeviceAction
} from './Config.type';
=======
export const UPDATE_CURRENT_CURRENCY = 'UPDATE_CURRENT_CURRENCY';

/** @namespace Store/Config/Action/updateCurrentCurrency  */
export const updateCurrentCurrency = (selectedCurrency) => ({
    type: UPDATE_CURRENT_CURRENCY,
    selectedCurrency
});

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
>>>>>>> scandipwa/master:packages/scandipwa/src/store/Config/Config.action.js

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
