import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BraintreeDropIn from 'Util/Braintree';
import { paymentMethodsType } from 'Type/Checkout';

import { BRAINTREE_CONTAINER_ID } from 'Component/Braintree/Braintree.component';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';
import CheckoutPayments, { BRAINTREE } from './CheckoutPayments.component';

export class CheckoutPaymentsContainer extends PureComponent {
    static propTypes = {
        onPaymentMethodSelect: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired
    };

    containerFunctions = {
        selectPaymentMethod: this.selectPaymentMethod.bind(this),
        getBraintreeData: this.getBraintreeData.bind(this),
        initBraintree: this.initBraintree.bind(this)
    };

    braintree = new BraintreeDropIn(BRAINTREE_CONTAINER_ID);

    dataMap = {
        [BRAINTREE]: this.getBraintreeData.bind(this)
    };

    constructor(props) {
        super(props);

        const { paymentMethods } = props;
        const [{ code }] = paymentMethods;
        this.state = { selectedPaymentCode: code };
    }

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(BILLING_STEP, this.collectAdditionalData);
        }
    }

    componentWillUnmount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(BILLING_STEP, this.collectAdditionalData);
        }
    }

    getBraintreeData() {
        return { asyncData: this.braintree.requestPaymentNonce() };
    }

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
        console.log(code);
        onPaymentMethodSelect(code);
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

export default CheckoutPaymentsContainer;
