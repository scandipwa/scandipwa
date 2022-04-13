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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import { CHECKOUT, MY_ACCOUNT } from 'Component/Header/Header.config';
import { CONFIRMATION_REQUIRED } from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import MyAccountQuery from 'Query/MyAccount.query';
import {
    ConfirmAccountOptions, CreateAccountOptions, ResetPasswordOptions, SignInOptions
} from 'Query/Query.type';
import { ACCOUNT_LOGIN_URL } from 'Route/MyAccount/MyAccount.config';
import {
    updateCustomerDetails,
    updateCustomerPasswordForgotStatus,
    updateCustomerPasswordResetStatus,
    updateCustomerSignInStatus,
    updateIsLoading,
    updateIsLocked
} from 'Store/MyAccount/MyAccount.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType, ShowNotificationAction } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { clearComparedProducts } from 'Store/ProductCompare/ProductCompare.action';
import { GQLCustomer } from 'Type/Graphql.type';
import {
    deleteAuthorizationToken,
    getAuthorizationToken,
    GRAPHQL_AUTH,
    isSignedIn,
    setAuthorizationToken
} from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteGuestQuoteId, getGuestQuoteId, setGuestQuoteId } from 'Util/Cart';
import { removeUid } from 'Util/Compare';
import history from 'Util/History';
import { prepareQuery } from 'Util/Query';
import { executePost, fetchMutation, getErrorMessage } from 'Util/Request';

import { UpdateCustomerPasswordForgotStatusAction, UpdateCustomerPasswordResetStatusAction } from './MyAccount.type';

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

export const CUSTOMER = 'customer';

export const ONE_MONTH_IN_SECONDS = 2628000;

/**
 * My account actions
 * @class MyAccount
 * @namespace Store/MyAccount/Dispatcher
 */
export class MyAccountDispatcher {
    forceLogoutRedirectPages = [
        CHECKOUT,
        MY_ACCOUNT
    ];

    requestCustomerData(dispatch: Dispatch): Promise<void> {
        const query = MyAccountQuery.getCustomerQuery() as unknown as Query<'customer', GQLCustomer, false>;

        return executePost(prepareQuery([query])).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/requestCustomerData/executePost/then */
            (data) => {
                const { customer } = data as { customer: GQLCustomer };

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
            }
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

        deleteGuestQuoteId();
        BrowserDatabase.deleteItem(CUSTOMER);
        removeUid();

        dispatch(updateCustomerSignInStatus(false));
        dispatch(updateCustomerDetails({} as GQLCustomer));

        // After logout cart, wishlist and compared product list is always empty.
        // There is no need to fetch it from the backend.
        CartDispatcher.then(
            ({ default: dispatcher }) => {
                dispatcher.resetGuestCart(dispatch);
                dispatcher.createGuestEmptyCart(dispatch);
            }
        );
        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetWishlist(dispatch)
        );

        dispatch(clearComparedProducts());
        dispatch(updateCustomerDetails({} as GQLCustomer));
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(
        options: { email: string },
        dispatch: Dispatch
    ): Promise<UpdateCustomerPasswordForgotStatusAction | ShowNotificationAction<unknown>> {
        const mutation = MyAccountQuery.getForgotPasswordMutation(options);

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/forgotPassword/fetchMutation/then/dispatch */
            () => dispatch(updateCustomerPasswordForgotStatus()),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/forgotPassword/fetchMutation/then/dispatch/catch */
            (error) => dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)))
        );
    }

    /**
     * Reset password action
     * @param {{token: String, password: String, password_confirmation: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    resetPassword(options: ResetPasswordOptions, dispatch: Dispatch): Promise<UpdateCustomerPasswordResetStatusAction> {
        const mutation = MyAccountQuery.getResetPasswordMutation(options || {});

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/resetPassword/fetchMutation/then/dispatch */
            ({ s_resetPassword: { status } }) => dispatch(updateCustomerPasswordResetStatus(status, '')),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/resetPassword/fetchMutation/then/dispatch/catch */
            (errors) => dispatch(updateCustomerPasswordResetStatus(NotificationType.ERROR, getErrorMessage(errors)))
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

            if (confirmation_required) {
                dispatch(updateIsLoading(false));

                return CONFIRMATION_REQUIRED;
            }

            return await this.signIn({ email, password }, dispatch);
        } catch (error) {
            dispatch(updateIsLoading(false));
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
            return false;
        }
    }

    /**
     * Confirm account action
     * @param {{key: String, email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    confirmAccount(options: ConfirmAccountOptions, dispatch: Dispatch): Promise<ShowNotificationAction<unknown>> {
        const mutation = MyAccountQuery.getConfirmAccountMutation(options);

        return fetchMutation(mutation).then(
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/confirmAccount/fetchMutation/then/dispatch */
            () => dispatch(showNotification(NotificationType.SUCCESS, __('Your account is confirmed!'))),
            /** @namespace Store/MyAccount/Dispatcher/MyAccountDispatcher/confirmAccount/fetchMutation/then/dispatch/catch */
            (error) => dispatch(
                showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error, __('Something went wrong! Please, try again!'))
                )
            )
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

        ProductCompareDispatcher.then(
            ({ default: dispatcher }) => dispatcher.assignCompareList(dispatch)
        );

        const cartDispatcher = (await CartDispatcher).default;
        const guestCartToken = getGuestQuoteId() || '';
        // if customer is authorized, `createEmptyCart` mutation returns customer cart token
        const customerCartToken = await cartDispatcher.createGuestEmptyCart(dispatch) || '';

        if (guestCartToken && guestCartToken !== customerCartToken) {
            // merge guest cart id and customer cart id using magento capabilities
            await cartDispatcher.mergeCarts(guestCartToken, customerCartToken, dispatch);
        }

        setGuestQuoteId(customerCartToken);
        cartDispatcher.updateInitialCartData(dispatch, true);

        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(dispatch)
        );

        await this.requestCustomerData(dispatch);

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
            history.push({ pathname: ACCOUNT_LOGIN_URL });
        }
    }

    handleCustomerDataOnInit(dispatch: Dispatch): void {
        if (isSignedIn()) {
            return;
        }

        BrowserDatabase.deleteItem(CUSTOMER);
        CartDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetGuestCart(dispatch)
        );
    }
}

export default new MyAccountDispatcher();
