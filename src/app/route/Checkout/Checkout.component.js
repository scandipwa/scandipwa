import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import ContentWrapper from 'Component/ContentWrapper';
import CheckoutPayments from 'Component/CheckoutPayments';
import Form from 'Component/Form';
import './Checkout.style';

export const SHIPPING_STEP = 'SHIPPING_STEP';
export const BILLING_STEP = 'BILLING_STEP';
export const DETAILS_STEP = 'DETAILS_STEP';

class Checkout extends PureComponent {
    static propTypes = {
        onBillingSuccess: PropTypes.func.isRequired,
        onBillingError: PropTypes.func.isRequired,
        checkoutStep: PropTypes.oneOf([
            SHIPPING_STEP,
            BILLING_STEP,
            DETAILS_STEP
        ])
    };

    static defaultProps = {
        checkoutStep: SHIPPING_STEP
    };

    stepMap = {
        [SHIPPING_STEP]: this.renderShippingStep.bind(this),
        [BILLING_STEP]: this.renderBillingStep.bind(this),
        [DETAILS_STEP]: this.renderDetailsStep.bind(this)
    };

    renderShippingStep() {
        return (
            <CheckoutAddressBook />
        );
    }

    renderBillingStep() {
        const { onBillingSuccess, onBillingError } = this.props;

        return (
            <Form
              id={ BILLING_STEP }
              onSubmitError={ onBillingError }
              onSubmitSuccess={ onBillingSuccess }
            >
                <CheckoutAddressBook isBilling />
                <CheckoutPayments />
                <button
                  type="submit"
                  block="Button"
                >
                    { __('Complete order') }
                </button>
            </Form>
        );
    }

    renderDetailsStep() {
        return ('details');
    }

    renderStep() {
        const { checkoutStep } = this.props;
        return this.stepMap[checkoutStep]();
    }

    render() {
        return (
            <main block="Checkout">
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    <div block="Checkout" elem="Step">
                        { this.renderStep() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default Checkout;
