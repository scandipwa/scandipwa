/* eslint-disable no-param-reassign */
const path = require('path');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');
const afterEmitLogger = require('@scandipwa/webpack-after-emit-logger');
const corruptedJson = require('../after-emit-logs/write-corrupted-json');

function loadTranslationJson(localeFilePath) {
    try {
        return require(localeFilePath);
    } catch (err) {
        afterEmitLogger.logMessage(corruptedJson(localeFilePath, err));
        return null;
    }
}

function mergeNewMissingTranslatablesIntoTranslations(missingTranslatables, translations) {
    let mergedAtLeastOne = false;

    missingTranslatables.forEach((missingKey) => {
        // Ignore ones already present
        if (Object.hasOwnProperty.call(translations, missingKey)) {
            return;
        }

        mergedAtLeastOne = true;
        translations[missingKey] = null;
    });

    return mergedAtLeastOne;
}

/**
 * Handle missing translations:
 * - write entries to the corresponding files
 * @param {object} missingTranslations
 * @param {function} logMessage
 */
module.exports = (missingTranslations) => {
    Object
        .entries(missingTranslations)
        .forEach(([localeCode, missingTranslatables]) => {
            const localeFilePath = path.join(process.cwd(), 'i18n', `${localeCode}.json`);
            const translations = loadTranslationJson(localeFilePath);

            // Handle load error
            if (translations === null) {
                return;
            }

            const mergedAtLeastOne = mergeNewMissingTranslatablesIntoTranslations(missingTranslatables, translations);
            if (!mergedAtLeastOne) {
                return;
            }

            // Write only if contents have been mutated
            writeJson(
                localeFilePath,
                translations
            );
        });
};
