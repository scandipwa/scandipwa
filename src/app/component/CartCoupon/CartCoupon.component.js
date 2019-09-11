import { PureComponent } from 'react';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import PropTypes from 'prop-types';
import './CartCoupon.style';

class CartCoupon extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        coupon_code: PropTypes.string,
        handleApplyCouponToCart: PropTypes.func.isRequired,
        handleRemoveCouponFromCart: PropTypes.func.isRequired
    };

    static defaultProps = {
        coupon_code: ''
    };

    state = {
        enteredCouponCode: ''
    };

    handleCouponCodeChange = this.handleCouponCodeChange.bind(this);

    handleRemoveCoupon = this.handleRemoveCoupon.bind(this);

    handleCouponCodeChange(enteredCouponCode) {
        this.setState({
            enteredCouponCode
        });
    }

    handleRemoveCoupon() {
        const { handleRemoveCouponFromCart } = this.props;

        handleRemoveCouponFromCart();

        // We need to reset input field. If we do it in applyCouponCode,
        // then it will disappear if code is incorrect. We want to avoid it
        this.setState({
            enteredCouponCode: ''
        });
    }

    renderApplyCoupon() {
        const { handleApplyCouponToCart } = this.props;
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
                  mix={ { block: 'Button' } }
                  disabled={ !enteredCouponCode }
                  onClick={ () => handleApplyCouponToCart(enteredCouponCode) }
                >
                    { __('Apply Coupon') }
                </button>
            </>
        );
    }

    renderRemoveCoupon() {
        const { coupon_code } = this.props;

        return (
            <>
                <p block="CartCoupon" elem="Message">
                    { __('Applied coupon code') }
                    { ': ' }
                    <strong>{ coupon_code.toUpperCase() }</strong>
                </p>
                <button
                  block="CartCoupon"
                  elem="Button"
                  mix={ { block: 'Button' } }
                  onClick={ this.handleRemoveCoupon }
                >
                    { __('Remove Coupon') }
                </button>
            </>
        );
    }

    render() {
        const { isLoading, coupon_code } = this.props;

        return (
            <div block="CartCoupon">
                <Loader isLoading={ isLoading } />
                { !coupon_code
                    ? this.renderApplyCoupon()
                    : this.renderRemoveCoupon() }
            </div>
        );
    }
}

export default CartCoupon;
