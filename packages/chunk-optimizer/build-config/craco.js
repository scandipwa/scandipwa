/* eslint-disable no-param-reassign */
const {
    getLoader, loaderByName, removeLoaders, addBeforeLoaders,
} = require('@tilework/mosaic-craco');

const { PreloadPlugin } = require('./preload.js');

module.exports = {
    plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
            webpackConfig.node = false;

            if (!webpackConfig.resolve) {
                webpackConfig.resolve = {};
            }

            if (!webpackConfig.resolve.alias) {
                webpackConfig.resolve.alias = {};
            }

            webpackConfig.resolve.alias.react = 'preact/compat';
            webpackConfig.resolve.alias['react-dom'] = 'preact/compat';

            webpackConfig.plugins.forEach((plugin) => {
                if (plugin.definitions?.PureComponent) {
                    // plugin.definitions.PureComponent[0] = 'preact/compat';
                    delete plugin.definitions.PureComponent;
                }
            });

            webpackConfig.plugins.push(new PreloadPlugin());

            // inline entrypoint
            webpackConfig.plugins.forEach((plugin) => {
                if (plugin.tests) {
                    plugin.tests.push(/main.+[.]js/);
                }
            });

            if (!webpackConfig.optimization.splitChunks) {
                webpackConfig.optimization.splitChunks = {};
            }

            if (!webpackConfig.optimization.splitChunks.cacheGroups) {
                webpackConfig.optimization.splitChunks.cacheGroups = {};
            }

            webpackConfig.optimization.splitChunks.chunks = 'async';

            webpackConfig.optimization.splitChunks.cacheGroups.reactDom = {
                test: /[\\/]react-dom[\\/]/i,
                name: 'react-dom',
            };

            webpackConfig.optimization.splitChunks.cacheGroups.redux = {
                test: /[\\/]redux|react-redux[\\/]/,
                name: 'redux',
            };

            webpackConfig.optimization.splitChunks.cacheGroups.history = {
                test: /[\\/]react-property[\\/]/i,
                name: 'react-property',
                chunks: 'all',
            };

            const { isFound: isStyleLoaderFound, match: styleLoader } = getLoader(
                webpackConfig,
                loaderByName('style-loader')
            );

            if (isStyleLoaderFound) {
                // Configure loader to inject styles
                styleLoader.loader = {
                    loader: styleLoader.loader,
                    options: { injectType: 'styleTag' },
                };
            }
            const { isFound: isMiniCssLoaderFound } = getLoader(
                webpackConfig,
                loaderByName('mini-css-extract-plugin')
            );

            if (isMiniCssLoaderFound) {
                // miniCssLoader.loader.options.insert = 'body';

                addBeforeLoaders(
                    webpackConfig,
                    loaderByName('mini-css-extract-plugin'),
                    {
                        loader: require.resolve('style-loader', { paths: [process.cwd()] }),
                        options: { injectType: 'styleTag' },
                    }
                );

                removeLoaders(
                    webpackConfig,
                    loaderByName('mini-css-extract-plugin')
                );
            }

            // remove mini css extract plugin
            webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
                const isMini = plugin.constructor.name === 'MiniCssExtractPlugin';

                return !isMini;
            });

            return webpackConfig;
        },
    },
};
