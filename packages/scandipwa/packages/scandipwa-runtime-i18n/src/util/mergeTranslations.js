/* eslint-disable guard-for-in, no-restricted-syntax, no-continue, no-param-reassign */

/**
 * Merge all the available translations as follows:
 * All the null values are ignored and do not override anything
 * The first translation that is found gets applied to the application
 * Search sequence:
 *   1. child theme
 *   2. parent themes from youngest ("father") to oldest ("great-great-grandfather")
 *   3. extensions
 *
 * In the translations param, all the translation files must be passed in order noted above.
 * @param {object[]} translations
 * @returns {object}
 */
export default function mergeTranslations(translations) {
    return translations.reduce((mergedTranslations, incomingTranslations) => {
        for (const key in incomingTranslations) {
            // Skip if already translated
            if (mergedTranslations[key]) {
                continue;
            }

            const incomingValue = incomingTranslations[key];

            // TODO hide for production mode
            // TODO hide for the default locale
            // If currently translated as `null` and overriding with value => notify!
            if (mergedTranslations[key] === null && incomingValue) {
                console.warn(
                    `Overriding translation for key "${key}": null => "${incomingValue}" `
                    + 'from a translation file with less priority.'
                );
            }

            // Write the new value into the translation object
            mergedTranslations[key] = incomingValue;
        }

        return mergedTranslations;
    }, {});
}