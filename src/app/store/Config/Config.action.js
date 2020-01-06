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
export const UPDATE_SINGLE_CONFIG_PROPERTY = 'UPDATE_SINGLE_CONFIG_PROPERTY';

export const updateConfig = config => ({
    type: UPDATE_CONFIG,
    config
});

export const updateSingleConfigProperty = property => ({
    type: UPDATE_SINGLE_CONFIG_PROPERTY,
    property
});
