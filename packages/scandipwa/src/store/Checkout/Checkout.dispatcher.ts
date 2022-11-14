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
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { updateCheckoutStore } from './Checkout.action';

/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 */
export class CheckoutDispatcher extends SimpleDispatcher {
    async checkIsEmailAvailable(email: string) {
        try {
            const { isEmailAvailable: { is_email_available } } = await fetchQuery(CheckEmailQuery.getIsEmailAvailableQuery(email));

            this.dispatch(updateCheckoutStore({ isEmailAvailable: is_email_available }));
        } catch (error) {
            this.dispatch(updateCheckoutStore({ isEmailAvailable: true }));
        }
    }

    async setShippingAddress(isDefaultShipping = false): Promise<void> {
        const { CheckoutReducer: { shippingAddress } } = this.storeState;
        const { region, region_id, ...address } = shippingAddress || {};

        const mutation = MyAccountQuery.getCreateAddressMutation({
            ...address,
            region: { region, region_id },
            default_shipping: isDefaultShipping,
        });

        try {
            const data = await fetchMutation(mutation);

            if (data?.createCustomerAddress) {
                this.dispatch(updateCheckoutStore({
                    shippingAddress: {
                        ...shippingAddress,
                        id: data.createCustomerAddress.id,
                    },
                }));
            }
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));
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
        } = this.storeState;
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

    async saveGuestEmail(email: string): Promise<SetGuestEmailOnCartOutput | boolean | void> {
        const guestCartId = getCartId();

        if (!email) {
            this.dispatch(updateCheckoutStore({ isVisibleEmailRequired: !email }));
        }

        if (!guestCartId || !email) {
            return;
        }

        this.dispatch(updateCheckoutStore({ email }));

        try {
            const mutation = CheckoutQuery.getSaveGuestEmailMutation(email, guestCartId);

            const { setGuestEmailOnCart: data } = await fetchMutation(mutation);

            if (data) {
                this.dispatch(updateCheckoutStore({ isGuestEmailSaved: true }));
            }
        } catch (error) {
            this.handleError(error as NetworkError);
        }
    }

    async getPaymentMethods(): Promise<void> {
        const cartId = getCartId();

        if (!cartId) {
            return;
        }

        try {
            const query = CheckoutQuery.getPaymentMethodsQuery(cartId);

            const { getPaymentMethods: paymentMethods } = await fetchQuery<'getPaymentMethods', PaymentMethod, true>(query);

            this.dispatch(updateCheckoutStore({
                paymentMethods,
                isCheckoutLoading: false,
            }));
        } catch (error) {
            this.handleError(error as NetworkError);
        }
    }

    handleError(error: NetworkError | NetworkError[]): boolean {
        this.dispatch(updateCheckoutStore({
            isDeliveryOptionsLoading: false,
            isCheckoutLoading: false,
        }));
        this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));

        return false;
    }

    onChangeEmailRequired() {
        const {
            CheckoutReducer: {
                email,
            },
        } = this.storeState;

        this.dispatch(updateCheckoutStore({ isVisibleEmailRequired: !email }));
    }
}

export default new CheckoutDispatcher();
