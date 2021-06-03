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

import { isInitiallySignedIn } from 'Util/Auth';

import {
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_CUSTOMER_IS_LOADING,
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
    customer: {},
    message: ''
});

/** @namespace Store/MyAccount/Reducer */
export const MyAccountReducer = (
    state = getInitialState(),
    action
) => {
    const { status, customer, message } = action;

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
    case UPDATE_CUSTOMER_IS_LOADING:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default MyAccountReducer;
