import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import CartCoupon from './CartCoupon.component';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    applyCouponToCart: couponCode => CartDispatcher.applyCouponToCart(dispatch, couponCode),
    removeCouponFromCart: () => CartDispatcher.removeCouponFromCart(dispatch)
});

class CartCouponContainer extends PureComponent {
    static propTypes = {
        applyCouponToCart: PropTypes.func.isRequired,
        removeCouponFromCart: PropTypes.func.isRequired,
        coupon_code: PropTypes.string
    };

    static defaultProps = {
        coupon_code: ''
    };

    containerFunctions = {
        handleApplyCouponToCart: this.handleApplyCouponToCart.bind(this),
        handleRemoveCouponFromCart: this.handleRemoveCouponFromCart.bind(this)
    };

    state = { isLoading: false };

    handleApplyCouponToCart(couponCode) {
        const { applyCouponToCart } = this.props;

        this.setState({ isLoading: true });

        applyCouponToCart(couponCode).then(
            () => this.setState({ isLoading: false })
        );
    }

    handleRemoveCouponFromCart() {
        const { removeCouponFromCart } = this.props;

        this.setState({ isLoading: true });

        removeCouponFromCart().then(
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

export default connect(null, mapDispatchToProps)(CartCouponContainer);
