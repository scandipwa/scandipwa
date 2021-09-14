const logger = require('@scandipwa/scandipwa-dev-utils/logger');

/**
 * Warn the user about any missing translations
 * @param {object} missingTranslationsCountMap
 */
module.exports = (missingTranslationsCountMap) => {
    const missingForLocales = Object
        .entries(missingTranslationsCountMap)
        .map(
            ([localeCode, numberOfMissing]) => `${logger.style.code(localeCode)}: ${logger.style.code(numberOfMissing)}`
        );

    return {
        type: 'warn',
        args: [
            'Some translations are missing! The corresponding files have been populated.',
            'The following files have a number of missing translations:',
            ...missingForLocales
        ]
    };
};
