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
                    Object.entries(plugins).forEach(([targetType, handlerPlugins]) => {
                        // Validate target type
                        if (!(targetType === 'instance' || targetType === 'class')) {
                            throw Error(`Expected plugin target type 'instance' or 'class', got ${targetType}`);
                        }
                        if (!overallConfig[namespace][targetType]) {
                            overallConfig[namespace][targetType] = {};
                        }
                        Object.entries(handlerPlugins).forEach(([handlerType, membersPlugins]) => {
                            // Validate handler type
                            if (!(handlerType === 'get' || handlerType === 'construct')) {
                                throw Error(`Expected plugin handler type 'get' or 'construct', got ${handlerType}`);
                            }
                            if (targetType === 'instance' && handlerType !== 'get') {
                                throw Error(`Expected handler type 'get' on target type 'instance', got ${handlerType}`)
                            }
                            if (!overallConfig[namespace][targetType][handlerType]) {
                                overallConfig[namespace][targetType][handlerType] = {};
                            }
                            Object.entries(membersPlugins).forEach(([memberName, memberPlugins]) => {
                                if (!overallConfig[namespace][targetType][handlerType][memberName]) {
                                    overallConfig[namespace][targetType][handlerType][memberName] = [];
                                }
                                memberPlugins.forEach((memberPlugin) => {
                                    overallConfig[namespace][targetType][handlerType][memberName].push(memberPlugin);
                                });
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
