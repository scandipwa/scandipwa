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

export * from './Account.type';

export interface RegionType {
    region_code: string | null
    region: string | null
    region_id: number
}

export interface AddressType {
    city: string
    company: string | null
    country_id: string
    customer_id: number
    default_billing: boolean
    default_shipping: boolean
    firstname: string
    id: number
    lastname: string
    middlename: string
    postcode: string
    prefix: string
    region?: RegionType
    street: string | string[]
    suffix: string
    telephone: string
    vat_id: number | null
}

export type AddressesType = AddressType[];

export interface CustomerType {
    addresses: AddressesType
    created_at: string
    default_billing: string
    default_shipping: string
    dob: Date
    email: string
    firstname: string
    group_id: number
    id: number
    is_subscribed: boolean
    lastname: string
    middlename: string
    prefix: string
    suffix: string
    taxvat: string
}

export interface TabType {
    url: string
    name: string
}

export type TabMapType = Record<string, TabType>
