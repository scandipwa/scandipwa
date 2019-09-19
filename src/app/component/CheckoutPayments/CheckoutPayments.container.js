import { PureComponent } from 'react';
import BraintreeDropIn from 'Util/Braintree';
import { BRAINTREE_CONTAINER_ID } from 'Component/Braintree/Braintree.component';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';
import CheckoutPayments, { BRAINTREE, CHECK_MONEY } from './CheckoutPayments.component';

export class CheckoutPaymentsContainer extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = {
        selectPaymentMethod: this.selectPaymentMethod.bind(this),
        getBraintreeData: this.getBraintreeData.bind(this),
        initBraintree: this.initBraintree.bind(this)
    };

    braintree = new BraintreeDropIn(BRAINTREE_CONTAINER_ID);

    state = { selectedPaymentCode: BRAINTREE };

    dataMap = {
        [BRAINTREE]: this.getBraintreeData.bind(this),
        [CHECK_MONEY]: null
    };

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(BILLING_STEP, this.collectAdditionalData);
        }
    }

    getBraintreeData() {
        return this.braintree.requestPaymentNonce();
    }

    collectAdditionalData = () => {
        const { selectedPaymentCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedPaymentCode];
        if (!additionalDataGetter) return {};
        return { asyncData: additionalDataGetter() };
    };

    initBraintree() {
        return this.braintree.create();
    }

    selectPaymentMethod({ code }) {
        this.setState({ selectedPaymentCode: code });
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
