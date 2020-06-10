/* eslint-disable */

export const extensions = [];
// See config/loaders/extension-import-injector
// * ScandiPWA extension importing magic comment! */

/**
 * Allowed handler types
 */
const handlerTypes = [
    'member-function',
    'member-property',
    'static-property',
    'function',
];

/**
 * Handlers which don't require member name specification
 */
const handlersWithReducedSections = [
    'function'
];

/**
 * Check if supplied handler type is expected
 * @param {string} handlerType
 */
function validateHandlerType(handlerType, namespace) {
    if (!handlerTypes.includes(handlerType)) {
        throw Error(`Unexpected handler type '${handlerType}' for namespace '${namespace}', expected one of [${
            handlerTypes.join(', ')
        }]`);
    }
}

/**
 * Push at once to handler section, separation by member names not expected
 * @param {Object} overallConfig
 * @param {string} namespace
 * @param {string} handlerType
 * @param {Array} membersPlugins
 */
const handleReducedSection = (overallConfig, namespace, handlerType, membersPlugins) => {
    if (!overallConfig[namespace][handlerType]) {
        overallConfig[namespace][handlerType] = [];
    }

    membersPlugins.forEach((memberPlugin) => {
        overallConfig[namespace][handlerType].push(memberPlugin);
    })
}

/**
 * Separate namespace plugins by member names
 * @param {Object} overallConfig
 * @param {string} namespace
 * @param {string} handlerType
 * @param {Array} membersPlugins
 */
const handleRegularSection = (overallConfig, namespace, handlerType, membersPlugins) => {
    if (!overallConfig[namespace][handlerType]) {
        overallConfig[namespace][handlerType] = {};
    }

    Object.entries(membersPlugins).forEach(([memberName, memberPlugins]) => {
        if (!overallConfig[namespace][handlerType][memberName]) {
            overallConfig[namespace][handlerType][memberName] = [];
        }
        memberPlugins.forEach((memberPlugin) => {
            overallConfig[namespace][handlerType][memberName].push(memberPlugin);
        });
    });
}

/**
 * Entry point
 */
globalThis.plugins = extensions.reduce(
    (overallConfig, extension) => {
        Object.entries(extension).forEach(([namespace, plugins]) => {
            if (!overallConfig[namespace]) {
                overallConfig[namespace] = {};
            }
            Object.entries(plugins).forEach(([handlerType, membersPlugins]) => {
                validateHandlerType(handlerType, namespace);
                if (handlersWithReducedSections.includes(handlerType)) {
                    handleReducedSection(overallConfig, namespace, handlerType, membersPlugins)
                } else {
                    handleRegularSection(overallConfig, namespace, handlerType, membersPlugins);
                }
            });
        });
        return overallConfig;
    }, {}
);
