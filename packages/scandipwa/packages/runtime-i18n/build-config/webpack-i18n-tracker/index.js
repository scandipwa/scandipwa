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

const localizationManager = require('./localization-manager');
const afterEmitLogger = require('@scandipwa/after-emit-logger');

/**
 * @param {object} options object
 * @constructor
 */
class WebpackI18nTracker {
    pluginMeta = { name: 'I18nPlugin' };

    constructor(options = {}) {
        // Set the default locale for the plugin
        localizationManager.setDefaultLocale(options.defaultLocale);
    }

    emitHandler = () => {
        localizationManager.handleMissingTranslations();
        localizationManager.handleUnusedTranslations();
        afterEmitLogger.emitLogs();

        return true;
    }

    compilationHandler = (parser) => {
        const functionName = '__';

        parser.hooks.call.for(functionName).tap(this.pluginMeta, (expr) => {
            const firstArgument = expr.arguments[0];
            const param = parser.evaluateExpression(firstArgument);
            const paramString = param.string;

            localizationManager.handleIncomingTranslatable(paramString);

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
