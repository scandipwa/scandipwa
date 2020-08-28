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

import './CartCoupon.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import Loader from 'Component/Loader';

export class CartCoupon extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        couponCode: PropTypes.string,
        handleApplyCouponToCart: PropTypes.func.isRequired,
        handleRemoveCouponFromCart: PropTypes.func.isRequired
    };

    static defaultProps = {
        couponCode: ''
    };

    state = {
        enteredCouponCode: ''
    };

    handleCouponCodeChange = (enteredCouponCode) => {
        this.setState({
            enteredCouponCode
        });
    };

    handleApplyCoupon = () => {
        const { handleApplyCouponToCart } = this.props;
        const { enteredCouponCode } = this.state;

        handleApplyCouponToCart(enteredCouponCode);
    };

    handleRemoveCoupon = () => {
        const { handleRemoveCouponFromCart } = this.props;

        handleRemoveCouponFromCart();

        // We need to reset input field. If we do it in applyCouponCode,
        // then it will disappear if code is incorrect. We want to avoid it
        this.setState({
            enteredCouponCode: ''
        });
    };

    handleFormSubmit = (e) => {
        const { couponCode } = this.props;
        e.preventDefault();

        if (couponCode) {
            this.handleRemoveCoupon();
            return;
        }

        this.handleApplyCoupon();
    };

    renderApplyCoupon() {
        const { enteredCouponCode } = this.state;

        return (
            <>
                <Field
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  value={ enteredCouponCode }
                  placeholder={ __('Coupon Code') }
                  onChange={ this.handleCouponCodeChange }
                  mix={ { block: 'CartCoupon', elem: 'Input' } }
                />
                <button
                  block="CartCoupon"
                  elem="Button"
                  type="button"
                  mix={ { block: 'Button' } }
                  disabled={ !enteredCouponCode }
                  onClick={ this.handleApplyCoupon }
                >
                    { __('Apply Coupon') }
                </button>
            </>
        );
    }

    renderRemoveCoupon() {
        const { couponCode } = this.props;

        return (
            <>
                <p block="CartCoupon" elem="Message">
                    { __('Applied coupon code: ') }
                    <strong>{ couponCode.toUpperCase() }</strong>
                </p>
                <button
                  block="CartCoupon"
                  elem="Button"
                  type="button"
                  mix={ { block: 'Button' } }
                  onClick={ this.handleRemoveCoupon }
                >
                    { __('Remove Coupon') }
                </button>
            </>
        );
    }

    render() {
        const { isLoading, couponCode } = this.props;

        return (
            <form block="CartCoupon" onSubmit={ this.handleFormSubmit }>
                <Loader isLoading={ isLoading } />
                { (couponCode
                    ? this.renderRemoveCoupon()
                    : this.renderApplyCoupon()
                ) }
            </form>
        );
    }
}

export default CartCoupon;
