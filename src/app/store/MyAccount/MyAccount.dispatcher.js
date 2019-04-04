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

import { updateCustomerSignInStatus, updateCustomerDetails, isSignedIn } from 'Store/MyAccount';
import { QueryDispatcher, fetchMutation } from 'Util/Request';
import { setAuthorizationToken } from 'Util/Auth';
import { MyAccount as MyAccountMutations } from 'Query';

/**
 * My account actions
 * @class MyAccount
 * @extends {QueryDispatcher}
 */
class MyAccountDispatcher extends QueryDispatcher {
    constructor() {
        super('MyAccount', 86400);
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(options = {}) {
        const mutation = MyAccountMutations.getForgotPasswordMutation(options);
        // TODO: WHEN IMPLEMENTING ALWAYS RETURN THAT EMAIL WAS SENT!!!
        return fetchMutation(mutation);
    }

    /**
     * Reset password action
     * @param {{token: String, password: String, password_confirmation: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    resetPassword(options = {}) {
        const mutation = MyAccountMutations.getResetPasswordMutation(options);
        return fetchMutation(mutation);
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    createAccount(options = {}, dispatch) {
        const mutation = MyAccountMutations.getCreateAccountMutation(options);

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
        const mutation = MyAccountMutations.getSignInMutation(options);

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
