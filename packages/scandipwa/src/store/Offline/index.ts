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
