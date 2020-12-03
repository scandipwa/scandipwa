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
 * Get plugins for provided namespaces
 * @param {String[]} namespaces
 * @param {String} targetSpecifier
 * @param {String} memberName
 */
module.exports = (namespaces, targetSpecifier, memberName) => namespaces.reduce(
    (acc, namespace) => {
        // Handle no member name: return all plugins for the provided section
        if (!memberName) {
            const pluginsOfType = globalThis.plugins?.[namespace]?.[targetSpecifier];
            if (pluginsOfType) {
                return acc.concat(pluginsOfType);
            }

        // Handle member name present
        } else {
            const { value } = Object.getOwnPropertyDescriptor(
                globalThis.plugins?.[namespace]?.[targetSpecifier] || {},
                memberName
            ) || {};

            if (value) {
                return acc.concat(value);
            }
        }

        return acc;
    }, []
);
