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

/* eslint-disable import/no-extraneous-dependencies */
// Disabled due webpack plugins being dev dependencies

// TODO: merge Webpack config files

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const webmanifestConfig = require('./webmanifest.config');
const BabelConfig = require('./babel.config');
const FallbackPlugin = require('./FallbackPlugin');
const { I18nPlugin, mapTranslationsToConfig } = require('./I18nPlugin');

const projectRoot = path.resolve(__dirname, '..', '..');
const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
const fallbackRoot = path.resolve(magentoRoot, 'vendor', 'scandipwa', 'source');

const staticVersion = Date.now();
const fallbackThemeSpecifier = path.relative(path.resolve(projectRoot, '../..'), projectRoot);
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
                fallbackRoot, projectRoot
            })
        ]
    },

    optimization: {
        splitChunks: {
            minSize: 50000
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
    },

    cache: false,

    mode: 'production',

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
                        options: BabelConfig
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
                            plugins: () => [autoprefixer]
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
        chunkFilename: `${lang}.[name].bundle.js`,
        filename: `${lang}.bundle.js`,
        path: path.resolve(projectRoot, 'Magento_Theme', 'web'),
        pathinfo: true,
        publicPath
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(projectRoot, 'src', 'public', 'index.production.phtml'),
            filename: '../templates/root.phtml',
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
            __: path.resolve(path.join(__dirname, 'TranslationFunction')),
            React: 'react'
        }),

        new I18nPlugin({ translation }),

        new CleanWebpackPlugin([
            path.resolve('Magento_Theme', 'templates'),
            path.resolve('Magento_Theme', 'web')
        ], { root: projectRoot }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(projectRoot, 'src', 'public', 'assets'),
                    to: './assets'
                }
            ]
        })
    ]
});

module.exports = mapTranslationsToConfig(['en_US'], webpackConfig);
