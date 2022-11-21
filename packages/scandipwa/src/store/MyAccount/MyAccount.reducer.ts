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
import { Reducer } from 'redux';

import { isInitiallySignedIn } from 'Util/Auth';

import { MyAccountActionType, MyAccountStore } from './MyAccount.type';

/** @namespace Store/MyAccount/Reducer/getInitialState */
export const getInitialState = (): MyAccountStore => ({
    isSignedIn: isInitiallySignedIn(),
    passwordResetStatus: '',
    passwordResetMessage: '',
    isPasswordForgotSend: false,
    isLoading: false,
    isLocked: false,
    customer: {},
    message: '',
    email: '',
    status: false,
});

/** @namespace Store/MyAccount/Reducer/MyAccountReducer */
export const MyAccountReducer: Reducer<
MyAccountStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (MyAccountActionType.UPDATE_MY_ACCOUNT_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default MyAccountReducer;
