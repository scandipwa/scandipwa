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

import { PaymentMethod } from 'Query/Checkout.type';

export interface CheckoutPaymentComponentProps {
    method: PaymentMethod;
    onClick: (paymentMethod: PaymentMethod) => void;
    isSelected: boolean;
}

export interface CheckoutPaymentComponentState {}

export interface CheckoutPaymentContainerState {}
