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
    CheckoutTermsAndConditionsPopupPayload,
} from 'Component/CheckoutTermsAndConditionsPopup/CheckoutTermsAndConditionsPopup.component.type';
import { FormFields } from 'Component/Form/Form.type';
import { PaymentMethod } from 'Query/Checkout.type';
import { CheckoutAgreement } from 'Query/Config.type';
import { Customer } from 'Query/MyAccount.type';
import { CheckoutAddress, PaymentInformation } from 'Route/Checkout/Checkout.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { FieldData } from 'Util/Form/Form.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

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
    onChangeEmailRequired: () => void;
}

export interface CheckoutBillingContainerFunctions {
    onSameAsShippingChange: () => void;
    onPaymentMethodSelect: (code: string) => void;
    onBillingSuccess: (form: HTMLFormElement, fields: FieldData[]) => void ;
    onAddressSelect: (id: number) => void ;
    showPopup: () => void;
    onBillingError(
        _: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput
    ): void;
}

export type CheckoutBillingContainerProps = CheckoutBillingContainerMapStateProps
& CheckoutBillingContainerMapDispatchProps
& CheckoutBillingContainerBaseProps;

export interface CheckoutBillingContainerState {
    isSameAsShipping: boolean;
    selectedCustomerAddressId: number;
    prevPaymentMethods: PaymentMethod[];
    paymentMethod: string;
    isMounted: boolean;
}

export interface CheckoutBillingComponentProps extends CheckoutBillingContainerFunctions {
    setLoading: (isLoading: boolean) => void;
    setDetailsStep: (orderID: string) => void;
    isSameAsShipping: boolean;
    termsAreEnabled: boolean;
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
    isTACAccepted: boolean;
}

export type CheckoutBillingContainerPropsKeys =
| 'cartTotalSubPrice'
| 'paymentMethods'
| 'paymentMethod'
| 'isSameAsShipping'
| 'selectedShippingMethod'
| 'setDetailsStep'
| 'setLoading'
| 'termsAndConditions'
| 'termsAreEnabled'
| 'totals';
