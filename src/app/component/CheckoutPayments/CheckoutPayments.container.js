import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { paymentMethodsType } from 'Type/Checkout';

import { BILLING_STEP } from 'Route/Checkout/Checkout.component';
import CheckoutPayments from './CheckoutPayments.component';

export class CheckoutPaymentsContainer extends PureComponent {
    static propTypes = {
        onPaymentMethodSelect: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired
    };

    containerFunctions = {
        selectPaymentMethod: this.selectPaymentMethod.bind(this)
    };

    dataMap = {
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

    collectAdditionalData = () => {
        const { selectedPaymentCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedPaymentCode];
        if (!additionalDataGetter) return {};
        return additionalDataGetter();
    };

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
              { ...this.state }
            />
        );
    }
}

export default CheckoutPaymentsContainer;
