/* eslint-disable no-magic-numbers */
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

module.exports = (projectRoot) => {
    const pathToFaviconDir = path.resolve(projectRoot, 'src/public/assets/favicon');

    return {
        name: 'ScandiPWA',
        short_name: 'ScandiPWA',
        description: 'ScandiPWA theme DEMO store',
        background_color: '#ffffff',
        lang: 'en-US',
        theme_color: '#ffffff',
        start_url: '/',
        crossorigin: null,
        ios: {
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-title': 'ScandiPWA',
            'apple-mobile-web-app-status-bar-style': 'default'
        },
        inject: true,
        orientation: 'portrait',
        display: 'standalone',
        icons: [
            {
                src: path.resolve(pathToFaviconDir, 'scandipwa_favicon.png'),
                sizes: [120, 152, 167, 180, 1024],
                destination: path.join('icons', 'ios'),
                ios: true
            },
            {
                src: path.resolve(pathToFaviconDir, 'scandipwa_favicon.png'),
                size: ['2048x2732', '1668x2224', '1536x2048', '1125x2436', '1242x2208', '750x1334', '640x1136'],
                destination: path.join('icons', 'ios'),
                ios: 'startup'
            },
            {
                src: path.resolve(pathToFaviconDir, 'scandipwa_favicon.png'),
                sizes: [36, 48, 72, 96, 144, 192, 512],
                destination: path.join('icons', 'android')
            }
        ]
    };
};
