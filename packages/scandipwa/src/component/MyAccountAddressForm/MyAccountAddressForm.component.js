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

import FIELD_TYPE from 'Component/Field/Field.config';
import FieldForm from 'Component/FieldForm';
import { Addresstype } from 'Type/Account.type';
import { CountriesType } from 'Type/Config.type';
import {
    trimCustomerAddress
} from 'Util/Address';
import transformToNameValuePair from 'Util/Form/Transform';

import myAccountAddressForm from './MyAccountAddressForm.form';

/** @namespace Component/MyAccountAddressForm/Component */
export class MyAccountAddressForm extends FieldForm {
    static propTypes = {
        address: Addresstype.isRequired,
        countries: CountriesType.isRequired,
        defaultCountry: PropTypes.string.isRequired,
        addressLinesQty: PropTypes.number.isRequired,
        showVatNumber: PropTypes.bool.isRequired,
        regionDisplayAll: PropTypes.bool.isRequired,
        onCountryChange: PropTypes.func.isRequired,
        onZipcodeChange: PropTypes.func.isRequired,
        onCityChange: PropTypes.func.isRequired,
        onRegionChange: PropTypes.func.isRequired,
        onRegionIdChange: PropTypes.func.isRequired,
        countryId: PropTypes.string.isRequired,
        isStateRequired: PropTypes.bool,
        currentCity: PropTypes.string,
        currentRegion: PropTypes.string,
        currentZipcode: PropTypes.string,
        currentRegionId: PropTypes.string
    };

    static defaultProps = {
        currentZipcode: null,
        currentCity: null,
        currentRegion: null,
        currentRegionId: null,
        isStateRequired: false
    };

    //#region GETTERS
    get fieldMap() {
        const {
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
            onCountryChange,
            onZipcodeChange,
            onCityChange,
            onRegionChange,
            onRegionIdChange
        } = this.props;

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
            onCountryChange,
            onZipcodeChange,
            onCityChange,
            onRegionChange,
            onRegionIdChange
        });
    }

    getFormProps() {
        return {
            onSubmit: this.onSubmit.bind(this)
        };
    }

    /**
     * Creates / Updates address from entered data
     * @param form
     * @param fields
     */
    onSubmit(form, fields) {
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
    }

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
