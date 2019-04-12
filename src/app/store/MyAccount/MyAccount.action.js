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

const UPDATE_CUSTOMER_SIGN_IN_STATUS = 'UPDATE_CUSTOMER_SIGN_IN_STATUS';
const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
const UPDATE_CUSTOMER_PASSWORD_RESET_STATUS = 'UPDATE_CUSTOMER_PASSWORD_RESET_STATUS';
const UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS';

const updateCustomerSignInStatus = status => ({
    type: UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status
});

const updateCustomerDetails = customer => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customer
});

const updateCustomerPasswordResetStatus = status => ({
    type: UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    status
});

const updateCustomerPasswordForgotStatus = () => ({
    type: UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
});

export {
    UPDATE_CUSTOMER_SIGN_IN_STATUS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS,
    updateCustomerSignInStatus,
    updateCustomerDetails,
    updateCustomerPasswordResetStatus,
    updateCustomerPasswordForgotStatus
};
