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

import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { CONFIRMATION_REQUIRED } from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { ORDER_ID } from 'Component/MyAccountOrder/MyAccountOrder.config';
import MyAccountQuery from 'Query/MyAccount.query';
import {
    ConfirmAccountOptions, CreateAccountOptions, Customer, ResetPasswordOptions, SignInOptions,
} from 'Query/MyAccount.type';
import { AccountPageUrl, CUSTOMER } from 'Route/MyAccount/MyAccount.config';
import {
    SendConfirmationStatus,
} from 'Route/SendConfirmationPage/SendConfirmationPage.config';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import {
    updateCustomerDetails,
    updateCustomerPasswordForgotStatus,
    updateCustomerPasswordResetStatus,
    updateCustomerSignInStatus,
    updateIsLoading,
    updateIsLocked,
} from 'Store/MyAccount/MyAccount.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType, ShowNotificationAction } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { clearComparedProducts } from 'Store/ProductCompare/ProductCompare.action';
import ProductCompareDispatcher from 'Store/ProductCompare/ProductCompare.dispatcher';
import WishlistDispatcher from 'Store/Wishlist/Wishlist.dispatcher';
import { GRAPHQL_AUTH } from 'Util/Auth/Config';
import { isSignedIn } from 'Util/Auth/IsSignedIn';
import { deleteAuthorizationToken, getAuthorizationToken, setAuthorizationToken } from 'Util/Auth/Token';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteCartId, getCartId, setCartId } from 'Util/Cart';
import { removeUid } from 'Util/Compare';
import history from 'Util/History';
import { prepareQuery } from 'Util/Query';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/Config';
import { getErrorMessage } from 'Util/Request/Error';
import { fetchMutation } from 'Util/Request/Mutation';
import { executePost } from 'Util/Request/Request';

import { UpdateCustomerPasswordForgotStatusAction, UpdateCustomerPasswordResetStatusAction } from './MyAccount.type';

/**
 * My account actions
 * @class MyAccount
 * @namespace Store/MyAccount/Dispatcher
 */
export class MyAccountDispatcher {
    forceLogoutRedirectPages = [
        Page.CHECKOUT,
        Page.MY_ACCOUNT,
    ];

    requestCustomerData(dispatch: Dispatch): Promise<void> {
        const query = MyAccountQuery.getCustomerQuery();

        return executePost<{ customer: Customer }>(prepareQuery([query])).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/requestCustomerData/executePost/then */
            (data) => {
                const { customer } = data;

                if (!getAuthorizationToken()) {
                    return;
                }

                dispatch(updateIsLocked(false));
                dispatch(updateCustomerDetails(customer));
                BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
            },
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/requestCustomerData/executePost/then/catch */
            (error) => {
                const { extensions: { category } } = error[0];

                if (category === GRAPHQL_AUTH) {
                    dispatch(updateIsLocked(true));
                }
                dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
            },
        );
    }

    logout(authTokenExpired: boolean, isWithNotification: boolean, dispatch: Dispatch): void {
        if (authTokenExpired) {
            if (isWithNotification) {
                dispatch(showNotification(NotificationType.ERROR, __('Your session is over, you are logged out!')));
            }

            this.handleForceRedirectToLoginPage();
        } else {
            if (isSignedIn()) {
                fetchMutation(MyAccountQuery.getRevokeAccountToken());
                deleteAuthorizationToken();
            }

            if (isWithNotification) {
                dispatch(showNotification(NotificationType.SUCCESS, __('You are successfully logged out!')));
            }
        }

        deleteCartId();
        BrowserDatabase.deleteItem(CUSTOMER);
        removeUid();

        dispatch(updateCustomerSignInStatus(false));
        dispatch(updateCustomerDetails({}));

        // After logout cart, wishlist and compared product list is always empty.
        // There is no need to fetch it from the backend.
        CartDispatcher.resetGuestCart(dispatch);
        CartDispatcher.createGuestEmptyCart(dispatch);
        WishlistDispatcher.resetWishlist(dispatch);

        dispatch(clearComparedProducts());
        dispatch(updateCustomerDetails({}));
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(
        options: { email: string },
        dispatch: Dispatch,
    ): Promise<UpdateCustomerPasswordForgotStatusAction | ShowNotificationAction> {
        const mutation = MyAccountQuery.getForgotPasswordMutation(options);

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/forgotPassword/fetchMutation/then/dispatch */
            () => dispatch(updateCustomerPasswordForgotStatus()),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/forgotPassword/fetchMutation/then/dispatch/catch */
            (error) => dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error))),
        );
    }

    /**
     * Reset password action
     * @param {{customer_id: String, token: String, password: String, password_confirmation: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    resetPassword(options: ResetPasswordOptions, dispatch: Dispatch): Promise<UpdateCustomerPasswordResetStatusAction> {
        const mutation = MyAccountQuery.getResetPasswordMutation(options || {});

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/resetPassword/fetchMutation/then/dispatch */
            ({ s_resetPassword: { status } }) => dispatch(updateCustomerPasswordResetStatus(status, '')),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/resetPassword/fetchMutation/then/dispatch/catch */
            (errors) => dispatch(updateCustomerPasswordResetStatus(NotificationType.ERROR, getErrorMessage(errors))),
        );
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    async createAccount(options: CreateAccountOptions, dispatch: Dispatch): Promise<boolean | 'confirmation_required'> {
        const { customer: { email = '' }, password } = options || {};
        const mutation = MyAccountQuery.getCreateAccountMutation(options);

        dispatch(updateIsLoading(true));

        try {
            const data = await fetchMutation(mutation);
            const { createCustomer: { customer } } = data;
            const { confirmation_required } = customer;

            sessionStorage.setItem(ORDER_ID, '');

            if (confirmation_required) {
                dispatch(updateIsLoading(false));

                if (confirmation_required) {
                    dispatch(updateIsLoading(false));

                    return CONFIRMATION_REQUIRED;
                }

                return await this.signIn({ email, password }, dispatch);
            }

            return await this.signIn({ email, password }, dispatch);
        } catch (error) {
            dispatch(updateIsLoading(false));
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as Error)));

            return false;
        }
    }

    /**
     * Resend confirmation email
     * @param {{email: String}}
     * @memberof MyAccountDispatcher
     */
    async resendConfirmation(options: { email: string }, dispatch: Dispatch): Promise<boolean> {
        const mutation = MyAccountQuery.getResendConfirmationMutation(options);

        try {
            const { resendConfirmationEmail: { status } } = await fetchMutation(mutation);

            switch (status) {
            case SendConfirmationStatus.ACCOUNT_CONFIRMATION_NOT_REQUIRED:
                dispatch(showNotification(NotificationType.SUCCESS, __('This email does not require confirmation.')));
                history.push(AccountPageUrl.LOGIN_URL);

                return false;
            case SendConfirmationStatus.CONFIRMATION_SENT:
                dispatch(showNotification(
                    NotificationType.SUCCESS,
                    __('Please check your email for confirmation key.'),
                ));

                return true;
            case SendConfirmationStatus.WRONG_EMAIL:
                const { email = '' } = options;

                history.push(`${ AccountPageUrl.CONFIRMATION_URL }/?email=${ email }`);

                throw new Error(__('Wrong email! Please, try again!'));
            default:
                throw new Error(__('Something went wrong! Please, try again!'));
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    /**
     * Confirm account action
     * @param {{key: String, email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    confirmAccount(options: ConfirmAccountOptions, dispatch: Dispatch): Promise<ShowNotificationAction> {
        const mutation = MyAccountQuery.getConfirmAccountMutation(options);

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/confirmAccount/fetchMutation/then/dispatch */
            () => dispatch(showNotification(NotificationType.SUCCESS, __('Your account is confirmed!'))),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/confirmAccount/fetchMutation/then/dispatch/catch */
            (error) => dispatch(
                showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error, __('Something went wrong! Please, try again!')),
                ),
            ),
        );
    }

    /**
     * Sign in action
     * @param {{email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    async signIn(options: SignInOptions, dispatch: Dispatch): Promise<boolean> {
        const mutation = MyAccountQuery.getSignInMutation(options || {});

        const result = await fetchMutation(mutation);
        const { generateCustomerToken: { token } } = result;

        setAuthorizationToken(token);

        ProductCompareDispatcher.assignCompareList(dispatch);

        const guestCartToken = getCartId() || '';
        // if customer is authorized, `createEmptyCart` mutation returns customer cart token
        const customerCartToken = await CartDispatcher.createGuestEmptyCart(dispatch) || '';

        if (guestCartToken && guestCartToken !== customerCartToken) {
            // merge guest cart id and customer cart id using magento capabilities
            await CartDispatcher.mergeCarts(guestCartToken, customerCartToken, dispatch);
        }

        setCartId(customerCartToken);

        WishlistDispatcher.updateInitialWishlistData(dispatch);

        await this.requestCustomerData(dispatch);

        CartDispatcher.updateInitialCartData(dispatch, true);

        dispatch(updateCustomerSignInStatus(true));
        dispatch(updateIsLoading(false));
        dispatch(hideActiveOverlay());
        dispatch(showNotification(NotificationType.SUCCESS, __('You are successfully logged in!')));

        return true;
    }

    handleForceRedirectToLoginPage(): void {
        const { location: { pathname = '' } = {} } = history;
        const doRedirect = this.forceLogoutRedirectPages.reduce((result, urlPart) => {
            if (pathname.includes(urlPart)) {
                return true;
            }

            return result;
        }, false);

        if (doRedirect) {
            history.push({ pathname: AccountPageUrl.LOGIN_URL });
        }
    }

    handleCustomerDataOnInit(dispatch: Dispatch): void {
        if (isSignedIn()) {
            return;
        }

        BrowserDatabase.deleteItem(CUSTOMER);
        CartDispatcher.resetGuestCart(dispatch);
    }
}

export default new MyAccountDispatcher();
