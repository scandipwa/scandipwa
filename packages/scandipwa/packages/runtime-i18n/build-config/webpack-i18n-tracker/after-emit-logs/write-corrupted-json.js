const logger = require('@scandipwa/scandipwa-dev-utils/logger');

/**
 * Generate error for the after emit logs
 * @param {string} jsonPath
 * @param {object} error
 */
module.exports = (jsonPath, error) => ({
    type: 'error',
    args: [
        `Unable to update the translation in ${jsonPath}.`,
        `Error: ${logger.style.misc(error.message)}`,
        'Restart the compilation after you apply the corresponding changes.'
    ]
});
