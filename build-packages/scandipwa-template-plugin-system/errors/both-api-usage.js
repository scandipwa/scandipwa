const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { DOM_API_KEY, STRING_API_KEY } = require('../util/exposed-api-keys');

module.exports = class NoPluginReturnDomException extends Error {
    constructor() {
        super();

        this.message = `
            Malformed template plugin encountered!
            It has both ${logger.style.code(DOM_API_KEY)} and ${logger.style.code(STRING_API_KEY)} members declared.
            Please stick to modifying the template ${logger.style.misc('either')} as DOM or as text.
        `;
    }
};
