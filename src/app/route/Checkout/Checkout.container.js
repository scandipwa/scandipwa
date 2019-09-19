import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification } from 'Store/Notification';
import Checkout from './Checkout.component';

export const mapStateToProps = state => ({
    // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    showErrorNotification: message => dispatch(showNotification('error', message))
});

export class CheckoutContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired
    };

    containerFunctions = {
        onBillingSuccess: this.onBillingSuccess.bind(this),
        onBillingError: this.onBillingError.bind(this)
    };

    onBillingSuccess(fields, asyncData) {
        console.log(fields, asyncData);
    }

    onBillingError(fields, invalidFields, error) {
        const { showErrorNotification } = this.props;

        if (error) {
            const { message = __('Something went wrong') } = error;
            showErrorNotification(message);
        }
    }

    render() {
        return (
            <Checkout
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
