const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const path = require('path');

module.exports = (localeCode, filePath) => ({
    type: 'note',
    args: [
        `New locale ${ logger.style.misc(localeCode) } was discovered.`,
        `Created translation file ${ logger.style.file(`.${ path.sep }${ filePath }`) }.`,
        `Provide translations for ${ logger.style.misc(localeCode) } locale there.`
    ]
})