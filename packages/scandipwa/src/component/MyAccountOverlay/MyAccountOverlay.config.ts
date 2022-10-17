/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

export enum MyAccountPageState {
    STATE_SIGN_IN = 'signIn',
    STATE_FORGOT_PASSWORD = 'forgotPassword',
    STATE_FORGOT_PASSWORD_SUCCESS = 'forgotPasswordSuccess',
    STATE_CREATE_ACCOUNT = 'createAccount',
    STATE_LOGGED_IN = 'loggedIn',
    STATE_CONFIRM_EMAIL = 'confirmEmail',
}

export const CUSTOMER_ACCOUNT_OVERLAY_KEY = 'customer_account';
