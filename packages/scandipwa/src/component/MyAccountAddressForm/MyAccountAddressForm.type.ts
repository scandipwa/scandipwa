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

import { ChangeEvent } from 'react';

import { EventFieldData } from 'Component/Field/Field.type';
import { CustomerAddress } from 'Query/MyAccount.type';
import { Region } from 'Query/Region.type';
import { GQLCustomerAddressInput } from 'Type/Graphql.type';
import { CountryOption } from 'Util/Address/Address.type';

export interface MyAccountAddressFormContainerMapStateProps {
    countries: CountryOption[];
    defaultCountry: string;
    addressLinesQty: number;
    showVatNumber: boolean;
    regionDisplayAll: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyAccountAddressFormContainerMapDispatchProps {}

export interface MyAccountAddressFormContainerBaseProps {
    address: CustomerAddress;
    onSave: (address: GQLCustomerAddressInput) => Promise<void>;
}

export type MyAccountAddressFormContainerProps = MyAccountAddressFormContainerMapStateProps
& MyAccountAddressFormContainerMapDispatchProps
& MyAccountAddressFormContainerBaseProps;

export interface MyAccountAddressFormContainerState {
    countryId: string;
    availableRegions: Region[] | Promise<void>;
    isStateRequired: boolean;
    currentCity: string;
    currentRegion: string;
    currentZipcode: string;
    currentRegionId: number;
}

export interface MyAccountAddressFormComponentProps {
    address: CustomerAddress;
    countries: CountryOption[];
    availableRegions: Region[];
    defaultCountry: string;
    addressLinesQty: number;
    showVatNumber: boolean;
    regionDisplayAll: boolean;
    onCountryChange: (field: string, e?: EventFieldData) => void;
    onZipcodeChange: (event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void;
    onCityChange: (field: ChangeEvent<HTMLInputElement>) => void;
    onRegionChange: (field: ChangeEvent<HTMLInputElement>) => void;
    onRegionIdChange: (field: string) => void;
    onSave: (address: GQLCustomerAddressInput) => Promise<void>;
    countryId: string;
    isStateRequired: boolean;
    currentCity: string;
    currentRegion: string;
    currentZipcode: string;
    currentRegionId: number;
}

export type MyAccountAddressFormContainerPropsKeys = 'address'
| 'countries'
| 'defaultCountry'
| 'addressLinesQty'
| 'showVatNumber'
| 'regionDisplayAll'
| 'countryId'
| 'availableRegions'
| 'isStateRequired'
| 'onSave'
| 'currentCity'
| 'currentRegion'
| 'currentZipcode'
| 'currentRegionId';

export type InitialDataAddress = {
    region: string;
    regionId: number;
    postcode: string;
    city: string;
};

export type MyAccountAddressFormProps = Omit<
MyAccountAddressFormComponentProps,
'onCountryChange'
| 'onZipcodeChange'
| 'onCityChange'
| 'onRegionChange'
| 'onRegionIdChange'
| 'onSave'>
& CustomerAddress;

export interface MyAccountAddressFormEvents {
    onCountryChange: (field: string, e?: EventFieldData) => void;
    onZipcodeChange: (event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void;
    onCityChange: (field: ChangeEvent<HTMLInputElement>) => void;
    onRegionChange: (field: ChangeEvent<HTMLInputElement>) => void;
    onRegionIdChange: (field: string) => void;
}

export interface MyAccountAddressFormFields extends Partial<CustomerAddress> {
    region_id?: string;
    region_string?: string;
    street_0?: string;
    street_1?: string;
}
