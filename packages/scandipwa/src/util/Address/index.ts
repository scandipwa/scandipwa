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

import StoreItem from 'Component/StoreItem';
import { Address, TrimmedAddress } from 'Type/Account.type';
import { Country, Region, Stores } from 'Type/Config.type';

/** @namespace Util/Address/Index/trimCheckoutCustomerAddress */
export const trimCheckoutCustomerAddress = (customerAddress: Address): TrimmedAddress => {
    const {
        company = null,
        city = '',
        country_id = 1,
        firstname = '',
        lastname = '',
        postcode = '',
        street = [''],
        telephone = '',
        region: {
            region_code = null,
            region = null,
            region_id = 1
        } = {},
        vat_id = null
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
        vat_id
    };
};

/** @namespace Util/Address/Index/trimCheckoutAddress */
export const trimCheckoutAddress = (customerAddress: TrimmedAddress): TrimmedAddress => {
    const {
        company = null,
        city = '',
        country_id = '1',
        firstname = '',
        lastname = '',
        postcode = '',
        street = [''],
        telephone = '',
        region_string = '',
        region_id = 0,
        region_code = null,
        vat_id = null
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
        region_id: region_id === '' ? 0 : region_id,
        region_code,
        vat_id
    };
};

/**
 * Removes null values from address.street
 * @param street
 * @returns {*}
 * @namespace Util/Address/Index/removeEmptyStreets
 */
export const removeEmptyStreets = <T>(street: T | T[]): T | T[] => (
    Array.isArray(street) ? street.filter((line) => line) : street
);

/** transforming "street[index]" entries into a single "street" object
    for checkout/billing/myAccoutAddress form fields object */
/** @namespace Util/Address/Index/setAddressesInFormObject */
export const setAddressesInFormObject = <T>(
    fields: Record<string, T>,
    numberOfLines: number,
    prefix = 'street'
): Record<string, T | T[]> => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `${prefix}${index}`);

    const addressValues = addressKeys.map((key) => fields[key]);

    // removing street related fields from the form object
    const newFields:Record<string, T | T[]> = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce(
            (acc, key) => {
                acc[key] = fields[key];

                return acc;
            }, {} as Record<string, T >
        );

    // setting single street entry to the form object
    newFields.street = removeEmptyStreets(addressValues);

    return newFields;
};

// get Form Fields object depending on addressLinesQty
/** @namespace Util/Address/Index/getFormFields */
export const getFormFields = <T>(fields: Record<string, T>, addressLinesQty: number): T | Record<string, T | T[]> => {
    if (addressLinesQty === 1) {
        return fields;
    }

    return setAddressesInFormObject(fields, addressLinesQty);
};

export type ZippopotamResponseResult = {
    city: string;
    region: string;
    regionAbbr: string;
};

/** @namespace Util/Address/Index/getCityAndRegionFromZipcode */
export const getCityAndRegionFromZipcode = async (
    countryId: string,
    value: string
): Promise<ZippopotamResponseResult | null> => {
    const response = await fetch(`https://api.zippopotam.us/${countryId}/${value}`);
    const data = await response.json();

    return data && Object.entries(data).length > 0
        ? {
            city: data.places[0]['place name'],
            region: data.places[0].state,
            regionAbbr: data.places[0]['state abbreviation']
        }
        : null;
};

/** @namespace Util/Address/Index/getDefaultAddressLabel */
export const getDefaultAddressLabel = (address: Address): string => {
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
    const country = countries.find(({ id }) => id === country_id) || {};
    const { available_regions } = country as Country;

    // need to handle null value
    return available_regions || [];
};

/** @namespace Util/Address/Index/getFormattedRegion */
export const getFormattedRegion = (address: Address, countries: Country[]) => {
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
            region: regionData
        };
    }

    const regions = available_regions || [];
    const { region_id, region } = regionData;
    const { name } = regions.find(({ id }) => id === region_id) || { name: region };

    return {
        country: label,
        region: name
    };
};

/** @namespace Util/Address/Index/getRegionIdFromAvailableRegions */
export const getRegionIdFromAvailableRegions = (
    availableRegions: Region[],
    cityAndRegion: ZippopotamResponseResult
): number => {
    const { region, regionAbbr } = cityAndRegion;
    const { id: regionId = 1 } = availableRegions.find(
        ({ name, code }) => name === region || code === regionAbbr
    ) || {};

    return regionId;
};

/** @namespace Util/Address/Index/checkIfStoreIncluded */
export const checkIfStoreIncluded = (stores: Stores, selectedStore: StoreItem): boolean => {
    const selectedStoreInString = JSON.stringify(selectedStore);

    return !!stores.find((store) => JSON.stringify(store) === selectedStoreInString);
};
