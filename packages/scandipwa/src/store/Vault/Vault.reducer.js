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
    UPDATE_IS_LOADING,
    UPDATE_STORED_PAYMENT_METHODS
} from './Vault.action';

/** @namespace Store/Vault/Reducer/getInitialState */
export const getInitialState = () => ({
    storedPaymentMethods: {},
    isLoading: true
});

/** @namespace Store/Vault/Reducer */
export const VaultReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        status,
        storedPaymentMethods
    } = action;

    switch (type) {
    case UPDATE_STORED_PAYMENT_METHODS:

        return {
            ...state,
            isLoading: false,
            storedPaymentMethods: { ...storedPaymentMethods }
        };

    case UPDATE_IS_LOADING:

        return {
            ...state,
            isLoading: status
        };
    default:
        return state;
    }
};

export default VaultReducer;
