const path = require('path');
const webpack = require('webpack');
const { injectWebpackConfig, injectBabelConfig } = require('@tilework/mosaic-config-injectors');
const i18nPlugin = require('@scandipwa/webpack-i18n-runtime/build-config/config.plugin');

const additionalBabelPlugins = [
    require.resolve('@babel/plugin-syntax-jsx')
]

const webpackFinal = (config) => {
    injectWebpackConfig(config, { webpack })
    i18nPlugin.plugin.overrideWebpackConfig({ webpackConfig: config });

    const jsRules = config.module.rules.filter(r => r.test instanceof RegExp && r.test.test('file.js'))

    if (jsRules.length > 0) {
        /**
         * Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.
         * If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.
         */
        jsRules.forEach(jsRule => {
            const babelLoader = jsRule.use.find(loader => loader.loader === require.resolve('babel-loader'))
            babelLoader.options.plugins = babelLoader.options.plugins || []

            const missingPlugins = additionalBabelPlugins.filter(plugin => !babelLoader.options.plugins.includes(plugin))
            babelLoader.options.plugins.push(
                ...missingPlugins
            )

            injectBabelConfig(babelLoader.options)
        })
    }

    // Allow importing .style, .ts and .tsx files without specifying the extension
    config.resolve.extensions.push('.scss', '.ts', '.tsx');

    config.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
            plugin.options.ignoreOrder = true;
        }
    });

    const resources = path.resolve('src/style/abstract/_abstract.scss')

    const sassRule = config.module.rules.find(r => r.test instanceof RegExp && r.test.test('file.scss'));

    if (sassRule) {
        sassRule.use.push({
            loader: require.resolve('sass-resources-loader'),
            options: {
                resources
            }
        })
    }

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ProvidePlugin({
            React: require.resolve('react')
        })
    );

    return config;
};

module.exports = {
    webpackFinal
};