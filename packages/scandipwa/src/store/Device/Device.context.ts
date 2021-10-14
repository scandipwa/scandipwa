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

import { createContext, useContext } from 'react';

import isMobile from 'Util/Mobile';

export interface DeviceContextType {
    isMobile: boolean
    android: boolean
    ios: boolean
    blackberry: boolean
    opera: boolean
    windows: boolean
    safari: boolean
    standaloneMode: boolean
}

export const DeviceContext = createContext<DeviceContextType>({
    isMobile: navigator.userAgentData?.mobile ?? isMobile.any(),
    android: isMobile.android(),
    ios: isMobile.iOS(),
    blackberry: isMobile.blackBerry(),
    opera: isMobile.opera(),
    safari: isMobile.safari(),
    windows: isMobile.windows(),
    standaloneMode: window.matchMedia('(display-mode: standalone)').matches
});

/** @namespace Store/Device/Context/useDeviceContext */
export const useDeviceContext = (): DeviceContextType => useContext(DeviceContext);
