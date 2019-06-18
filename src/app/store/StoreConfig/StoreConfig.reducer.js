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

import {
    UPDATE_STORE_CONFIG
} from './StoreConfig.action';

const initialState = {
    config: {}
};

const StoreConfigReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_STORE_CONFIG:
        const { config } = action;

        return {
            ...state,
            config
        };

    default:
        return state;
    }
};

export default StoreConfigReducer;
