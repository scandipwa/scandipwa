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
import { AnyAction } from 'redux';

import { GQLCustomer } from 'Type/Graphql.type';

export enum MyAccountActionType {
    UPDATE_CUSTOMER_SIGN_IN_STATUS = 'UPDATE_CUSTOMER_SIGN_IN_STATUS',
    UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS',
    UPDATE_CUSTOMER_PASSWORD_RESET_STATUS = 'UPDATE_CUSTOMER_PASSWORD_RESET_STATUS',
    UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS',
    UPDATE_CUSTOMER_IS_LOADING = 'UPDATE_CUSTOMER_IS_LOADING',
    UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL',
    UPDATE_CUSTOMER_IS_LOCKED = 'UPDATE_CUSTOMER_IS_LOCKED'
}

export interface UpdateCustomerSignInStatusAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_SIGN_IN_STATUS;
    status: boolean;
}

export interface UpdateCustomerDetailsAction extends AnyAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_DETAILS;
    customer: GQLCustomer;
}

export interface UpdateCustomerPasswordResetStatusAction extends AnyAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_RESET_STATUS;
    status: string;
    message: string;
}

export interface UpdateCustomerPasswordForgotStatusAction extends AnyAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS;
}

export interface UpdateIsLoadingAction extends AnyAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_IS_LOADING;
    isLoading: boolean;
}

export interface UpdateCustomerPasswordForgotEmailAction extends AnyAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL;
    email: string;
}

export interface UpdateIsLockedAction extends AnyAction {
    type: MyAccountActionType.UPDATE_CUSTOMER_IS_LOCKED;
    isLocked: boolean;
}

export type MyAccountAction = UpdateCustomerSignInStatusAction
| UpdateCustomerDetailsAction
| UpdateCustomerPasswordResetStatusAction
| UpdateCustomerPasswordForgotStatusAction
| UpdateIsLoadingAction
| UpdateCustomerPasswordForgotEmailAction
| UpdateIsLockedAction;

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

declare module 'Util/Store/Store.type' {
    export interface RootState {
        MyAccountReducer: MyAccountStore;
    }
}
