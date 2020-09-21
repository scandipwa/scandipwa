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
 * Get `class` plugins for provided namespaces' outer one (last assigned)
 * These plugins cannot be inherited
 * @param {String[]} namespaces
 */
module.exports = (namespaces) => {
    // The last pushed into the namespaces' array namespace
    // Is an actual, not an inherited one.
    const outerNamespace = namespaces[namespaces.length - 1];

    return globalThis.plugins?.[outerNamespace]?.class || [];
};
