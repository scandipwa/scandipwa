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
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const getWrapperFromPlugin = require('../helpers/getWrapperFromPlugin');

/**
 * Provide an opportunity to wrap proxy with additional functions.
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (proxy) => {
    const { __namespace__: namespace } = Object.getPrototypeOf(proxy);
    const namespacePluginsClass = globalThis.plugins?.[namespace]?.class || [];

    // Wrap class in its `class` plugins to provide `class` API
    const wrappedClass = namespacePluginsClass.reduce(
        (acc, plugin) => getWrapperFromPlugin(plugin, proxy.name)(acc),
        proxy
    );

    return wrappedClass;
};
