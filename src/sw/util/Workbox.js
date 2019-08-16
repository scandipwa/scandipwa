/* eslint-disable no-console */
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

if (typeof workbox === 'undefined') {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
}

if (workbox) {
    workbox.loadModule('workbox-core');
    workbox.loadModule('workbox-routing');
    workbox.loadModule('workbox-strategies');
    workbox.loadModule('workbox-cache-expiration');

    console.log('Yay! Workbox is loaded 🎉');
} else {
    console.log('Boo! Workbox didn\'t load 😬');
}

export default workbox;
