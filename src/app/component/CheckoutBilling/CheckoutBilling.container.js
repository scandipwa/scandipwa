import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification';
import { paymentMethodsType } from 'Type/Checkout';
import { customerType, addressType } from 'Type/Account';
import { trimCustomerAddress, trimAddressFields } from 'Util/Address';

import CheckoutBilling from './CheckoutBilling.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

export const mapDispatchToProps = dispatch => ({
    showErrorNotification: message => dispatch(showNotification('error', message))
});

export class CheckoutBillingContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        savePaymentInformation: PropTypes.func.isRequired,
        shippingAddress: addressType.isRequired,
        customer: customerType.isRequired
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
        const { savePaymentInformation } = this.props;
        const { paymentMethod: method } = this.state;
        const address = this._getAddress(fields);

        // TODO: handle asyncData from payment Methods, probably define custom handlers for them

        savePaymentInformation({
            billing_address: address,
            paymentMethod: { method }
        });
    }

    onBillingError(fields, invalidFields, error) {
        const { showErrorNotification } = this.props;

        if (error) {
            const { message = __('Something went wrong') } = error;
            showErrorNotification(message);
        }
    }

    _getAddress(fields) {
        const { shippingAddress } = this.props;

        const {
            isSameAsShipping,
            selectedCustomerAddressId
        } = this.state;

        if (isSameAsShipping) return shippingAddress;
        if (!selectedCustomerAddressId) return trimAddressFields(fields);

        const { customer: { addresses } } = this.props;
        const address = addresses.find(({ id }) => id !== addressId);
        return trimCustomerAddress(address);
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
