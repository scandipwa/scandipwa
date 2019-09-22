import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs';
import { changeHeaderState } from 'Store/Header';
import CheckoutQuery from 'Query/Checkout.query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';

import Checkout, { SHIPPING_STEP, BILLING_STEP, DETAILS_STEP } from './Checkout.component';

export const mapStateToProps = state => ({
});

export const mapDispatchToProps = dispatch => ({
    toggleBreadcrumbs: state => dispatch(toggleBreadcrumbs(state)),
    showErrorNotification: message => dispatch(showNotification('error', message)),
    setHeaderState: stateName => dispatch(changeHeaderState(stateName))
});

export class CheckoutContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired
    };

    containerFunctions = {
        onShippingEstimationFieldsChange: this.onShippingEstimationFieldsChange.bind(this),
        savePaymentInformation: this.savePaymentInformation.bind(this),
        saveAddressInformation: this.saveAddressInformation.bind(this)
    };

    constructor(props) {
        super(props);
        const { toggleBreadcrumbs } = props;
        toggleBreadcrumbs(false);
    }

    state = {
        isLoading: false,
        isDeliveryOptionsLoading: false,
        paymentMethods: [],
        shippingMethods: [],
        shippingAddress: {},
        checkoutStep: SHIPPING_STEP,
        orderID: ''
    };

    componentWillUnmount() {
        const { toggleBreadcrumbs } = this.props;
        toggleBreadcrumbs(true);
    }

    onShippingEstimationFieldsChange(address) {
        this.setState({ isDeliveryOptionsLoading: true });

        fetchMutation(CheckoutQuery.getEstimateShippingCosts(
            address,
            this._getGuestCartId()
        )).then(
            ({ estimateShippingCosts: shippingMethods }) => {
                this.setState({ shippingMethods, isDeliveryOptionsLoading: false });
            },
            this._handleError
        );
    }

    _handleError = (error) => {
        const { showErrorNotification } = this.props;

        this.setState({
            isDeliveryOptionsLoading: false,
            isLoading: false
        }, () => {
            showErrorNotification(error[0].message);
        });
    };

    _getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    saveAddressInformation(addressInformation) {
        const { shipping_address } = addressInformation;

        this.setState({
            isLoading: true,
            shippingAddress: shipping_address
        });

        fetchMutation(CheckoutQuery.getSaveAddressInformation(
            addressInformation,
            this._getGuestCartId()
        )).then(
            ({ saveAddressInformation: data }) => {
                const { payment_methods, totals } = data;
                // TODO: handle totals field

                this.setState({
                    isLoading: false,
                    paymentMethods: payment_methods,
                    checkoutStep: BILLING_STEP
                });
            },
            this._handleError
        );
    }

    savePaymentInformation(paymentInformation) {
        this.setState({ isLoading: true });

        fetchMutation(CheckoutQuery.getSavePaymentInformationAndPlaceOrder(
            paymentInformation,
            this._getGuestCartId()
        )).then(
            ({ savePaymentInformationAndPlaceOrder: data }) => {
                const { orderID } = data;

                this.setState({
                    isLoading: false,
                    checkoutStep: DETAILS_STEP,
                    orderID
                });
            },
            this._handleError
        );
    }

    render() {
        return (
            <Checkout
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
