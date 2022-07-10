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

export const UPDATE_CURRENT_CURRENCY = 'UPDATE_CURRENT_CURRENCY';

/** @namespace Store/Config/Action/updateCurrentCurrency  */
export const updateCurrentCurrency = (selectedCurrency) => ({
    type: UPDATE_CURRENT_CURRENCY,
    selectedCurrency
});

export const UPDATE_CONFIG = 'UPDATE_CONFIG';

/** @namespace Store/Config/Action/updateConfig */
export const updateConfig = (config) => ({
    type: UPDATE_CONFIG,
    config
});

export const UPDATE_CONFIG_DEVICE = 'UPDATE_CONFIG_DEVICE';

/** @namespace Store/Config/Action/updateConfigDevice */
export const updateConfigDevice = (device) => ({
    type: UPDATE_CONFIG_DEVICE,
    device
});
