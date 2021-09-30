const logger = require('@scandipwa/scandipwa-dev-utils/logger');

/**
 * Notify the user about his "Something": null
 * translations being overridden from other translation files
 * @param {object} overriddenTranslations
 */
module.exports = (overriddenTranslations) => {
    const overrides = Object.entries(overriddenTranslations).reduce(
        (acc, [localeCode, overriddenValues]) => {
            const overridesForLocale = Object.entries(overriddenValues).map(
                ([translatable, newValue]) => `  - "${translatable}" => "${newValue}"`
            );

            return acc.concat(
                '',
                `${logger.style.code(localeCode)}:`,
                ...overridesForLocale
            );
        },
        []
    );

    return {
        type: 'note',
        args: [
            'The following strings have been overridden from translation files with less priority.',
            'That happened due to their initial values in your theme being null. See a list of them below:',
            ...overrides
        ]
    };
};
