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

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import CartCoupon from './CartCoupon.component';
import {
    CartCouponComponentProps,
    CartCouponContainerMapDispatchProps,
    CartCouponContainerMapStateProps,
    CartCouponContainerProps,
    CartCouponContainerPropsKeys,
    CartCouponContainerState
} from './CartCoupon.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/CartCoupon/Container/mapStateToProps */
export const mapStateToProps = (): CartCouponContainerMapStateProps => ({});

/** @namespace Component/CartCoupon/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CartCouponContainerMapDispatchProps => ({
    applyCouponToCart: (couponCode: string) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.applyCouponToCart(dispatch, couponCode)
    ),
    removeCouponFromCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeCouponFromCart(dispatch)
    )
});

/** @namespace Component/CartCoupon/Container */
export class CartCouponContainer extends PureComponent<CartCouponContainerProps, CartCouponContainerState> {
    static defaultProps = {
        couponCode: '',
        onCouponCodeUpdate: noopFn,
        mix: {},
        title: ''
    };

    state: CartCouponContainerState = { isLoading: false };

    containerFunctions = {
        handleApplyCouponToCart: this.handleApplyCouponToCart.bind(this),
        handleRemoveCouponFromCart: this.handleRemoveCouponFromCart.bind(this)
    };

    containerProps(): Pick<CartCouponComponentProps, CartCouponContainerPropsKeys> {
        const { isLoading } = this.state;
        const { couponCode, mix, title } = this.props;

        return {
            isLoading,
            couponCode,
            mix,
            title
        };
    }

    handleApplyCouponToCart(couponCode: string): void {
        const { applyCouponToCart } = this.props;

        this.setState({ isLoading: true });

        applyCouponToCart(couponCode).then(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleApplyCouponToCart/applyCouponToCart/then */
            () => this.setState({ isLoading: false })
        );
    }

    handleRemoveCouponFromCart(): void {
        const { removeCouponFromCart } = this.props;

        this.setState({ isLoading: true });

        removeCouponFromCart().then(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleRemoveCouponFromCart/removeCouponFromCart/then */
            () => this.setState({ isLoading: false })
        );
    }

    render(): ReactElement {
        return (
            <CartCoupon
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCouponContainer);
