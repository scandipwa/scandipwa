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

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { setBigOfflineNotice, showOfflineNotice } from 'Store/Offline/Offline.action';
import { renderHOC } from 'Util/RenderHOC';

import { OfflineNoticeComponent, OfflineNoticeProps } from './OfflineNotice.component';

/** @namespace Component/OfflineNotice/Container/offlineNoticeSelector */
export const offlineNoticeSelector = (state: any): { isBig: boolean } => ({
    isBig: state.OfflineReducer.isBig
});

export interface OfflineNoticeExternalProps {
    isPage?: boolean;
}

/** @namespace Component/OfflineNotice/Container/offlineNoticeLogic */
export const offlineNoticeLogic = (props: OfflineNoticeExternalProps): OfflineNoticeProps => {
    const { isPage = false } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const { isBig } = useSelector(offlineNoticeSelector);

    const showOfflineNoticeAction = (isOffline: boolean) => dispatch(showOfflineNotice(isOffline));
    const setBigOfflineNoticeAction = (isBig: boolean) => dispatch(setBigOfflineNotice(isBig));

    useEffect(() => {
        const handleNetworkChange = () => {
            if (navigator.onLine) {
                document.documentElement.classList.remove('offline');
                showOfflineNoticeAction(false);
            } else {
                document.documentElement.classList.add('offline');
                setBigOfflineNoticeAction(true);
                if (isBig) {
                    setBigOfflineNoticeAction(false);
                }
            }
        };

        if (!isPage) {
            handleNetworkChange();
            window.addEventListener('online', handleNetworkChange);
            window.addEventListener('offline', handleNetworkChange);
        }

        return () => {
            if (!isPage) {
                window.removeEventListener('online', handleNetworkChange);
                window.removeEventListener('offline', handleNetworkChange);
            }
        };
    }, []);

    useEffect(() => {
        if (!navigator.onLine) {
            if (isBig) {
                document.documentElement.classList.add('bigOffline');
            } else {
                document.documentElement.classList.remove('bigOffline');
            }
        }
    }, [isBig]);

    useEffect(() => {
        if (isBig) {
            setBigOfflineNotice(false);
        }
    }, [location.pathname, setBigOfflineNoticeAction]);

    return {
        isPage,
        isBig
    };
};

export default renderHOC(
    OfflineNoticeComponent,
    offlineNoticeLogic
);
