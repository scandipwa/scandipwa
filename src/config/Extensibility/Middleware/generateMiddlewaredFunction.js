/* eslint-disable */
const getWrapperFromPlugin = require('./getWrapperFromPlugin');

/**
 * Middlewaring given original member
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (origMember = () => {}, sortedPlugins, origContext) => {
    return function (...args) {
        const starter = typeof origMember === 'function'
            ? (...originalArgs) => origMember.apply(origContext, originalArgs)
            : origMember;

        const newMember = sortedPlugins.reduce(
            (acc, plugin) => () => {
                const wrapper = getWrapperFromPlugin(plugin, origMember.name);

                return typeof origMember === 'object'
                    ? wrapper(acc, origContext)
                    : wrapper(args, acc, origContext);
            },
            starter
        );

        return newMember(args);
    };
}
