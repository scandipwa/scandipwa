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

import FieldForm from 'Component/FieldForm';
import { addressType } from 'Type/Account';
import { countriesType } from 'Type/Config';
import { setAddressesInFormObject } from 'Util/Address';

/** @namespace Component/MyAccountAddressForm/Component */
export class MyAccountAddressForm extends FieldForm {
    static propTypes = {
        address: addressType.isRequired,
        countries: countriesType.isRequired,
        default_country: PropTypes.string,
        onSave: PropTypes.func,
        addressLinesQty: PropTypes.number.isRequired
    };

    static defaultProps = {
        default_country: 'US',
        onSave: () => {}
    };

    __construct(props) {
        super.__construct(props);

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
        const { onSave, addressLinesQty } = this.props;
        const { region_id, region_string: region, ...newAddress } = addressLinesQty > 1
            ? setAddressesInFormObject(fields, addressLinesQty)
            : fields;

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
                onChange: (regionId) => this.setState({ regionId }),
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

    getStreetFields(label, index) {
        const { address: { street = [] } } = this.props;

        return {
            label,
            value: street[index],
            validation: index === 0 ? ['notEmpty'] : []
        };
    }

    // returns the address fields in quantity equal to BE
    getAddressFields() {
        const { addressLinesQty } = this.props;

        if (addressLinesQty === 1) {
            return {
                street: this.getStreetFields(
                    __('Street address'),
                    0
                )
            };
        }

        const streets = {};

        // eslint-disable-next-line fp/no-loops, fp/no-let
        for (let i = 0; i < addressLinesQty; i++) {
            streets[`street${i}`] = this.getStreetFields(
                __('Street address line %s', i + 1),
                i
            );
        }

        return streets;
    }

    get fieldMap() {
        const { countryId } = this.state;
        const { countries, address } = this.props;
        const { default_billing, default_shipping } = address;

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
            ...this.getAddressFields()
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
