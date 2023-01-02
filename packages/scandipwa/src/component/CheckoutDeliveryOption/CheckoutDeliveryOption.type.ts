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

import { CartDisplayConfig } from 'Query/Cart.type';
import { ShippingMethod } from 'Query/Checkout.type';
import { CartTotals } from 'Store/Cart/Cart.type';

export interface CheckoutDeliveryOptionContainerMapStateProps {
    totals: CartTotals;
    cartDisplayConfig: CartDisplayConfig;
    getCartShippingItemPrice: (props: ShippingMethod) => number;
    getCartShippingItemSubPrice: (props: ShippingMethod) => number | null;
}

export interface CheckoutDeliveryOptionContainerMapDispatchProps {}

export interface CheckoutDeliveryOptionContainerFunctions {
    onOptionClick: () => void;
}

export interface CheckoutDeliveryOptionContainerBaseProps {
    onClick: (shippingMethod: ShippingMethod) => void;
    isSelected: boolean;
    option: ShippingMethod;
}

export type CheckoutDeliveryOptionContainerProps = CheckoutDeliveryOptionContainerMapStateProps
& CheckoutDeliveryOptionContainerMapDispatchProps
& CheckoutDeliveryOptionContainerBaseProps;

export interface CheckoutDeliveryOptionComponentProps {
    option: ShippingMethod;
    currency: string;
    isSelected: boolean;
    optionPrice: number;
    optionSubPrice: number | null;
    onOptionClick: () => void;
}

export type CheckoutDeliveryOptionContainerPropsKeys =
| 'isSelected'
| 'option'
| 'optionPrice'
| 'optionSubPrice'
| 'currency';

export interface CheckoutDeliveryOptionComponentState {}

export interface CheckoutDeliveryOptionContainerState {}
