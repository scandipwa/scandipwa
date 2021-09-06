import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateConfigDevice } from 'Store/Config/Config.action';
import isMobile from 'Util/Mobile';

import { DeviceContext, DeviceContextType } from './Device.context';

export const standaloneDisplayMode = window.matchMedia('(display-mode: standalone)');

export const DeviceContextProvider: React.FC = ({ children }): JSX.Element => {
    const dispatch = useDispatch();
    const [deviceConfig, setDeviceConfig] = useState<DeviceContextType>({
        isMobile: navigator.userAgentData?.mobile ?? isMobile.any(),
        android: isMobile.android(),
        ios: isMobile.iOS(),
        blackberry: isMobile.blackBerry(),
        opera: isMobile.opera(),
        safari: isMobile.safari(),
        windows: isMobile.windows(),
        standaloneMode: standaloneDisplayMode.matches
    });

    useEffect(() => {
        dispatch(updateConfigDevice({
            isMobile: isMobile.any(),
            android: isMobile.android(),
            ios: isMobile.iOS(),
            blackberry: isMobile.blackBerry(),
            opera: isMobile.opera(),
            safari: isMobile.safari(),
            windows: isMobile.windows()
        }));
    }, []);

    useEffect(() => {
        function handleResize() {
            const { mobile = isMobile.any() } = navigator.userAgentData || {};
            if (deviceConfig.isMobile !== mobile) {
                setDeviceConfig((config) => ({
                    ...config,
                    isMobile: mobile
                }));
            }
        }

        function handleDisplayModeChange(e: MediaQueryListEvent): void {
            setDeviceConfig((config) => ({
                ...config,
                standaloneMode: e.matches
            }));
        }

        window.addEventListener('resize', handleResize);

        standaloneDisplayMode.addEventListener('change', handleDisplayModeChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            standaloneDisplayMode.removeEventListener('change', handleDisplayModeChange);
        };
    }, []);

    return (
        <DeviceContext.Provider value={ deviceConfig }>
            { children }
        </DeviceContext.Provider>
    );
};
