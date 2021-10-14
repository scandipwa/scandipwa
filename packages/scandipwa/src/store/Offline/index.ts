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

import { useDispatch } from 'react-redux';

import { setBigOfflineNotice, showOfflineNotice } from './Offline.action';

export const useOfflineStore = () => {
    const dispatch = useDispatch();

    return {
        showOfflineNotice: (isOffline: boolean) => {
            dispatch(showOfflineNotice(isOffline));
        },
        setBigOfflineNotice: (isBig: boolean) => {
            dispatch(setBigOfflineNotice(isBig));
        }
    };
};
