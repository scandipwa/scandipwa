const logger = require('@scandipwa/scandipwa-dev-utils/logger');

/**
 * Warn the user about any unused translations present in the translation files
 * @param {object} unusedTranslationMap
 */
module.exports = (unusedTranslationMap) => {
    const unusedForLocales = Object
        .entries(unusedTranslationMap)
        .map(
            ([localeCode, unused]) => [
                `${logger.style.code(localeCode)}: ${logger.style.code(unused.size)}`,
                ...Array.from(unused, (unusedString) => `  - ${unusedString}`)
            ]
        );

    return {
        type: 'warn',
        args: [
            'Found unused translations for the following locales:',
            ...unusedForLocales.flat()
        ]
    };
};
