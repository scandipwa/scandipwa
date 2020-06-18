/* eslint-disable */

/**
 * Allowed handler types
 */
const handlerTypes = [
    'member-function',
    'member-property',
    'static-property',
    'function',
    'class'
];

/**
 * Handlers which don't require member name specification
 */
const handlersWithReducedSections = [
    'function',
    'class'
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
 * Wrap param in array if it is not array already
 */
const arrayize = x => Array.isArray(x) ? x : [x];

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

    arrayize(membersPlugins).forEach((memberPlugin) => {
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
        arrayize(memberPlugins).forEach((memberPlugin) => {
            overallConfig[namespace][handlerType][memberName].push(memberPlugin);
        });
    });
}

/**
 * Entry point
 */
export default extensions => extensions.reduce(
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
