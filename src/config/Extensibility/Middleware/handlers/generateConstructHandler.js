/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/* eslint-disable func-names, @scandipwa/scandipwa-guidelines/export-level-one */
const getWrapperFromPlugin = require('../helpers/getWrapperFromPlugin');
const getPluginsForMember = require('../helpers/getPluginsForMember');

module.exports = (namespaces) => function (TargetClass, args) {
    // Get an instance
    const instance = new TargetClass(...args);

    // Get all member-property plugins
    const namespacesPluginsConstruct = getPluginsForMember(namespaces, 'member-property');

    // Handle plugin -> property interactions
    namespacesPluginsConstruct.forEach(
        (namespacePluginsConstruct) => Object.entries(namespacePluginsConstruct).forEach(
            // Apply each plugin to the instance
            ([memberName, memberPluginsConstruct]) => {
                // Retrieve the original member
                const origMember = instance[memberName] || (() => {});
                const sortedPlugins = memberPluginsConstruct;

                // Wrap it into the plugins
                const newMember = sortedPlugins.reduce(
                    (acc, plugin) => {
                        const wrapper = getWrapperFromPlugin(plugin, origMember.name);

                        return wrapper(acc, instance);
                    },
                    origMember
                );

                // Replace the original member with the new one, wrapped into the plugins
                instance[memberName] = newMember;
            }
        )
    );

    // Handle construct logic
    if (instance.__construct) {
        // Call the "magic" __construct member function
        instance.__construct(...args);
    }

    // Return the processed instance
    return instance;
};
