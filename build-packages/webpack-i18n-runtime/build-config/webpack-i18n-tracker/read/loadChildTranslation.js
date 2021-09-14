const path = require('path');
const fs = require('fs');

const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');

const loadJson = require('./loadJson');

const newLocaleCreated = require('../after-emit-logs/new-locale-created');
const afterEmitLogger = require('@scandipwa/webpack-after-emit-logger');

/**
 * Get the theme's main translation file for the given locale
 * @param {string} localeCode
 * @param {function} logMessage
 * @returns {object}
 */
module.exports = (localeCode, isDefaultLocale) => {
    const pathToTry = path.join('i18n', `${localeCode}.json`);
    const absolutePathToTry = path.join(process.cwd(), pathToTry);

    // Handle translation for the given locale exists
    if (fs.existsSync(absolutePathToTry)) {
        return loadJson(absolutePathToTry);
    }

    // Do not create a translation file for the default locale
    if (isDefaultLocale) {
        return {};
    }

    // Handle no translation in child theme:
    // Create file
    writeJson(absolutePathToTry, {});

    // Add message about the new file to the logs
    afterEmitLogger.logMessage(newLocaleCreated(localeCode, pathToTry), 2);

    return {};
};
