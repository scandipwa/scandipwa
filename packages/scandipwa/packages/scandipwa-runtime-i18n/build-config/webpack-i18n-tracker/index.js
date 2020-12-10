/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ('OSL') v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

const path = require('path');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const extensions = require('@scandipwa/scandipwa-dev-utils/extensions');
const parentThemeHelper = require('@scandipwa/scandipwa-dev-utils/parent-theme');
const loadChildTranslation = require('./read/loadChildTranslation');
const loadTranslationBatch = require('./read/loadTranslationBatch');
const appendMissingTranslationsToFiles = require('./write/appendMissingTranslationsToFiles');
const mergeTranslations = require('../../src/util/mergeTranslations');
const unusedTranslationsMessage = require('./after-emit-logs/unused-translations');
const missingTranslationsMessage = require('./after-emit-logs/missing-translations');
const getEnabledLocales = require('../util/getEnabledLocales');

const getParentRoots = () => {
    return parentThemeHelper.getParentThemePaths(process.cwd());
}

const getExtensionRoots = () => {
    return extensions.map((extension) => extension.packagePath);
}

/**
 * @param {object} options object
 * @constructor
 */
class WebpackI18nTracker {
    pluginMeta = { name: 'I18nPlugin' };

    loadTranslationMap() {
        const parentRoots = getParentRoots();
        const extensionRoots = getExtensionRoots();

        return this.enabledLocales.reduce(
            (acc, localeCode) => {
                const localeData = {};

                localeData.child = loadChildTranslation(
                    localeCode,
                    localeCode === this.defaultLocale,
                    this.logMessage
                );
                localeData.parent = loadTranslationBatch(
                    parentRoots,
                    localeCode,
                    this.logMessage
                );
                localeData.extensions = loadTranslationBatch(
                    extensionRoots,
                    localeCode,
                    this.logMessage
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

    constructor(options = {}) {
        const { defaultLocale = 'en_US' } = options;

        // Set the default locale for the plugin
        this.defaultLocale = defaultLocale;

        // Get the enabled locales from package.json of the child-est theme
        this.enabledLocales = getEnabledLocales();

        // Initialize the after emit logs
        this.afterEmitLogs = [];

        // Load the translations
        this.translationMap = this.loadTranslationMap();
    }

    logMessage = (message) => {
        this.afterEmitLogs.push(message)
    }

    emitLogs() {
        setTimeout(() => {
            this.afterEmitLogs
                .filter((log) => !log.hideForDefaultLocale)
                .forEach(({ type, args }) => logger[type](...args));
        }, 100);
    }

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

    isEmptyObject(object) {
        return JSON.stringify(object) === JSON.stringify({});
    }

    handleNewMissingTranslations(newMissingTranslationsMap) {
        // If new missing translations have not been found - skip
        if (this.isEmptyObject(newMissingTranslationsMap)) {
            return;
        }

        // Append the fresh missing translations
        appendMissingTranslationsToFiles(
            newMissingTranslationsMap,
            this.logMessage,
            this.defaultLocale
        );
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
        // { ru_RU: [], lv_LV: [] }
        const newMissingTranslationsMap = this.getLocalesDataByKey('newMissing');
        const existingMissingTranslationsMap = this.getLocalesDataByKey('existingMissing');

        // Ignore default locale for missing translations
        delete newMissingTranslationsMap[this.defaultLocale];

        // Handle the ones that are
        // - missing (!value)
        // - not defined in the child theme (value === undefined)
        this.handleNewMissingTranslations(newMissingTranslationsMap);

        // Count the missing translations for locales
        const missingTranslationCountMap = this.getMissingTranslationCountMap(
            existingMissingTranslationsMap,
            newMissingTranslationsMap
        );

        // Log the missing translations warning
        this.logMessage(missingTranslationsMessage(missingTranslationCountMap));
    }

    /**
     * Handle unused translations
     */
    handleUnusedTranslations() {
        const has = Object
            .values(this.translationMap)
            .some(({ unused }) => Object.keys(unused).length)

        if (!has) {
            return;
        }

        this.logMessage(unusedTranslationsMessage(this.translationMap));
    }

    emitHandler = () => {
        this.handleMissingTranslations();
        this.handleUnusedTranslations();
        this.emitLogs();

        return true;
    }

    compilationHandler = (parser) => {
        const functionName = '__';

        parser.hooks.call.for(functionName).tap(this.pluginMeta, (expr) => {
            const firstArgument = expr.arguments[0];
            const param = parser.evaluateExpression(firstArgument);
            const paramString = param.string;

            // Handle the string for each locale separately
            for (const localeCode in this.translationMap) {
                // Extract translation if the translated string is missing
                if (!this.translationMap[localeCode].merged[paramString]) {
                    // Track freshly added missing translations
                    if (!Object.hasOwnProperty.call(this.translationMap[localeCode].merged, paramString)) {
                        this.translationMap[localeCode].newMissing.push(paramString);
                    // Track already present no-valued translations
                    } else {
                        this.translationMap[localeCode].existingMissing.push(paramString);
                    }
                // Remove from the unused list if the translated string is used
                } else {
                    delete this.translationMap[localeCode].unused[paramString];
                }
            }

            return true;
        });
    };

    apply(compiler) {
        compiler.hooks.emit.tap(this.pluginMeta, this.emitHandler);

        // Tap to compilation to later hook into parser to catch calls for translation function
        compiler.hooks.compilation.tap(
            this.pluginMeta,
            (_compilation, { normalModuleFactory }) => {
                normalModuleFactory.hooks.parser
                    .for('javascript/auto')
                    .tap(this.pluginMeta, this.compilationHandler);

                normalModuleFactory.hooks.parser
                    .for('javascript/dynamic')
                    .tap(this.pluginMeta, this.compilationHandler);
            }
        );
    }
}

module.exports = WebpackI18nTracker;
