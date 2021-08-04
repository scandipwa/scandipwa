/* eslint-disable no-param-reassign, global-require */
const path = require('path');
const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getLoader, loaderByName } = require('@scandipwa/craco');

// The variable is passed automatically, use --magento flag
const isMagento = process.env.BUILD_MODE === 'magento';

module.exports = {
    plugin: {
        overrideCracoConfig: async ({
            cracoConfig
        }) => {
            if (!isMagento) {
                return cracoConfig;
            }

            const config = await cracoConfig;

            // For Magento, use magento/Magento_Theme folder as dist
            config.paths.appBuild = path.join(process.cwd(), 'magento', 'Magento_Theme', 'web');

            // For Magento use PHP template (defined in /public/index.php)
            config.paths.appHtml = FallbackPlugin.getFallbackPathname('./public/index.php');

            // Always return the config object.
            return config;
        },
        overrideWebpackConfig: ({ webpackConfig }) => {
            if (!isMagento) {
                return webpackConfig;
            }

            // For Magento setup, change output file name
            webpackConfig.plugins.forEach((plugin) => {
                if (plugin instanceof HtmlWebpackPlugin) {
                    plugin.options.filename = '../templates/scandipwa_root.phtml';
                    plugin.options.minify = false;
                }
            });

            try {
                // Optional dependency (if the @scandipwa/service-worker is installed)
                const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

                // Yes, another loop, but it is more readable
                webpackConfig.plugins.forEach((plugin) => {
                    if (plugin instanceof WorkboxWebpackPlugin.InjectManifest) {
                        plugin.config.exclude.push(/scandipwa_root/);
                    }
                });
            } catch (e) {
                // Supress error, there is nothing to see here :D
            }

            const { isFound: isFileLoaderFound, match: fileLoader } = getLoader(
                webpackConfig,
                loaderByName('file-loader')
            );

            if (isFileLoaderFound) {
                // Add .php to ignore files (otherwise php will compile into /media as file)
                fileLoader.loader.exclude.push(/\.php$/);
            }

            webpackConfig.output.path = path.join(process.cwd(), 'magento', 'Magento_Theme', 'web');

            // For chunk optimization:
            // JS chunks:
            webpackConfig.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                    vendors: {
                        test: /node_modules/,
                        chunks: 'initial',
                        filename: 'vendors.[contenthash].js',
                        priority: 1,
                        maxInitialRequests: 2, // create only one vendor file
                        minChunks: 1
                    },
                    react: {
                        test(module) {
                            return (
                                module.resource
                                && module.resource.includes('node_modules/react')
                            );
                        },
                        chunks: 'initial',
                        filename: 'react.[contenthash].js',
                        priority: 1,
                        maxInitialRequests: 2,
                        minChunks: 1
                    }
                }
            };

            // Style chunks (SCSS/CSS):
            const styleChunks = [{
                name: 'products',
                match: /((p|P)roduct).*\.s?css$/
            }, {
                name: 'checkout',
                match: /((c|C)heckout).*\.s?css$/
            }, {
                name: 'cart',
                match: /((c|C)art).*\.s?css$/
            }, {
                name: 'widget',
                match: /((w|W)idget).*\.s?css$/
            }, {
                name: 'account',
                match: /((a|A)ccount).*\.s?css$/
            }, {
                name: 'category',
                match: /((c|C)ategory).*\.s?css$/
            }, {
                name: 'misc',
                match: /(store|query|util)[\\/].*\.s?css$/
            }, {
                name: 'wishlist',
                match: /((w|W)ish).*\.s?css$/
            }, {
                name: 'main',
                match: /\.s?css$/
            }];

            styleChunks.forEach(({ name, match }, index) => {
                webpackConfig.optimization.splitChunks.cacheGroups[`${name}_style`] = {
                    name: `${name}_style`,
                    test: match,
                    chunks: 'all',
                    minChunks: 1,
                    priority: styleChunks.length - index,
                    reuseExistingChunk: true,
                    enforce: true
                };
            });

            return webpackConfig;
        },
        overrideDevServerConfig: ({ devServerConfig }) => {
            if (!isMagento) {
                return devServerConfig;
            }

            // Allow non "localhost" hosts
            devServerConfig.disableHostCheck = true;

            // Write to disk, so Magento can pickup changes
            devServerConfig.writeToDisk = true;

            return devServerConfig;
        }
    }
};
