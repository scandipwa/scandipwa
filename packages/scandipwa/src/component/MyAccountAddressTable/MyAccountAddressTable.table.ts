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

import { DataPair } from 'Component/KeyValueTable/KeyValueTable.type';
import { CustomerAddress } from 'Query/MyAccount.type';
import { OrderAddress } from 'Query/Order.type';
import { Country } from 'Query/Region.type';
import { getFormattedRegion } from 'Util/Address';
import { FormattedRegion } from 'Util/Address/Address.type';

import { MyAccountAddressTableComponentProps } from './MyAccountAddressTable.type';

/** @namespace Component/MyAccountAddressTable/Table/getAddressAdditionalTableFields */
export const getAddressAdditionalTableFields = (
    address: CustomerAddress | OrderAddress,
    countries: Country[]
): DataPair<CustomerAddress | FormattedRegion>[] => {
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
export const getAddressTablePairArray = (
    props: MyAccountAddressTableComponentProps
): DataPair<CustomerAddress | FormattedRegion>[] => {
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
