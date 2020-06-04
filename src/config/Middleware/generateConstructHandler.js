/* eslint-disable */
const sortPlugins = require('./sortPlugins');

module.exports = (namespace) => {
    return function (TargetClass, args) {
        const instance = new TargetClass(...args);
        const namespacePluginsConstruct = globalThis.plugins?.[namespace]?.['class']?.['construct'] || {};

        Object.entries(namespacePluginsConstruct).forEach(
            ([memberName, memberPluginsConstruct]) => {
                const origMember = instance[memberName];
                const sortedPlugins = sortPlugins(memberPluginsConstruct);

                const newMember = sortedPlugins.reduce(
                    (acc, { implementation }) => {
                        return implementation(acc, instance);
                    },
                    origMember
                );

                instance[memberName] = newMember;
            }
        );

        return instance;
    };
}
