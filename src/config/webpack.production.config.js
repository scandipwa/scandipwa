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

// TODO: merge Webpack config files
const path = require('path');
const projectRoot = path.resolve(__dirname, '..', '..');
const fallbackThemeSpecifier = path.relative(path.resolve(projectRoot, '../..'), projectRoot);

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { InjectManifest } = require('workbox-webpack-plugin');

const webmanifestConfig = require('./webmanifest.config');
const { getBabelConfig } = require('./babel.config');
const FallbackPlugin = require('./Extensibility/plugins/FallbackPlugin');
const { I18nPlugin, mapTranslationsToConfig } = require('./I18nPlugin');

const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
const publicRoot = path.resolve(magentoRoot, 'pub');
const { parentTheme = '' } = require(path.resolve(projectRoot, 'scandipwa.json'));
const parentRoot = parentTheme
    ? path.resolve(magentoRoot, 'app/design/frontend', parentTheme)
    : undefined;
const fallbackRoot = path.resolve(magentoRoot, 'vendor', 'scandipwa', 'source');

const staticVersion = Date.now();
const publicPath = `/static/version${staticVersion}/frontend/${fallbackThemeSpecifier}/en_US/Magento_Theme/`;

const webpackConfig = ([lang, translation]) => ({
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

    cache: false,

    stats: {
        warnings: false
    },

    entry: [
        path.resolve(projectRoot, 'src', 'app', 'index.js')
    ],

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
                            magentoRoot,
                            projectRoot,
                            importAggregator: 'extensions',
                            pathFilterCondition: path => !!path.match(/\/app\/plugin\//)
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer,
                                cssnano({
                                    preset: ['default', { discardComments: { removeAll: true } }]
                                })
                            ]
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(fallbackRoot, 'src', 'app', 'style', 'abstract', '_abstract.scss')
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },

    output: {
        filename: `${lang}.bundle.js`,
        path: path.resolve(projectRoot, 'Magento_Theme', 'web'),
        pathinfo: true,
        publicPath
    },

    plugins: [
        new InjectManifest({
            swSrc: path.resolve(publicRoot, 'sw-compiled.js'),
            swDest: path.resolve(publicRoot, 'sw.js'),
            exclude: [/\.phtml/]
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(projectRoot, 'src', 'public', 'index.production.phtml'),
            filename: '../templates/scandipwa_root.phtml',
            inject: false,
            hash: true,
            publicPath,
            chunksSortMode: 'none'
        }),

        new WebpackPwaManifest(webmanifestConfig(projectRoot)),

        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-'),
                MAGENTO_STATIC_VERSION: staticVersion
            }
        }),

        new webpack.ProvidePlugin({
            __: path.join(__dirname, 'TranslationFunction'),
            middleware: path.join(__dirname, 'Extensibility', 'Middleware'),
            ExtensiblePureComponent: path.join(__dirname, 'Extensibility', 'ExtensibleClasses', 'ExtensiblePureComponent'),
            ExtensibleComponent: path.join(__dirname, 'Extensibility', 'ExtensibleClasses', 'ExtensibleComponent'),
            ExtensibleClass: path.join(__dirname, 'Extensibility', 'ExtensibleClasses', 'ExtensibleClass'),
            ExtensibleUnstatedContainer: path.join(__dirname, 'Extensibility', 'ExtensibleClasses', 'ExtensibleUnstatedContainer'),
            React: 'react'
        }),

        new I18nPlugin({
            translation
        }),

        new CleanWebpackPlugin([
            path.resolve('Magento_Theme', 'templates'),
            path.resolve('Magento_Theme', 'web')
        ], { root: projectRoot }),

        new CopyWebpackPlugin([
            { from: path.resolve(projectRoot, 'src', 'public', 'assets'), to: './assets' }
        ]),

        new MinifyPlugin({
            removeConsole: false,
            removeDebugger: true
        }, {
            comments: false
        })
    ]
});

module.exports = mapTranslationsToConfig(['en_US'], webpackConfig);
