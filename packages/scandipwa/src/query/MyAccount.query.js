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

import { Field } from 'Util/Query';

/**
 * MyAccount Mutations
 * @class MyAccount
 * @namespace Query/MyAccount/Query */
export class MyAccountQuery {
    /**
     * Get ResetPassword mutation
     * @param {{customer_id: String, token: String, password: String, password_confirmation: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getResetPasswordMutation(options) {
        const {
            customer_id,
            token,
            password,
            password_confirmation
        } = options;

        return new Field('s_resetPassword')
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
    getSignInMutation(options) {
        const { email, password } = options;

        return new Field('generateCustomerToken')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField('token');
    }

    getUpdateInformationMutation(options) {
        return new Field('updateCustomerV2')
            .addArgument('input', 'CustomerUpdateInput!', options)
            .addField(this._getCustomerField());
    }

    getUpdateEmailMutation(options) {
        const { email, password } = options;

        return new Field('updateCustomerEmail')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField(this._getCustomerField());
    }

    getChangeCustomerPasswordMutation(options) {
        const { password, newPassword } = options;

        return new Field('changeCustomerPassword')
            .addArgument('currentPassword', 'String!', password)
            .addArgument('newPassword', 'String!', newPassword)
            .addField('id')
            .addField('email');
    }

    getCreateAddressMutation(options) {
        return new Field('createCustomerAddress')
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getDeleteAddressMutation(id) {
        return new Field('deleteCustomerAddress')
            .addArgument('id', 'Int!', id);
    }

    getUpdateAddressMutation(id, options) {
        return new Field('updateCustomerAddress')
            .addArgument('id', 'Int!', id)
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFields());
    }

    getCreateAccountMutation(options) {
        const { customer, password, orderID } = options;

        return new Field('createCustomer')
            .addArgument('input', 'CustomerInput!', { ...customer, password, orderID })
            .addField(this._getCustomerField());
    }

    getResendConfirmationMutation(options) {
        const { email } = options;

        return new Field('resendConfirmationEmail')
            .addArgument('email', 'String!', email)
            .addFieldList(this._getResendConfirmationFields());
    }

    _getResendConfirmationFields() {
        return [
            'status'
        ];
    }

    getConfirmAccountMutation(options) {
        const { key, email, password } = options;

        return new Field('confirmCustomerEmail')
            .addArgument('key', 'String!', key)
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addFieldList(this._getConfirmAccountFields());
    }

    getRevokeAccountToken() {
        return new Field('revokeCustomerToken')
            .addFieldList(this.getRevokeAccountTokenFields());
    }

    getCustomerQuery() {
        return this._getCustomerField();
    }

    _getConfirmAccountFields() {
        return [
            'status',
            'token',
            this._getCustomerField()
        ];
    }

    getRevokeAccountTokenFields() {
        return [
            'result'
        ];
    }

    _getCustomerField() {
        return new Field('customer')
            .addFieldList(this._getCustomerFields());
    }

    _getCustomerFields() {
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

    _getAddressesField() {
        return new Field('addresses')
            .addFieldList(this._getAddressFields());
    }

    _getRegionField() {
        return new Field('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields() {
        return [
            'region_code',
            'region',
            'region_id'
        ];
    }

    _getAddressFields() {
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
    getForgotPasswordMutation(options) {
        const { email } = options;

        return new Field('forgotPassword')
            .addArgument('email', 'String!', email)
            .addField('status');
    }
}

export default new MyAccountQuery();
