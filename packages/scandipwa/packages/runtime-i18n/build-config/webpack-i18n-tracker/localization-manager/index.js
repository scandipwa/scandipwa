const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');
const parentThemeHelper = require('@scandipwa/scandipwa-dev-utils/parent-theme');

const afterEmitLogger = require('@scandipwa/after-emit-logger');
const getEnabledLocales = require('../../shared/getEnabledLocales');

const appendMissingTranslationsToFiles = require('../write/appendMissingTranslationsToFiles');
const createMissingTranslationFiles = require('../write/createMissingTranslationFiles');

const loadChildTranslation = require('../read/loadChildTranslation');
const loadTranslationBatch = require('../read/loadTranslationBatch');

const mergeTranslations = require('../../../src/util/mergeTranslations');

const unusedTranslationsMessage = require('../after-emit-logs/unused-translations');
const missingTranslationsMessage = require('../after-emit-logs/missing-translations');

const getParentRoots = () => parentThemeHelper.getParentThemePaths(process.cwd());

const getExtensionRoots = () => extensions.map((extension) => extension.packagePath);

class LocalizationManager {
    moduleMap = {};
    defaultLocale = 'en_US';

    constructor(defaultLocale) {
        this.defaultLocale = defaultLocale;

        // Get the enabled locales from package.json of the child-est theme
        this.enabledLocales = getEnabledLocales();
    }

    createMissingTranslationFiles() {
        createMissingTranslationFiles(this.enabledLocales, this.defaultLocale);
    }

    unlinkTranslatablesFromModule(moduleId) {
        if (!this.moduleMap[moduleId]) {
            return;
        }

        this.moduleMap[moduleId].clear();
    }

    linkTranslatableToModule(moduleId, translatable) {
        if (!this.moduleMap[moduleId]) {
            this.moduleMap[moduleId] = new Set();
        }

        this.moduleMap[moduleId].add(translatable)
    }

    updateUsedTranslations() {
        // Generate an array of used translations
        const usedTranslationsArray = Object.values(this.moduleMap)
            .reduce(
                (acc, cur) => acc.concat(...cur),
                []
            );

        // Ensure uniqueness for them
        this.usedTranslations = new Set(usedTranslationsArray);
    }

    /**
     * Handle missing translations not yet present in corresponding files
     */
    handleMissingTranslations() {
        // Initialize missing translations
        const missingTranslations = {};

        // Check each translatable
        for (const usedTranslation of this.usedTranslations) {

            // Handle locales separately
            for (const localeCode in this.translationMap) {

                // Handle missing translation
                if (!this.translationMap[localeCode].merged[usedTranslation]) {

                    // Handle first missing translation for locale
                    if (!missingTranslations[localeCode]) {
                        missingTranslations[localeCode] = new Set;
                    }

                    missingTranslations[localeCode].add(usedTranslation);
                }
            }
        }

        // Ignore the default locale
        delete missingTranslations[this.defaultLocale];

        // Count the missing translations for each locale
        const missingTranslationsCountMap = Object.fromEntries(Object.entries(missingTranslations).map(
            ([localeCode, missingTranslations]) => [localeCode, missingTranslations.size]
        ));

        // Handle OK case
        if (!Object.keys(missingTranslationsCountMap).length) {
            return;
        }

        // 1. log which ones are missing
        afterEmitLogger.logMessage(missingTranslationsMessage(missingTranslationsCountMap));

        // 2. Update files contents
        appendMissingTranslationsToFiles(missingTranslations);
    }

    /**
     * Handle unused translations
     */
    handleUnusedTranslations() {
        const unusedTranslations = {};

        // Loop over translations from files
        for (const localeCode in this.translationMap) {

            // Check each translation from there
            for (const translatable in this.translationMap[localeCode].child) {

                // Handle translation not used in the application
                if (!this.usedTranslations.has(translatable)) {

                    // Handle first unused for the locale
                    if (!unusedTranslations[localeCode]) {
                        unusedTranslations[localeCode] = new Set;
                    }

                    unusedTranslations[localeCode].add(translatable);
                }
            }
        }

        // Handle OK case
        if (!Object.keys(unusedTranslations).length) {
            return;
        }

        // log which ones are unused
        afterEmitLogger.logMessage(unusedTranslationsMessage(unusedTranslations));
    }

    loadTranslationMap() {
        const parentRoots = getParentRoots();
        const extensionRoots = getExtensionRoots();

        this.translationMap = this.enabledLocales.reduce(
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

                acc[localeCode] = localeData;
                return acc;
            },
            {}
        )
    }
}

module.exports = LocalizationManager;