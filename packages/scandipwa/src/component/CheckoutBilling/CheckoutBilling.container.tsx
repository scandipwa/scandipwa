/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { PaymentMethods } from 'Component/CheckoutPayments/CheckoutPayments.config';
import {
    TERMS_AND_CONDITIONS_POPUP_ID
} from 'Component/CheckoutTermsAndConditionsPopup/CheckoutTermsAndConditionsPopup.config';
import { StoreInPickUpCode } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { Customer, CustomerAddress } from 'Query/MyAccount.type';
import { CheckoutAddress } from 'Route/Checkout/Checkout.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import {
    getFormFields,
    setAddressesInFormObject,
    trimCheckoutAddress,
    trimCheckoutCustomerAddress
} from 'Util/Address';
import { getCartTotalSubPrice } from 'Util/Cart';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import { RootState } from 'Util/Store/Store.type';

import CheckoutBilling from './CheckoutBilling.component';
import {
    CheckoutBillingComponentProps,
    CheckoutBillingContainerMapDispatchProps,
    CheckoutBillingContainerMapStateProps,
    CheckoutBillingContainerProps,
    CheckoutBillingContainerPropsKeys,
    CheckoutBillingContainerState
} from './CheckoutBilling.type';

/** @namespace Component/CheckoutBilling/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutBillingContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer,
    totals: state.CartReducer.cartTotals,
    termsAreEnabled: state.ConfigReducer.terms_are_enabled,
    termsAndConditions: state.ConfigReducer.checkoutAgreements,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    newShippingId: state.CheckoutReducer.shippingFields.id as number,
    newShippingStreet: state.CheckoutReducer.shippingFields.street as string[]
});

/** @namespace Component/CheckoutBilling/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutBillingContainerMapDispatchProps => ({
    showErrorNotification: (message) => dispatch(showNotification(NotificationType.ERROR, message)),
    showPopup: (payload) => dispatch(showPopup(TERMS_AND_CONDITIONS_POPUP_ID, payload))
});

/** @namespace Component/CheckoutBilling/Container */
export class CheckoutBillingContainer extends PureComponent<
CheckoutBillingContainerProps,
CheckoutBillingContainerState
> {
    static defaultProps = {
        termsAreEnabled: false,
        cartTotalSubPrice: null
    };

    static getDerivedStateFromProps(
        props: CheckoutBillingContainerProps,
        state: CheckoutBillingContainerState
    ): Partial<CheckoutBillingContainerState> | null {
        const { paymentMethod, prevPaymentMethods } = state;
        const { paymentMethods } = props;

        if (!prevPaymentMethods.length && !paymentMethod) {
            const [method] = paymentMethods;
            const { code: paymentMethod } = method || {};

            return {
                prevPaymentMethods: paymentMethods,
                paymentMethod
            };
        }

        return null;
    }

    containerFunctions = {
        onBillingSuccess: this.onBillingSuccess.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
        onSameAsShippingChange: this.onSameAsShippingChange.bind(this),
        onPaymentMethodSelect: this.onPaymentMethodSelect.bind(this),
        showPopup: this.showPopup.bind(this)
    };

    __construct(props: CheckoutBillingContainerProps): void {
        super.__construct?.(props);

        const { paymentMethods, customer } = props;
        const [method] = paymentMethods;
        const { code: paymentMethod } = method || {};

        this.state = {
            isSameAsShipping: this.isSameShippingAddress(customer),
            selectedCustomerAddressId: 0,
            prevPaymentMethods: paymentMethods,
            paymentMethod
        };
    }

    containerProps(): Pick<CheckoutBillingComponentProps, CheckoutBillingContainerPropsKeys>{
        const {
            cartTotalSubPrice,
            paymentMethods,
            selectedShippingMethod,
            setDetailsStep,
            setLoading,
            termsAndConditions,
            termsAreEnabled,
            totals
        } = this.props;
        const { isSameAsShipping } = this.state;

        return {
            cartTotalSubPrice,
            paymentMethods,
            isSameAsShipping,
            selectedShippingMethod,
            setDetailsStep,
            setLoading,
            termsAndConditions,
            termsAreEnabled,
            totals
        };
    }

    isSameShippingAddress({ default_billing, default_shipping }: Partial<Customer>): boolean {
        const {
            totals: { is_virtual },
            selectedShippingMethod,
            newShippingId,
            newShippingStreet
        } = this.props;

        if (is_virtual) {
            return false;
        }

        return (
            (!newShippingId && !newShippingStreet.length && default_billing === default_shipping)
            || (default_billing && parseInt(default_billing, 10) === newShippingId)
            || (!default_billing)
        )
            && selectedShippingMethod !== StoreInPickUpCode.METHOD_CODE;
    }

    onAddressSelect(id: number): void {
        this.setState({ selectedCustomerAddressId: id });
    }

    onSameAsShippingChange(): void {
        this.setState(({ isSameAsShipping }) => ({ isSameAsShipping: !isSameAsShipping }));
    }

    onPaymentMethodSelect(code: string): void {
        this.setState({ paymentMethod: code });
    }

    onBillingSuccess(form: HTMLFormElement, fields: FieldData[]): void {
        const { savePaymentInformation } = this.props;
        const { isSameAsShipping } = this.state;

        const extractedFields = transformToNameValuePair<Record<string, unknown>>(fields);
        const address = this._getAddress(extractedFields);
        const paymentMethod = this._getPaymentData(extractedFields);

        savePaymentInformation({
            billing_address: address,
            paymentMethod,
            same_as_shipping: isSameAsShipping
        });
    }

    showPopup(): void {
        const { showPopup, termsAndConditions } = this.props;
        const {
            name: title = __('Terms and Conditions'),
            content: text = __('There are no Terms and Conditions configured.')
        } = termsAndConditions[ 0 ] || {};

        return showPopup({
            title, text
        });
    }

    _getPaymentData(fields: Record<string, unknown>): { code: string } & Record<string, unknown> {
        const { paymentMethod: code } = this.state;

        switch (code) {
        case PaymentMethods.PURCHASE_ORDER:
            const { purchaseOrderNumber } = fields;

            return {
                code,
                purchase_order_number: purchaseOrderNumber
            };

        default:
            return { code };
        }
    }

    getBillingSameAsShipping(): Partial<CheckoutAddress> {
        const { selectedShippingMethod, shippingAddress } = this.props;

        if (selectedShippingMethod === StoreInPickUpCode.METHOD_CODE) {
            const { extension_attributes, ...billingAddress } = shippingAddress || {};

            return billingAddress;
        }

        return shippingAddress || {};
    }

    _getAddress(fields: Record<string, unknown>): CheckoutAddress {
        const { addressLinesQty } = this.props;

        const {
            isSameAsShipping,
            selectedCustomerAddressId
        } = this.state;

        const formFields = getFormFields(fields, addressLinesQty);

        if (isSameAsShipping) {
            return this.getBillingSameAsShipping() as CheckoutAddress;
        }

        if (!selectedCustomerAddressId) {
            const joinedStreetAddressFields = setAddressesInFormObject(formFields, addressLinesQty, 'street_');

            return trimCheckoutAddress(joinedStreetAddressFields);
        }

        const { customer: { addresses } } = this.props;
        const address = addresses?.find(({ id }) => id === selectedCustomerAddressId) as CustomerAddress;

        return {
            ...trimCheckoutCustomerAddress(address),
            save_in_address_book: false
        };
    }

    render(): ReactElement {
        return (
            <CheckoutBilling
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutBillingContainer);
