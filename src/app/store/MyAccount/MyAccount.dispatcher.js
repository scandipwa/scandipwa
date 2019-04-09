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
    updateCustomerPasswordResetStatus,
    updateCustomerPasswordForgotStatus
} from 'Store/MyAccount';
import { QueryDispatcher, fetchMutation, executePost } from 'Util/Request';
import { setAuthorizationToken, isSignedIn } from 'Util/Auth';
import { MyAccount } from 'Query';
import { prepareQuery } from 'Util/Query';

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

    requestCustomerData(options, dispatch) {
        const { withAddresses } = options;
        const query = MyAccount.getCustomer(withAddresses);

        executePost(prepareQuery([query]))
            .then(({ customer }) => dispatch(updateCustomerDetails(customer)));
    }

    updateCustomerData(options, dispatch) {
        const mutation = MyAccount.getUpdateInformationMutation(options);
        fetchMutation(mutation).then(
            ({ customer }) => dispatch(updateCustomerDetails(customer)),
            error => console.log(error)
        );
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(options = {}, dispatch) {
        const mutation = MyAccount.getForgotPasswordMutation(options);
        fetchMutation(mutation).then(
            () => dispatch(updateCustomerPasswordForgotStatus()),
            error => console.log(error)
        );
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
        const { customer: { email }, password } = options;
        const mutation = MyAccount.getCreateAccountMutation(options);

        fetchMutation(mutation).then(
            ({ customer }) => {
                this.signIn({ email, password }, dispatch);
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
            ({ generateCustomerToken: { token } }) => {
                // TODO: TEST
                setAuthorizationToken(token);
                dispatch(updateCustomerSignInStatus(true));
            },
            error => console.log(error)
        );
    }
}

export default new MyAccountDispatcher();
