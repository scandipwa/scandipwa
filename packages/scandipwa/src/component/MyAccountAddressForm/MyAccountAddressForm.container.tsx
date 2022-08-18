/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ChangeEvent, ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';

import { EventFieldData } from 'Component/Field/Field.type';
import { Region } from 'Query/Region.type';
import { ReactElement } from 'Type/Common.type';
import {
    getAvailableRegions,
    getCityAndRegionFromZipcode,
    getRegionIdFromAvailableRegions,
    transformCountriesToOptions
} from 'Util/Address';
import { CountryOption } from 'Util/Address/Address.type';
import { debounce } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import MyAccountAddressForm from './MyAccountAddressForm.component';
import { UPDATE_ZIPCODE_FREQUENCY } from './MyAccountAddressForm.config';
import {
    InitialDataAddress,
    MyAccountAddressFormComponentProps,
    MyAccountAddressFormContainerFunctions,
    MyAccountAddressFormContainerMapDispatchProps,
    MyAccountAddressFormContainerMapStateProps,
    MyAccountAddressFormContainerProps,
    MyAccountAddressFormContainerPropsKeys,
    MyAccountAddressFormContainerState
} from './MyAccountAddressForm.type';

/** @namespace Component/MyAccountAddressForm/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountAddressFormContainerMapStateProps => ({
    countries: transformCountriesToOptions(state.ConfigReducer.countries || []),
    defaultCountry: state.ConfigReducer.default_country,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    showVatNumber: state.ConfigReducer.show_vat_number_on_storefront,
    regionDisplayAll: state.ConfigReducer.region_display_all
});

/** @namespace Component/MyAccountAddressForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountAddressFormContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountAddressForm/Container */
export class MyAccountAddressFormContainer <
    Props extends MyAccountAddressFormContainerProps = MyAccountAddressFormContainerProps,
    State extends MyAccountAddressFormContainerState = MyAccountAddressFormContainerState
> extends PureComponent<Props, State> {
    static defaultProps: Partial<MyAccountAddressFormContainerProps> = {
        defaultCountry: 'US'
    };

    containerFunctions: MyAccountAddressFormContainerFunctions = {
        onCountryChange: this.onCountryChange.bind(this),
        onZipcodeChange: this.onZipcodeChange.bind(this),
        onCityChange: this.onCityChange.bind(this),
        onRegionChange: this.onRegionChange.bind(this),
        onRegionIdChange: this.onRegionIdChange.bind(this)
    };

    __construct(props: Props): void {
        super.__construct?.(props);

        this.state = {
            countryId: this.getCountry()?.value || 'US',
            availableRegions: this.getAvailableRegions() || [],
            isStateRequired: !!this.getCountry()?.is_state_required,
            currentCity: this.getCurrentAddress().city,
            currentRegion: this.getCurrentAddress().region,
            currentZipcode: this.getCurrentAddress().postcode,
            currentRegionId: this.getCurrentAddress().regionId
        } as State;
    }

    containerProps(): Pick<MyAccountAddressFormComponentProps, MyAccountAddressFormContainerPropsKeys> {
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
            availableRegions: Array.isArray(availableRegions) ? availableRegions : [],
            isStateRequired,
            onSave,
            currentCity,
            currentRegion,
            currentZipcode,
            currentRegionId
        };
    }

    // #region GETTERS
    getCountry(countryId?: string): CountryOption | undefined {
        const { countries, defaultCountry, address: { country_id: countryIdAddress } = {} } = this.props;
        const countryIdFixed = countryId || countryIdAddress || defaultCountry;
        return countries.find(({ value }) => value === countryIdFixed);
    }

    getCurrentAddress(): InitialDataAddress {
        const { address, address: { id: addressId } } = this.props;

        if (!addressId) {
            return {
                region: '',
                regionId: 1,
                postcode: '',
                city: ''
            };
        }

        const { region: { region, region_id: regionId }, postcode, city } = address;

        return {
            region,
            regionId,
            postcode,
            city
        };
    }

    /**
     * Returns available regions based on country and zip
     * @param countryId
     * @param zipCode
     * @returns {Promise<[*, *]|null[]|*>}
     */
    getAvailableRegions(countryId?: string, zipCode?: string): Region[] | Promise<void> {
        const { countries, defaultCountry } = this.props;
        const { value: currCountryId = defaultCountry } = this.getCountry(countryId) || {};

        return !zipCode
            ? getAvailableRegions(currCountryId, countries)
            : this.handleSetCityAndRegionDependingOnZipcode(zipCode, countryId);
    }
    // #endregion

    // #region EVENTS
    onCityChange(field: ChangeEvent<HTMLInputElement>): void {
        this.setState({ currentCity: field.target.value });
    }

    onRegionChange(field: ChangeEvent<HTMLInputElement>): void {
        this.setState({ currentRegion: field.target.value });
    }

    onRegionIdChange(field: string): void {
        this.setState({ currentRegionId: Number(field) });
    }

    onCountryChange(field: string, e?: EventFieldData): void {
        // Handles auto fill
        const fieldValue = typeof field === 'object' ? e && e.value : field;

        const { currentZipcode } = this.state;
        const { countries } = this.props;
        const country = countries.find(({ value }) => value === fieldValue);

        if (!country) {
            this.setState({
                currentRegion: '',
                currentRegionId: 1,
                countryId: '',
                availableRegions: []
            });

            return;
        }

        const {
            available_regions: availableRegions = [],
            is_state_required: isStateRequired = true,
            value: countryId
        } = country;

        this.getAvailableRegions(countryId, currentZipcode);
        this.setState({
            availableRegions,
            isStateRequired: isStateRequired || false,
            countryId,
            currentRegionId: 1,
            currentRegion: ''
        });
    }

    onZipcodeChange(event: ChangeEvent<HTMLInputElement>, field?: EventFieldData): void {
        const { value: zipCode = '' } = field || {};
        const { countryId } = this.state;
        this.setState({ currentZipcode: zipCode });
        debounce(
            this.handleSetCityAndRegionDependingOnZipcode(
                zipCode,
                countryId
            ) as unknown as (...args: unknown[]) => Promise<void>, UPDATE_ZIPCODE_FREQUENCY
        );
    }

    async handleSetCityAndRegionDependingOnZipcode(zipCode: string, countryId?: string): Promise<void> {
        const { availableRegions = [] } = this.state;
        const cityAndRegion = countryId ? await getCityAndRegionFromZipcode(countryId, zipCode) : null;

        if (!cityAndRegion) {
            return;
        }

        const { city, region } = cityAndRegion;

        if (availableRegions && Array.isArray(availableRegions)) {
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

    render(): ReactElement {
        return (
            <MyAccountAddressForm
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MyAccountAddressFormContainer as unknown as ComponentType<MyAccountAddressFormContainerProps>
);
