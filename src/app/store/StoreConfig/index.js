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

import StoreConfigReducer from './StoreConfig.reducer';
import StoreConfigDispatcher from './StoreConfig.dispatcher';

import {
    UPDATE_STORE_CONFIG,
    updateStoreConfig
} from './StoreConfig.action';

export {
    StoreConfigReducer,
    StoreConfigDispatcher,
    UPDATE_STORE_CONFIG,
    updateStoreConfig
};
