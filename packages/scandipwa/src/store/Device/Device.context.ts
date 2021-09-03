import { createContext, useContext } from 'react';

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
    isMobile: true,
    android: true,
    ios: false,
    blackberry: false,
    opera: false,
    windows: false,
    safari: false,
    standaloneMode: window.matchMedia('(display-mode: standalone)').matches
});

export const useDeviceContext = (): DeviceContextType => useContext(DeviceContext);
