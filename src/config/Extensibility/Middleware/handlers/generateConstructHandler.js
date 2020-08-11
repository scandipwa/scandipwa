/* eslint-disable func-names, @scandipwa/scandipwa-guidelines/export-level-one */
const sortPlugins = require('../helpers/sortPlugins');
const getWrapperFromPlugin = require('../helpers/getWrapperFromPlugin');
const getPluginsForMember = require('../helpers/getPluginsForMember');

module.exports = namespace => function (TargetClass, args) {
    const instance = new TargetClass(...args);
    const namespacesPluginsConstruct = getPluginsForMember(namespace, 'member-property');

    // Handle plugin -> property interactions
    namespacesPluginsConstruct.forEach(
        namespacePluginsConstruct => Object.entries(namespacePluginsConstruct).forEach(
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
        )
    );

    // Handle construct logic
    if (instance.__construct) {
        instance.__construct(...args);
    }

    return instance;
};
