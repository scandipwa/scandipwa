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

import Checkout from './Checkout.component';

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
        onShippingEstimationFieldsChange: this.onShippingEstimationFieldsChange.bind(this)
    };

    constructor(props) {
        super(props);

        const { toggleBreadcrumbs } = props;
        toggleBreadcrumbs(false);
    }

    state = {
        paymentMethods: [],
        shippingMethods: [],
        isLoading: false
    };

    componentWillUnmount() {
        const { toggleBreadcrumbs } = this.props;
        toggleBreadcrumbs(true);
    }

    onShippingEstimationFieldsChange(address) {
        this.setState({ isLoading: true });

        fetchMutation(CheckoutQuery.getEstimateShippingCosts(
            address,
            this._getGuestCartId()
        )).then(
            ({ estimateShippingCosts: shippingMethods }) => {
                this.setState({ shippingMethods, isLoading: false });
            },
            this._handleError
        );
    }

    _handleError = (error) => {
        const { showErrorNotification } = this.props;
        this.setState({ isLoading: false }, () => {
            showErrorNotification(error[0].message);
        });
    };

    _getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    saveAddressInformation = addressInformation => fetchMutation(
        CheckoutQuery.getSaveAddressInformation(addressInformation, this._getGuestCartId())
    );

    savePaymentInformationAndPlaceOrder = paymentInformation => fetchMutation(
        CheckoutQuery.getSavePaymentInformationAndPlaceOrder(paymentInformation, this._getGuestCartId())
    );

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
