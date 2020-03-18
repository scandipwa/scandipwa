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

import { addressType } from 'Type/Account';
import { countriesType } from 'Type/Config';
import FieldForm from 'Component/FieldForm';

class MyAccountAddressForm extends FieldForm {
    static propTypes = {
        address: addressType.isRequired,
        countries: countriesType.isRequired,
        default_country: PropTypes.string.isRequired,
        onSave: PropTypes.func
    };

    static defaultProps = {
        onSave: () => {}
    };

    constructor(props) {
        super(props);

        const {
            countries,
            default_country,
            address: { country_id, region: { region_id } = {} }
        } = props;

        const countryId = country_id || default_country;
        const country = countries.find(({ id }) => id === countryId);
        const { available_regions: availableRegions } = country || {};
        const regions = availableRegions || [{}];
        const regionId = region_id || regions[0].id;

        this.state = {
            countryId,
            availableRegions,
            regionId
        };
    }

    onFormSuccess = (fields) => {
        const { onSave } = this.props;
        const { region_id, region_string: region, ...newAddress } = fields;
        newAddress.region = { region_id, region };
        onSave(newAddress);
    };

    getRegionFields() {
        const { address: { region: { region } = {} } } = this.props;
        const { availableRegions, regionId } = this.state;

        if (!availableRegions || !availableRegions.length) {
            return {
                region_string: {
                    label: __('State/Province'),
                    value: region
                }
            };
        }

        return {
            region_id: {
                label: __('State/Province'),
                type: 'select',
                selectOptions: availableRegions.map(({ id, name }) => ({ id, label: name, value: id })),
                onChange: regionId => this.setState({ regionId }),
                value: regionId
            }
        };
    }

    onCountryChange = (countryId) => {
        const { countries } = this.props;
        const country = countries.find(({ id }) => id === countryId);
        const { available_regions } = country;

        this.setState({
            countryId,
            availableRegions: available_regions || []
        });
    };

    get fieldMap() {
        const { countryId } = this.state;
        const { countries, address } = this.props;
        const { default_billing, default_shipping, street = [] } = address;

        return {
            default_billing: {
                type: 'checkbox',
                label: __('This is default Billing Address'),
                value: 'default_billing',
                checked: default_billing
            },
            default_shipping: {
                type: 'checkbox',
                label: __('This is default Shipping Address'),
                value: 'default_shipping',
                checked: default_shipping
            },
            firstname: {
                label: __('First name'),
                validation: ['notEmpty']
            },
            lastname: {
                label: __('Last name'),
                validation: ['notEmpty']
            },
            telephone: {
                label: __('Phone number'),
                validation: ['notEmpty']
            },
            city: {
                label: __('City'),
                validation: ['notEmpty']
            },
            country_id: {
                type: 'select',
                label: __('Country'),
                validation: ['notEmpty'],
                value: countryId,
                selectOptions: countries.map(({ id, label }) => ({ id, label, value: id })),
                onChange: this.onCountryChange
            },
            ...this.getRegionFields(),
            postcode: {
                label: __('Zip/Postal code'),
                validation: ['notEmpty']
            },
            street: {
                label: __('Street address'),
                value: street[0],
                validation: ['notEmpty']
            }
            // Will be back with B2B update
            // company: {
            //     label: __('Company')
            // }
        };
    }

    getDefaultValues(fieldEntry) {
        const [key, { value }] = fieldEntry;
        const { address: { [key]: addressValue } } = this.props;

        return {
            ...super.getDefaultValues(fieldEntry),
            value: value !== undefined ? value : addressValue
        };
    }

    renderActions() {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'MyAccount', elem: 'Button' } }
            >
                { __('Save address') }
            </button>
        );
    }
}

export default MyAccountAddressForm;
