/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
const getWrapperFromPlugin = require('../helpers/getWrapperFromPlugin');

/**
 * Provide an opportunity to wrap proxy with additional functions.
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (proxy) => {
    const { __namespace__ } = Object.getPrototypeOf(proxy);
    const namespacePluginsClass = globalThis.plugins?.[__namespace__]?.['class'] || [];

    const wrappedClass = namespacePluginsClass.reduce(
        (acc, plugin) => getWrapperFromPlugin(plugin, proxy.name)(acc),
        proxy
    );

    return wrappedClass;
};
