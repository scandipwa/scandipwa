/* eslint-disable no-param-reassign, global-require */
const path = require('path');
const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

// The variable is passed automatically, use --magento flag
const isMagento = process.env.BUILD_MODE === 'magento';

module.exports = {
    plugin: {
        overrideCracoConfig: ({
            cracoConfig,
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
                // eslint-disable-next-line import/no-extraneous-dependencies
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

            webpackConfig.module.rules.forEach((rule) => {
                if (rule?.oneOf) {
                    rule.oneOf.forEach((subRule) => {
                        if (subRule?.exclude && subRule?.type === 'asset/resource') {
                            // Add .php to ignore files (otherwise php will compile into /media as file)
                            subRule.exclude.push(/\.php$/);
                        }
                    });
                }
            });

            webpackConfig.output.path = path.join(process.cwd(), 'magento', 'Magento_Theme', 'web');

            return webpackConfig;
        },
        overrideDevServerConfig: ({ devServerConfig }) => {
            if (!isMagento) {
                return devServerConfig;
            }

            // Allow non "localhost" hosts
            devServerConfig.allowedHosts = 'all';

            // Write to disk, so Magento can pickup changes
            devServerConfig.devMiddleware.writeToDisk = true;

            return devServerConfig;
        },
    },
};
