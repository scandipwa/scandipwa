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

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BabelConfig = require('./babel.config');
const FallbackPlugin = require('./FallbackPlugin');
const { I18nPlugin } = require('./I18nPlugin');

const projectRoot = path.resolve(__dirname, '..', '..');
const magentoRoot = path.resolve(projectRoot, '..', '..', '..', '..', '..');
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
                fallbackRoot, projectRoot
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
                        options: BabelConfig
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

        new CleanWebpackPlugin([
            path.join(projectRoot, 'Magento_Theme/web/translations-compiled*')
        ], { root: projectRoot })
    ]
};
