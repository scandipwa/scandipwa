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

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { getBabelConfig } = require('./babel.config');
const FallbackPlugin = require('./Extensibility/plugins/FallbackPlugin');
const { I18nPlugin } = require('./I18nPlugin');

const projectRoot = path.resolve(__dirname, '..', '..');
const { parentTheme = '' } = require(path.resolve(projectRoot, 'scandipwa.json'));
const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
const parentRoot = parentTheme
    ? path.resolve(magentoRoot, 'app/design/frontend', parentTheme)
    : undefined;
const fallbackThemeSpecifier = path.relative(path.resolve(projectRoot, '../..'), projectRoot)
const fallbackRoot = path.resolve(magentoRoot, 'vendor', 'scandipwa', 'source');

module.exports = {
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.scss',
            '*'
        ],
        plugins: [
            new FallbackPlugin({
                projectRoot,
                fallbackRoot,
                fallbackThemeSpecifier,
                parentRoot,
                parentThemeSpecifier: parentTheme
            })
        ],
        modules: [
            path.resolve(projectRoot, 'node_modules'),
            'node_modules'
        ]
    },

    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'Extensibility', 'loaders')
        ]
    },

    mode: 'development',

    devtool: 'source-map',

    stats: {
        warnings: false
    },

    entry: {
        bundle: path.join(projectRoot, 'src/app/index.js')
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: getBabelConfig({ projectRoot, magentoRoot, fallbackRoot, parentRoot })
                    }
                ]
            },
            {
                test: /util\/Extensions\/index\.js/,
                use: [
                    {
                        loader: 'extension-import-injector',
                        options: {
                            magentoRoot, projectRoot, importAggregator: 'extensions', context: 'app'
                        }
                    }
                ]
            },
            {
                test: /util\/Extensions\/index-sw\.js/,
                use: [
                    {
                        loader: 'extension-import-injector',
                        options: {
                            magentoRoot, projectRoot, importAggregator: 'extensions', context: 'sw'
                        }
                    }
                ]
            },
            { test: /\.(sa|sc|c)ss$/, loader: 'ignore-loader' },
            { test: /\.(jpe?g|png|gif|svg)$/, loader: 'ignore-loader' }
        ]
    },

    output: {
        filename: 'translations-compiled.js',
        path: path.join(projectRoot, 'Magento_Theme/web')
    },

    plugins: [
        new I18nPlugin({
            extractTranslations: true
        }),

        new webpack.ProvidePlugin({
            __: path.join(__dirname, 'TranslationFunction'),
            middleware: path.join(__dirname, 'Extensibility', 'Middleware'),
            Extensible: path.join(__dirname, 'Extensibility', 'Middleware', 'Extensible'),
            PureComponent: ['react', 'PureComponent'],
            React: 'react'
        }),

        new CleanWebpackPlugin([], {
            cleanAfterEveryBuildPatterns: [path.join(projectRoot, 'Magento_Theme/web/translations-compiled*')]
        })
    ]
};
