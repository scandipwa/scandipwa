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

import { Field } from '@tilework/opus';

import { GQLCountryCodeEnum, GQLCustomerInput } from 'Type/Graphql.type';

export interface CustomerAddressRegion {
    region_code: string;
    region: string;
    region_id: number;
}

export type CustomerAddressFields = Array<
Field<'id', number>
| Field<'customer_id', number>
| Field<'country_id', string>
| Field<'street', string>
| Field<'telephone', string>
| Field<'postcode', string>
| Field<'city', string>
| Field<'firstname', string>
| Field<'lastname', string>
| Field<'middlename', string>
| Field<'prefix', string>
| Field<'suffix', string>
| Field<'default_shipping', boolean>
| Field<'default_billing', boolean>
| Field<'vat_id', string>
| Field<'region', CustomerAddressRegion>
>;

export interface CustomerAddress {
    id: number;
    customer_id: number;
    country_id: GQLCountryCodeEnum;
    street: Array<string | null>;
    telephone: string;
    postcode: string;
    city: string;
    firstname: string;
    lastname: string;
    middlename: string;
    prefix: string;
    suffix: string;
    default_shipping: boolean;
    default_billing: boolean;
    vat_id: string;
    region: CustomerAddressRegion;
    company: string;
}

export type CustomerFields = Array<
Field<'created_at', string>
| Field<'confirmation_required', boolean>
| Field<'group_id', number>
| Field<'prefix', string>
| Field<'firstname', string>
| Field<'middlename', string>
| Field<'lastname', string>
| Field<'suffix', string>
| Field<'email', string>
| Field<'default_billing', string>
| Field<'default_shipping', string>
| Field<'dob', string>
| Field<'taxvat', string>
| Field<'id', number>
| Field<'is_subscribed', boolean>
| Field<'addresses', CustomerAddress, true>
>;

export interface Customer {
    created_at: string;
    confirmation_required: boolean;
    group_id: number;
    prefix: string;
    firstname: string;
    middlename: string;
    lastname: string;
    suffix: string;
    email: string;
    default_billing: string;
    default_shipping: string;
    dob: string;
    taxvat: string;
    id: number;
    is_subscribed: boolean;
    addresses: CustomerAddress[];
}

export interface CreateCustomerOutput {
    status: string;
    token: string;
    customer: Customer;
}

export type ResetPasswordOptions = {
    token: string;
    password: string;
    password_confirmation: string;
};

export type SignInOptions = {
    email: string;
    password: string;
};

export type ConfirmAccountOptions = SignInOptions & {
    key: string;
};

export type ChangeCustomerPasswordOptions = {
    password: string;
    newPassword: string;
};

export type CreateAccountOptions = {
    customer: Omit<GQLCustomerInput, 'password'>;
    password: string;
};
