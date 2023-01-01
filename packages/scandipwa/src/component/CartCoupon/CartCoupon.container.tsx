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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ReactElement } from 'Type/Common.type';

import CartCoupon from './CartCoupon.component';
import {
    CartCouponComponentProps,
    CartCouponContainerMapDispatchProps,
    CartCouponContainerMapStateProps,
    CartCouponContainerProps,
    CartCouponContainerPropsKeys,
    CartCouponContainerState,
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
        ({ default: dispatcher }) => dispatcher.applyCouponToCart(dispatch, couponCode),
    ),
    removeCouponFromCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeCouponFromCart(dispatch),
    ),
});

/** @namespace Component/CartCoupon/Container */
export class CartCouponContainer<
P extends Readonly<CartCouponContainerProps> = Readonly<CartCouponContainerProps>,
S extends CartCouponContainerState = CartCouponContainerState,
> extends PureComponent <P, S> {
    static defaultProps: Partial<CartCouponContainerProps> = {
        couponCode: '',
        mix: {},
        title: '',
    };

    state: S = {
        isLoading: false,
        isIncorrectCoupon: false,
    } as S;

    containerFunctions = {
        handleApplyCouponToCart: this.handleApplyCouponToCart.bind(this),
        handleRemoveCouponFromCart: this.handleRemoveCouponFromCart.bind(this),
        resetIsIncorrectCoupon: this.resetIsIncorrectCoupon.bind(this),
    };

    containerProps(): Pick<CartCouponComponentProps, CartCouponContainerPropsKeys> {
        const { isLoading, isIncorrectCoupon } = this.state;
        const { couponCode, mix, title } = this.props;

        return {
            isLoading,
            isIncorrectCoupon,
            couponCode,
            mix,
            title,
        };
    }

    resetIsIncorrectCoupon(): void {
        this.setState({ isIncorrectCoupon: false });
    }

    handleApplyCouponToCart(couponCode: string): void {
        const { applyCouponToCart } = this.props;

        this.setState({ isLoading: true });

        applyCouponToCart(couponCode).then(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleApplyCouponToCart/then/finally/applyCouponToCart/then */
            (success) => {
                this.setState({ isIncorrectCoupon: !success });
            },
        ).finally(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleApplyCouponToCart/then/finally */
            () => this.setState({ isLoading: false }),
        );
    }

    handleRemoveCouponFromCart(): void {
        const { removeCouponFromCart } = this.props;

        this.setState({ isLoading: true });

        removeCouponFromCart().then(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleRemoveCouponFromCart/removeCouponFromCart/then */
            () => this.setState({ isLoading: false }),
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
