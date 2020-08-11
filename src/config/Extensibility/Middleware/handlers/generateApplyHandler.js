/* eslint-disable func-names, @scandipwa/scandipwa-guidelines/export-level-one */
const sortPlugins = require('../helpers/sortPlugins');
const generateMiddlewaredFunction = require('../middlewarers/generateMiddlewaredFunction');
const getPluginsForMember = require('../helpers/getPluginsForMember');

module.exports = namespace => function (origFunction, thisArg, originalArgs) {
    const memberPluginsApply = getPluginsForMember(namespace, 'function');

    if (memberPluginsApply && !Array.isArray(memberPluginsApply)) {
        throw new Error(`Expected an array in function config section for ${namespace}`);
    }

    if (!memberPluginsApply.length) {
        return origFunction.apply(thisArg, originalArgs);
    }

    return generateMiddlewaredFunction(
        origFunction,
        sortPlugins(memberPluginsApply),
        thisArg
    )(...originalArgs);
};
