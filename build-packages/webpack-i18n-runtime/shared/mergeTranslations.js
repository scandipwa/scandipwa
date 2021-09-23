/* eslint-disable guard-for-in, no-restricted-syntax, no-continue, no-param-reassign */

/**
 * Simple fallback function for the logging logic
 */
function noop() {}

/**
 * Merge all the available translations as follows:
 * The null values are overridable by everything, these cases are handled env-specifically.
 * The first found translation gets applied to the application
 * Search sequence:
 *   1. child theme
 *   2. parent themes from youngest ("father") to oldest ("great-great-grandfather")
 *   3. extensions
 *
 * In the translations param, all the translation files must be passed in order noted above.
 * @param {object[]} translations
 * @returns {object}
 */
module.exports = function mergeTranslations(translations, handleOverridden = noop) {
    // The child translations must always be passed first, as mentioned above
    const childTranslations = translations[0];

    return translations.reduce((mergedTranslations, incomingTranslations) => {
        for (const key in incomingTranslations) {
            // * Skip if already translated
            if (mergedTranslations[key]) {
                continue;
            }

            const incomingValue = incomingTranslations[key];

            // * Handle if overriding null
            if (childTranslations[key] === null && mergedTranslations[key] === null && incomingValue) {
                handleOverridden(key, incomingValue);
            }

            mergedTranslations[key] = incomingValue;
        }

        return mergedTranslations;
    }, {});
};
