/* eslint-disable func-names, @scandipwa/scandipwa-guidelines/export-level-one */
const generateMiddlewaredFunction = require('../middlewarers/generateMiddlewaredFunction');
const getPluginsForMember = require('../helpers/getPluginsForMember');

module.exports = (namespace) => function (origFunction, thisArg, originalArgs) {
    // Get plugins for the function
    const memberPluginsApply = getPluginsForMember(namespace, 'function');

    // If no plugins => return the original function
    if (!memberPluginsApply.length) {
        return origFunction.apply(thisArg, originalArgs);
    }

    // Return the result of a call of a generated function (=wrapped into plugins)
    return generateMiddlewaredFunction(
        origFunction,
        memberPluginsApply,
        thisArg
    )(...originalArgs);
};
