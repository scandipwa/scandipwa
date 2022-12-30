/* eslint-disable no-unused-vars */
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

import PropTypes from 'prop-types';

import { GQLCountryCodeEnum } from './Graphql.type';

export enum MyAccountTabs {
    MY_ACCOUNT = 'my-account',
    MY_ORDERS = 'my-orders',
    MY_ORDER = 'my-order',
    MY_DOWNLOADABLE = 'my-downloadable',
    MY_WISHLIST = 'my-wishlist',
    ADDRESS_BOOK = 'address',
    NEWSLETTER_SUBSCRIPTION = 'newsletter-subscription',
    ACCOUNT_INFORMATION = 'edit',
}

export enum MyAccountTabsSection {
    FIRST_SECTION = 1,
    SECOND_SECTION,
    THIRD_SECTION,
}

export interface Region {
    region_code: string | null;
    region: string | null;
    region_id: number;
}

export interface Address {
    city: string;
    company: string | null;
    country_id: string;
    customer_id?: number;
    default_billing: boolean;
    default_shipping: boolean;
    firstname: string;
    id?: number;
    lastname: string;
    middlename: string;
    postcode: string;
    prefix: string;
    region?: Region;
    street: string | string[];
    suffix: string;
    telephone: string;
    vat_id: number | null;
}

export interface TrimmedCheckoutAddress {
    city: string;
    company?: string;
    country_id: GQLCountryCodeEnum;
    firstname: string;
    lastname: string;
    postcode: string;
    region?: string;
    region_string?: string;
    region_id: number;
    region_code?: string;
    street: Array<string | null>;
    telephone: string;
    vat_id?: string;
}

export interface Tab {
    url: string;
    name: string;
}

// Support for comtabilitiy

export const RegionType = PropTypes.oneOfType([
    PropTypes.shape({
        region_code: PropTypes.string,
        region: PropTypes.string,
        region_id: PropTypes.number,
    }),
]);

export const Addresstype = PropTypes.shape({
    city: PropTypes.string,
    country_id: PropTypes.string,
    customer_id: PropTypes.number,
    default_billing: PropTypes.bool,
    default_shipping: PropTypes.bool,
    firstname: PropTypes.string,
    id: PropTypes.number,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    postcode: PropTypes.string,
    prefix: PropTypes.string,
    RegionType,
    street: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    suffix: PropTypes.string,
    telephone: PropTypes.string,
});

export const AddressesType = PropTypes.arrayOf(Addresstype);

export const CustomerType = PropTypes.shape({
    AddressesType,
    created_at: PropTypes.string,
    default_billing: PropTypes.string,
    default_shipping: PropTypes.string,
    dob: PropTypes.instanceOf(Date),
    email: PropTypes.string,
    firstname: PropTypes.string,
    group_id: PropTypes.number,
    id: PropTypes.number,
    is_subscribed: PropTypes.bool,
    lastname: PropTypes.string,
    middlename: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    taxvat: PropTypes.string,
});

export const ActiveTabType = PropTypes.string;

export const TabType = PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
});

export const TabMapType = PropTypes.objectOf(TabType);

export const SignInStateType = PropTypes.string;
