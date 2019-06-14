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
import { fetchMutation, executePost } from 'Util/Request';
import {
    setAuthorizationToken,
    deleteAuthorizationToken
} from 'Util/Auth';
import { CartDispatcher } from 'Store/Cart';
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { MyAccount } from 'Query';
import { prepareQuery } from 'Util/Query';

/**
 * My account actions
 * @class MyAccount
 */
export class MyAccountDispatcher {
    requestCustomerData(options, dispatch) {
        const { withAddresses } = options;
        const query = MyAccount.getCustomer(withAddresses);

        return executePost(prepareQuery([query])).then(
            ({ customer }) => dispatch(updateCustomerDetails(customer)),
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    updateCustomerData(options, dispatch) {
        const mutation = MyAccount.getUpdateInformationMutation(options);
        return fetchMutation(mutation).then(
            ({ customer }) => dispatch(updateCustomerDetails(customer)),
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    changeCustomerPassword(options, customer, dispatch) {
        const mutation = MyAccount.getChangeCustomerPasswordMutation(options, customer);

        return fetchMutation(mutation).then(
            ({ password }) => dispatch(updateCustomerDetails(password)),
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    logout(_, dispatch) {
        dispatch(updateCustomerSignInStatus(false));
        deleteAuthorizationToken();
        CartDispatcher.updateInitialCartData(dispatch);
        WishlistDispatcher.updateInitialWishlistData(dispatch);
        // TODO: logout in BE
    }

    createCustomerAddress(options, dispatch) {
        const mutation = MyAccount.getCreateAddressMutation(options);

        return fetchMutation(mutation).then(
            ({ addresses }) => dispatch(updateCustomerDetails(addresses)),
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    updateCustomerAddress(id, options, dispatch) {
        const mutation = MyAccount.getUpdateAddressMutation(id, options);

        return fetchMutation(mutation).then(
            ({ addresses }) => dispatch(updateCustomerDetails(addresses)),
            error => dispatch(showNotification('error', error[0].message))
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
            error => dispatch(showNotification('error', error[0].message))
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
            ({ resetPassword: { status } }) => dispatch(updateCustomerPasswordResetStatus(status)),
            () => dispatch(updateCustomerPasswordResetStatus('error'))
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
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    /**
     * Sign in action
     * @param {{email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    signIn(options = {}, dispatch) {
        const mutation = MyAccount.getSignInMutation(options);

        return fetchMutation(mutation).then(
            ({ generateCustomerToken: { token } }) => {
                // TODO: TEST
                setAuthorizationToken(token);
                dispatch(updateCustomerSignInStatus(true));
                CartDispatcher.updateInitialCartData(dispatch);
                WishlistDispatcher.updateInitialWishlistData(dispatch);
            },
            error => dispatch(showNotification('error', error[0].message))
        );
    }
}

export default new MyAccountDispatcher();
