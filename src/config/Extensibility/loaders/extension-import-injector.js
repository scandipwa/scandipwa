/* eslint-disable */
const { getOptions } = require('loader-utils');
const path = require('path');

module.exports = function injectImports(source) {
    const { magentoRoot, importAggregator, projectRoot, pathFilterCondition = () => 1 } = getOptions(this);
    const { extensions } = require(path.resolve(projectRoot, 'scandipwa.json'));

    const extensionConfigImports = Object.entries(extensions).reduce(
        (importChain, extension) => {
            const [/* name */, repositoryRootPath] = extension;
            const indexPath = path.resolve(magentoRoot, repositoryRootPath, 'src/scandipwa');
            const singlePluginConfigPathList = require(indexPath);

            return importChain + singlePluginConfigPathList.filter(pathFilterCondition).reduce(
                (singlePluginImportChain, pluginDefinitionPath) => {
                    const pathToConfigFile = path.resolve(
                        indexPath,
                        pluginDefinitionPath
                    );

                    return singlePluginImportChain.concat(
                        `${importAggregator}.push(require('${pathToConfigFile}').default);\n`
                    );
                }, ''
            );
        }, ''
    );

    return source.replace(
        /\/\/ \* ScandiPWA extension importing magic comment! \*\//,
        extensionConfigImports
    );
};
