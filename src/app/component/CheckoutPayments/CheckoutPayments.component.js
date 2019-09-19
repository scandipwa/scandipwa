import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CheckoutPayment from 'Component/CheckoutPayment';
import Braintree from 'Component/Braintree';

import './CheckoutPayments.style';

export const BRAINTREE = 'braintree';
export const CHECK_MONEY = 'checkmo';

class CheckoutPayments extends PureComponent {
    static propTypes = {
        selectPaymentMethod: PropTypes.func.isRequired,
        initBraintree: PropTypes.func.isRequired,
        selectedPaymentCode: PropTypes.oneOf([
            BRAINTREE,
            CHECK_MONEY
        ]).isRequired,
        paymentMethods: PropTypes.arrayOf(
            PropTypes.shape({
                code: PropTypes.string,
                title: PropTypes.string
            })
        )
    };

    static defaultProps = {
        paymentMethods: [
            { code: 'braintree', title: 'Braintree' },
            { code: 'checkmo', title: 'Check / Money order' }
        ]
    };

    paymentRenderMap = {
        [BRAINTREE]: this.renderBrainTreePayment.bind(this)
    };

    renderBrainTreePayment() {
        const { initBraintree } = this.props;

        return (
            <Braintree init={ initBraintree } />
        );
    }

    renderPayment = (method) => {
        const {
            selectPaymentMethod,
            selectedPaymentCode
        } = this.props;

        const { code } = method;

        return (
            <CheckoutPayment
              key={ code }
              isSelected={ selectedPaymentCode === code }
              method={ method }
              onClick={ selectPaymentMethod }
            />
        );
    };

    renderPayments() {
        const { paymentMethods } = this.props;
        return paymentMethods.map(this.renderPayment);
    }

    renderSelectedPayment() {
        const { selectedPaymentCode } = this.props;
        const render = this.paymentRenderMap[selectedPaymentCode];
        if (!render) return null;
        return render();
    }

    renderHeading() {
        return (
            <h2
              block="CheckoutPayments"
              elem="Heading"
            >
                { __('Select payment method') }
            </h2>
        );
    }

    render() {
        return (
            <div block="CheckoutPayments">
                { this.renderHeading() }
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderPayments() }
                </ul>
                { this.renderSelectedPayment() }
            </div>
        );
    }
}

export default CheckoutPayments;
