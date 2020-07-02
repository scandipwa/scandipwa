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

/** @namespace SW/Util/Workbox/importExternalScripts */
const importExternalScripts = () => {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
};

/** @namespace SW/Util/Workbox/loadModules */
const loadModules = () => {
    workbox.loadModule('workbox-core');
    workbox.loadModule('workbox-routing');
    workbox.loadModule('workbox-strategies');
    workbox.loadModule('workbox-cache-expiration');
};

if (typeof workbox === 'undefined') {
    importExternalScripts();
}

if (workbox) {
    loadModules();
    console.log('Yay! Workbox is loaded 🎉');
} else {
    console.log('Boo! Workbox didn\'t load 😬');
}

export default workbox;
