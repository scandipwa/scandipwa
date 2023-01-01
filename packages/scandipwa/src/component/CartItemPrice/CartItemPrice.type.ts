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

import { Mix } from 'Type/Common.type';
import { CartItemPriceProps } from 'Util/Cart/Cart.type';

export interface CartItemPriceContainerMapStateProps {
    getCartItemPrice: (props: CartItemPriceProps) => number;
    getCartItemSubPrice: (props: CartItemPriceProps) => number | null;
}

export interface CartItemPriceContainerMapDispatchProps {}

export interface CartItemPriceContainerBaseProps {
    currency_code: string;
    mix: Mix;
    row_total: number | string;
    row_total_incl_tax: number;
}

export type CartItemPriceContainerProps = CartItemPriceContainerMapStateProps
& CartItemPriceContainerMapDispatchProps
& CartItemPriceContainerBaseProps;

export interface CartItemPriceContainerState {}

export interface CartItemPriceComponentProps {
    currency_code: string;
    mix: Mix;
    price: number;
    subPrice: number | null;
}

export interface CartItemPriceComponentState {}

export type CartItemPriceComponentContainerPropKeys =
    | 'currency_code'
    | 'mix'
    | 'price'
    | 'subPrice';
