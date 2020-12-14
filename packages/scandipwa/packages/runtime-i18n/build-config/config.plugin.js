const path = require('path');
const WebpackI18nTracker = require('./webpack-i18n-tracker');

// Provide an additional loader directory from this module
function addResolveLoader(config) {
    if (!config.resolveLoader) {
        config.resolveLoader = {};
    }
    if (!config.resolveLoader.modules) {
        config.resolveLoader.modules = [];
    }
    if (!config.resolveLoader.modules.includes('node_modules')) {
        config.resolveLoader.modules.push('node_modules');
    }
    config.resolveLoader.modules.push(__dirname);
}

// Load the locale map with import injector
function addImportInjector(config) {
    config.module.rules.push({
        test: require.resolve(path.join(__dirname, '../src/util/localeMap.js')),
        loader: 'webpack-i18n-import-loader'
    });
}

// Provide the __ function with the ProvidePlugin
function provideTranslationFunction(config) {
    config.plugins.forEach((plugin => {
        // if (plugin instanceof webpack.ProvidePlugin) {
        const { __proto__: { constructor: { name } = {} } = {} } = plugin;
        if (name === 'ProvidePlugin') {
            plugin.definitions.__ = [require.resolve(path.join(__dirname, '../src/util/__.js')), 'default'];
        }
    }));
}

// Add the plugin for missing/unused translation handling
function addTrackerPlugin(config) {
    config.plugins.push(new WebpackI18nTracker({
        defaultLocale: 'en_US'
    }));
}

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            addResolveLoader(webpackConfig);
            addImportInjector(webpackConfig);
            provideTranslationFunction(webpackConfig);
            addTrackerPlugin(webpackConfig);

            return webpackConfig;
        }
    }
};
