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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from 'Component/Field';
import Form from 'Component/Form';
import './MyAccountDetails.style';

const STATE_ACCOUNT_OVERVIEW = 'accountOverview';
const STATE_EDIT_INFORMATION = 'editInformation';
const STATE_EDIT_PASSWORD = 'editPassword';
const STATE_UPDATE_ADDRESS = 'updateAddress';

class MyAccountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: STATE_ACCOUNT_OVERVIEW,
            addressType: '',
            isLoading: false
        };

        this.renderMap = {
            [STATE_ACCOUNT_OVERVIEW]: () => (this.renderAccountOverview()),
            [STATE_UPDATE_ADDRESS]: () => (this.renderUpdateAddress()),
            [STATE_EDIT_INFORMATION]: () => (this.renderEditInformation()),
            [STATE_EDIT_PASSWORD]: () => (this.renderEditPassword())
        };

        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        this.requestCustomerData();
        this.updateBreadcrumbs();
    }

    componentDidUpdate() {
        const { customer, customer: { addresses }, showNotification } = this.props;
        const { state } = this.state;

        if (!customer && state !== STATE_ACCOUNT_OVERVIEW) {
            this.requestCustomerData();
            this.changeState(STATE_ACCOUNT_OVERVIEW);
            showNotification('success', 'Changes have been saved to your account!');
        }
    }

    onUpdateAttempt(fields, invalidFields) {
        const { showNotification } = this.props;

        if (invalidFields) {
            showNotification('error', 'Incorrect data! Please resolve all field validation errors.');
        }
        this.setState({ isLoading: !invalidFields });
    }

    onUpdateAccountSuccess(fields) {
        const { updateCustomerData } = this.props;
        const {
            firstname,
            lastname,
            is_subscribed
        } = fields;
        const customer = {
            firstname,
            lastname,
            is_subscribed
        };

        updateCustomerData(customer);
    }

    onUpdateAddressSuccess(fields, isAddressCreation, addressType) {
        const { updateCustomerAddress, createCustomerAddress } = this.props;
        const {
            city,
            company,
            country_id,
            firstname,
            lastname,
            postcode,
            region: { region },
            street,
            telephone
        } = fields;
        const addresses = {
            city,
            company,
            country_id,
            firstname,
            lastname,
            postcode,
            region,
            street,
            telephone,
            default_shipping: addressType === 'shipping',
            default_billing: addressType === 'billing'
        };
        // TODO change to actaul address id, dynamic default choose
        const id = 1;
        const default_shipping = addressType === 'shipping';
        const default_billing = addressType === 'billing';
        console.log(default_shipping);
        console.log(default_billing);

        if (isAddressCreation) {
            createCustomerAddress(addresses);
        } else {
            updateCustomerAddress(id, { default_billing, default_shipping, ...addresses });
        }
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    changeState(state, addressType) {
        this.setState({ state, addressType });
    }

    requestCustomerData() {
        const { requestCustomerData } = this.props;
        const options = {
            withAddresses: true
        };

        requestCustomerData(options);
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/my-account',
                name: 'My Account'
            },
            {
                url: '/',
                name: 'Home'
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    renderAccountOverview() {
        return (
            <>
            { this.renderAccountInformation() }
            { this.renderAddressBook() }
            </>
        );
    }

    renderUpdateAddress() {
        const { customer: { addresses } } = this.props;
        const { addressType } = this.state;
        const selectedAddress = addressType === 'billing' ? 0 : 1;
        const isAddressCreation = !addresses[selectedAddress];

        return (
            <>
                <Form
                  key="add-address"
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onUpdateAddressSuccess(fields, isAddressCreation, addressType) }
                  onSubmitError={ (fields, invalidFields) => this.onUpdateAttempt(fields, invalidFields) }
                >
                <fieldset block="MyAccountDetails" elem="AccountInfo">
                    <legend>Contact Information</legend>
                    <Field type="text" label="First name" id="firstname" validation={ ['notEmpty'] } />
                    <Field type="text" label="Last name" id="lastname" validation={ ['notEmpty'] } />
                    <Field type="text" label="Company" id="company" />
                    <Field type="text" label="Phone Number" id="telephone" validation={ ['notEmpty'] } />
                </fieldset>
                <fieldset block="MyAccountDetails" elem="AddressInfo">
                    <legend>Address</legend>
                    <Field type="text" label="Street Address" id="street" validation={ ['notEmpty'] } />
                    <Field type="text" label="City" id="city" validation={ ['notEmpty'] } />
                    <Field type="text" label="Postcode" id="postcode" validation={ ['notEmpty'] } />
                    <Field type="text" label="State/Province" id="region" validation={ ['notEmpty'] } />
                    <Field type="text" label="Country" id="country_id" validation={ ['notEmpty'] } />
                </fieldset>
                <button block="MyAccountDetails" elem="Submit" type="submit">Add Address</button>
                </Form>
            </>
        );
    }

    renderEditInformation() {
        return (
            <>
                <Form
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onUpdateAccountSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onUpdateAttempt(fields, invalidFields) }
                >
                    <fieldset block="MyAccountDetails" elem="AccountInfo">
                        <legend>Edit Account Information</legend>
                        <Field type="text" label="First name" id="firstname" validation={ ['notEmpty'] } />
                        <Field type="text" label="Last name" id="lastname" validation={ ['notEmpty'] } />
                        <Field
                          block="MyAccountDetails"
                          elem="Checkbox"
                          type="checkbox"
                          label="Subscribe to ScandiPWA newsletter"
                          id="is_subscribed"
                        />
                        <button block="MyAccountDetails" elem="Submit" type="submit">Save Changes</button>
                    </fieldset>
                </Form>
            </>
        );
    }

    renderEditPassword() {
        return (
            <>
                <Form>
                    <fieldset block="MyAccountDetails" elem="AccountInfo">
                        <legend>Edit Password</legend>
                        <Field
                          type="password"
                          label="Current Password"
                          id="old_password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label="New Password"
                          id="password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label="Confirm New Password"
                          id="confirm_password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <button block="MyAccountDetails" elem="Submit" type="submit">Save New Password</button>
                    </fieldset>
                </Form>
            </>
        );
    }

    renderAccountInformation() {
        const { customer } = this.props;
        if (customer) {
            const {
                firstname,
                lastname,
                email,
                is_subscribed
            } = customer;

            return (
                <fieldset block="MyAccountDetails" elem="AccountInfo">
                    <legend>Account Information</legend>
                    <div block="MyAccountDetails" elem="FieldWrapper">
                        <div block="MyAccountDetails" elem="Field">
                            { firstname }
                            &nbsp;
                            { lastname }
                        </div>
                        <div block="MyAccountDetails" elem="Field">{ email }</div>
                        <div block="MyAccountDetails" elem="Field">
                            Subscribed to newsletter:
                            { is_subscribed ? ' Yes' : ' No' }
                        </div>
                        <button
                          block="MyAccountDetails"
                          elem="EditButton"
                          onClick={ () => this.changeState(STATE_EDIT_INFORMATION) }
                        >
                            Edit
                        </button>
                        <button
                          block="MyAccountDetails"
                          elem="EditButton"
                          onClick={ () => this.changeState(STATE_EDIT_PASSWORD) }
                        >
                            Change Password
                        </button>
                    </div>
                </fieldset>
            );
        }

        return null;
    }

    renderAddress(addresses, addressType) {
        const selectedAddress = addressType === 'billing' ? 0 : 1;

        if (addresses && addresses[selectedAddress]) {
            console.log(addressType);
        console.log(addresses[selectedAddress]);
            const {
                firstname,
                lastname,
                street,
                city,
                country,
                telephone
            } = addresses[selectedAddress];

            return (
                <>
                    <div block="MyAccountDetails" elem="Field">
                        { firstname }
                        { lastname }
                    </div>
                    <div block="MyAccountDetails" elem="Field">{ street }</div>
                    <div block="MyAccountDetails" elem="Field">{ city }</div>
                    <div block="MyAccountDetails" elem="Field">{ country }</div>
                    <div block="MyAccountDetails" elem="Field">{ telephone }</div>
                    <button
                      block="MyAccountDetails"
                      elem="EditButton"
                      onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, addressType) }
                    >
                        Edit Address
                    </button>
                </>
            );
        }

        return (
            <>
                <div>
                    No default&nbsp;
                    { addressType }
                    &nbsp;address has been set.
                </div>
                <button
                  block="MyAccountDetails"
                  elem="AddButton"
                  onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, addressType) }
                >
                    Add New Address
                </button>
            </>
        );
    }

    renderAddressBook() {
        const { customer } = this.props;

        if (customer) {
            const { addresses } = customer;

            return (
                <fieldset block="MyAccountDetails" elem="AddressBook">
                    <legend>
                        <span>Address Book</span>
                        { !addresses && <button block="MyAccountDetails" elem="AddButton">Add New Address</button> }
                    </legend>
                    <div block="MyAccountDetails" elem="FieldWrapper">
                        <div block="MyAccountDetails" elem="AddressWrapper">
                            <div block="MyAccountDetails" elem="FieldWrapper">
                                <h4>Default Billing Address</h4>
                                { this.renderAddress(addresses, 'billing') }
                            </div>
                            <div block="MyAccountDetails" elem="FieldWrapper">
                                <h4>Default Shipping Address</h4>
                                { this.renderAddress(addresses, 'shipping') }
                            </div>
                        </div>
                    </div>
                </fieldset>
            );
        }

        return null;
    }

    render() {
        const { state } = this.state;
        const renderFunction = this.renderMap[state];

        return (
            <main block="MyAccountDetails" aria-label="My Account Details">
                <div block="MyAccountDetails" elem="Wrapper">
                    <ul block="MyAccountDetails" elem="Sidebar">
                        <li>My Account</li>
                        <li>My Orders</li>
                    </ul>
                    <div block="MyAccountDetails" elem="Content">
                        { renderFunction() }
                    </div>
                </div>
            </main>
        );
    }
}

export default MyAccountDetails;
