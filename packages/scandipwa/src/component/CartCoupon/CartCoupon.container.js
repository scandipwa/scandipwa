/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CartCoupon from './CartCoupon.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/CartCoupon/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    applyCouponToCart: (couponCode) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.applyCouponToCart(dispatch, couponCode)
    ),
    removeCouponFromCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeCouponFromCart(dispatch)
    )
});

/** @namespace Component/CartCoupon/Container */
export class CartCouponContainer extends PureComponent {
    static propTypes = {
        couponCode: PropTypes.string,
        applyCouponToCart: PropTypes.func.isRequired,
        removeCouponFromCart: PropTypes.func.isRequired,
        onCouponCodeUpdate: PropTypes.func
    };

    static defaultProps = {
        couponCode: '',
        onCouponCodeUpdate: () => {}
    };

    containerFunctions = {
        handleApplyCouponToCart: this.handleApplyCouponToCart.bind(this),
        handleRemoveCouponFromCart: this.handleRemoveCouponFromCart.bind(this)
    };

    state = { isLoading: false };

    handleApplyCouponToCart(couponCode) {
        const { applyCouponToCart, onCouponCodeUpdate } = this.props;

        this.setState({ isLoading: true });

        applyCouponToCart(couponCode).then(
            /** @namespace Component/CartCoupon/Container/applyCouponToCartThen */
            () => onCouponCodeUpdate()
        ).finally(
            /** @namespace Component/CartCoupon/Container/applyCouponToCartFinally */
            () => this.setState({ isLoading: false })
        );
    }

    handleRemoveCouponFromCart() {
        const { removeCouponFromCart, onCouponCodeUpdate } = this.props;

        this.setState({ isLoading: true });

        removeCouponFromCart().then(
            /** @namespace Component/CartCoupon/Container/removeCouponFromCartThen */
            () => onCouponCodeUpdate()
        ).finally(
            /** @namespace Component/CartCoupon/Container/removeCouponFromCartFinally */
            () => this.setState({ isLoading: false })
        );
    }

    render() {
        return (
            <CartCoupon
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

/** @namespace Component/CartCoupon/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartCouponContainer);
