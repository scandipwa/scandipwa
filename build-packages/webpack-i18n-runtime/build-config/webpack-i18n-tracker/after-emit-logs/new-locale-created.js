const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const path = require('path');

/**
 * Notify the user about the new locale files
 * @param {string} localeCode
 * @param {string} filePath
 */
module.exports = (localeCode, filePath) => ({
    type: 'note',
    args: [
        `New locale ${ logger.style.misc(localeCode) } was discovered.`,
        `Created translation file ${ logger.style.file(`.${ path.sep }${ filePath }`) }.`,
        `Provide translations for ${ logger.style.misc(localeCode) } locale there.`
    ]
});
