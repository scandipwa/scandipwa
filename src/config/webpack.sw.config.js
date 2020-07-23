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
const TerserPlugin = require('terser-webpack-plugin');

const BabelConfig = require('./babel.config');
const FallbackPlugin = require('./FallbackPlugin');

const projectRoot = path.resolve(__dirname, '..', '..');
const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
const publicRoot = path.resolve(magentoRoot, 'pub');
const fallbackRoot = path.resolve(magentoRoot, 'vendor', 'scandipwa', 'source');

module.exports = (_, options) => {
    const isDevelopment = options.mode === 'development';

    const outputFilename = isDevelopment
        ? 'sw.js'
        : 'sw-compiled.js';

    const additionalOptions = isDevelopment
        ? { devtool: 'source-map' }
        : {};

    return {
        ...additionalOptions,

        resolve: {
            extensions: [
                '.js',
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

        stats: {
            warnings: false
        },

        entry: [
            path.resolve(projectRoot, 'src', 'sw', 'index.js')
        ],

        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: BabelConfig
                        }
                    ]
                }
            ]
        },

        output: {
            filename: outputFilename,
            publicPath: '/',
            pathinfo: true,
            path: publicRoot
        }
    };
};
