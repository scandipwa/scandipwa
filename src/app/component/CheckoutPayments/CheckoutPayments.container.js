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

import { BRAINTREE_CONTAINER_ID } from 'Component/Braintree/Braintree.config';
import { KlarnaContainer } from 'Component/Klarna/Klarna.container';
import { BILLING_STEP } from 'Route/Checkout/Checkout.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { paymentMethodsType } from 'Type/Checkout';
import BraintreeDropIn from 'Util/Braintree';

import CheckoutPayments from './CheckoutPayments.component';
import { BRAINTREE, KLARNA, STRIPE } from './CheckoutPayments.config';

export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

export class CheckoutPaymentsContainer extends PureComponent {
    static propTypes = {
        onPaymentMethodSelect: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired
    };

    containerFunctions = {
        initBraintree: this.initBraintree.bind(this),
        setStripeRef: this.setStripeRef.bind(this),
        selectPaymentMethod: this.selectPaymentMethod.bind(this)
    };

    braintree = new BraintreeDropIn(BRAINTREE_CONTAINER_ID);

    dataMap = {
        [BRAINTREE]: this.getBraintreeData.bind(this),
        [STRIPE]: this.getStripeData.bind(this),
        [KLARNA]: this.getKlarnaData.bind(this)
    };

    constructor(props) {
        super(props);

        const { paymentMethods } = props;
        const [{ code } = {}] = paymentMethods;
        this.state = { selectedPaymentCode: code };
    }

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(BILLING_STEP, this.collectAdditionalData, 'CheckoutPaymentsContainer');
        }
    }

    componentWillUnmount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(BILLING_STEP, 'CheckoutPaymentsContainer');
        }
    }

    setStripeRef(ref) {
        this.stripeRef = ref;
    }

    getKlarnaData() {
        return { asyncData: KlarnaContainer.authorize() };
    }

    getBraintreeData() {
        return { asyncData: this.braintree.requestPaymentNonce() };
    }

    getStripeData() {
        return { asyncData: this.stripeRef.submit() };
    }

    collectAdditionalData = () => {
        const { selectedPaymentCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedPaymentCode];
        if (!additionalDataGetter) {
            return {};
        }

        return additionalDataGetter();
    };

    initBraintree() {
        return this.braintree.create();
    }

    selectPaymentMethod({ code }) {
        const {
            onPaymentMethodSelect,
            setOrderButtonEnableStatus
        } = this.props;

        this.setState({
            selectedPaymentCode: code
        });

        onPaymentMethodSelect(code);
        setOrderButtonEnableStatus(true);
    }

    render() {
        return (
            <CheckoutPayments
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(CheckoutPaymentsContainer);
