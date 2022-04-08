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
import { Reducer } from 'redux';

import { isInitiallySignedIn } from 'Util/Auth';

import { MyAccountAction, MyAccountActionType, MyAccountStore } from './MyAccount.type';

/** @namespace Store/MyAccount/Reducer/getInitialState */
export const getInitialState = (): MyAccountStore => ({
    isSignedIn: isInitiallySignedIn(),
    passwordResetStatus: false,
    isPasswordForgotSend: false,
    isLoading: false,
    isLocked: false,
    customer: {},
    message: '',
    email: '',
    status: false
});

/** @namespace Store/MyAccount/Reducer/MyAccountReducer */
export const MyAccountReducer: Reducer<
MyAccountStore,
MyAccountAction
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case MyAccountActionType.UPDATE_CUSTOMER_SIGN_IN_STATUS: {
        const { status } = action;

        return {
            ...state,
            isSignedIn: status
        };
    }

    case MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_RESET_STATUS: {
        const { status, message } = action;

        return {
            ...state,
            passwordResetStatus: status,
            passwordResetMessage: message
        };
    }

    case MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS: {
        return {
            ...state,
            isPasswordForgotSend: !state.isPasswordForgotSend
        };
    }

    case MyAccountActionType.UPDATE_CUSTOMER_DETAILS: {
        const { customer } = action;

        return {
            ...state,
            customer
        };
    }

    case MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL: {
        const { email } = action;

        return {
            ...state,
            email
        };
    }

    case MyAccountActionType.UPDATE_CUSTOMER_IS_LOADING: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    }

    case MyAccountActionType.UPDATE_CUSTOMER_IS_LOCKED: {
        const { isLocked } = action;

        return {
            ...state,
            isLocked
        };
    }

    default:
        return state;
    }
};

export default MyAccountReducer;
