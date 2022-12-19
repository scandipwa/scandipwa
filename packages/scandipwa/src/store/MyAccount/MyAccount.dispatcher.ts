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

import { Page } from 'Component/Header/Header.config';
import { CONFIRMATION_REQUIRED } from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { ORDER_ID } from 'Component/MyAccountOrder/MyAccountOrder.config';
import MyAccountQuery from 'Query/MyAccount.query';
import {
    ConfirmAccountOptions, CreateAccountOptions, Customer, ResetPasswordOptions, SignInOptions,
} from 'Query/MyAccount.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import {
    SendConfirmationStatus,
} from 'Route/SendConfirmationPage/SendConfirmationPage.config';
import {
    updateMyAccountStore,
} from 'Store/MyAccount/MyAccount.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import {
    deleteAuthorizationToken,
    getAuthorizationToken,
    GRAPHQL_AUTH,
    isSignedIn,
    setAuthorizationToken,
} from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteCartId, getCartId, setCartId } from 'Util/Cart';
import { removeUid } from 'Util/Compare';
import history from 'Util/History';
import { prepareQuery } from 'Util/Query';
import { executePost, fetchMutation, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { UpdateMyAccountStoreAction } from './MyAccount.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

export const CUSTOMER = 'customer';

export const ONE_MONTH_IN_SECONDS = 2628000;

/**
 * My account actions
 * @class MyAccount
 * @namespace Store/MyAccount/Dispatcher
 */
export class MyAccountDispatcher extends SimpleDispatcher {
    forceLogoutRedirectPages = [
        Page.CHECKOUT,
        Page.MY_ACCOUNT,
    ];

    requestCustomerData(): Promise<void> {
        const query = MyAccountQuery.getCustomerQuery();

        return executePost<{ customer: Customer }>(prepareQuery([query])).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/requestCustomerData/executePost/then */
            (data) => {
                const { customer } = data;

                if (!getAuthorizationToken()) {
                    return;
                }

                this.dispatch(updateMyAccountStore({ isLocked: false }));
                this.dispatch(updateMyAccountStore({ customer }));
                BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
            },
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/requestCustomerData/executePost/then/catch */
            (error) => {
                const { extensions: { category } } = error[0];

                if (category === GRAPHQL_AUTH) {
                    this.dispatch(updateMyAccountStore({ isLocked: true }));
                }

                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        getErrorMessage(error),
                    ),
                );
            },
        );
    }

    logout(authTokenExpired: boolean, isWithNotification: boolean): void {
        if (authTokenExpired) {
            if (isWithNotification) {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        __('Your session is over, you are logged out!'),
                    ),
                );
            }

            this.handleForceRedirectToLoginPage();
        } else {
            if (isSignedIn()) {
                fetchMutation(MyAccountQuery.getRevokeAccountToken());
                deleteAuthorizationToken();
            }

            if (isWithNotification) {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.SUCCESS,
                        __('You are successfully logged out!'),
                    ),
                );
            }
        }

        deleteCartId();
        BrowserDatabase.deleteItem(CUSTOMER);
        removeUid();

        this.dispatch(updateMyAccountStore({ isLoading: false }));
        this.dispatch(updateMyAccountStore({ customer: {} }));

        // After logout cart, wishlist and compared product list is always empty.
        // There is no need to fetch it from the backend.
        CartDispatcher.then(
            ({ default: dispatcher }) => {
                dispatcher.resetGuestCart();
                dispatcher.createGuestEmptyCart();
            },
        );
        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetWishlist(),
        );
        ProductCompareDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetComparedProducts(),
        );

        this.dispatch(updateMyAccountStore({ customer: {} }));
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(
        options: { email: string },

    ): Promise<UpdateMyAccountStoreAction | void> {
        const mutation = MyAccountQuery.getForgotPasswordMutation(options);
        const { isPasswordForgotSend } = this.storeState.MyAccountReducer;

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/forgotPassword/fetchMutation/then */
            () => this.dispatch(updateMyAccountStore({ isPasswordForgotSend: !isPasswordForgotSend })),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/forgotPassword/fetchMutation/then/catch */
            (error) => NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error),
                ),
            ),
        );
    }

    /**
     * Reset password action
     * @param {{customer_id: String, token: String, password: String, password_confirmation: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    resetPassword(options: ResetPasswordOptions): Promise<UpdateMyAccountStoreAction> {
        const mutation = MyAccountQuery.getResetPasswordMutation(options || {});

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/resetPassword/fetchMutation/then */
            ({ s_resetPassword: { status } }) => this.dispatch(updateMyAccountStore({ passwordResetStatus: status, passwordResetMessage: '' })),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/resetPassword/fetchMutation/then/catch */
            (errors) => this.dispatch(updateMyAccountStore({ passwordResetStatus: NotificationType.ERROR, passwordResetMessage: getErrorMessage(errors) })),
        );
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    async createAccount(options: CreateAccountOptions): Promise<boolean | 'confirmation_required'> {
        const { customer: { email = '' }, password } = options || {};
        const mutation = MyAccountQuery.getCreateAccountMutation(options);

        this.dispatch(updateMyAccountStore({ isLoading: true }));

        try {
            const data = await fetchMutation(mutation);
            const { createCustomer: { customer } } = data;
            const { confirmation_required } = customer;

            sessionStorage.setItem(ORDER_ID, '');

            if (confirmation_required) {
                this.dispatch(updateMyAccountStore({ isLoading: false }));

                if (confirmation_required) {
                    this.dispatch(updateMyAccountStore({ isLoading: false }));

                    return CONFIRMATION_REQUIRED;
                }

                return await this.signIn({ email, password });
            }

            return await this.signIn({ email, password });
        } catch (error) {
            this.dispatch(updateMyAccountStore({ isLoading: false }));
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error as Error),
                ),
            );

            return false;
        }
    }

    /**
     * Resend confirmation email
     * @param {{email: String}}
     * @memberof MyAccountDispatcher
     */
    async resendConfirmation(options: { email: string }): Promise<boolean> {
        const mutation = MyAccountQuery.getResendConfirmationMutation(options);

        try {
            const { resendConfirmationEmail: { status } } = await fetchMutation(mutation);

            switch (status) {
            case SendConfirmationStatus.ACCOUNT_CONFIRMATION_NOT_REQUIRED:
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.SUCCESS,
                        __('This email does not require confirmation.'),
                    ),
                );
                history.push(AccountPageUrl.LOGIN_URL);

                return false;
            case SendConfirmationStatus.CONFIRMATION_SENT:
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.SUCCESS,
                        __('Please check your email for confirmation key.'),
                    ),
                );

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
    confirmAccount(options: ConfirmAccountOptions): Promise<void> {
        const mutation = MyAccountQuery.getConfirmAccountMutation(options);

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/confirmAccount/fetchMutation/then */
            () => NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Your account is confirmed!'),
                ),
            ),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/confirmAccount/fetchMutation/then/catch */
            (error) => NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
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
    async signIn(options: SignInOptions): Promise<boolean> {
        const mutation = MyAccountQuery.getSignInMutation(options || {});

        const result = await fetchMutation(mutation);
        const { generateCustomerToken: { token } } = result;

        setAuthorizationToken(token);

        ProductCompareDispatcher.then(
            ({ default: dispatcher }) => dispatcher.assignCompareList(),
        );

        const cartDispatcher = (await CartDispatcher).default;
        const guestCartToken = getCartId() || '';
        // if customer is authorized, `createEmptyCart` mutation returns customer cart token
        const customerCartToken = (await cartDispatcher.createGuestEmptyCart()) || '';

        if (guestCartToken && guestCartToken !== customerCartToken) {
            // merge guest cart id and customer cart id using magento capabilities
            await cartDispatcher.mergeCarts(guestCartToken, customerCartToken);
        }

        setCartId(customerCartToken);
        cartDispatcher.updateInitialCartData(true);

        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(),
        );

        await this.requestCustomerData();

        this.dispatch(updateMyAccountStore({ isSignedIn: true, isLoading: true }));
        this.dispatch(hideActiveOverlay());
        NotificationDispatcher.then(
            ({ default: dispatcher }) => dispatcher.showNotification(
                NotificationType.SUCCESS,
                __('You are successfully logged in!'),
            ),
        );

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

    handleCustomerDataOnInit(): void {
        if (isSignedIn()) {
            return;
        }

        BrowserDatabase.deleteItem(CUSTOMER);
        CartDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetGuestCart(),
        );
    }
}

export default new MyAccountDispatcher();
