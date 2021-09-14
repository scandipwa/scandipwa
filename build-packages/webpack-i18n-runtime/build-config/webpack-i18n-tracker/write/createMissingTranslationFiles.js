const path = require('path');
const fs = require('fs');

const afterEmitLogger = require('@scandipwa/webpack-after-emit-logger');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');

const newLocaleCreated = require('../after-emit-logs/new-locale-created');

module.exports = (enabledLocales, defaultLocale) => {
    enabledLocales
        .filter((locale) => locale !== defaultLocale)
        .forEach((locale) => {
            const pathToCheck = path.join('i18n', `${locale}.json`);
            const childTranslationFilePath = path.join(process.cwd(), pathToCheck);

            // Do not overwrite existing files
            if (fs.existsSync(childTranslationFilePath)) {
                return;
            }

            // Create an empty translation file
            writeJson(childTranslationFilePath, {});
            afterEmitLogger.logMessage(newLocaleCreated(locale, pathToCheck), 3);
        });
};
