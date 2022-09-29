/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Mutation, Query } from '@tilework/opus';

import { GQLCustomerAddressInput, GQLCustomerUpdateInput } from 'Type/Graphql.type';

import {
    ChangeCustomerPasswordOptions,
    ConfirmAccountOptions,
    CreateAccountOptions,
    CreateCustomerOutput,
    Customer,
    CustomerAddress,
    CustomerAddressFields,
    CustomerAddressRegion,
    CustomerFields,
    ResetPasswordOptions,
    SignInOptions,
} from './MyAccount.type';

/**
 * MyAccount Mutations
 * @class MyAccount
 * @namespace Query/MyAccount/Query */
export class MyAccountQuery {
    /**
     * Get ResetPassword mutation
     * @param {{token: String, password: String, password_confirmation: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getResetPasswordMutation(options: ResetPasswordOptions): Mutation<'s_resetPassword', { status: string }> {
        const {
            customer_id,
            token,
            password,
            password_confirmation,
        } = options;

        return new Mutation<'s_resetPassword', { status: string }>('s_resetPassword')
            .addArgument('token', 'String!', token)
            .addArgument('password', 'String!', password)
            .addArgument('password_confirmation', 'String!', password_confirmation)
            .addArgument('customer_id', 'String!', customer_id)
            .addField('status');
    }

    /**
     * Get SignIn mutation
     * @param {{email: String, password: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getSignInMutation(options: SignInOptions): Mutation<'generateCustomerToken', { token: string }> {
        const { email, password } = options;

        return new Mutation<'generateCustomerToken', { token: string }>('generateCustomerToken')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField('token');
    }

    getUpdateInformationMutation(
        options: GQLCustomerUpdateInput,
    ): Mutation<'updateCustomerV2', { customer: Customer }> {
        return new Mutation<'updateCustomerV2', { customer: Customer }>('updateCustomerV2')
            .addArgument('input', 'CustomerUpdateInput!', options)
            .addField(this._getCustomerField());
    }

    getUpdateEmailMutation(options: SignInOptions): Mutation<'updateCustomerEmail', { customer: Customer }> {
        const { email, password } = options;

        return new Mutation<'updateCustomerEmail', { customer: Customer }>('updateCustomerEmail')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField(this._getCustomerField());
    }

    getChangeCustomerPasswordMutation(
        options: ChangeCustomerPasswordOptions,
    ): Mutation<'changeCustomerPassword', Customer> {
        const { password, newPassword } = options;

        return new Mutation<'changeCustomerPassword', Customer>('changeCustomerPassword')
            .addArgument('currentPassword', 'String!', password)
            .addArgument('newPassword', 'String!', newPassword)
            .addField('id')
            .addField('email');
    }

    getCreateAddressMutation(options: GQLCustomerAddressInput): Mutation<'createCustomerAddress', CustomerAddress> {
        return new Mutation<'createCustomerAddress', CustomerAddress>('createCustomerAddress')
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getDeleteAddressMutation(id: number): Mutation<'deleteCustomerAddress', boolean> {
        return new Mutation<'deleteCustomerAddress', boolean>('deleteCustomerAddress')
            .addArgument('id', 'Int!', id);
    }

    getUpdateAddressMutation(
        id: number,
        options: GQLCustomerAddressInput,
    ): Mutation<'updateCustomerAddress', CustomerAddress> {
        return new Mutation<'updateCustomerAddress', CustomerAddress>('updateCustomerAddress')
            .addArgument('id', 'Int!', id)
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getCreateAccountMutation(options: CreateAccountOptions): Mutation<'createCustomer', { customer: Customer }> {
        const { customer, password } = options;

        return new Mutation<'createCustomer', { customer: Customer }>('createCustomer')
            .addArgument('input', 'CustomerInput!', { ...customer, password })
            .addField(this._getCustomerField());
    }

    getResendConfirmationMutation(options: { email: string }): Mutation<'resendConfirmationEmail', { status: string }> {
        const { email } = options;

        return new Mutation<'resendConfirmationEmail', { status: string }>('resendConfirmationEmail')
            .addArgument('email', 'String!', email)
            .addFieldList(this._getResendConfirmationFields());
    }

    _getResendConfirmationFields(): Array<Field<'status', string>> {
        return [
            new Field<'status', string>('status'),
        ];
    }

    getConfirmAccountMutation(options: ConfirmAccountOptions): Mutation<'confirmCustomerEmail', CreateCustomerOutput> {
        const { key, email, password } = options;

        return new Mutation<'confirmCustomerEmail', CreateCustomerOutput>('confirmCustomerEmail')
            .addArgument('key', 'String!', key)
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addFieldList(this._getConfirmAccountFields());
    }

    getRevokeAccountToken(): Mutation<'revokeCustomerToken', { result: boolean }> {
        return new Mutation<'revokeCustomerToken', { result: boolean }>('revokeCustomerToken')
            .addFieldList(this.getRevokeAccountTokenFields());
    }

    getCustomerQuery(): Query<'customer', Customer> {
        return new Query<'customer', Customer>('customer')
            .addFieldList(this._getCustomerFields());
    }

    _getConfirmAccountFields(): Array<
    Field<'status', string>
    | Field<'token', string>
    | Field<'customer', Customer>
    > {
        return [
            new Field<'status', string>('status'),
            new Field<'token', string>('token'),
            this._getCustomerField(),
        ];
    }

    getRevokeAccountTokenFields(): Field<'result', boolean>[] {
        return [
            new Field<'result', boolean>('result'),
        ];
    }

    _getCustomerField(): Field<'customer', Customer> {
        return new Field<'customer', Customer>('customer')
            .addFieldList(this._getCustomerFields());
    }

    _getCustomerFields(): CustomerFields {
        return [
            new Field<'created_at', string>('created_at'),
            new Field<'confirmation_required', boolean>('confirmation_required'),
            new Field<'group_id', number>('group_id'),
            new Field<'prefix', string>('prefix'),
            new Field<'firstname', string>('firstname'),
            new Field<'middlename', string>('middlename'),
            new Field<'lastname', string>('lastname'),
            new Field<'suffix', string>('suffix'),
            new Field<'email', string>('email'),
            new Field<'default_billing', string>('default_billing'),
            new Field<'default_shipping', string>('default_shipping'),
            new Field<'dob', string>('dob'),
            new Field<'taxvat', string>('taxvat'),
            new Field<'id', number>('id'),
            new Field<'is_subscribed', boolean>('is_subscribed'),
            this._getAddressesField(),
        ];
    }

    _getAddressesField(): Field<'addresses', CustomerAddress, true> {
        return new Field<'addresses', CustomerAddress, true>('addresses', true)
            .addFieldList(this._getAddressFields());
    }

    _getRegionField(): Field<'region', CustomerAddressRegion> {
        return new Field<'region', CustomerAddressRegion>('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields(): Array<
    Field<'region_code', string>
    | Field<'region', string>
    | Field<'region_id', number>
    > {
        return [
            new Field<'region_code', string>('region_code'),
            new Field<'region', string>('region'),
            new Field<'region_id', number>('region_id'),
        ];
    }

    _getAddressFields(): CustomerAddressFields {
        return [
            new Field<'id', number>('id'),
            new Field<'customer_id', number>('customer_id'),
            new Field<'country_id', string>('country_id'),
            new Field<'street', string>('street'),
            new Field<'telephone', string>('telephone'),
            new Field<'postcode', string>('postcode'),
            new Field<'city', string>('city'),
            new Field<'firstname', string>('firstname'),
            new Field<'lastname', string>('lastname'),
            new Field<'middlename', string>('middlename'),
            new Field<'prefix', string>('prefix'),
            new Field<'suffix', string>('suffix'),
            new Field<'default_shipping', boolean>('default_shipping'),
            new Field<'default_billing', boolean>('default_billing'),
            new Field<'vat_id', string>('vat_id'),
            this._getRegionField(),
        ];
    }

    /**
     * Get ForgotPassword mutation
     * @param {{email: String}} options
     * @returns {Field}
     * @memberof MyAccount
     */
    getForgotPasswordMutation(
        options: { email: string },
    ): Mutation<'forgotPassword', { status: string }> {
        const { email } = options;

        return new Mutation<'forgotPassword', { status: string }>('forgotPassword')
            .addArgument('email', 'String!', email)
            .addField('status');
    }
}

export default new MyAccountQuery();
