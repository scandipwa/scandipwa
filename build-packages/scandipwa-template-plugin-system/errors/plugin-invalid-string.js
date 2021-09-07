const logger = require('@scandipwa/scandipwa-dev-utils/logger');

const { STRING_API_KEY } = require('../util/exposed-api-keys');

module.exports = class PluginInvalidStringException extends Error {
    constructor(returnValue) {
        super();

        const length = returnValue && returnValue.length;

        this.message = `
            Malfunctioning template plugin encountered! Its output is invalid.
            The ${logger.style.code(STRING_API_KEY)} member must have returned a non-empty string.
            But instead it has returned an invalid value of type ${logger.style.code(typeof returnValue)} with length ${logger.style.misc(length)}.
        `;
    }
};
