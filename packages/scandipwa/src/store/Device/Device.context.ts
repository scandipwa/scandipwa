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

export const useDeviceContext = (): DeviceContextType => useContext(DeviceContext);
