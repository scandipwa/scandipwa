/* eslint-disable */

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

// This is not https://babeljs.io/docs/en/configuration config.
// This is custom file, which simply exports babel presets and plugins.
// This file is later used by Webpack `babel-loader` directly.
// This is a workaround for a babel issue https://github.com/babel/babel/issues/8309.
// It also has additional functionality in terms of generation additional aliases

const path = require('path');
const extensionsConfig = require('../../extensions.json');

const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1);

const getExtensionsAliases = (projectRoot, magentoRoot) => {
    const extensionsRoots = Object.entries(extensionsConfig.extensions).reduce(
        (acc, [, pluginFilesPaths]) => {
            const oneOfPaths = pluginFilesPaths[0];
            const frontendRoot = oneOfPaths.split('/plugin/')[0];
            const root = oneOfPaths.split('/src/scandipwa/')[0];

            const extensionMeta = {
                root: path.resolve(magentoRoot, root),
                frontendRoot: path.resolve(magentoRoot, frontendRoot)
            };

            if (!acc.some(elem => JSON.stringify(elem) === JSON.stringify(extensionMeta))) {
                acc.push(extensionMeta);
            }

            return acc;
        }, []
    );

    return extensionsRoots.reduce(
        (acc, { root, frontendRoot }) => {
            const explodedRoot = root.split('/');
            const vendorName = explodedRoot[explodedRoot.length - 2];
            const extensionName = explodedRoot[explodedRoot.length - 1];

            acc[`${vendorName}_${extensionName}`] = path.relative(projectRoot, frontendRoot);

            return acc;
        }, {}
    );
}

const getAliases = (prefix, root, projectRoot) => {
    return ['style', 'component', 'route', 'store', 'util', 'query', 'type', 'plugin'].reduce(
        (acc, curr) => {
            acc[`${capitalize(prefix)}${capitalize(curr)}`] = './' + path.relative(
                projectRoot,
                path.resolve(root, `src/app/${curr}/`)
            );

            return acc;
        }, {}
    );
}

const getPresets = () => ([
    '@babel/preset-env',
    '@babel/preset-react'
]);

const getPlugins = ({ projectRoot, magentoRoot, fallbackRoot, parentRoot }) => ([
    'transform-rebem-jsx',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    // TODO: return helpers:true
    ['@babel/plugin-transform-runtime', { helpers: false }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    [
        'module-resolver', {
            root: './',
            alias: {
                ...getAliases('', projectRoot, projectRoot),
                ...getAliases('Source', fallbackRoot, projectRoot),
                ...getAliases('Parent', parentRoot, projectRoot),
                ...getExtensionsAliases(projectRoot, magentoRoot)
            }
        }
    ],
    [
        'console-source', {
            segments: 1
        }
    ]
]);

const getBabelConfig = options => ({
    presets: getPresets(),
    plugins: getPlugins(options),
    sourceType: 'unambiguous'
});

module.exports = {
    getBabelConfig
};
