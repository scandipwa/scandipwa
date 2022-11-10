/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { CustomerAddress } from 'Query/MyAccount.type';
import { OrderAddress } from 'Query/Order.type';
import { Country, Region } from 'Query/Region.type';
import { Store } from 'Query/StoreInPickUp.type';
import { CheckoutAddress } from 'Store/Checkout/Checkout.type';
import { GQLCountryCodeEnum, GQLCustomerAddressInput } from 'Type/Graphql.type';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';

import { CountryOption, FormattedRegion, ZippopotamResponseResult } from './Address.type';

/** @namespace Util/Address/Index/trimCustomerAddress */
export const trimCustomerAddress = (customerAddress: Partial<CustomerAddress>): GQLCustomerAddressInput => {
    const {
        default_shipping = false,
        default_billing = false,
        company,
        city = '',
        country_id = GQLCountryCodeEnum.US,
        firstname = '',
        lastname = '',
        middlename = '',
        postcode = '',
        street = [''],
        telephone = '',
        region: {
            region_code,
            region,
            region_id = 1,
        } = {},
        prefix = '',
        suffix = '',
        vat_id,
    } = customerAddress;

    return {
        company,
        default_shipping,
        default_billing,
        city,
        country_id,
        firstname,
        lastname,
        middlename,
        postcode,
        street,
        telephone,
        region: {
            region_code,
            region,
            region_id,
        },
        prefix,
        suffix,
        vat_id,
    };
};

/** @namespace Util/Address/Index/trimCheckoutCustomerAddress */
export const trimCheckoutCustomerAddress = (customerAddress: CustomerAddress): CheckoutAddress => {
    const {
        company,
        city = '',
        country_id = GQLCountryCodeEnum.US,
        firstname = '',
        lastname = '',
        postcode = '',
        street = [''],
        telephone = '',
        region: {
            region_code,
            region,
            region_id = 1,
        } = {},
        vat_id,
    } = customerAddress;

    return {
        company,
        city,
        country_id,
        firstname,
        lastname,
        postcode,
        street,
        telephone,
        region,
        region_id,
        region_code,
        vat_id,
    };
};

/** @namespace Util/Address/Index/trimCheckoutAddress */
export const trimCheckoutAddress = (customerAddress: CheckoutAddress & Record<string, unknown>): CheckoutAddress => {
    const {
        company,
        city = '',
        country_id = GQLCountryCodeEnum.US,
        firstname = '',
        lastname = '',
        postcode = '',
        street = [''],
        telephone = '',
        region_string = '',
        region_id = 0,
        region_code,
        vat_id,
    } = customerAddress;

    return {
        company,
        city,
        country_id,
        firstname,
        lastname,
        postcode,
        street,
        telephone,
        region: region_string,
        region_id,
        region_code,
        vat_id,
    };
};

/**
 * Removes null values from address.street
 * @param street
 * @returns {*}
 * @namespace Util/Address/Index/removeEmptyStreets
 */
export const removeEmptyStreets = (street: Array<string | null>): Array<string | null> => (
    street.filter((line) => line)
);

/** transforming "street[index]" entries into a single "street" object
    for checkout/billing/myAccoutAddress form fields object */
/** @namespace Util/Address/Index/setAddressesInFormObject */
export const setAddressesInFormObject = (
    fields: Record<string, unknown>,
    numberOfLines: number,
    prefix = 'street',
): CheckoutAddress & Record<string, unknown> => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `${prefix}${index}`);

    const addressValues = addressKeys.map((key) => fields[key]) as Array<string | null>;

    // removing street related fields from the form object
    const newFields = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce((acc, key) => {
            acc[key] = fields[key];

            return acc;
        }, {} as CheckoutAddress & Record<string, unknown>);

    // setting single street entry to the form object
    newFields.street = removeEmptyStreets(addressValues);

    return newFields;
};

// get Form Fields object depending on addressLinesQty
/** @namespace Util/Address/Index/getFormFields */
export const getFormFields = (
    fields: Record<string, unknown>,
    addressLinesQty: number,
): Record<string, unknown> | CheckoutAddress & Record<string, unknown> => {
    if (addressLinesQty === 1) {
        return fields;
    }

    return setAddressesInFormObject(fields, addressLinesQty);
};

/** @namespace Util/Address/Index/getCityAndRegionFromZipcode */
export const getCityAndRegionFromZipcode = async (
    countryId: string,
    value: string,
): Promise<ZippopotamResponseResult | null> => {
    const response = await fetch(`https://api.zippopotam.us/${countryId}/${value}`);
    const data = await response.json();

    return data && Object.entries(data).length > 0
        ? {
            city: data.places[0]['place name'],
            region: data.places[0].state,
            regionAbbr: data.places[0]['state abbreviation'],
        }
        : null;
};

/** @namespace Util/Address/Index/getDefaultAddressLabel */
export const getDefaultAddressLabel = (address: CustomerAddress): string => {
    const { default_billing, default_shipping } = address;

    if (!default_billing && !default_shipping) {
        return '';
    }

    if (default_billing && default_shipping) {
        return __(' (default shipping & billing)');
    }

    if (default_billing) {
        return __(' (default billing address)');
    }

    return __(' (default shipping address)');
};

/** @namespace Util/Address/Index/getAvailableRegions */
export const getAvailableRegions = (country_id: string, countries: Country[]): Region[] => {
    const country: Country | undefined = countries.find(({ id }) => id === country_id);
    const { available_regions } = country || {};

    // need to handle null value
    return available_regions || [];
};

/** @namespace Util/Address/Index/getFormattedRegion */
export const getFormattedRegion = (
    address: CustomerAddress | OrderAddress,
    countries: Country[],
): FormattedRegion => {
    const { country_id, region: regionData } = address;

    if (!regionData) {
        return {};
    }

    const country = countries.find(({ id }) => id === country_id);

    if (!country) {
        return {};
    }

    const { label, available_regions } = country;

    if (typeof regionData === 'string') {
        return {
            country: label,
            region: regionData,
        };
    }

    const regions = available_regions || [];
    const { region_id, region } = regionData;
    const { name } = regions.find(({ id }) => id === region_id) || { name: region };

    return {
        country: label,
        region: name,
    };
};

/** @namespace Util/Address/Index/getRegionIdFromAvailableRegions */
export const getRegionIdFromAvailableRegions = (
    availableRegions: Region[],
    cityAndRegion: ZippopotamResponseResult,
): number => {
    const { region, regionAbbr } = cityAndRegion;
    const { id: regionId = 1 } = availableRegions.find(
        ({ name, code }) => name === region || code === regionAbbr,
    ) || {};

    return regionId;
};

/** @namespace Util/Address/Index/getRegionIdOfRegionName */
export const getRegionIdOfRegionName = (countryId: string, region: string): number => {
    const countries = (getStore().getState() as RootState).ConfigReducer.countries || [];
    const availableRegions = getAvailableRegions(countryId, countries) || [];
    const { id: regionId = 0 } = availableRegions.find(
        ({ name }) => name === region,
    ) || {};

    return regionId;
};

/** @namespace Util/Address/Index/checkIfStoreIncluded */
export const checkIfStoreIncluded = (stores: Store[], selectedStore: Store): boolean => {
    const selectedStoreInString = JSON.stringify(selectedStore);

    return !!stores.find((store) => JSON.stringify(store) === selectedStoreInString);
};

/**
 * Transforms countries list into select options
 * @param countries
 * @namespace Util/Address/Index/transformCountriesToOptions */
export const transformCountriesToOptions = (countries: Country[]): CountryOption[] => {
    const options = countries.map((country) => {
        const { id } = country;

        return {
            value: id,
            name: id,
            ...country,
        };
    });

    const filtered = options.filter(({ label }) => label);

    const sorted = filtered.sort(
        ({ label }, { label: labelCompare }) => label.localeCompare(labelCompare),
    );

    return sorted;
};

export default transformCountriesToOptions;
