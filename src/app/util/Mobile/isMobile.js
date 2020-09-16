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
export const isUsingClientHints = 'userAgentData' in navigator;

export const isMobile = {
    android: () => /android/i.test(navigator.userAgent),
    blackBerry: () => /blackberry/i.test(navigator.userAgent),
    iOS: () => /iphone|ipod/i.test(navigator.userAgent),
    opera: () => /opera mini/i.test(navigator.userAgent),
    windows: () => /iemobile/i.test(navigator.userAgent),
    // eslint-disable-next-line max-len
    any: () => (isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.opera() || isMobile.windows()),
    // eslint-disable-next-line max-len
    tablet: () => /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(navigator.userAgent),
    standaloneMode: () => window.matchMedia('(display-mode: standalone)').matches
};

// https://medium.com/@galmeiri/get-ready-for-chrome-user-agent-string-phase-out-c6840da1c31e
export const isMobileClientHints = {
    any: () => navigator.userAgentData.mobile,
    getDeviceData: () => navigator.userAgentData.getHighEntropyValues(['platform'])
};

export default isMobile;
