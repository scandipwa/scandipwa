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

/**
 * Return tabindex based on passed URL key
 * @param {undefined|String} urlKey passed URL key
 */
const getTabIndex = urlKey => (urlKey ? '0' : '-1');

export { getTabIndex };
