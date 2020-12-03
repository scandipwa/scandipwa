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

/** transforming "street[index]" entries into a single "street" object
    for checkout/billing/myAccoutAddress form fields object */
/** @namespace Util/Address/setAddressesInFormObject */
export const setAddressesInFormObject = (fields, numberOfLines) => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `street${index}`);

    const addressValues = addressKeys.map((key) => fields[key]);

    // removing street related fields from the form object
    const newFields = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce(
            (acc, key) => {
                acc[key] = fields[key];
                return acc;
            }, {}
        );

    // setting single street entry to the form object
    newFields.street = addressValues;

    return newFields;
};

// get Form Fields object depending on addressLinesQty
/** @namespace Util/Address/getFormFields */
export const getFormFields = (fields, addressLinesQty) => {
    if (addressLinesQty === 1) {
        return fields;
    }

    return setAddressesInFormObject(fields, addressLinesQty);
};
