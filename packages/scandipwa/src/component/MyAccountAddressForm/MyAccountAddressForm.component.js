/* eslint-disable spaced-comment */
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
import { Addresstype } from 'Type/Account';
import { CountriesType } from 'Type/Config';
import {
    getAvailableRegions,
    getCityAndRegionFromZipcode,
    getRegionIdFromAvailableRegions,
    trimCustomerAddress
} from 'Util/Address';
import transformToNameValuePair from 'Util/Form/Transform';
import { debounce } from 'Util/Request';

import { UPDATE_ZIPCODE_FREQUENCY } from './MyAccountAddressForm.config';
import myAccountAddressForm from './MyAccountAddressForm.form';

/** @namespace Component/MyAccountAddressForm/Component */
export class MyAccountAddressForm extends FieldForm {
    static propTypes = {
        address: Addresstype.isRequired,
        countries: CountriesType.isRequired,
        defaultCountry: PropTypes.string,
        addressLinesQty: PropTypes.number.isRequired,
        showVatNumber: PropTypes.bool.isRequired,
        regionDisplayAll: PropTypes.bool.isRequired
    };

    static defaultProps = {
        defaultCountry: 'US'
    };

    state = {
        countryId: this.getCountry()?.value || 'US',
        availableRegions: this.getAvailableRegions() || [],
        isStateRequired: !!this.getCountry()?.is_state_required,
        currentCity: null,
        currentRegion: null,
        currentZipcode: null,
        currentRegionId: null
    };

    //#region GETTERS
    get fieldMap() {
        const {
            address,
            countries,
            addressLinesQty,
            regionDisplayAll,
            showVatNumber,
            defaultCountry
        } = this.props;

        const {
            availableRegions,
            isStateRequired,
            countryId,
            currentRegion,
            currentCity,
            currentRegionId,
            currentZipcode
        } = this.state;

        return myAccountAddressForm({
            address,
            countries,
            addressLinesQty,
            regionDisplayAll,
            showVatNumber,
            defaultCountry,
            availableRegions,
            isStateRequired,
            countryId,
            currentRegion,
            currentCity,
            currentRegionId,
            currentZipcode,
            ...address
        }, {
            onCountryChange: this.onCountryChange,
            onZipcodeChange: this.onZipcodeChange,
            onCityChange: this.onCityChange,
            onRegionChange: this.onRegionChange,
            onRegionIdChange: this.onRegionIdChange
        });
    }

    getFormProps() {
        return {
            onSubmit: this.onSubmit.bind(this)
        };
    }

    getCountry(countryId = null) {
        const { countries, defaultCountry, address: { country_id: countryIdAddress } = {} } = this.props;
        const countryIdFixed = countryId || countryIdAddress || defaultCountry;

        return countries.find(({ value }) => value === countryIdFixed);
    }

    /**
     * Returns available regions based on country and zip
     * @param countryId
     * @param zipCode
     * @returns {Promise<[*, *]|null[]|*>}
     */
    getAvailableRegions(countryId = null, zipCode = null) {
        const { countries, defaultCountry } = this.props;
        const { value: currCountryId = defaultCountry } = this.getCountry(countryId) || {};

        return !zipCode
            ? getAvailableRegions(currCountryId, countries)
            : this.handleSetCityAndRegionDependingOnZipcode(countryId, zipCode);
    }
    //#endregion

    //#region EVENTS
    /**
     * Creates / Updates address from entered data
     * @param form
     * @param fields
     */
    onSubmit = (form, fields) => {
        const { onSave, addressLinesQty } = this.props;
        const newAddress = transformToNameValuePair(fields);

        // Joins streets into one variable
        if (addressLinesQty > 1) {
            newAddress.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                if (newAddress[`street_${i}`]) {
                    newAddress.street.push(newAddress[`street_${i}`]);
                }
            }
        }

        // Fixes region variable format
        const { region_id = 0, region_string: region } = newAddress;
        newAddress.region = { region_id: +region_id, region };

        // Filters out non-required options and save address
        onSave(trimCustomerAddress(newAddress));
    };

    onCityChange = (field) => {
        this.setState({ currentCity: field.target.value });
    };

    onRegionChange = (field) => {
        this.setState({ currentRegion: field.target.value });
    };

    onRegionIdChange = (field) => {
        this.setState({ currentRegionId: field });
    };

    onCountryChange = (field, e) => {
        // Handles auto fill
        const fieldValue = typeof field === 'object' ? e.value : field;

        const { currentZipcode } = this.state;
        const { countries } = this.props;
        const country = countries.find(({ value }) => value === fieldValue);

        if (!country) {
            return;
        }

        const {
            available_regions: availableRegions = [],
            is_state_required: isStateRequired = true,
            value: countryId
        } = country;

        this.getAvailableRegions(countryId, currentZipcode);

        this.setState({ availableRegions, isStateRequired, countryId });
    };

    onZipcodeChange = async (event, field) => {
        const { value: zipCode = '' } = field || {};
        const { countryId } = this.state;
        this.setState({ currentZipcode: zipCode });
        await debounce(this.getAvailableRegions(countryId, zipCode), UPDATE_ZIPCODE_FREQUENCY);
    };

    handleSetCityAndRegionDependingOnZipcode = async (countryId, zipCode) => {
        const { availableRegions = [] } = this.state;
        const cityAndRegion = await getCityAndRegionFromZipcode(countryId, zipCode);

        if (!cityAndRegion) {
            return;
        }

        const { city, region } = cityAndRegion;

        if (availableRegions.length) {
            this.setState({
                currentCity: city,
                currentRegionId: getRegionIdFromAvailableRegions(availableRegions, region),
                currentRegion: ''
            });
        } else {
            this.setState({
                currentCity: city,
                currentRegion: region,
                currentRegionId: 1
            });
        }
    };
    //#endregion

    //#region RENDERERS
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
    //#endregion
}

export default MyAccountAddressForm;
