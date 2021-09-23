const path = require('path');
const webpack = require('webpack');
const { injectWebpackConfig } = require('@tilework/mosaic-config-injectors');
const i18nPlugin = require('@scandipwa/webpack-i18n-runtime/build-config/config.plugin');

const jsConfig = require(path.resolve('mosaic.jsconfig.json'));

const sanitizeAlias = (str) => str.replace(/\/\*$/i, '');
const addAliases = (config) => {
    const projectAliases = Object.entries(jsConfig.compilerOptions.paths)
        .reduce((acc, [aliasName, aliasPaths]) => ({
            ...acc,
            [sanitizeAlias(aliasName)]: path.resolve(sanitizeAlias(aliasPaths[0]))
        }), {});

    config.resolve.alias = {
        ...config.resolve.alias,
        ...projectAliases
    };
}

const babelPlugins = [
    require.resolve('@babel/plugin-syntax-jsx'),
    require.resolve('babel-plugin-react-require')
]

const babelPresetEnvPath = require.resolve('@babel/preset-env', {
    paths: [
        path.resolve('../../node_modules')
    ]
})

const webpackFinal = (config) => {
    injectWebpackConfig(config)
    i18nPlugin.plugin.overrideWebpackConfig({ webpackConfig: config });
    addAliases(config)

    const jsRules = config.module.rules.filter(r => r.test instanceof RegExp && r.test.test('file.js'))

    if (jsRules.length > 0) {
        /**
         * Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.
         * If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.
         */
        jsRules.forEach(jsRule => {
            const babelLoader = jsRule.use.find(loader => loader.loader === require.resolve('babel-loader'))

            babelLoader.options.plugins = babelLoader.options.plugins || []

            const missingPlugins = babelPlugins.filter(plugin => !babelLoader.options.plugins.includes(plugin))
            babelLoader.options.plugins.push(
                ...missingPlugins
            )

            const babelPresetEnv = babelLoader.options.presets.find(preset => {
                if (Array.isArray(preset)) {
                    return preset[0] === babelPresetEnvPath
                }

                if (typeof preset === 'string') {
                    return preset === babelPresetEnvPath
                }

                return false
            })

            if (babelPresetEnv) {
                if (Array.isArray(babelPresetEnv)) {
                    const babelPresetEnvOptions = babelPresetEnv[1]

                    if (typeof babelPresetEnvOptions.modules === 'string') {
                        babelPresetEnvOptions.modules = 'umd'
                    }
                }
            }
        })
    }

    // const babelPresetEnv = config.module.rules
    //     .find(r => r.test instanceof RegExp && r.test.test('file.js'))
    //     .use
    //     .find(loader => loader.loader === require.resolve('babel-loader'))
    //     .options
    //     .presets.find(preset => {
    //         const presetPath = Array.isArray(preset) ? preset[0] : preset

    //         return presetPath === require.resolve('@babel/preset-env')
    //     })

    // if (Array.isArray(babelPresetEnv)) {
    //     babelPresetEnv[1].modules = 'auto'
    // }

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
        sassRule.use.push(
            {
                loader: require.resolve('sass-resources-loader'),
                options: {
                    resources
                }
            }
        )
    }

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    );

    return config;
};

module.exports = {
    webpackFinal,
    // managerWebpack: webpackFinal
};