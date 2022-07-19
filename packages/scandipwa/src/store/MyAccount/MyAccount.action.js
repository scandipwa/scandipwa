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

export const UPDATE_CUSTOMER_SIGN_IN_STATUS = 'UPDATE_CUSTOMER_SIGN_IN_STATUS';
export const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
export const UPDATE_CUSTOMER_PASSWORD_RESET_STATUS = 'UPDATE_CUSTOMER_PASSWORD_RESET_STATUS';
export const UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS';
export const UPDATE_CUSTOMER_IS_LOADING = 'UPDATE_CUSTOMER_IS_LOADING';
export const UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL';
export const UPDATE_CUSTOMER_IS_LOCKED = 'UPDATE_CUSTOMER_IS_LOCKED';

/** @namespace Store/MyAccount/Action/updateCustomerSignInStatus */
export const updateCustomerSignInStatus = (status) => ({
    type: UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status
});

/** @namespace Store/MyAccount/Action/updateCustomerDetails */
export const updateCustomerDetails = (customer) => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customer
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordResetStatus */
export const updateCustomerPasswordResetStatus = (status, message) => ({
    type: UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    status,
    message
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordForgotStatus */
export const updateCustomerPasswordForgotStatus = () => ({
    type: UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
});

/** @namespace Store/MyAccount/Action/updateIsLoading */
export const updateIsLoading = (isLoading) => ({
    type: UPDATE_CUSTOMER_IS_LOADING,
    isLoading
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordForgotEmail */
export const updateCustomerPasswordForgotEmail = (email) => ({
    type: UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL,
    email
});

/** @namespace Store/MyAccount/Action/updateIsLocked */
export const updateIsLocked = (isLocked) => ({
    type: UPDATE_CUSTOMER_IS_LOCKED,
    isLocked
});
