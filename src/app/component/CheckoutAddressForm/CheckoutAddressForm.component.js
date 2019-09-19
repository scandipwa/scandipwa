import PropTypes from 'prop-types';
import FormPortal from 'Component/FormPortal';
import MyAccountAddressForm from 'Component/MyAccountAddressForm/MyAccountAddressForm.component';
import './CheckoutAddressForm.style';

class CheckoutAddressForm extends MyAccountAddressForm {
    static propTypes = {
        ...MyAccountAddressForm.propTypes,
        id: PropTypes.string.isRequired
    };

    get fieldMap() {
        const { default_billing, default_shipping, ...fieldMap } = super.fieldMap;
        return fieldMap;
    }

    render() {
        const { id } = this.props;

        return (
            <FormPortal id={ id }>
                <div
                  block="FieldForm"
                  mix={ { block: 'CheckoutAddressForm' } }
                >
                    { this.renderFields() }
                </div>
            </FormPortal>
        );
    }
}

export default CheckoutAddressForm;
