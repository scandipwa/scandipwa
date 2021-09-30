const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const { DOM_API_KEY, STRING_API_KEY } = require('../util/exposed-api-keys');

module.exports = class NoLifecycleDeclaredException extends Error {
    constructor() {
        super();

        this.message = `
            Malformed template plugin encountered!
            It has neither ${logger.style.code(DOM_API_KEY)} nor ${logger.style.code(STRING_API_KEY)} members declared.
            At least one of those is necessary to be a valid template plugin!
        `;
    }
};
