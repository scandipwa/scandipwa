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
    updateCustomerSignInStatus,
    updateCustomerDetails,
    updateCustomerPasswordResetStatus
} from 'Store/MyAccount';
import { QueryDispatcher, fetchMutation } from 'Util/Request';
import { setAuthorizationToken, isSignedIn } from 'Util/Auth';
import { MyAccount } from 'Query';

/**
 * My account actions
 * @class MyAccount
 * @extends {QueryDispatcher}
 */
class MyAccountDispatcher extends QueryDispatcher {
    constructor() {
        super('MyAccount', 86400);
    }

    prepareRequest(options) {
        return MyAccount.getCustomer(options);
    }

    onSuccess({ customer }, dispatch) {
        dispatch(updateCustomerDetails(customer));
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(options = {}) {
        const mutation = MyAccount.getForgotPasswordMutation(options);
        // TODO: WHEN IMPLEMENTING ALWAYS RETURN THAT EMAIL WAS SENT!!!
        fetchMutation(mutation);
    }

    /**
     * Reset password action
     * @param {{token: String, password: String, password_confirmation: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    resetPassword(options = {}, dispatch) {
        const mutation = MyAccount.getResetPasswordMutation(options);
        fetchMutation(mutation).then(
            ({ status }) => dispatch(updateCustomerPasswordResetStatus(status)),
            error => console.log(error)
        );
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    createAccount(options = {}, dispatch) {
        const mutation = MyAccount.getCreateAccountMutation(options);

        fetchMutation(mutation).then(
            ({ customer }) => {
                this.signIn(options, dispatch);
                dispatch(updateCustomerDetails(customer));
            },
            error => console.log(error)
        );
    }

    /**
     * Sign in action
     * @param {{email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    signIn(options = {}, dispatch) {
        const mutation = MyAccount.getSignInMutation(options);

        fetchMutation(mutation).then(
            ({ token }) => {
                // TODO: TEST
                setAuthorizationToken(token);
                dispatch(updateCustomerSignInStatus(isSignedIn()));
            },
            error => console.log(error)
        );
    }
}

export default new MyAccountDispatcher();
