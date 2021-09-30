/* eslint-disable no-restricted-syntax */
const { STRING_API_KEY, DOM_API_KEY } = require('./exposed-api-keys');

const handlePossiblePluginError = require('../error-handlers/possible-plugin-error');

const BothApiUsageException = require('../errors/both-api-usage');
const NoLifecycleDeclaredException = require('../errors/no-lifecycle-declared');

module.exports = (htmlPlugins) => Object.entries(htmlPlugins).reduce(
    (acc, [name, pluginObjects]) => handlePossiblePluginError(name, () => {
        for (const pluginObject of pluginObjects) {
            const {
                templatePlugin: {
                    [DOM_API_KEY]: overrideDOM,
                    [STRING_API_KEY]: overrideString
                }
            } = pluginObject;

            // Prohibit attempting to use both DOM API and String API in a single plugin
            // It makes no sense using both, user should go with one per plugin file
            if (overrideDOM && overrideString) {
                throw new BothApiUsageException();
            }

            // Handle no logic declared within the plugin
            if (!(overrideDOM || overrideString)) {
                throw new NoLifecycleDeclaredException();
            }

            // Ensure pushable property
            const foundKey = (overrideDOM && DOM_API_KEY) || (overrideString && STRING_API_KEY);

            // Add the plugin to the group
            const foundValue = overrideDOM || overrideString;
            acc[foundKey].push({ name, override: foundValue });
        }

        return acc;
    }),
    {
        [DOM_API_KEY]: [],
        [STRING_API_KEY]: []
    }
);
