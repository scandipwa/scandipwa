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
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { CartDispatcher } from 'Store/Cart';
import { MyAccountQuery } from 'Query';
import { prepareQuery } from 'Util/Query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { ORDERS } from 'Store/Order/Order.reducer';

export const CUSTOMER = 'customer';

const ONE_MONTH_IN_SECONDS = 2628000;

/**
 * My account actions
 * @class MyAccount
 */
export class MyAccountDispatcher {
    requestCustomerData(dispatch) {
        const query = MyAccountQuery.getCustomerQuery();

        const customer = BrowserDatabase.getItem(CUSTOMER) || {};
        if (customer.id) dispatch(updateCustomerDetails(customer));

        return executePost(prepareQuery([query])).then(
            ({ customer }) => {
                dispatch(updateCustomerDetails(customer));
                BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
            },
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    logout(_, dispatch) {
        dispatch(updateCustomerSignInStatus(false));
        deleteAuthorizationToken();
        CartDispatcher.updateInitialCartData(dispatch);
        WishlistDispatcher.updateInitialWishlistData(dispatch);
        BrowserDatabase.deleteItem(ORDERS);
        BrowserDatabase.deleteItem(CUSTOMER);
        dispatch(updateCustomerDetails({}));
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(options = {}, dispatch) {
        const mutation = MyAccountQuery.getForgotPasswordMutation(options);
        return fetchMutation(mutation).then(
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
        const mutation = MyAccountQuery.getResetPasswordMutation(options);

        return fetchMutation(mutation).then(
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
        const mutation = MyAccountQuery.getCreateAccountMutation(options);

        return fetchMutation(mutation).then(
            () => this.signIn({ email, password }, dispatch),
            (error) => {
                dispatch(showNotification('error', error[0].message));
                return false;
            }
        );
    }

    /**
     * Sign in action
     * @param {{email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    async signIn(options = {}, dispatch) {
        const mutation = MyAccountQuery.getSignInMutation(options);

        try {
            const result = await fetchMutation(mutation);
            const { generateCustomerToken: { token } } = result;

            setAuthorizationToken(token);
            dispatch(updateCustomerSignInStatus(true));
            CartDispatcher.updateInitialCartData(dispatch);
            WishlistDispatcher.updateInitialWishlistData(dispatch);

            return true;
        } catch ([e]) {
            throw e;
        }
    }
}

export default new MyAccountDispatcher();
