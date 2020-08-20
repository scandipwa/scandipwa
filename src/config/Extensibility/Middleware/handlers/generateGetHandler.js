/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one, func-names */
const sortPlugins = require('../helpers/sortPlugins');
const generateMiddlewaredFunction = require('../middlewarers/generateMiddlewaredFunction');
const getPluginsForMember = require('../helpers/getPluginsForMember');

/**
 * @param {string} targetType class | instance
 * @param {string} namespaces
 */
module.exports = (targetType, namespaces) => function (target, memberName, rec) {
    // Get the original member
    const origMember = Reflect.get(target, memberName, rec);

    // GET handler intercepts static members on classes
    // And instance members (member-functions) on instances
    const targetSpecifier = targetType === 'class'
        ? 'static-member'
        : 'member-function';

    // Get the plugins
    const memberPluginsGet = getPluginsForMember(namespaces, targetSpecifier, memberName);

    // If no plugins - return the original member
    if (!memberPluginsGet.length) {
        return origMember;
    }

    // Generate a function which is original member wrapped into the plugins
    const middlewaredFunction = generateMiddlewaredFunction(
        origMember,
        sortPlugins(memberPluginsGet),
        rec
    );

    // If original member was an object - return the value from the function call
    if (typeof origMember === 'object') {
        return middlewaredFunction();
    }

    // Return the function wrapped into plugins
    return middlewaredFunction;
};
