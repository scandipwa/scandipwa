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
/* eslint-disable no-param-reassign, @scandipwa/scandipwa-guidelines/export-level-one, no-restricted-syntax, fp/no-loops */
/**
 * Allowed handler types
 */
const handlerTypes = [
    'member-function',
    'member-property',
    'static-member',
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
const arrayize = (x) => (Array.isArray(x) ? x : [x]);

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
    });
};

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
};

const DEFAULT_POSITION = 100;
const sortPluginArray = (plugins) => plugins.sort(
    ({ position: a = DEFAULT_POSITION }, { position: b = DEFAULT_POSITION }) => a - b
);

/**
 * Sort the configuration so that plugins with higher priority (lower "posititon" value)
 * Go before the ones with lower priority (higher "position" value).
 * @param {Object} config
 */
const sortConfig = (config) => {
    // Process each namespace
    // eslint-disable-next-line no-unused-vars
    for (const namespace in config) {
        if (Object.prototype.hasOwnProperty.call(config, namespace)) {
            // Each handler type of a namespace
            // eslint-disable-next-line no-unused-vars
            for (const handlerType in config[namespace]) {
                if (Object.prototype.hasOwnProperty.call(config[namespace], handlerType)) {
                    // Handle reduced sections
                    if (handlersWithReducedSections.includes(handlerType)) {
                        config[namespace][handlerType] = sortPluginArray(config[namespace][handlerType]);
                        // eslint-disable-next-line no-continue
                        continue;
                    }

                    // Handle regular sections
                    // eslint-disable-next-line no-unused-vars
                    for (const memberName in config[namespace][handlerType]) {
                        if (Object.prototype.hasOwnProperty.call(config[namespace][handlerType], memberName)) {
                            config[namespace][handlerType][memberName] = sortPluginArray(
                                config[namespace][handlerType][memberName]
                            );
                        }
                    }
                }
            }
        }
    }
};

/**
 * Entry point
 */
export default (extensions) => {
    const config = extensions.reduce(
        (overallConfig, extension) => {
            Object.entries(extension).forEach(([namespace, plugins]) => {
                if (!overallConfig[namespace]) {
                    overallConfig[namespace] = {};
                }
                Object.entries(plugins).forEach(([handlerType, membersPlugins]) => {
                    validateHandlerType(handlerType, namespace);
                    if (handlersWithReducedSections.includes(handlerType)) {
                        handleReducedSection(overallConfig, namespace, handlerType, membersPlugins);
                    } else {
                        handleRegularSection(overallConfig, namespace, handlerType, membersPlugins);
                    }
                });
            });

            return overallConfig;
        }, {}
    );

    sortConfig(config);
    return config;
};
