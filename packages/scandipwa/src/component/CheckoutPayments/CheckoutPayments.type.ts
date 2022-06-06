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

import { PaymentMethod } from 'Query/Checkout.type';
import { CartTotals } from 'Store/Cart/Cart.type';

export interface CheckoutPaymentsContainerMapStateProps {
    totals: CartTotals;
    email: string;
}

export interface CheckoutPaymentsContainerMapDispatchProps {
    showError: (message: string) => void;
}

export interface CheckoutPaymentsContainerBaseProps {
    onPaymentMethodSelect: (code: string) => void;
    setOrderButtonEnableStatus: (isOrderButtonEnabled: boolean) => void;
    paymentMethods: PaymentMethod[];
}

export type CheckoutPaymentsContainerProps = CheckoutPaymentsContainerMapStateProps
& CheckoutPaymentsContainerMapDispatchProps
& CheckoutPaymentsContainerBaseProps;

export interface CheckoutPaymentsContainerState {
    selectedPaymentCode: string;
}

export interface CheckoutPaymentsComponentProps {
    showError: (message: string) => void;
    selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
    paymentMethods: PaymentMethod[];
    setOrderButtonEnableStatus: (isOrderButtonEnabled: boolean) => void;
    selectedPaymentCode: string;
}

export type CheckoutPaymentsContainerPropsKeys =
| 'paymentMethods'
| 'selectedPaymentCode'
| 'setOrderButtonEnableStatus'
| 'showError';
