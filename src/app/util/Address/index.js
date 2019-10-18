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

export const trimAddressFields = (fields) => {
    const {
        region_string: region,
        ...fieldsData
    } = fields;

    return { ...fieldsData, region };
};
