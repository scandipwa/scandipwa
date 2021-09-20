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

export const platform = {};

// A2HS = Add to home screen: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
export const browserHasA2hsSupport = () => {
    // browser info and capability
    const _ua = window.navigator.userAgent;

    platform.isIDevice = /iphone|ipod|ipad/i.test(navigator.platform);
    platform.isSamsung = /Samsung/i.test(_ua);
    platform.isFireFox = /Firefox/i.test(_ua);
    platform.isOpera = /opr/i.test(_ua);
    platform.isEdge = /edg/i.test(_ua);

    // Opera & FireFox only Trigger on Android
    if (platform.isFireFox) {
        platform.isFireFox = /android/i.test(_ua);
    }

    if (platform.isOpera) {
        platform.isOpera = /android/i.test(_ua);
    }

    platform.isChromium = 'onbeforeinstallprompt' in window;
    platform.isInWebAppiOS = window.navigator.standalone === true;
    platform.isInWebAppChrome = window.matchMedia('(display-mode: fullscreen)').matches
        || window.matchMedia('(display-mode: standalone)').matches
        || window.matchMedia('(display-mode: minimal-ui)').matches;
    platform.isMobileSafari = platform.isIDevice
        && _ua.indexOf('Safari') > -1
        && _ua.indexOf('CriOS') < 0;
    platform.isStandalone = platform.isInWebAppiOS || platform.isInWebAppChrome;
    platform.isiPad = platform.isMobileSafari && _ua.indexOf('iPad') > -1;
    platform.isiPhone = platform.isMobileSafari && _ua.indexOf('iPad') === -1;
    platform.isCompatible = platform.isChromium
        || platform.isMobileSafari
        || platform.isSamsung
        || platform.isFireFox
        || platform.isOpera
        || platform.isIDevice;

    return platform.isCompatible;
};

export const hasManifest = () => !!document.querySelector("[rel='manifest']");

export const hasServiceWorker = () => 'serviceWorker' in navigator;
