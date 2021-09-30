const { STRING_API_KEY, DOM_API_KEY } = require('./exposed-api-keys');

const PluginInvalidDomException = require('../errors/plugin-invalid-dom');
const PluginInvalidStringException = require('../errors/plugin-invalid-string');

const validationMap = (value) => ({
    [DOM_API_KEY]: {
        validators: [
            !value,
            typeof value !== 'object',
            Array.isArray(value)
        ],
        Exception: PluginInvalidDomException
    },
    [STRING_API_KEY]: {
        validators: [
            !value,
            typeof value !== 'string'
        ],
        Exception: PluginInvalidStringException
    }
});

const ensureValidValue = (apiType, value) => {
    const validation = validationMap(value);

    if (validation[apiType].validators.find(Boolean)) {
        throw new validation[apiType].Exception(value);
    }

    return value;
};

module.exports = ensureValidValue;
