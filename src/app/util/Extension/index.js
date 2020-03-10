/* eslint-disable no-param-reassign */

export default function importExtensions(pendingPluginConfigParts) {
    Promise.all(pendingPluginConfigParts).then((modules) => {
        window.plugins = modules.reduce(
            (overallConfig, pluginModule) => {
                const extension = pluginModule.default;
                Object.entries(extension).forEach(([namespace, plugins]) => {
                    if (!overallConfig[namespace]) {
                        overallConfig[namespace] = {};
                    }
                    Object.entries(plugins).forEach(([pluginType, methodsPlugins]) => {
                        if (!overallConfig[namespace][pluginType]) {
                            overallConfig[namespace][pluginType] = {};
                        }
                        Object.entries(methodsPlugins).forEach(([memberName, memberPlugins]) => {
                            if (!overallConfig[namespace][pluginType][memberName]) {
                                overallConfig[namespace][pluginType][memberName] = [];
                            }
                            memberPlugins.forEach((memberPlugin) => {
                                overallConfig[namespace][pluginType][memberName].push(memberPlugin);
                            });
                        });
                    });
                });

                return overallConfig;
            }, {}
        );
    }).catch((error) => {
        // TODO: die here
        console.error(error);
    });
}

