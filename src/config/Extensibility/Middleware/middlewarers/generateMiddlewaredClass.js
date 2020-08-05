const getWrapperFromPlugin = require('../helpers/getWrapperFromPlugin');
const sortPlugins = require('../helpers/sortPlugins');

/**
 * Provide an opportunity to wrap proxy with additional functions.
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (proxy) => {
    const { __namespace__ } = Object.getPrototypeOf(proxy);
    const namespacePluginsClass = globalThis.plugins?.[__namespace__]?.['class'] || [];

    const wrappedClass = sortPlugins(namespacePluginsClass).reduce(
        (acc, plugin) => getWrapperFromPlugin(plugin, proxy.name)(acc),
        proxy
    );

    return wrappedClass;
};
