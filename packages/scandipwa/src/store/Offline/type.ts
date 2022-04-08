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
import { Action } from 'redux';

import {
    SET_BIG_OFFLINE_NOTICE,
    SHOW_OFFLINE_NOTICE
} from './Offline.action';

export type OfflineStore = {
    isOffline: boolean;
    isBig: boolean;
};

export type OfflineAction = Action<
    typeof SET_BIG_OFFLINE_NOTICE
| typeof SHOW_OFFLINE_NOTICE
>;

declare module 'Util/Store/type' {
    export interface RootState {
        OfflineReducer: OfflineStore;
    }
}
