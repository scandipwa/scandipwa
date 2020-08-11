/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one, func-names */
const sortPlugins = require('../helpers/sortPlugins');
const generateMiddlewaredFunction = require('../middlewarers/generateMiddlewaredFunction');
const getPluginsForMember = require('../helpers/getPluginsForMember');

/**
 * @param {string} targetType class | instance
 * @param {string} namespaces
 */
module.exports = (targetType, namespaces) => function (target, memberName, rec) {
    if (memberName === 'Symbol.iterator') {
        return target[Symbol.iterator].bind(target);
    }
    const origMember = Reflect.get(target, memberName, rec);

    const targetSpecifier = targetType === 'class'
        ? 'static-member'
        : 'member-function';

    const memberPluginsGet = getPluginsForMember(namespaces, targetSpecifier, memberName);

    if (!memberPluginsGet.length) {
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
