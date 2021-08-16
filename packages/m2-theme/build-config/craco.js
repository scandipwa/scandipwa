/* eslint-disable no-param-reassign, global-require */
const path = require('path');
const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getLoader, loaderByName } = require('@scandipwa/craco');

// The variable is passed automatically, use --magento flag
const isMagento = process.env.BUILD_MODE === 'magento';

module.exports = {
    plugin: {
        overrideCracoConfig: ({
            cracoConfig
        }) => {
            if (!isMagento) {
                return cracoConfig;
            }

            // For Magento, use magento/Magento_Theme folder as dist
            cracoConfig.paths.appBuild = path.join(process.cwd(), 'magento', 'Magento_Theme', 'web');

            // For Magento use PHP template (defined in /public/index.php)
            cracoConfig.paths.appHtml = FallbackPlugin.getFallbackPathname('./public/index.php');

            // Always return the config object.
            return cracoConfig;
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
