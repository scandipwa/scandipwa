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

export const MODULE_NAME = 'Scandiweb';
export const ASSET_BASE_URL = `/static/frontend/${ MODULE_NAME }/pwa/en_US/Magento_Theme/assets`;

/**
 * Returns the URL from which the specified asset can be retrieved.
 * @param path
 * @returns {string}
 */
export const getAssetUrl = path => `${ ASSET_BASE_URL }/${ path }`;
