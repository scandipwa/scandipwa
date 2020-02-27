const { getOptions } = require('loader-utils');
const { join } = require('path');
const { extensions } = require('../../../extensionsConfig.json');

module.exports = function injectImports(source) {
    const { vendor, importAggregator } = getOptions(this);

    const extensionConfigImports = Object.entries(extensions).reduce(
        (importChain, extension) => {
            const [, singlePluginConfigPathList] = extension;

            return importChain + singlePluginConfigPathList.reduce(
                (singlePluginImportChain, singlePluginConfigPath) => {
                    const pathToConfigFile = join(vendor, singlePluginConfigPath);

                    return `${singlePluginImportChain}${importAggregator}.push(import('${pathToConfigFile}'));\n`;
                }, ''
            );
        }, ''
    );

    return source.replace(/\/\/ \* ScandiPWA extension importing magic comment! \*\//, extensionConfigImports);
};
