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
    isSignedIn as isInitiallySignedIn
} from 'Util/Auth';

import {
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS,
    UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    UPDATE_CUSTOMER_SIGN_IN_STATUS
} from './MyAccount.action';

export const initialState = {
    isSignedIn: isInitiallySignedIn(),
    passwordResetStatus: false,
    isPasswordForgotSend: false,
    customer: {}
};

export const MyAccountReducer = (state = initialState, action) => {
    const { status, customer } = action;

    switch (action.type) {
    case UPDATE_CUSTOMER_SIGN_IN_STATUS:
        return {
            ...state,
            isSignedIn: status
        };

    case UPDATE_CUSTOMER_PASSWORD_RESET_STATUS:
        return {
            ...state,
            passwordResetStatus: status
        };

    case UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS:
        return {
            ...state,
            isPasswordForgotSend: !state.isPasswordForgotSend
        };

    case UPDATE_CUSTOMER_DETAILS:
        return {
            ...state,
            customer
        };

    default:
        return state;
    }
};

export default MyAccountReducer;
