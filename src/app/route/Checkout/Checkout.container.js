import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { showNotification } from 'Store/Notification';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs';
import BrowserDatabase from 'Util/BrowserDatabase';
import { changeHeaderState } from 'Store/Header';
import CheckoutQuery from 'Query/Checkout.query';
import { fetchMutation } from 'Util/Request';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { TotalsType } from 'Type/MiniCart';
import { HistoryType } from 'Type/Common';

import Checkout, { SHIPPING_STEP, BILLING_STEP, DETAILS_STEP } from './Checkout.component';

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    toggleBreadcrumbs: state => dispatch(toggleBreadcrumbs(state)),
    showErrorNotification: message => dispatch(showNotification('error', message)),
    setHeaderState: stateName => dispatch(changeHeaderState(stateName))
});

export class CheckoutContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        totals: TotalsType.isRequired,
        history: HistoryType.isRequired
    };

    containerFunctions = {
        onShippingEstimationFieldsChange: this.onShippingEstimationFieldsChange.bind(this),
        savePaymentInformation: this.savePaymentInformation.bind(this),
        saveAddressInformation: this.saveAddressInformation.bind(this)
    };

    constructor(props) {
        super(props);

        const {
            toggleBreadcrumbs,
            history,
            totals: { items }
        } = props;

        toggleBreadcrumbs(false);

        if (!items.length) history.push('/cart');

        this.state = {
            isLoading: false,
            isDeliveryOptionsLoading: false,
            paymentMethods: [],
            shippingMethods: [],
            shippingAddress: {},
            checkoutStep: SHIPPING_STEP,
            orderID: '',
            paymentTotals: BrowserDatabase.getItem(PAYMENT_TOTALS) || {}
        };
    }

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

    containerProps = () => ({
        checkoutTotals: this._getCheckoutTotals()
    });

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

    _getCheckoutTotals() {
        const { totals: cartTotals } = this.props;
        const { items } = cartTotals;
        const { paymentTotals } = this.state;

        return Object.keys(paymentTotals).length
            ? { ...cartTotals, ...paymentTotals, items }
            : cartTotals;
    }

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

                BrowserDatabase.setItem(
                    totals,
                    PAYMENT_TOTALS,
                    ONE_MONTH_IN_SECONDS
                );

                this.setState({
                    isLoading: false,
                    paymentMethods: payment_methods,
                    checkoutStep: BILLING_STEP,
                    paymentTotals: totals
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

                BrowserDatabase.deleteItem(PAYMENT_TOTALS);

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
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
