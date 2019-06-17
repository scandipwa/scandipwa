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

import { Field } from 'Util/Query';

/**
 * MyAccount Mutations
 * @class MyAccount
 */
class MyAccount {
    /**
     * Get Customer query
     * @param {boolean} withAddress
     * @returns {Field}
     * @memberof MyAccount
     */
    getCustomer(withAddress) {
        const customer = new Field('customer')
            .addField('created_at')
            .addField('group_id')
            .addField('prefix')
            .addField('firstname')
            .addField('middlename')
            .addField('lastname')
            .addField('suffix')
            .addField('email')
            .addField('default_billing')
            .addField('default_shipping')
            .addField('dob')
            .addField('taxvat')
            .addField('id')
            .addField('is_subscribed');

        this._getAdditionalCustomerFields(customer);

        if (withAddress) customer.addField(this._getAddresses());

        return customer;
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

    /**
     * Get ResetPassword mutation
     * @param {{token: String, password: String, password_confirmation: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getResetPasswordMutation(options) {
        const { token, password, password_confirmation } = options;

        return new Field('resetPassword')
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
    getSignInMutation(options) {
        const { email, password } = options;

        return new Field('generateCustomerToken')
            .addArgument('email', 'String!', email)
            .addArgument('password', 'String!', password)
            .addField('token');
    }

    getUpdateInformationMutation(options) {
        return new Field('updateCustomer')
            .addArgument('input', 'CustomerInput!', options)
            .addField(this.getCustomer(true));
    }

    getChangeCustomerPasswordMutation(options) {
        const { currentPassword, newPassword } = options;

        return new Field('changeCustomerPassword')
            .addArgument('currentPassword', 'String!', currentPassword)
            .addArgument('newPassword', 'String!', newPassword)
            .addField('id')
            .addField('email');
    }

    getCreateAddressMutation(options) {
        return new Field('createCustomerAddress')
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFieldList());
    }

    getUpdateAddressMutation(id, options) {
        return new Field('updateCustomerAddress')
            .addArgument('id', 'Int!', id)
            .addArgument('input', 'CustomerAddressInput!', options)
            .addFieldList(this._getAddressFieldList());
    }

    /**
     * Get CreateAccount mutation
     * @param  {{customer: Object, password: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof CreateAccount
     */
    getCreateAccountMutation(options) {
        const { customer, password } = options;

        return (process.env.MAGENTO_VERSION === '2.3.1')
            // For M2 v. 2.3.1
            ? new Field('createCustomer')
                .addArgument('input', 'CustomerInput!', { ...customer, password })
                .addField(this.getCustomer(true))
            // For M2 v. 2.3.0
            : new Field('createCustomer')
                .addArgument('customer', 'CreateCustomerInput!', customer)
                .addArgument('password', 'String!', password)
                .addField('status')
                .addField('token')
                .addField(this.getCustomer(true));
    }

    /**
     * Get Customer Addresses field
     * @returns {Field}
     * @memberof MyAccount
     */
    _getAddresses() {
        const region = new Field('region')
            .addField('region_code')
            .addField('region')
            .addField('region_id');

        const addresses = new Field('addresses')
            .addField('id')
            .addField('customer_id')
            .addField(region)
            .addField('country_id')
            .addField('street')
            .addField('company')
            .addField('telephone')
            .addField('fax')
            .addField('postcode')
            .addField('city')
            .addField('firstname')
            .addField('lastname')
            .addField('middlename')
            .addField('prefix')
            .addField('suffix')
            .addField('vat_id')
            .addField('default_shipping')
            .addField('default_billing');

        this._getAdditionalAddressesFields(addresses);

        return addresses;
    }

    _getAddressFieldList() {
        const region = new Field('region')
            .addField('region_code')
            .addField('region')
            .addField('region_id');

        return ['id', 'customer_id', region, 'country_id', 'street', 'company', 'telephone', 'fax', 'postcode',
            'city', 'firstname', 'lastname', 'middlename', 'prefix', 'suffix', 'vat_id',
            'default_shipping', 'default_billing'];
    }

    /**
     * Adds additional customer address fields
     * @param {Field} addresses
     * @returns {*}
     * @memberof MyAccount
     */
    _getAdditionalAddressesFields(addresses) {
        return addresses;
    }

    /**
     * Adds additional customer fields
     * @param {Field} customer
     * @returns {*}
     * @memberof MyAccount
     */
    _getAdditionalCustomerFields(customer) {
        return customer;
    }
}

export { MyAccount };

export default new MyAccount();
