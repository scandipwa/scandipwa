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

/** @namespace Component/MyAccountAddressTable/Table/getAddressTablePairArray */
export const getAddressTablePairArray = (props) => {
    const { address, countries } = props;
    const regionData = getFormattedRegion(address, countries);

    const constructRegion = regionData.region
        ? `${address.city}, ${regionData.region}, ${address.postcode}`
        : `${address.city},  ${address.postcode}`;

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
            key: 'region',
            label: __('Region'),
            source: { region: constructRegion }
        },
        {
            key: 'country',
            label: __('Country'),
            source: regionData
        },
        {
            key: 'telephone',
            label: __('Phone number'),
            source: address
        }
    ];
};

export default getAddressTablePairArray;
