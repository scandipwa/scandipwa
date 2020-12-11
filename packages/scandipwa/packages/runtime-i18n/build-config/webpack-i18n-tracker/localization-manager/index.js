const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');
const parentThemeHelper = require('@scandipwa/scandipwa-dev-utils/parent-theme');

const afterEmitLogger = require('@scandipwa/after-emit-logger');
const getEnabledLocales = require('../../util/getEnabledLocales');

const loadChildTranslation = require('../read/loadChildTranslation');
const loadTranslationBatch = require('../read/loadTranslationBatch');
const mergeTranslations = require('../../../src/util/mergeTranslations');

const appendMissingTranslationsToFiles = require('../write/appendMissingTranslationsToFiles');
const unusedTranslationsMessage = require('../after-emit-logs/unused-translations');
const missingTranslationsMessage = require('../after-emit-logs/missing-translations');

const getParentRoots = () => parentThemeHelper.getParentThemePaths(process.cwd());

const getExtensionRoots = () => extensions.map((extension) => extension.packagePath);

const isEmptyObject = (object) => JSON.stringify(object) === JSON.stringify({});

class LocalizationManager {
    defaultLocale = 'en_US';
    translationMap = {};

    constructor() {
        // Get the enabled locales from package.json of the child-est theme
        this.enabledLocales = getEnabledLocales();

        // Load the translations
        this.translationMap = this.loadTranslationMap();
    }

    loadTranslationMap() {
        const parentRoots = getParentRoots();
        const extensionRoots = getExtensionRoots();

        return this.enabledLocales.reduce(
            (acc, localeCode) => {
                const localeData = {};

                localeData.child = loadChildTranslation(
                    localeCode,
                    localeCode === this.defaultLocale
                );
                localeData.parent = loadTranslationBatch(
                    parentRoots,
                    localeCode
                );
                localeData.extensions = loadTranslationBatch(
                    extensionRoots,
                    localeCode
                );
                localeData.merged = mergeTranslations([
                    localeData.child,
                    ...localeData.parent,
                    ...localeData.extensions
                ]);
                localeData.unused = Object.assign({}, localeData.child);
                localeData.existingMissing = [];
                localeData.newMissing = [];

                acc[localeCode] = localeData;
                return acc;
            },
            {}
        )
    }

    setDefaultLocale(locale) {
        this.defaultLocale = locale;
    }

    /**
     * Return format: { ru_RU: [], lv_LV: [] }
     * @param {string} key
     */
    getLocalesDataByKey(key) {
        return Object.entries(this.translationMap)
            .reduce(
                (acc, [localeCode, localeData]) => {
                    const { [key]: data } = localeData;

                    if (
                        // handle array
                        (Array.isArray(data) && data.length) ||
                        // handle object
                        (!Array.isArray(data) && Object.keys(data).length)
                    ) {
                        acc[localeCode] = data;
                    }

                    return acc;
                },
                {}
            )
    }

    handleIncomingTranslatable(translatable) {
        // Handle the string for each locale separately
        for (const localeCode in this.translationMap) {

            // Extract translation if the translated string is missing
            if (!this.translationMap[localeCode].merged[translatable]) {
                // Track freshly added missing translations
                if (!Object.hasOwnProperty.call(this.translationMap[localeCode].merged, translatable)) {
                    this.translationMap[localeCode].newMissing.push(translatable);
                // Track already present no-valued translations
                } else {
                    this.translationMap[localeCode].existingMissing.push(translatable);
                }
            }

            // Remove from the unused list if the translated string is used
            delete this.translationMap[localeCode].unused[translatable];
        }
    }

    getMissingTranslationCountMap(existingMissingTranslationsMap, newMissingTranslationsMap) {
        return [existingMissingTranslationsMap, newMissingTranslationsMap].reduce(
            (counts, map) => {
                for (const localeCode in map) {
                    if (!counts[localeCode]) {
                        counts[localeCode] = 0;
                    }

                    counts[localeCode] += map[localeCode].length;
                }

                return counts;
            },
            {}
        )
    }

    /**
     * Handle missing translations not yet present in corresponding files
     */
    handleMissingTranslations() {
        const newMissingTranslationsMap = this.getLocalesDataByKey('newMissing');
        const existingMissingTranslationsMap = this.getLocalesDataByKey('existingMissing');

        // Ignore default locale for missing translations
        delete newMissingTranslationsMap[this.defaultLocale];

        // Append the fresh missing translations
        if (!isEmptyObject(newMissingTranslationsMap)) {
            appendMissingTranslationsToFiles(
                newMissingTranslationsMap,
                this.defaultLocale
            );
        }

        // Count the missing translations for locales
        const missingTranslationCountMap = this.getMissingTranslationCountMap(
            existingMissingTranslationsMap,
            newMissingTranslationsMap
        );

        // Log the missing translations warning
        afterEmitLogger.logMessage(missingTranslationsMessage(missingTranslationCountMap));
    }

    /**
     * Handle unused translations
     */
    handleUnusedTranslations() {
        const has = Object
            .values(this.translationMap)
            .some(({ unused }) => Object.keys(unused).length);

        if (!has) {
            return;
        }

        afterEmitLogger.logMessage(unusedTranslationsMessage(this.translationMap));
    }
}

module.exports = new LocalizationManager;