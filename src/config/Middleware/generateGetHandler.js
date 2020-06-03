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

        const memberPluginsGet = window.plugins?.[namespace]?.[targetType]?.['get']?.[memberName];
        if (!memberPluginsGet) {
            return origMember;
        }

        const middlewaredFunction = generateMiddlewaredFunction(
            origMember,
            sortPlugins(memberPluginsGet),
            target
        );

        if (typeof origMember === 'object') {
            return middlewaredFunction();
        }

        return middlewaredFunction;
    };
}
