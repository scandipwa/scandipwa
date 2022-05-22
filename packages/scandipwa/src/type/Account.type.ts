/* eslint-disable no-unused-vars */
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

export enum MyAccountTabs {
    MY_ACCOUNT = 'my-account',
    MY_ORDERS = 'my-orders',
    MY_ORDER = 'my-order',
    MY_DOWNLOADABLE = 'my-downloadable',
    MY_WISHLIST = 'my-wishlist',
    ADDRESS_BOOK = 'address',
    NEWSLETTER_SUBSCRIPTION = 'newsletter-subscription',
    ACCOUNT_INFORMATION = 'edit'
}

export enum MyAccountTabsSection {
    FIRST_SECTION = 1,
    SECOND_SECTION,
    THIRD_SECTION
}

export type Region = {
    region_code: string | null;
    region: string | null;
    region_id: number;
};

export type Address = {
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
};

export type TrimmedAddress = {
    city: string;
    company: string | null;
    country_id: string | number;
    firstname: string;
    lastname: string;
    postcode: string;
    region?: string | null;
    region_string?: string | null;
    region_id: number | string;
    region_code: string | null;
    street: string | Array<string | null>;
    telephone: string;
    vat_id: string | null;
};

export type Tab = {
    url: string;
    name: string;
};
