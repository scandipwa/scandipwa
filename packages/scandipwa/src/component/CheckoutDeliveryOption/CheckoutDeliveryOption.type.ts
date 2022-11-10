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
import { CheckoutStore } from 'Store/Checkout/Checkout.type';

export interface CheckoutDeliveryOptionContainerMapStateProps {
    totals: CartTotals;
    cartDisplayConfig: CartDisplayConfig;
    getCartShippingItemPrice: (props: ShippingMethod) => number;
    getCartShippingItemSubPrice: (props: ShippingMethod) => number | null;
    isPickInStoreMethodSelected: boolean;
}

export interface CheckoutDeliveryOptionContainerMapDispatchProps {
    updateCheckoutStore: (state: Partial<CheckoutStore>) => void;
}

export interface CheckoutDeliveryOptionContainerFunctions {
    onOptionClick: () => void;
}

export interface CheckoutDeliveryOptionContainerBaseProps {
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
