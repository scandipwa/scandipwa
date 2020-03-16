/* eslint-disable no-param-reassign */

const extensions = [];
// The following line is a hook for extension-import-injector loader
// See config/loaders/extension-import-injector
// * ScandiPWA extension importing magic comment! */

window.plugins = extensions.reduce(
    (overallConfig, extension) => {
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
                        throw Error(
                            `Expected handler type 'get' on target type 'instance', got ${handlerType}`
                        );
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

console.log('Extension config imported');
console.log(window.plugins);
