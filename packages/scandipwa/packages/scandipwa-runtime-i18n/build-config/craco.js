const path = require('path');

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            // Load the file with import injector
            // webpackConfig.module.rules.push({
            //     test: new RegExp(path.join('@scandipwa', 'scandipwa-runtime-i18n')),
            //     loader: '@scandipwa/runtime-i18n'
            // });

            webpackConfig.plugins.forEach((plugin => {
                // if (plugin instanceof webpack.ProvidePlugin) {
                const { __proto__: { constructor: { name } = {} } = {} } = plugin;
                if (name === 'ProvidePlugin') {
                    plugin.definitions.__ = [require.resolve(path.join(__dirname, '../src/util/__.js')), 'default'];
                }
            }));

            return webpackConfig;
        }
    }
};
