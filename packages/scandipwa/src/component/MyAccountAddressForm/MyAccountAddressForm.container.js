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
import { connect } from 'react-redux';

import { Addresstype } from 'Type/Account.type';
import { CountriesType } from 'Type/Config.type';
import {
    getAvailableRegions,
    getCityAndRegionFromZipcode,
    getRegionIdFromAvailableRegions
} from 'Util/Address';
import { debounce } from 'Util/Request';
import transformCountriesToOptions from 'Util/Store/Transform';

import MyAccountAddressForm from './MyAccountAddressForm.component';
import { UPDATE_ZIPCODE_FREQUENCY } from './MyAccountAddressForm.config';

/** @namespace Component/MyAccountAddressForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    countries: transformCountriesToOptions(state.ConfigReducer.countries || []),
    defaultCountry: state.ConfigReducer.default_country,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    showVatNumber: state.ConfigReducer.show_vat_number_on_storefront,
    regionDisplayAll: state.ConfigReducer.region_display_all
});

/** @namespace Component/MyAccountAddressForm/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountAddressForm/Container */
export class MyAccountAddressFormContainer extends PureComponent {
    static propTypes = {
        address: Addresstype.isRequired,
        countries: CountriesType.isRequired,
        defaultCountry: PropTypes.string,
        addressLinesQty: PropTypes.number.isRequired,
        showVatNumber: PropTypes.bool.isRequired,
        regionDisplayAll: PropTypes.bool.isRequired,
        onSave: PropTypes.func.isRequired
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

    containerFunctions = {
        onCountryChange: this.onCountryChange.bind(this),
        onZipcodeChange: this.onZipcodeChange.bind(this),
        onCityChange: this.onCityChange.bind(this),
        onRegionChange: this.onRegionChange.bind(this),
        onRegionIdChange: this.onRegionIdChange.bind(this)
    };

    containerProps() {
        const {
            address,
            countries,
            defaultCountry,
            addressLinesQty,
            showVatNumber,
            regionDisplayAll,
            onSave
        } = this.props;
        const {
            countryId,
            availableRegions,
            isStateRequired,
            currentCity,
            currentRegion,
            currentZipcode,
            currentRegionId
        } = this.state;

        return {
            address,
            countries,
            defaultCountry,
            addressLinesQty,
            showVatNumber,
            regionDisplayAll,
            countryId,
            availableRegions,
            isStateRequired,
            onSave,
            currentCity,
            currentRegion,
            currentZipcode,
            currentRegionId
        };
    }

    // #region GETTERS
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
    // #endregion

    // #region EVENTS
    onCityChange(field) {
        this.setState({ currentCity: field.target.value });
    }

    onRegionChange(field) {
        this.setState({ currentRegion: field.target.value });
    }

    onRegionIdChange(field) {
        this.setState({ currentRegionId: field });
    }

    onCountryChange(field, e) {
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
    }

    onZipcodeChange(event, field) {
        const { value: zipCode = '' } = field || {};
        const { countryId } = this.state;
        this.setState({ currentZipcode: zipCode });
        debounce(this.getAvailableRegions(countryId, zipCode), UPDATE_ZIPCODE_FREQUENCY);
    }

    async handleSetCityAndRegionDependingOnZipcode(countryId, zipCode) {
        const { availableRegions = [] } = this.state;
        const cityAndRegion = await getCityAndRegionFromZipcode(countryId, zipCode);

        if (!cityAndRegion) {
            return;
        }

        const { city, region } = cityAndRegion;

        if (availableRegions && availableRegions.length) {
            this.setState({
                currentCity: city,
                currentRegionId: getRegionIdFromAvailableRegions(availableRegions, cityAndRegion),
                currentRegion: ''
            });
        } else {
            this.setState({
                currentCity: city,
                currentRegion: region,
                currentRegionId: 1
            });
        }
    }
    // #endregion

    render() {
        return (
            <MyAccountAddressForm
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressFormContainer);
