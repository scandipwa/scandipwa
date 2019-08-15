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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const { InjectManifest } = require('workbox-webpack-plugin');

const WebmanifestConfig = require('./webmanifest.config');
const BabelConfig = require('./babel.config');
const FallbackPlugin = require('./FallbackPlugin');

const projectRoot = path.resolve(__dirname, '..', '..');
const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
const publicRoot = path.resolve(magentoRoot, 'pub');
const fallbackRoot = path.resolve(magentoRoot, 'vendor', 'scandipwa', 'source');

const publicPath = '/static/frontend/Scandiweb/pwa/en_US/Magento_Theme/';

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
                fallbackRoot, projectRoot
            })
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
                        options: BabelConfig
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
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
        filename: '[hash:6].bundle.js',
        chunkFilename: '[name].[hash:6].chunk.js',
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
            template: path.resolve(projectRoot, 'src', 'public', 'index.production.html'),
            filename: '../templates/root.phtml',
            inject: false,
            hash: true,
            publicPath,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),

        new WebpackPwaManifest(WebmanifestConfig(projectRoot)),

        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-'),
                MAGENTO_VERSION: JSON.stringify('2.3.1')
            }
        }),

        new webpack.ProvidePlugin({
            __: path.resolve(path.join(__dirname, 'TranslationFunction'))
        }),

        new CleanWebpackPlugin([
            path.resolve('Magento_Theme', 'templates'),
            path.resolve('Magento_Theme', 'web')
        ], { root: projectRoot }),

        new MiniCssExtractPlugin(),

        new OptimizeCssAssetsPlugin(),

        new CopyWebpackPlugin([
            { from: path.resolve(projectRoot, 'src', 'public', 'assets'), to: './assets' }
        ]),

        new MinifyPlugin({
            removeConsole: true,
            removeDebugger: true
        }, {
            comments: false
        })
    ]
};
