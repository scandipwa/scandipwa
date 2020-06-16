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
const { extensions } = require('../../scandipwa.json');

const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1);
const pascalCase = word => capitalize(word.replace(/(-\w)/g, m => m[1].toUpperCase()));

/**
 * Generate aliases for extensions
 * @param {string} projectRoot
 * @param {string} magentoRoot
 */
const getExtensionsAliases = (projectRoot, magentoRoot) => {
    const extensionsMeta = Object.values(extensions).reduce(
        (acc, relativeRoot) => {
            const frontendRoot = path.join(relativeRoot, 'src/scandipwa');
            const explodedRoot = relativeRoot.split('/');

            const extensionMeta = {
                frontendRoot: path.resolve(magentoRoot, frontendRoot),
                extensionName: explodedRoot[explodedRoot.length - 1],
                vendorName: explodedRoot[explodedRoot.length - 2],
            };

            acc.push(extensionMeta);

            return acc;
        }, []
    );

    return extensionsMeta.reduce(
        (acc, { frontendRoot, vendorName, extensionName }) => {
            acc[`${pascalCase(vendorName)}_${pascalCase(extensionName)}`] = path.relative(projectRoot, frontendRoot);

            return acc;
        }, {}
    );
}

/**
 * Generate aliases for corresponding directory
 * @param {string} prefix
 * @param {string|undefined} root
 * @param {string} projectRoot
 * @returns {object}
 */
const getAliases = (prefix, root, projectRoot) => {
    if (!root) {
        return {};
    }

    const aliases = ['style', 'component', 'route', 'store', 'util', 'query', 'type'].reduce(
        (acc, curr) => {
            acc[`${capitalize(prefix)}${capitalize(curr)}`] = './' + path.relative(
                projectRoot,
                path.resolve(root, `src/app/${curr}/`)
            );

            return acc;
        }, {}
    );

    aliases[`${capitalize(prefix)}Plugin`] = './' + path.relative(
        projectRoot,
        path.resolve(root, `src/plugin`)
    );

    return aliases;
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
