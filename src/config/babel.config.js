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

const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
];

const plugins = [
    'transform-rebem-jsx',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    [
        'module-resolver', {
            root: './',
            alias: {
                Style: './src/app/style/',
                Component: './src/app/component/',
                Route: './src/app/route/',
                Store: './src/app/store/',
                Util: './src/app/util/',
                Query: './src/app/query/',
                Type: './src/app/type/',
                SourceStyle: '../../../../../vendor/scandipwa/source/src/app/style/',
                SourceComponent: '../../../../../vendor/scandipwa/source/src/app/component/',
                SourceRoute: '../../../../../vendor/scandipwa/source/src/app/route/',
                SourceStore: '../../../../../vendor/scandipwa/source/src/app/store/',
                SourceUtil: '../../../../../vendor/scandipwa/source/src/app/util/',
                SourceQuery: '../../../../../vendor/scandipwa/source/src/app/query/',
                SourceType: '../../../../../vendor/scandipwa/source/src/app/type/'
            }
        }
    ]
];

module.exports = {
    presets,
    plugins
};
