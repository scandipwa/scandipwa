const path = require('path');
const extensions = require('@tilework/mosaic-dev-utils/extensions');

/**
 * Collect all the default exports from the templatePlugins files
 */
module.exports = () => extensions.reduce((acc, { packagePath, packageJson }) => {
    // Get template plugin paths from package.json
    const {
        name,
        scandipwa: {
            build: {
                templatePlugins: templatePluginPaths
            } = {}
        } = {}
    } = packageJson;

    // Handle no template plugins in the module
    if (!templatePluginPaths || !templatePluginPaths.length) {
        return acc;
    }

    // Handle template plugins exist
    const templatePlugins = templatePluginPaths.map(
        (relativePath) => {
            const absolutePath = path.resolve(packagePath, relativePath);
            const pluginModule = require(absolutePath);

            // Handle ES6 module
            if (pluginModule.default) {
                return pluginModule.default;
            }

            // Handle CommonJS module
            return pluginModule;
        }
    );

    acc[name] = templatePlugins;
    return acc;
}, {});
