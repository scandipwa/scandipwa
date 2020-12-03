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
const fs = require('fs');
const { extensions } = require('../../scandipwa.json');

const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1);
const pascalCase = word => capitalize(word.replace(/(-\w)/g, m => m[1].toUpperCase()));
const ignoreSpecialChars = word => word.replace(/[^\w\s]/gi, '');

const PLUGIN_NAME_SEPARATOR = '.';

/**
 * Generate aliases for corresponding directory
 * @param {string} prefix
 * @param {string|undefined} src
 * @param {string} projectRoot
 * @returns {object}
 */
const getAliases = (prefix, src, projectRoot) => {
    if (!src) {
        return {};
    }

    const aliases = ['style', 'component', 'route', 'store', 'util', 'query', 'type'].reduce(
        (acc, curr) => {
            acc[`${capitalize(prefix)}${capitalize(curr)}`] = './' + path.relative(
                projectRoot,
                path.resolve(src, `app/${curr}/`)
            );

            return acc;
        }, {}
    );

    // Only for themes, skip plugins
    if (!prefix.endsWith(PLUGIN_NAME_SEPARATOR)) {
        // Add src/plugin for plugins' overrides
        aliases[`${capitalize(prefix)}Plugin`] = './' + path.relative(
            projectRoot,
            path.resolve(src, `plugin`)
        );
    // Only for plugins, skip themes
    } else {
        // Add src/app/plugin and src/sw/plugin for plugins
        aliases[`${capitalize(prefix)}AppPlugin`] = './' + path.relative(
            projectRoot,
            path.resolve(src, `app/plugin`)
        );

        aliases[`${capitalize(prefix)}SwPlugin`] = './' + path.relative(
            projectRoot,
            path.resolve(src, `sw/plugin`)
        );
    }

    return aliases;
}

/**
 * Generate aliases for extensions
 * Get name from composer.json, ignoring the special characters
 * @param {string} projectRoot
 * @param {string} magentoRoot
 */
const getExtensionsAliases = (projectRoot, magentoRoot) => Object.values(extensions).reduce(
    (acc, extensionRelative) => {
        const extensionAbsolute = path.join(magentoRoot, extensionRelative);
        const composerJsonPath = path.join(extensionAbsolute, 'composer.json');
        if (!fs.existsSync(composerJsonPath)) {
            console.log(`No aliases will be available for the package at ${extensionAbsolute}, no composer.json found.`);
            return acc;
        }

        const { name: nameField } = require(composerJsonPath);
        const [vendorName, extensionName] = nameField.split('/');
        const prefix = `${
            ignoreSpecialChars(pascalCase(vendorName))
        }_${
            ignoreSpecialChars(pascalCase(extensionName))
        }`.concat(PLUGIN_NAME_SEPARATOR);

        acc = {
            ...acc,
            ...getAliases(prefix, path.join(extensionAbsolute, 'src', 'scandipwa'), projectRoot)
        };

        return acc;
    }, {}
);

const traverseSrc = (root) => root ? path.join(root, 'src') : null;

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
                ...getAliases('', traverseSrc(projectRoot), projectRoot),
                ...getAliases('Source', traverseSrc(fallbackRoot), projectRoot),
                ...getAliases('Parent', traverseSrc(parentRoot), projectRoot),
                ...getExtensionsAliases(projectRoot, magentoRoot)
            }
        }
    ],
    './src/config/Extensibility/plugins/middleware-decorator',
]);

const getBabelConfig = options => ({
    presets: getPresets(),
    plugins: getPlugins(options),
    sourceType: 'unambiguous'
});

module.exports = {
    getBabelConfig
};
