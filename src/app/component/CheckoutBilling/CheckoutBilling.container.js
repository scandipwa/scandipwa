import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification';
import { paymentMethodsType } from 'Type/Checkout';

import CheckoutBilling from './CheckoutBilling.component';

export const mapStateToProps = state => ({
    // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    showErrorNotification: message => dispatch(showNotification('error', message))
});

export class CheckoutBillingContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired
    };

    containerFunctions = {
        onBillingSuccess: this.onBillingSuccess.bind(this),
        onBillingError: this.onBillingError.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
        onSameAsShippingChange: this.onSameAsShippingChange.bind(this),
        onPaymentMethodSelect: this.onPaymentMethodSelect.bind(this)
    };

    constructor(props) {
        super(props);

        const { paymentMethods } = props;
        const [paymentMethod] = paymentMethods;

        this.state = {
            isSameAsShipping: true,
            selectedCustomerAddressId: 0,
            paymentMethod
        };
    }

    onAddressSelect(id) {
        this.setState({ selectedCustomerAddressId: id });
    }

    onSameAsShippingChange() {
        this.setState(({ isSameAsShipping }) => ({ isSameAsShipping: !isSameAsShipping }));
    }

    onPaymentMethodSelect(method) {
        this.setState({ paymentMethod: method });
    }

    onBillingSuccess(fields, asyncData) {
        const {
            isSameAsShipping,
            selectedCustomerAddressId,
            paymentMethod
        } = this.state;

        console.log(
            {
                fields,
                asyncData,
                isSameAsShipping,
                selectedCustomerAddressId,
                paymentMethod
            }
        );
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
            <CheckoutBilling
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutBillingContainer);
