/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { isInitiallySignedIn } from 'Util/Auth';

import {
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_CUSTOMER_IS_LOADING,
    UPDATE_CUSTOMER_IS_LOCKED,
    UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL,
    UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS,
    UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    UPDATE_CUSTOMER_SIGN_IN_STATUS
} from './MyAccount.action';

/** @namespace Store/MyAccount/Reducer/getInitialState */
export const getInitialState = () => ({
    isSignedIn: isInitiallySignedIn(),
    passwordResetStatus: false,
    isPasswordForgotSend: false,
    isLoading: false,
    isLocked: false,
    customer: {},
    message: ''
});

/** @namespace Store/MyAccount/Reducer/MyAccountReducer */
export const MyAccountReducer = (
    state = getInitialState(),
    action
) => {
    const {
        status, customer, message, email
    } = action;

    switch (action.type) {
    case UPDATE_CUSTOMER_SIGN_IN_STATUS:
        return {
            ...state,
            isSignedIn: status
        };

    case UPDATE_CUSTOMER_PASSWORD_RESET_STATUS:
        return {
            ...state,
            passwordResetStatus: status,
            passwordResetMessage: message
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
    case UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL:
        return {
            ...state,
            email
        };
    case UPDATE_CUSTOMER_IS_LOADING:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    case UPDATE_CUSTOMER_IS_LOCKED:
        const { isLocked } = action;

        return {
            ...state,
            isLocked
        };

    default:
        return state;
    }
};

export default MyAccountReducer;
