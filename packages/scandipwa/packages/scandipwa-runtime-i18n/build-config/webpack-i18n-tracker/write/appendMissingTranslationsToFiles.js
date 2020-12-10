const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');
const path = require('path');
const corruptedJson = require('../after-emit-logs/write-corrupted-json');

/**
 * Handle missing translations:
 * - write entries to the corresponding files
 * @param {object} missingTranslations
 * @param {function} logMessage
 */
module.exports = (missingTranslationMap, logMessage) => {
    Object
        .entries(missingTranslationMap)
        .forEach(([localeCode, newMissingKeys]) => {
            const localeFilePath = path.join(process.cwd(), 'i18n', `${localeCode}.json`);

            let translations;
            try {
                translations = require(localeFilePath);
            } catch (err) {
                logMessage(corruptedJson(localeFilePath, err));
                return;
            }

            newMissingKeys.forEach((missingKey) => {
                translations[missingKey] = null;
            });

            writeJson(
                localeFilePath,
                translations
            );
        })
}
