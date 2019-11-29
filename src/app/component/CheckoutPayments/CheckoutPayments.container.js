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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BraintreeDropIn from 'Util/Braintree';
import { paymentMethodsType } from 'Type/Checkout';
import { showNotification } from 'Store/Notification';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';
import { KlarnaContainer } from 'Component/Klarna/Klarna.container';
import { BRAINTREE_CONTAINER_ID } from 'Component/Braintree/Braintree.component';
import CheckoutPayments, { BRAINTREE, STRIPE, KLARNA } from './CheckoutPayments.component';

export const STRIPE_MODE_TEST = 'test';

export const mapStateToProps = state => ({
    stripe_mode: state.ConfigReducer.stripe_mode,
    stripe_live_pk: state.ConfigReducer.stripe_live_pk,
    stripe_test_pk: state.ConfigReducer.stripe_test_pk
});

export const mapDispatchToProps = dispatch => ({
    showError: message => dispatch(showNotification('error', __(message)))
});

export class CheckoutPaymentsContainer extends PureComponent {
    static propTypes = {
        onPaymentMethodSelect: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        stripe_mode: PropTypes.string.isRequired,
        stripe_live_pk: PropTypes.string,
        stripe_test_pk: PropTypes.string
    };

    static defaultProps = {
        stripe_live_pk: '',
        stripe_test_pk: ''
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

    /**
     * Setter for stripe component reference
     * @param ref
     */
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

    /**
     * Returns the Publishable Stripe API key that should be used
     * for the current Stripe mode (test or live)
     */
    getStripeKey() {
        const {
            stripe_mode,
            stripe_live_pk,
            stripe_test_pk
        } = this.props;

        return stripe_mode === STRIPE_MODE_TEST
            ? stripe_test_pk
            : stripe_live_pk;
    }

    containerProps = () => ({
        stripeKey: this.getStripeKey()
    });

    collectAdditionalData = () => {
        const { selectedPaymentCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedPaymentCode];
        if (!additionalDataGetter) return {};
        return additionalDataGetter();
    };

    initBraintree() {
        return this.braintree.create();
    }

    selectPaymentMethod(paymentMethod) {
        const { onPaymentMethodSelect } = this.props;
        const { code } = paymentMethod;
        this.setState({ selectedPaymentCode: code });
        onPaymentMethodSelect(code);
    }

    render() {
        return (
            <CheckoutPayments
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentsContainer);
