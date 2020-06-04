/* eslint-disable */
const sortPlugins = require('./sortPlugins');
const generateMiddlewaredFunction = require('./generateMiddlewaredFunction');

module.exports = (namespace) => {
    return function (origFunction, thisArg, originalArgs) {
        const memberPluginsApply = globalThis.plugins?.[namespace]?.['function']?.['apply'];
        if (memberPluginsApply && !Array.isArray(memberPluginsApply)) {
            throw new Error(`Expected Array in function/apply config section for ${namespace}`);
        }

        if (!memberPluginsApply) {
            return origFunction.apply(thisArg, originalArgs);
        }

        return generateMiddlewaredFunction(
            origFunction,
            sortPlugins(memberPluginsApply),
            thisArg
        )(...originalArgs);
    };
}
