/* eslint-disable */
const sortPlugins = require('./sortPlugins');
const generateMiddlewaredFunction = require('./generateMiddlewaredFunction');

/**
 * @param {string} targetType class | instance
 * @param {string} namespace
 */
module.exports = (targetType, namespace) => {
    return function (target, memberName, rec) {
        if (memberName === 'Symbol.iterator') {
            return target[Symbol.iterator].bind(target);
        }
        const origMember = Reflect.get(target, memberName, rec);

        const targetSpecifier = targetType === 'class'
            ? 'static-member'
            : 'member-function';

        const memberPluginsGet = globalThis.plugins?.[namespace]?.[targetSpecifier]?.[memberName];
        if (!memberPluginsGet) {
            return origMember;
        }

        const middlewaredFunction = generateMiddlewaredFunction(
            origMember,
            sortPlugins(memberPluginsGet),
            rec
        );

        if (typeof origMember === 'object') {
            return middlewaredFunction();
        }

        return middlewaredFunction;
    };
}
