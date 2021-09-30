const logger = require('@scandipwa/scandipwa-dev-utils/logger');

const { DOM_API_KEY } = require('../util/exposed-api-keys');

module.exports = class PluginInvalidDomException extends Error {
    constructor(returnValue) {
        super();

        this.message = `
            Malfunctioning template plugin encountered! Its output is invalid.
            The ${logger.style.code(DOM_API_KEY)} member must have returned a valid DOM.
            But instead it has returned an invalid value of type ${logger.style.code(typeof returnValue)}.
        `;
    }
};
