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

import { MixType } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import CartCoupon from './CartCoupon.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/CartCoupon/Container/mapStateToProps */
export const mapStateToProps = () => ({});

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
        onCouponCodeUpdate: PropTypes.func,
        mix: MixType,
        title: PropTypes.string
    };

    static defaultProps = {
        couponCode: '',
        onCouponCodeUpdate: noopFn,
        mix: {},
        title: ''
    };

    state = { isLoading: false };

    containerFunctions = {
        handleApplyCouponToCart: this.handleApplyCouponToCart.bind(this),
        handleRemoveCouponFromCart: this.handleRemoveCouponFromCart.bind(this)
    };

    containerProps() {
        const { isLoading } = this.state;
        const { couponCode, mix, title } = this.props;

        return {
            isLoading,
            couponCode,
            mix,
            title
        };
    }

    handleApplyCouponToCart(couponCode) {
        const { applyCouponToCart, onCouponCodeUpdate } = this.props;

        this.setState({ isLoading: true });

        applyCouponToCart(couponCode).then(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleApplyCouponToCart/then/finally/applyCouponToCart/then/onCouponCodeUpdate */
            () => onCouponCodeUpdate()
        ).finally(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleApplyCouponToCart/then/finally */
            () => this.setState({ isLoading: false })
        );
    }

    handleRemoveCouponFromCart() {
        const { removeCouponFromCart, onCouponCodeUpdate } = this.props;

        this.setState({ isLoading: true });

        removeCouponFromCart().then(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleRemoveCouponFromCart/then/finally/removeCouponFromCart/then/onCouponCodeUpdate */
            () => onCouponCodeUpdate()
        ).finally(
            /** @namespace Component/CartCoupon/Container/CartCouponContainer/handleRemoveCouponFromCart/then/finally */
            () => this.setState({ isLoading: false })
        );
    }

    render() {
        return (
            <CartCoupon
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCouponContainer);
