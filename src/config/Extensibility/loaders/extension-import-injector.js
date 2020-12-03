/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
const { getOptions } = require('loader-utils');
const path = require('path');
const fs = require('fs');

const isPluginFile = (entry) => entry.match(/\.plugin\.js$/);
const isDirectory = (entry) => {
    if (!fs.lstatSync(entry).isDirectory()) {
        return false;
    }

    return true;
};

// Retrieve a list of recursively located *.plugin.js files
// Concat due to a flat structure
const findPluginFiles = (dirPath) => {
    const dirContents = fs.readdirSync(dirPath);
    return dirContents
        .filter(isPluginFile)
        .map((fileName) => path.resolve(dirPath, fileName))
        .concat(dirContents
            .filter((entry) => isDirectory(path.resolve(dirPath, entry)))
            .reduce(
                (acc, subDir) => acc.concat(findPluginFiles(path.resolve(dirPath, subDir))),
                []
            ));
};

module.exports = function injectImports(source) {
    const {
        context = '',
        magentoRoot,
        importAggregator,
        projectRoot
    } = getOptions(this);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const { extensions } = require(path.resolve(projectRoot, 'scandipwa.json'));

    const extensionConfigImports = Object.entries(extensions).reduce(
        (importChain, extension) => {
            const [/* name */, repositoryRootPath] = extension;
            const pluginDirectory = path.resolve(
                magentoRoot, repositoryRootPath, 'src', 'scandipwa', context, 'plugin'
            );

            if (!fs.existsSync(pluginDirectory)) {
                return importChain;
            }

            const singlePluginConfigPathList = findPluginFiles(pluginDirectory);
            return importChain.concat(
                singlePluginConfigPathList.reduce(
                    (singlePluginImportChain, pluginFile) => singlePluginImportChain.concat(
                        `${importAggregator}.push(require('${pluginFile}').default);\n`
                    ), ''
                )
            );
        }, ''
    );

    return source.replace(
        /\/\/ \* ScandiPWA extension importing magic comment! \*\//,
        extensionConfigImports
    );
};
