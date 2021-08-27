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

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';
import FieldForm from 'Component/PureForm/FieldForm';
import { addressType } from 'Type/Account';
import { countriesType } from 'Type/Config';
import {
    getAvailableRegions,
    getCityAndRegionFromZipcode, trimCustomerAddress
    // setAddressesInFormObject
} from 'Util/Address';
import transformToNameValuePair from 'Util/Form/Transform';

import myAccountAddressForm from './MyAccountAddressForm.form';

/** @namespace Component/MyAccountAddressForm/Component */
export class MyAccountAddressForm extends FieldForm {
    static propTypes = {
        isSubmitted: PropTypes.bool,
        address: addressType.isRequired,
        countries: countriesType.isRequired,
        default_country: PropTypes.string,
        onSave: PropTypes.func,
        addressLinesQty: PropTypes.number.isRequired,
        showVatNumber: PropTypes.bool.isRequired,
        regionDisplayAll: PropTypes.bool.isRequired
    };

    static defaultProps = {
        default_country: 'US',
        isSubmitted: false,
        onSave: () => {}
    };

    __construct(props) {
        super.__construct(props);

        const {
            countries,
            shippingFields,
            address,
            default_country
        } = props;

        const {
            country_id,
            region_id,
            city = ''
        } = shippingFields || address;

        const country = countries.find(({ id }) => id === country_id) || {};
        const countryId = Object.keys(country).length ? country_id : default_country;

        const { is_state_required = false } = country;

        const availableRegions = getAvailableRegions(countryId, countries);
        const [{ id: defaultRegionId = '' }] = availableRegions;
        const regionId = region_id || defaultRegionId;

        this.state = {
            countryId,
            availableRegions,
            regionId,
            isStateRequired: is_state_required,
            city
        };
    }

    onFormSuccess = (form, fields) => {
        const { onSave, addressLinesQty } = this.props;

        const newAddress = transformToNameValuePair(fields);

        if (addressLinesQty > 1) {
            newAddress.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                if (newAddress[`street_${i}`]) {
                    newAddress.street.push(newAddress[`street_${i}`]);
                }
            }
        }

        const { region_id = 0, region_string: region } = newAddress;

        newAddress.region = { region_id: +region_id, region };
        onSave(trimCustomerAddress(newAddress));
    };

    onCountryChange = (countryId) => {
        const { countries } = this.props;
        const { countryId: prevCountryId } = this.state;
        const country = countries.find(({ id }) => id === countryId);
        const { available_regions = [], is_state_required } = country;

        this.setState({
            countryId,
            availableRegions: available_regions || [],
            isStateRequired: is_state_required
        });

        // avoid region reset when coming back to shipping step
        if (prevCountryId && prevCountryId !== countryId) {
            this.setState({
                regionId: available_regions?.length ? available_regions[0].id : null
            });
        }
    };

    onZipcodeChange = async (e) => {
        const { value } = e.currentTarget;
        const { countryId, availableRegions } = this.state;

        const [city, regionCode] = await getCityAndRegionFromZipcode(countryId, value);
        if (city) {
            this.setState({
                city
            });
        }

        if (availableRegions.length > 0 && regionCode) {
            const { id: regionId } = availableRegions
                .find((r) => r.code.toUpperCase() === regionCode.toUpperCase());

            if (regionId) {
                this.setState({ regionId });
            }
        }
    };

    get fieldMap() {
        const {
            countries: sourceCountries,
            address,
            regionDisplayAll,
            showVatNumber,
            addressLinesQty
        } = this.props;

        const props = {
            addressLinesQty,
            address,
            ...address,
            countries: sourceCountries.map(({ id, label }) => ({ id, label, value: id })),
            showVatNumber,
            regionDisplayAll,
            ...this.state
        };

        const events = {
            onCountryChange: '',
            onZipcodeChange: '',
            setRegionId: ''
        };

        return myAccountAddressForm(props, events);
    }

    renderActions() {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mix={ { block: 'MyAccount', elem: 'Button' } }
              mods={ { isHollow: true } }
            >
                { __('Save address') }
            </button>
        );
    }

    getFormProps() {
        return {
            onSubmit: this.onFormSuccess.bind(this)
        };
    }
}

export default MyAccountAddressForm;
