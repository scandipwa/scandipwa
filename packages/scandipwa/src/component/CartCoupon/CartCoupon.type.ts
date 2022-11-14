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

export interface CartCouponContainerMapStateProps {
    couponCode: string;
}

export interface CartCouponContainerMapDispatchProps {
    applyCouponToCart: (couponCode: string) => Promise<boolean | void>;
    removeCouponFromCart: () => Promise<void>;
}

export interface CartCouponContainerFunctions {
    handleApplyCouponToCart: (coupon: string) => void;
    handleRemoveCouponFromCart: () => void;
    resetIsIncorrectCoupon: () => void;
}

export interface CartCouponContainerBaseProps {
    mix: Mix;
    title: string;
}

export type CartCouponContainerProps = CartCouponContainerMapStateProps
& CartCouponContainerMapDispatchProps
& CartCouponContainerBaseProps;

export interface CartCouponContainerState {
    isLoading: boolean;
    isIncorrectCoupon: boolean;
}

export interface CartCouponComponentProps {
    isLoading: boolean;
    couponCode: string;
    handleApplyCouponToCart: (coupon: string) => void;
    handleRemoveCouponFromCart: () => void;
    mix: Mix;
    title: string;
    isIncorrectCoupon: boolean;
    resetIsIncorrectCoupon: () => void;
}

export interface CartCouponComponentState {
    enteredCouponCode: string;
    isFieldWithError: boolean;
}

export type CartCouponContainerPropsKeys =
| 'isLoading'
| 'couponCode'
| 'mix'
| 'title'
| 'isIncorrectCoupon';
