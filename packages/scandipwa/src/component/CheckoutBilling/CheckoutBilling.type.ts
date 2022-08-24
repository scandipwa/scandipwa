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

import {
    CheckoutTermsAndConditionsPopupPayload
} from 'Component/CheckoutTermsAndConditionsPopup/CheckoutTermsAndConditionsPopup.component.type';
import { PaymentMethod } from 'Query/Checkout.type';
import { CheckoutAgreement } from 'Query/Config.type';
import { Customer } from 'Query/MyAccount.type';
import { CheckoutAddress, PaymentInformation } from 'Route/Checkout/Checkout.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { FieldData } from 'Util/Form/Form.type';

export interface CheckoutBillingContainerMapStateProps {
    customer: Partial<Customer>;
    totals: CartTotals;
    termsAreEnabled: boolean;
    termsAndConditions: CheckoutAgreement[];
    addressLinesQty: number;
    cartTotalSubPrice: number | null;
    newShippingId: number;
    newShippingStreet: string[];
}

export interface CheckoutBillingContainerMapDispatchProps {
    showErrorNotification: (message: string) => void;
    showPopup: (payload: CheckoutTermsAndConditionsPopupPayload) => void;
}

export interface CheckoutBillingContainerBaseProps {
    paymentMethods: PaymentMethod[];
    savePaymentInformation: (paymentInformation: PaymentInformation) => Promise<void>;
    shippingAddress?: Partial<CheckoutAddress>;
    selectedShippingMethod: string;
    setDetailsStep: (orderID: string) => void;
    setLoading: (isLoading: boolean) => void;
}

export interface CheckoutBillingContainerFunctions {
    onSameAsShippingChange: () => void;
    onPaymentMethodSelect: (code: string) => void;
    onBillingSuccess: (form: HTMLFormElement, fields: FieldData[]) => void ;
    onAddressSelect: (id: number) => void ;
    showPopup: () => void;
}

export type CheckoutBillingContainerProps = CheckoutBillingContainerMapStateProps
& CheckoutBillingContainerMapDispatchProps
& CheckoutBillingContainerBaseProps;

export interface CheckoutBillingContainerState {
    isSameAsShipping: boolean;
    selectedCustomerAddressId: number;
    prevPaymentMethods: PaymentMethod[];
    paymentMethod: string;
}

export interface CheckoutBillingComponentProps {
    setLoading: (isLoading: boolean) => void;
    setDetailsStep: (orderID: string) => void;
    isSameAsShipping: boolean;
    termsAreEnabled: boolean;
    onSameAsShippingChange: () => void;
    onPaymentMethodSelect: (code: string) => void;
    onBillingSuccess: (form: HTMLFormElement, fields: FieldData[]) => void ;
    onAddressSelect: (id: number) => void ;
    showPopup: () => void;
    paymentMethods: PaymentMethod[];
    totals: CartTotals;
    cartTotalSubPrice: number | null;
    shippingAddress?: Partial<CheckoutAddress>;
    termsAndConditions: CheckoutAgreement[];
    selectedShippingMethod: string;
    paymentMethod: string;
}

export interface CheckoutBillingComponentState {
    isOrderButtonVisible: boolean;
    isOrderButtonEnabled: boolean;
    isTermsAndConditionsAccepted: boolean;
}

export type CheckoutBillingContainerPropsKeys =
| 'cartTotalSubPrice'
| 'paymentMethods'
| 'isSameAsShipping'
| 'selectedShippingMethod'
| 'setDetailsStep'
| 'setLoading'
| 'termsAndConditions'
| 'termsAreEnabled'
| 'totals';
