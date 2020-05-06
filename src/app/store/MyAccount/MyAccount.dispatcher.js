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
import ProductHelper from 'Component/GoogleTagManager/utils';
import Event, {
    EVENT_GTM_USER_LOGIN,
    EVENT_GTM_USER_REGISTER
} from 'Util/Event';
import GoogleTagManager, {
    GROUPED_PRODUCTS_GUEST
} from 'Component/GoogleTagManager/GoogleTagManager.component';

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
                this.transferGroupeProductsData(customer.id);
                GoogleTagManager.getInstance().updateGroupedProductsStorageName(customer.id);
            },
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    /**
     * transfer grouped products data from guest to logged in user
     *
     * @param {numbre} id customer id
     */
    transferGroupeProductsData(id) {
        const GTMInstance = GoogleTagManager.getInstance();

        if (GTMInstance.groupedProductsStorageName !== GROUPED_PRODUCTS_GUEST) {
            return;
        }

        const guestGroupedProducts = GTMInstance.getGroupedProducts();
        GTMInstance.setGroupedProducts({});
        GTMInstance.updateGroupedProductsStorageName(id);

        const userGroupedProducts = GTMInstance.getGroupedProducts();
        const result = ProductHelper.mergeGroupedProducts(guestGroupedProducts, userGroupedProducts);

        GTMInstance.setGroupedProducts(result);
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
            (data) => {
                const { createCustomer: { customer } } = data;
                const { confirmation_required } = customer;

                if (confirmation_required) {
                    return 2;
                }

                Event.dispatch(EVENT_GTM_USER_REGISTER);
                return this.signIn({ email, password }, dispatch);
            },
            (error) => {
                dispatch(showNotification('error', error[0].message));
                Promise.reject();

                return false;
            }
        );
    }

    /**
     * Confirm account action
     * @param {{key: String, email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    confirmAccount(options = {}, dispatch) {
        const mutation = MyAccountQuery.getConfirmAccountMutation(options);

        return fetchMutation(mutation).then(
            () => dispatch(showNotification('success', __('Your account is confirmed!'))),
            () => dispatch(showNotification('error', __('Something went wrong! Please, try again!')))
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
            Event.dispatch(EVENT_GTM_USER_LOGIN);

            return true;
        } catch ([e]) {
            throw e;
        }
    }
}

export default new MyAccountDispatcher();
