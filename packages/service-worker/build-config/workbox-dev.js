/* eslint-disable no-param-reassign */
const fs = require('fs');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
const { sources } = require('@scandipwa/scandipwa-scripts/lib/sources');
const cloneDeep = require('lodash.clonedeep');

const { getLoaders, loaderByName } = require('@scandipwa/craco');

module.exports = {
    plugin: {
        overrideWebpackConfig: ({
            webpackConfig,
            cracoConfig
            // context: { paths }
        }) => {
            // TODO: replace with PATHS if possible
            const swSrc = FallbackPlugin.getFallbackPathname('src/service-worker.js', sources);

            // Modify plugins if needed
            webpackConfig.plugins.slice().reverse().forEach((plugin, index, newPlugins) => {
                if (plugin instanceof WorkboxWebpackPlugin.InjectManifest) {
                    // remove Inject manifest plugin if it exists
                    webpackConfig.plugins.splice(newPlugins.length - 1 - index, 1);
                }
            });

            if (!fs.existsSync(swSrc)) {
                // skip adding plugin if service-worker does not exist
                return webpackConfig;
            }

            webpackConfig.plugins.push(new WorkboxWebpackPlugin.InjectManifest({
                swSrc,
                webpackCompilationPlugins: [
                    {
                        apply: (childCompiler) => {
                            // Copy MODULE options of parent to child
                            childCompiler.options = {
                                ...childCompiler.options,
                                module: cloneDeep(childCompiler.parentCompilation.options.module)
                            };

                            // TODO: do that on initialize hook of compiler ???

                            const {
                                hasFoundAny: hasAnyChildBabelLoaders,
                                matches: childBabelLoaders
                            } = getLoaders(childCompiler.options, loaderByName('babel-loader'));

                            if (!hasAnyChildBabelLoaders) {
                                return;
                            }

                            childBabelLoaders.forEach(({ loader }) => {
                                const { options: { plugins = [] } } = loader;

                                // this is needed to preserve the reference
                                plugins.slice().reverse().forEach((plugin, index, modifiedPlugins) => {
                                    // Get only OUR plugins from the list
                                    const isOurPlugin = cracoConfig.babel.plugins.indexOf(plugin) !== -1;

                                    if (isOurPlugin) {
                                        // we found OUR plugins, ignore them one-by-one
                                        plugins.splice(modifiedPlugins.length - 1 - index, 1);
                                    }
                                });
                            });
                        }
                    }
                ],
                dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
                exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
                // Bump up the default maximum size (2mb) that's precached,
                // to make lazy-loading failure scenarios less likely.
                // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
            }));

            webpackConfig.stats = {
                logging: 'verbose',
                loggingTrace: true
            };

            return webpackConfig;
        }
    }
};
