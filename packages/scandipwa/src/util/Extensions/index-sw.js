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
/* eslint-disable */
import generateConfig from './generateConfig';

export const extensions = [];
// See config/loaders/extension-import-injector
// * ScandiPWA extension importing magic comment! */

globalThis.plugins = generateConfig(extensions);
