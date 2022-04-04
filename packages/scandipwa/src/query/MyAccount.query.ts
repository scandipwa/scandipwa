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

import { Field, Mutation } from '@tilework/opus';

import {
    GQLCreateCustomerType,
    GQLCustomer,
    GQLCustomerActionConfirmationType,
    GQLCustomerAddress,
    GQLCustomerAddressInput,
    GQLCustomerAddressRegion,
    GQLCustomerOutput,
    GQLCustomerToken,
    GQLCustomerUpdateInput,
    GQLResetPasswordType,
    GQLRevokeCustomerTokenOutput
} from 'Type/Graphql.type';

import {
    ChangeCustomerPasswordOptions,
    CommonField,
    ConfirmAccountOptions,
    CreateAccountOptions,
    ResetPasswordOptions,
    SignInOptions
} from './Query.type';

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
    getResetPasswordMutation(options: ResetPasswordOptions): Mutation<'s_resetPassword', GQLResetPasswordType & {
        status: string;
    }> {
        const { token, password, password_confirmation } = options;

        return new Mutation<'s_resetPassword', GQLResetPasswordType>('s_resetPassword')
            .addArgument('token', 'String!', token)
            .addArgument('password', 'String!', password)
            .addArgument('password_confirmation', 'String!', password_confirmation)
            .addField('status');
    }

    /**
     * Get SignIn mutation
     * @param {{email: String, password: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getSignInMutation(options: SignInOptions): Mutation<'generateCustomerToken', GQLCustomerToken & {
        token: string;
    }> {
        const { email, password } = options;

        return new Mutation<'generateCustomerToken', GQLCustomerToken>('generateCustomerToken')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField('token');
    }

    getUpdateInformationMutation(options: GQLCustomerUpdateInput): Mutation<'updateCustomerV2', GQLCustomerOutput> {
        return new Mutation<'updateCustomerV2', GQLCustomerOutput>('updateCustomerV2')
            .addArgument('input', 'CustomerUpdateInput!', options)
            .addField(this._getCustomerField());
    }

    getUpdateEmailMutation(options: SignInOptions): Mutation<'updateCustomerEmail', GQLCustomerOutput> {
        const { email, password } = options;

        return new Mutation<'updateCustomerEmail', GQLCustomerOutput>('updateCustomerEmail')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField(this._getCustomerField());
    }

    getChangeCustomerPasswordMutation(
        options: ChangeCustomerPasswordOptions
    ): Mutation<'changeCustomerPassword', GQLCustomer & {
            id: string;
            email: string;
        }> {
        const { password, newPassword } = options;

        return new Mutation<'changeCustomerPassword', GQLCustomer>('changeCustomerPassword')
            .addArgument('currentPassword', 'String!', password)
            .addArgument('newPassword', 'String!', newPassword)
            .addField('id')
            .addField('email');
    }

    getCreateAddressMutation(options: GQLCustomerAddressInput): Field<'createCustomerAddress', GQLCustomerAddress> {
        return new Field<'createCustomerAddress', GQLCustomerAddress>('createCustomerAddress')
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getDeleteAddressMutation(id: number): Field<'deleteCustomerAddress', boolean> {
        return new Field<'deleteCustomerAddress', boolean>('deleteCustomerAddress')
            .addArgument('id', 'Int!', id);
    }

    getUpdateAddressMutation(
        id: number,
        options: GQLCustomerAddressInput
    ): Field<'updateCustomerAddress', GQLCustomerAddress> {
        return new Field<'updateCustomerAddress', GQLCustomerAddress>('updateCustomerAddress')
            .addArgument('id', 'Int!', id)
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getCreateAccountMutation(options: CreateAccountOptions): Field<'createCustomer', GQLCustomerOutput> {
        const { customer, password } = options;

        return new Field<'createCustomer', GQLCustomerOutput>('createCustomer')
            .addArgument('input', 'CustomerInput!', { ...customer, password })
            .addField(this._getCustomerField());
    }

    getConfirmAccountMutation(options: ConfirmAccountOptions): Field<'confirmCustomerEmail', GQLCreateCustomerType> {
        const { key, email, password } = options;

        return new Field<'confirmCustomerEmail', GQLCreateCustomerType>('confirmCustomerEmail')
            .addArgument('key', 'String!', key)
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addFieldList(this._getConfirmAccountFields());
    }

    getRevokeAccountToken(): Field<'revokeCustomerToken', GQLRevokeCustomerTokenOutput> {
        return new Field<'revokeCustomerToken', GQLRevokeCustomerTokenOutput>('revokeCustomerToken')
            .addFieldList(this.getRevokeAccountTokenFields());
    }

    getCustomerQuery(): Field<'customer', GQLCustomer> {
        return this._getCustomerField();
    }

    _getConfirmAccountFields(): CommonField[] {
        return [
            'status',
            'token',
            this._getCustomerField()
        ];
    }

    getRevokeAccountTokenFields(): string[] {
        return [
            'result'
        ];
    }

    _getCustomerField(): Field<'customer', GQLCustomer> {
        return new Field<'customer', GQLCustomer>('customer')
            .addFieldList(this._getCustomerFields());
    }

    _getCustomerFields(): CommonField[] {
        return [
            'created_at',
            'confirmation_required',
            'group_id',
            'prefix',
            'firstname',
            'middlename',
            'lastname',
            'suffix',
            'email',
            'default_billing',
            'default_shipping',
            'dob',
            'taxvat',
            'id',
            'is_subscribed',
            this._getAddressesField()
        ];
    }

    _getAddressesField(): Field<'addresses', GQLCustomerAddress, true> {
        return new Field<'addresses', GQLCustomerAddress, true>('addresses', true)
            .addFieldList(this._getAddressFields());
    }

    _getRegionField(): Field<'region', GQLCustomerAddressRegion> {
        return new Field<'region', GQLCustomerAddressRegion>('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields(): string[] {
        return [
            'region_code',
            'region',
            'region_id'
        ];
    }

    _getAddressFields(): CommonField[] {
        return [
            'id',
            'customer_id',
            'country_id',
            'street',
            'telephone',
            'postcode',
            'city',
            'firstname',
            'lastname',
            'middlename',
            'prefix',
            'suffix',
            'default_shipping',
            'default_billing',
            'vat_id',
            this._getRegionField()
        ];
    }

    /**
     * Get ForgotPassword mutation
     * @param {{email: String}} options
     * @returns {Field}
     * @memberof MyAccount
     */
    getForgotPasswordMutation(options: { email: string }): Field<'forgotPassword', GQLCustomerActionConfirmationType & {
        status: string;
    }> {
        const { email } = options;

        return new Field<'forgotPassword', GQLCustomerActionConfirmationType>('forgotPassword')
            .addArgument('email', 'String!', email)
            .addField('status');
    }
}

export default new MyAccountQuery();
