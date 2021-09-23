/* eslint-disable no-param-reassign */
const cloneDeep = require('lodash.clonedeep');
const { getLoaders, loaderByName } = require('@tilework/mosaic-craco');

const getWorkboxBabelPlugin = (cracoConfig) => ({
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

        const { babel: { plugins: babelPlugins } } = cracoConfig;
        if (!babelPlugins) {
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
});

module.exports = getWorkboxBabelPlugin;
