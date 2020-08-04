/* eslint-disable */
const sortPlugins = require('../helpers/sortPlugins');
const generateMiddlewaredFunction = require('../generateMiddlewaredFunction');

module.exports = (namespace) => {
    return function (origFunction, thisArg, originalArgs) {
        const memberPluginsApply = globalThis.plugins?.[namespace]?.['function'];
        if (memberPluginsApply && !Array.isArray(memberPluginsApply)) {
            throw new Error(`Expected an array in function config section for ${namespace}`);
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
