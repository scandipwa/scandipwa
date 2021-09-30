/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax, fp/no-delete, guard-for-in */
const extensions = require('@tilework/mosaic-dev-utils/extensions');
const parentThemeHelper = require('@tilework/mosaic-dev-utils/parent-theme');

const afterEmitLogger = require('@scandipwa/webpack-after-emit-logger');
const getEnabledLocales = require('../../../shared/getEnabledLocales');

const appendMissingTranslationsToFiles = require('../write/appendMissingTranslationsToFiles');
const createMissingTranslationFiles = require('../write/createMissingTranslationFiles');

const loadChildTranslation = require('../read/loadChildTranslation');
const loadTranslationBatch = require('../read/loadTranslationBatch');

const mergeTranslations = require('../../../shared/mergeTranslations');

const unusedTranslationsMessage = require('../after-emit-logs/unused-translations');
const missingTranslationsMessage = require('../after-emit-logs/missing-translations');
const emptyTranslationsOverriddenMessage = require('../after-emit-logs/empty-translations-overridden');
const nonExtractableTranslationMessage = require('../after-emit-logs/non-extractable-translation');

const getParentRoots = () => parentThemeHelper.getParentThemePaths(process.cwd());
const getExtensionRoots = () => extensions.map((extension) => extension.packagePath);

class LocalizationManager {
    moduleMap = {};

    overriddenEmptyTranslations = {};

    nonExtractableCases = [];

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

        this.moduleMap[moduleId].add(translatable);
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
                // Ignore present translations
                if (this.translationMap[localeCode].merged[usedTranslation]) {
                    continue;
                }

                // Handle first missing translation for locale
                if (!missingTranslations[localeCode]) {
                    missingTranslations[localeCode] = new Set();
                }

                missingTranslations[localeCode].add(usedTranslation);
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
                // Ignore the ones that are used
                if (this.usedTranslations.has(translatable)) {
                    continue;
                }

                // Handle first unused for the locale
                if (!unusedTranslations[localeCode]) {
                    unusedTranslations[localeCode] = new Set();
                }

                unusedTranslations[localeCode].add(translatable);
            }
        }

        // Handle OK case
        if (!Object.keys(unusedTranslations).length) {
            return;
        }

        // log which ones are unused
        afterEmitLogger.logMessage(unusedTranslationsMessage(unusedTranslations));
    }

    handleOverriddenEmptyTranslations() {
        if (!Object.keys(this.overriddenEmptyTranslations).length) {
            return;
        }

        afterEmitLogger.logMessage(emptyTranslationsOverriddenMessage(this.overriddenEmptyTranslations));
    }

    handleOverridingEmptyTranslation(localeCode, translatable, incomingValue) {
        if (!this.overriddenEmptyTranslations[localeCode]) {
            this.overriddenEmptyTranslations[localeCode] = {};
        }

        this.overriddenEmptyTranslations[localeCode][translatable] = incomingValue;
    }

    handleNonExtractableParam(resource) {
        this.nonExtractableCases.push(resource);
    }

    handleNonExtractableCases() {
        if (!this.nonExtractableCases.length) {
            return;
        }

        afterEmitLogger.logMessage(nonExtractableTranslationMessage(this.nonExtractableCases));
    }

    loadTranslationMap() {
        this.overriddenEmptyTranslations = {};
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
                localeData.merged = mergeTranslations(
                    [
                        localeData.child,
                        ...localeData.parent,
                        ...localeData.extensions
                    ],
                    this.handleOverridingEmptyTranslation.bind(this, localeCode)
                );

                acc[localeCode] = localeData;
                return acc;
            },
            {}
        );
    }
}

module.exports = LocalizationManager;
