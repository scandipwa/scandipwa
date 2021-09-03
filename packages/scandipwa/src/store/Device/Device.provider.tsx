import { useEffect, useState } from 'react';

import isMobile, { isMobileClientHints, isUsingClientHints } from 'Util/Mobile';

import { DeviceContext, DeviceContextType } from './Device.context';

export const standaloneDisplayMode = window.matchMedia('(display-mode: standalone)');

export const DeviceContextProvider: React.FC = ({ children }): JSX.Element => {
    const [deviceConfig, setDeviceConfig] = useState<DeviceContextType>({
        isMobile: true,
        android: true,
        ios: false,
        blackberry: false,
        opera: false,
        windows: false,
        safari: false,
        standaloneMode: standaloneDisplayMode.matches
    });

    useEffect(() => {
        async function handleResize() {
            if (isUsingClientHints) {
                const { platform, model } = await isMobileClientHints.getDeviceData();
                setDeviceConfig((config) => ({
                    ...config,
                    isMobile: isMobile.any(),
                    android: isMobile.android(platform),
                    ios: isMobile.iOS(platform),
                    blackberry: isMobile.blackBerry(model),
                    opera: isMobile.opera(model),
                    safari: isMobile.safari(model),
                    windows: isMobile.windows(model)
                }));
            } else {
                setDeviceConfig((config) => ({
                    ...config,
                    isMobile: isMobile.any(),
                    android: isMobile.android(),
                    ios: isMobile.iOS(),
                    blackberry: isMobile.blackBerry(),
                    opera: isMobile.opera(),
                    safari: isMobile.safari(),
                    windows: isMobile.windows()
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
