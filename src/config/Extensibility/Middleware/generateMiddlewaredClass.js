/* eslint-disable */
const getWrapperFromPlugin = require('./getWrapperFromPlugin');

/**
 * Middlewaring given original member
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (origClass, sortedPlugins) => sortedPlugins.reduce(
    (acc, plugin) => getWrapperFromPlugin(plugin, origClass.name)(acc),
    origClass
);
