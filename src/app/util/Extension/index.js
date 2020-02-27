/* eslint-disable no-param-reassign */

export default function importExtensions(pendingPluginConfigParts) {
    Promise.all(pendingPluginConfigParts).then((modules) => {
        window.plugins = modules.reduce(
            (overallConfig, pluginModule) => {
                const singleExtensionConfig = Object.entries(pluginModule.default);

                singleExtensionConfig.forEach(([namespace, methodsPlugins]) => {
                    if (!overallConfig[namespace]) {
                        overallConfig[namespace] = {};
                    }
                    const namedMethodPlugins = Object.entries(methodsPlugins);

                    namedMethodPlugins.forEach(([methodName, methodPlugins]) => {
                        if (!overallConfig[namespace][methodName]) {
                            overallConfig[namespace][methodName] = [];
                        }
                        overallConfig[namespace][methodName].push(...methodPlugins);
                    });
                });

                return overallConfig;
            }, {}
        );
    });
}
