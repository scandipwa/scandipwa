import PropTypes from 'prop-types';
import FormPortal from 'Component/FormPortal';
import MyAccountAddressForm from 'Component/MyAccountAddressForm/MyAccountAddressForm.component';
import './CheckoutAddressForm.style';

class CheckoutAddressForm extends MyAccountAddressForm {
    static propTypes = {
        ...MyAccountAddressForm.propTypes,
        id: PropTypes.string.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func
    };

    static defaultProps = {
        ...MyAccountAddressForm.defaultProps,
        onShippingEstimationFieldsChange: () => {}
    };

    constructor(props) {
        super(props);

        const {
            address: { region: { region = '' } = {} },
            onShippingEstimationFieldsChange
        } = this.props;

        // TODO: get from region data
        this.state = {
            ...this.state,
            region,
            city: ''
        };

        this.estimateShipping();
    }

    onChange = (key, value) => {
        this.setState(() => ({ [key]: value }));
    };

    componentDidUpdate(_, prevState) {
        const {
            countryId,
            regionId,
            region,
            city
        } = this.state;

        const {
            countryId: prevCountryId,
            regionId: prevRegionId,
            region: prevRegion,
            city: prevCity
        } = prevState;

        if (
            countryId !== prevCountryId
            || regionId !== prevRegionId
            || city !== prevCity
            || region !== prevRegion
        ) {
            this.estimateShipping();
        }
    }

    estimateShipping() {
        const { onShippingEstimationFieldsChange } = this.props;

        const {
            countryId,
            regionId,
            region,
            city
        } = this.state;

        onShippingEstimationFieldsChange({
            country_id: countryId,
            region_id: regionId,
            region,
            city
        });
    }

    get fieldMap() {
        // country_id, region, region_id, city - are used for shipping estimation

        const {
            default_billing,
            default_shipping,
            city,
            ...fieldMap
        } = super.fieldMap;

        fieldMap.city = {
            ...city,
            onChange: value => this.onChange('city', value)
        };

        return fieldMap;
    }

    getRegionFields() {
        const regionFieldData = super.getRegionFields();
        const { region_string } = regionFieldData;

        if (region_string) {
            regionFieldData.region_string.onChange = v => this.onChange('region', v);
        }

        return regionFieldData;
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
