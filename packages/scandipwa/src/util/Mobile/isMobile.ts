/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */
export const isUsingClientHints = 'userAgentData' in navigator;

export const isMobile = {
    android: (agent = navigator.userAgent): boolean => /android/i.test(agent),
    blackBerry: (agent = navigator.userAgent): boolean => /blackberry/i.test(agent),
    iOS: (agent = navigator.userAgent): boolean => /iphone|ipod|ipad/i.test(agent),
    opera: (agent = navigator.userAgent): boolean => /opera mini/i.test(agent),
    // see https://developer.chrome.com/docs/multidevice/user-agent/ for details
    safari: (agent = navigator.userAgent): boolean => /safari/i.test(agent)
        && !/chrome/i.test(agent)
        && !/CriOS/i.test(agent)
        && !/FxiOS/i.test(agent),
    windows: (agent = navigator.userAgent): boolean => /iemobile/i.test(agent),
    // iPad uses 810 so we need to handle that.
    any: (): boolean => window.matchMedia('(max-width: 810px)').matches && window.matchMedia('screen').matches,
    standaloneMode: (): boolean => window.matchMedia('(display-mode: standalone)').matches,
};

// https://medium.com/@galmeiri/get-ready-for-chrome-user-agent-string-phase-out-c6840da1c31e
export const isMobileClientHints = {
    getDeviceData: (): Promise<UADataValues> => navigator.userAgentData.getHighEntropyValues(['platform', 'model']),
};

export default isMobile;
