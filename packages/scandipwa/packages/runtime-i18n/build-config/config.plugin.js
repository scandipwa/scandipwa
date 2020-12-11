const path = require('path');
const WebpackI18nTracker = require('./webpack-i18n-tracker');

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            // Provide the localization import loader to the webpack
            if (!webpackConfig.resolveLoader) {
                webpackConfig.resolveLoader = {};
            }
            if (!webpackConfig.resolveLoader.modules) {
                webpackConfig.resolveLoader.modules = [];
            }
            if (!webpackConfig.resolveLoader.modules.includes('node_modules')) {
                webpackConfig.resolveLoader.modules.push('node_modules');
            }
            webpackConfig.resolveLoader.modules.push(__dirname);

            // Load the file with import injector
            webpackConfig.module.rules.push({
                test: require.resolve(path.join(__dirname, '../src/util/localeMap.js')),
                loader: 'webpack-i18n-import-loader'
            });

            // Provide the __ function with the ProvidePlugin
            webpackConfig.plugins.forEach((plugin => {
                // if (plugin instanceof webpack.ProvidePlugin) {
                const { __proto__: { constructor: { name } = {} } = {} } = plugin;
                if (name === 'ProvidePlugin') {
                    plugin.definitions.__ = [require.resolve(path.join(__dirname, '../src/util/__.js')), 'default'];
                }
            }));

            // Add the plugin for missing/unused translation handling
            webpackConfig.plugins.push(new WebpackI18nTracker({
                defaultLocale: 'en_US'
            }));

            return webpackConfig;
        }
    }
};
