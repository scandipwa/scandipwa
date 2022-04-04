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

import { GQLCustomerAddressInput, GQLCustomerUpdateInput } from 'Type/Graphql.type';
import { Field } from 'Util/Query';

import {
    ChangeCustomerPasswordOptions, ConfirmAccountOptions, CreateAccountOptions, ResetPasswordOptions, SignInOptions
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
    getResetPasswordMutation(options: ResetPasswordOptions): Field {
        const { token, password, password_confirmation } = options;

        return new Field('s_resetPassword')
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
    getSignInMutation(options: SignInOptions): Field {
        const { email, password } = options;

        return new Field('generateCustomerToken')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField('token');
    }

    getUpdateInformationMutation(options: GQLCustomerUpdateInput): Field {
        return new Field('updateCustomerV2')
            .addArgument('input', 'CustomerUpdateInput!', options)
            .addField(this._getCustomerField());
    }

    getUpdateEmailMutation(options: SignInOptions): Field {
        const { email, password } = options;

        return new Field('updateCustomerEmail')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField(this._getCustomerField());
    }

    getChangeCustomerPasswordMutation(options: ChangeCustomerPasswordOptions): Field {
        const { password, newPassword } = options;

        return new Field('changeCustomerPassword')
            .addArgument('currentPassword', 'String!', password)
            .addArgument('newPassword', 'String!', newPassword)
            .addField('id')
            .addField('email');
    }

    getCreateAddressMutation(options: GQLCustomerAddressInput): Field {
        return new Field('createCustomerAddress')
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getDeleteAddressMutation(id: number): Field {
        return new Field('deleteCustomerAddress')
            .addArgument('id', 'Int!', id);
    }

    getUpdateAddressMutation(id: number, options: GQLCustomerAddressInput): Field {
        return new Field('updateCustomerAddress')
            .addArgument('id', 'Int!', id)
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getCreateAccountMutation(options: CreateAccountOptions): Field {
        const { customer, password } = options;

        return new Field('createCustomer')
            .addArgument('input', 'CustomerInput!', { ...customer, password })
            .addField(this._getCustomerField());
    }

    getConfirmAccountMutation(options: ConfirmAccountOptions): Field {
        const { key, email, password } = options;

        return new Field('confirmCustomerEmail')
            .addArgument('key', 'String!', key)
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addFieldList(this._getConfirmAccountFields());
    }

    getRevokeAccountToken(): Field {
        return new Field('revokeCustomerToken')
            .addFieldList(this.getRevokeAccountTokenFields());
    }

    getCustomerQuery(): Field {
        return this._getCustomerField();
    }

    _getConfirmAccountFields(): Array<string | Field> {
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

    _getCustomerField(): Field {
        return new Field('customer')
            .addFieldList(this._getCustomerFields());
    }

    _getCustomerFields(): Array<string | Field> {
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

    _getAddressesField(): Field {
        return new Field('addresses')
            .addFieldList(this._getAddressFields());
    }

    _getRegionField(): Field {
        return new Field('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields(): string[] {
        return [
            'region_code',
            'region',
            'region_id'
        ];
    }

    _getAddressFields(): Array<string | Field> {
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
    getForgotPasswordMutation(options: { email: string }): Field {
        const { email } = options;

        return new Field('forgotPassword')
            .addArgument('email', 'String!', email)
            .addField('status');
    }
}

export default new MyAccountQuery();
