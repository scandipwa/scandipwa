/* eslint-disable */
const { getOptions } = require('loader-utils');
const path = require('path');

module.exports = function injectImports(source) {
    const { magentoRoot, importAggregator, projectRoot } = getOptions(this);
    const { extensions } = require(path.resolve(projectRoot, 'scandipwa.json'));

    const extensionConfigImports = Object.entries(extensions).reduce(
        (importChain, extension) => {
            const [, singlePluginConfigPathList] = extension;

            return importChain + singlePluginConfigPathList.reduce(
                (singlePluginImportChain, singlePluginConfigPath) => {
                    const pathToConfigFile = path.join(magentoRoot, singlePluginConfigPath);

                    return `${singlePluginImportChain}${importAggregator}.push(require('${pathToConfigFile}').default);\n`;
                }, ''
            );
        }, ''
    );

    return source.replace(/\/\/ \* ScandiPWA extension importing magic comment! \*\//, extensionConfigImports);
};
