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
