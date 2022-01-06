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

import { getFormattedRegion } from 'Util/Address';

/** @namespace Component/MyAccountAddressTable/Table/getAddressAdditionalTableFields */
export const getAddressAdditionalTableFields = (address, countries) => {
    const regionData = getFormattedRegion(address, countries);

    return [
        {
            key: 'country',
            label: __('County'),
            source: regionData
        },
        {
            key: 'region',
            label: __('State/Province'),
            source: regionData
        },
        {
            key: 'city',
            label: __('City'),
            source: address
        },
        {
            key: 'vat_id',
            label: __('VAT Number'),
            source: address
        }
    ];
};

/** @namespace Component/MyAccountAddressTable/Table/getAddressTablePairArray */
export const getAddressTablePairArray = (props) => {
    const { address, countries, showAdditionalFields } = props;

    return [
        {
            key: 'firstname',
            label: __('First name'),
            source: address
        },
        {
            key: 'lastname',
            label: __('Last name'),
            source: address
        },
        {
            key: 'street',
            label: __('Street'),
            source: address
        },
        {
            key: 'postcode',
            label: __('Postal code'),
            source: address
        },
        {
            key: 'telephone',
            label: __('Phone number'),
            source: address
        },
        ...(showAdditionalFields ? getAddressAdditionalTableFields(address, countries) : [])
    ];
};
