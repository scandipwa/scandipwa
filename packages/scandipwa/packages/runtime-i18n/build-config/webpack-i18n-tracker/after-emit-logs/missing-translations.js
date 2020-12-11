const logger = require('@scandipwa/scandipwa-dev-utils/logger');

module.exports = (missingTranslationsCountMap) => {
    const missingForLocales = Object
        .entries(missingTranslationsCountMap)
        .map(
            ([localeCode, numberOfMissing]) => `${logger.style.code(localeCode)}: ${logger.style.code(numberOfMissing)}`
        );

    return {
        type: 'warn',
        hideForDefaultLocale: true,
        args: [
            'Some translations are missing! The corresponding files have been populated.',
            'To correct that, go through your translation files and translate everything that has falsy values!',
            'Some translations are missing for the following locales:',
            ...missingForLocales
        ]
    };
}
