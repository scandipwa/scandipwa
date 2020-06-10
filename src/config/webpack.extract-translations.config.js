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
const FallbackPlugin = require('./Extensibility/FallbackPlugin');
const { I18nPlugin } = require('./I18nPlugin');

const projectRoot = path.resolve(__dirname, '..', '..');
const { parentTheme = '' } = require(path.resolve(projectRoot, 'scandipwa.json'));
const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
const parentRoot = path.resolve(magentoRoot, 'app/design/frontend', parentTheme);
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
                fallbackRoot, projectRoot, parentRoot
            })
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
                            magentoRoot,
                            projectRoot,
                            importAggregator: 'extensions'
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
            __: path.resolve(path.join(__dirname, 'TranslationFunction'))
        }),

        new CleanWebpackPlugin([], {
            cleanAfterEveryBuildPatterns: [path.join(projectRoot, 'Magento_Theme/web/translations-compiled*')]
        })
    ]
};
