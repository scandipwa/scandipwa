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

export type MyAccountStore = {
    isSignedIn: boolean;
    passwordResetStatus: boolean;
    isPasswordForgotSend: boolean;
    isLoading: boolean;
    isLocked: boolean;
    customer: Record<string, unknown>;
    message: string;
    email: string;
    status: boolean;
};

export type MyAccountAction = Action<
    typeof UPDATE_CUSTOMER_DETAILS
| typeof UPDATE_CUSTOMER_IS_LOADING
| typeof UPDATE_CUSTOMER_IS_LOCKED
| typeof UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL
| typeof UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
| typeof UPDATE_CUSTOMER_PASSWORD_RESET_STATUS
| typeof UPDATE_CUSTOMER_SIGN_IN_STATUS
>;

declare module 'Util/Store/type' {
    export interface RootState {
        MyAccountReducer: MyAccountStore;
    }
}
