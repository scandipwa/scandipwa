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

import { Mix } from 'Type/Common.type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartCouponContainerMapStateProps {}

export interface CartCouponContainerMapDispatchProps {
    applyCouponToCart: (couponCode: string) => Promise<void>;
    removeCouponFromCart: () => Promise<void>;
}

export interface CartCouponContainerFunctions {
    handleApplyCouponToCart: (coupon: string) => void;
    handleRemoveCouponFromCart: () => void;
}

export interface CartCouponContainerBaseProps {
    couponCode: string;
    mix: Mix;
    title: string;
}

export type CartCouponContainerProps = CartCouponContainerMapStateProps
& CartCouponContainerMapDispatchProps
& CartCouponContainerBaseProps;

export interface CartCouponContainerState {
    isLoading: boolean;
}

export interface CartCouponComponentProps {
    isLoading: boolean;
    couponCode: string;
    handleApplyCouponToCart: (coupon: string) => void;
    handleRemoveCouponFromCart: () => void;
    mix: Mix;
    title: string;
}

export interface CartCouponComponentState {
    enteredCouponCode: string;
}

export type CartCouponContainerPropsKeys =
| 'isLoading'
| 'couponCode'
| 'mix'
| 'title';
