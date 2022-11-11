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

import CheckEmailQuery from 'Query/CheckEmail.query';
import CheckoutQuery from 'Query/Checkout.query';
import { PaymentMethod, SetGuestEmailOnCartOutput } from 'Query/Checkout.type';
import MyAccountQuery from 'Query/MyAccount.query';
import { PaymentInformation } from 'Route/Checkout/Checkout.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import { GQLCartAddressInput } from 'Type/Graphql.type';
import { trimAddressMagentoStyle } from 'Util/Address';
import { isSignedIn } from 'Util/Auth';
import { getCartId } from 'Util/Cart';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';

import { updateCheckoutStore } from './Checkout.action';

/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 */
export class CheckoutDispatcher {
    async checkIsEmailAvailable(dispatch: Dispatch, email: string) {
        try {
            const { isEmailAvailable: { is_email_available } } = await fetchQuery(CheckEmailQuery.getIsEmailAvailableQuery(email));

            dispatch(updateCheckoutStore({ isEmailAvailable: is_email_available }));
        } catch (error) {
            dispatch(updateCheckoutStore({ isEmailAvailable: true }));
        }
    }

    async setShippingAddress(dispatch: Dispatch, isDefaultShipping = false): Promise<void> {
        const { CheckoutReducer: { shippingAddress } } = getStore().getState() as RootState;
        const { region, region_id, ...address } = shippingAddress || {};

        const mutation = MyAccountQuery.getCreateAddressMutation({
            ...address,
            region: { region, region_id },
            default_shipping: isDefaultShipping,
        });

        try {
            const data = await fetchMutation(mutation);

            if (data?.createCustomerAddress) {
                dispatch(updateCheckoutStore({
                    shippingAddress: {
                        ...shippingAddress,
                        id: data.createCustomerAddress.id,
                    },
                }));
            }
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));
        }
    }

    async saveBillingAddress(
        paymentInformation: PaymentInformation,
    ): Promise<void> {
        const {
            CheckoutReducer: {
                shippingAddress: {
                    id: shippingAddressId,
                },
            },
            ConfigReducer: {
                countries,
            },
        } = getStore().getState() as RootState;
        const isCustomerSignedIn = isSignedIn();
        const cart_id = getCartId();

        if (!isCustomerSignedIn && !cart_id) {
            return;
        }

        if (!cart_id) {
            return;
        }

        const { billing_address, same_as_shipping } = paymentInformation;
        const billingAddress: { address: GQLCartAddressInput; customer_address_id?: number } = {
            address: trimAddressMagentoStyle(billing_address, countries),
        };

        if (same_as_shipping && shippingAddressId) {
            billingAddress.customer_address_id = shippingAddressId;
        }

        await fetchMutation(CheckoutQuery.getSetBillingAddressOnCart({
            cart_id,
            billing_address: billingAddress,
        }));
    }

    async saveGuestEmail(dispatch: Dispatch, email: string): Promise<SetGuestEmailOnCartOutput | boolean | void> {
        const guestCartId = getCartId();

        if (!email) {
            dispatch(updateCheckoutStore({ isVisibleEmailRequired: !email }));
        }

        if (!guestCartId || !email) {
            return;
        }

        dispatch(updateCheckoutStore({ email }));

        try {
            const mutation = CheckoutQuery.getSaveGuestEmailMutation(email, guestCartId);

            const { setGuestEmailOnCart: data } = await fetchMutation(mutation);

            if (data) {
                dispatch(updateCheckoutStore({ isGuestEmailSaved: true }));
            }
        } catch (error) {
            this.handleError(dispatch, error as NetworkError);
        }
    }

    async getPaymentMethods(dispatch: Dispatch): Promise<void> {
        const cartId = getCartId();

        if (!cartId) {
            return;
        }

        try {
            const query = CheckoutQuery.getPaymentMethodsQuery(cartId);

            const { getPaymentMethods: paymentMethods } = await fetchQuery<'getPaymentMethods', PaymentMethod, true>(query);

            dispatch(updateCheckoutStore({
                paymentMethods,
                isCheckoutLoading: false,
            }));
        } catch (error) {
            this.handleError(dispatch, error as NetworkError);
        }
    }

    handleError(dispatch: Dispatch, error: NetworkError | NetworkError[]): boolean {
        dispatch(updateCheckoutStore({
            isDeliveryOptionsLoading: false,
            isCheckoutLoading: false,
        }));
        dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));

        return false;
    }

    onChangeEmailRequired(dispatch: Dispatch) {
        const {
            CheckoutReducer: {
                email,
            },
        } = getStore().getState() as RootState;

        dispatch(updateCheckoutStore({ isVisibleEmailRequired: !email }));
    }
}

export default new CheckoutDispatcher();
