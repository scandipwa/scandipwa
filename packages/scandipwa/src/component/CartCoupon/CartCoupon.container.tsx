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

import CartDispatcher from 'Store/Cart/Cart.dispatcher';
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

/** @namespace Component/CartCoupon/Container/mapStateToProps */
export const mapStateToProps = (): CartCouponContainerMapStateProps => ({});

/** @namespace Component/CartCoupon/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CartCouponContainerMapDispatchProps => ({
    applyCouponToCart: (couponCode: string) => CartDispatcher.applyCouponToCart(dispatch, couponCode),
    removeCouponFromCart: () => CartDispatcher.removeCouponFromCart(dispatch),
});

/** @namespace Component/CartCoupon/Container */
export class CartCouponContainer extends PureComponent<CartCouponContainerProps, CartCouponContainerState> {
    static defaultProps: Partial<CartCouponContainerProps> = {
        couponCode: '',
        mix: {},
        title: '',
    };

    state: CartCouponContainerState = {
        isLoading: false,
        isIncorrectCoupon: false,
    };

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
