/* eslint-disable */
const sortPlugins = require('./sortPlugins');
const getWrapperFromPlugin = require('./getWrapperFromPlugin');

module.exports = (namespace) => {
    return function (TargetClass, args) {
        const instance = new TargetClass(...args);
        const namespacePluginsConstruct = globalThis.plugins?.[namespace]?.['member-property'] || {};

        // Handle plugin -> property interactions
        Object.entries(namespacePluginsConstruct).forEach(
            ([memberName, memberPluginsConstruct]) => {
                const origMember = instance[memberName] || (() => {});
                const sortedPlugins = sortPlugins(memberPluginsConstruct);

                const newMember = sortedPlugins.reduce(
                    (acc, plugin) => {
                        const wrapper = getWrapperFromPlugin(plugin, origMember.name);

                        return wrapper(acc, instance);
                    },
                    origMember
                );

                instance[memberName] = newMember;
            }
        );

        // Handle construct logic
        if (instance.__construct) {
            instance.__construct(...args);
        }

        return instance;
    };
}
