/* eslint-disable */

// eslint-disable-next-line import/prefer-default-export
export const extensions = [];

// The following line is a hook for extension-import-injector loader
// See config/loaders/extension-import-injector
// * ScandiPWA extension importing magic comment! */

const handlerMap = {
    'class': [ 'get', 'construct' ],
    'instance': [ 'get' ],
    'function': [ 'apply' ]
};
const handlerTypes = [...new Set(Object.values(handlerMap).flat())];
const targetTypes = Object.keys(handlerMap);

function validateTargetType(targetType) {
    if (!targetTypes.includes(targetType)) {
        throw Error(`Unexpected target type ${targetType}, expected one of [${
            targetTypes.join(', ')
        }]`);
    }
}

function validateHandlerType(handlerType) {
    if (!handlerTypes.includes(handlerType)) {
        throw Error(`Unexpected handler type ${handlerType}, expected one of [${
            handlerTypes.join(', ')
        }]`);
    }
}

function validateHandlerForTarget(targetType, handlerType) {
    if (!handlerMap[targetType].includes(handlerType)) {
        throw Error(`Unexpected handler type ${handlerType} for ${targetType}, expected one of [${handlerMap[targetType].join(', ')}]`);
    }
}

globalThis.plugins = extensions.reduce(
    (overallConfig, extension) => {
        Object.entries(extension).forEach(([namespace, plugins]) => {
            if (!overallConfig[namespace]) {
                overallConfig[namespace] = {};
            }
            Object.entries(plugins).forEach(([targetType, handlerPlugins]) => {
                validateTargetType(targetType);

                if (!overallConfig[namespace][targetType]) {
                    overallConfig[namespace][targetType] = {};
                }
                Object.entries(handlerPlugins).forEach(([handlerType, membersPlugins]) => {
                    validateHandlerType(handlerType);
                    validateHandlerForTarget(targetType, handlerType);

                    if (!overallConfig[namespace][targetType][handlerType]) {
                        switch (handlerType) {
                        // Handle reduced apply plugin config structure
                        case 'apply':
                            overallConfig[namespace][targetType][handlerType] = [];
                            membersPlugins.forEach((memberPlugin) => {
                                overallConfig[namespace][targetType][handlerType].push(memberPlugin);
                            })

                            break;
                        default:
                            overallConfig[namespace][targetType][handlerType] = {};
                            Object.entries(membersPlugins).forEach(([memberName, memberPlugins]) => {
                                if (!overallConfig[namespace][targetType][handlerType][memberName]) {
                                    overallConfig[namespace][targetType][handlerType][memberName] = [];
                                }
                                memberPlugins.forEach((memberPlugin) => {
                                    overallConfig[namespace][targetType][handlerType][memberName].push(memberPlugin);
                                });
                            });

                            break;
                        }
                    }

                });
            });
        });

        return overallConfig;
    }, {}
);
