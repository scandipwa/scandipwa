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

const LocalizationManager = require('./localization-manager');

/**
 * @param {object} options object
 * @constructor
 */
class WebpackI18nTracker {
    pluginMeta = { name: 'I18nPlugin' };

    constructor(options = {}) {
        // Set the default locale for the plugin
        this.localizationManager = new LocalizationManager(options.defaultLocale);

        // Create missing files in child theme
        this.localizationManager.createMissingTranslationFiles();
    }

    emitHandler = () => {
        this.localizationManager.updateUsedTranslations();
        this.localizationManager.loadTranslationMap();
        this.localizationManager.handleOverriddenEmptyTranslations();
        this.localizationManager.handleMissingTranslations();
        this.localizationManager.handleUnusedTranslations();
        this.localizationManager.handleNonExtractableCases();

        return true;
    };

    compilationHandler = (parser) => {
        const functionName = '__';

        parser.hooks.call.for(functionName).tap(this.pluginMeta, (expr) => {
            const firstArgument = expr.arguments[0];
            const param = parser.evaluateExpression(firstArgument);
            const paramString = param.string;

            if (!paramString) {
                // Handle params that cannot be extracted
                this.localizationManager.handleNonExtractableParam(parser.state.module.resource);
                return expr;
            }

            this.localizationManager.linkTranslatableToModule(parser.state.module.resource, paramString);

            return expr;
        });
    };

    recompileHandler = (compiler) => {
        const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

        changedFiles.forEach((filename) => this.localizationManager.unlinkTranslatablesFromModule(filename));
    };

    apply(compiler) {
        compiler.hooks.emit.tap(this.pluginMeta, this.emitHandler);
        compiler.hooks.watchRun.tap(this.pluginMeta, this.recompileHandler);

        compiler.hooks.compilation.tap(
            this.pluginMeta,
            (compilation, { normalModuleFactory }) => {
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
