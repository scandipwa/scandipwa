/* eslint-disable */

/**
 * Middlewaring given original member
 * @param {Function} origMember
 * @param {Array} sortedPlugins
 * @param Context origContext
 */
module.exports = (origMember, sortedPlugins, origContext) => {
    return function (...args) {
        const starter = typeof origMember === 'function'
            ? (...originalArgs) => origMember.apply(origContext, originalArgs)
            : origMember;

        const newMember = sortedPlugins.reduce(
            (acc, { implementation }) => () => {
                return typeof origMember === 'object'
                    ? implementation(acc, origContext)
                    : implementation(args, acc, origContext);
            },
            starter
        );

        return newMember(args);
    };
}
