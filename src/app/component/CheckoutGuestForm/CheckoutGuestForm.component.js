import PropTypes from 'prop-types';
import './CheckoutGuestForm.style';
import FormPortal from 'Component/FormPortal';
import FieldForm from 'Component/FieldForm/FieldForm.component';
import { BILLING_STEP, SHIPPING_STEP } from 'Route/Checkout/Checkout.component';

class CheckoutGuestForm extends FieldForm {
    static propTypes = {
        isBilling: PropTypes.bool,
        isSignedIn: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isBilling: false
    };

    get fieldMap() {
        return {
            email: {
                label: __('Email'),
                validation: ['notEmpty']
            },
            phone: {
                label: __('Phone'),
                validation: ['notEmpty']
            }
        };
    }

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Enter personal information') }
            </h2>
        );
    }

    render() {
        const { isBilling, isSignedIn } = this.props;
        const FormPortalId = isBilling ? BILLING_STEP : SHIPPING_STEP;

        if (isSignedIn) return null;

        return (
            <div
              block="CheckoutGuestForm"
              mix={ { block: 'FieldForm' } }
            >
                { this.renderHeading() }
                <FormPortal id={ FormPortalId }>
                    { this.renderFields() }
                </FormPortal>
            </div>
        );
    }
}

export default CheckoutGuestForm;
