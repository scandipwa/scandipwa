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

/** @namespace Util/Address/trimCustomerAddress */
export const trimCustomerAddress = (customerAddress) => {
    const {
        city,
        company,
        country_id,
        email,
        firstname,
        lastname,
        method,
        postcode,
        street,
        telephone,
        region
    } = customerAddress;

    return {
        city,
        company,
        country_id,
        email,
        firstname,
        lastname,
        method,
        postcode,
        street,
        telephone,
        ...region
    };
};

/** @namespace Util/Address/trimAddressFields */
export const trimAddressFields = (fields) => {
    const {
        region_string: region,
        ...fieldsData
    } = fields;

    return { ...fieldsData, region };
};

export const setMultipleAddresses = (fields, numberOfLines) => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `street${index}`);

    const addressValues = addressKeys.map((key) => fields[key]);

    const newFields = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce(
            (acc, key) => {
                acc[key] = fields[key];
                return acc;
            }, {}
        );

    newFields.street = Array.from(addressValues);

    return newFields;
};
