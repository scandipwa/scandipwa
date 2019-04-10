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
        const { history, location: { state } } = this.props;

        if (state.length) {
            this.changeState(state);
            history.replace({ state: {} });
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

        updateCustomerData(customer).then(() => this.redirectBackToOverview());
    }

    onUpdateAddressSuccess(fields, additionalInfo) {
        const { updateCustomerAddress, createCustomerAddress } = this.props;
        const { id, isAddressCreation, addressType } = additionalInfo;
        const default_shipping = addressType === 'shipping';
        const default_billing = addressType === 'billing';
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
            default_shipping,
            default_billing
        };

        if (isAddressCreation) {
            createCustomerAddress(addresses).then(() => this.redirectBackToOverview());
        } else {
            updateCustomerAddress(id, { default_billing, default_shipping, ...addresses }).then(() => {
                this.redirectBackToOverview();
            });
        }
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    redirectBackToOverview() {
        const { showNotification } = this.props;
        this.requestCustomerData().then(() => {
            this.changeState(STATE_ACCOUNT_OVERVIEW);
            showNotification('success', 'Changes have been saved to your account!');
        });
    }

    changeState(state, addressType) {
        this.setState({ state, addressType });
    }

    requestCustomerData() {
        const { requestCustomerData } = this.props;
        const options = {
            withAddresses: true
        };

        return requestCustomerData(options);
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

        const additionalInfo = {
            id: addresses[selectedAddress] && addresses[selectedAddress].id,
            isAddressCreation: !addresses[selectedAddress],
            addressType
        };

        return (
            <>
                <Form
                  key="add-address"
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onUpdateAddressSuccess(fields, additionalInfo) }
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
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ () => this.changeState(STATE_EDIT_INFORMATION) }
                    >
                        Edit
                    </button>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ () => this.changeState(STATE_EDIT_PASSWORD) }
                    >
                        Change Password
                    </button>
                </div>
            </fieldset>
        );
    }

    renderAddress(addressType) {
        const { customer, customer: { addresses } } = this.props;

        if (addresses) {
            const correctAddress = addresses.filter(address => address[`default_${addressType}`])[0];

            if (correctAddress) {
                const {
                    firstname,
                    lastname,
                    street,
                    city,
                    country,
                    telephone
                } = correctAddress;

                return (
                    <>
                        <div block="MyAccountDetails" elem="Field">
                            { firstname }
                            &nbsp;
                            { lastname }
                        </div>
                        <div block="MyAccountDetails" elem="Field">{ street }</div>
                        <div block="MyAccountDetails" elem="Field">{ city }</div>
                        <div block="MyAccountDetails" elem="Field">{ country }</div>
                        <div block="MyAccountDetails" elem="Field">{ telephone }</div>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, addressType) }
                        >
                            Edit Address
                        </button>
                    </>
                );
            }
        }

        return (
            <>
                <div>
                    No default&nbsp;
                    { addressType }
                    &nbsp;address has been set.
                </div>
                <button
                  block="Button"
                  mods={ { likeLink: true } }
                  onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, addressType) }
                >
                    Add New Address
                </button>
            </>
        );
    }

    renderAddressBook() {
        const { customer: { addresses } } = this.props;

        return (
            <fieldset block="MyAccountDetails" elem="AddressBook">
                <legend>
                    <span>Address Book</span>
                    { !addresses && <button block="Button" mods={ { likeLink: true } }>Add New Address</button> }
                </legend>
                <div block="MyAccountDetails" elem="FieldWrapper">
                    <div block="MyAccountDetails" elem="AddressWrapper">
                        <div block="MyAccountDetails" elem="FieldWrapper">
                            <h4>Default Billing Address</h4>
                            { this.renderAddress('billing') }
                        </div>
                        <div block="MyAccountDetails" elem="FieldWrapper">
                            <h4>Default Shipping Address</h4>
                            { this.renderAddress('shipping') }
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }

    render() {
        const { state } = this.state;
        const renderFunction = this.renderMap[state];
        const { customer } = this.props;

        if (customer) {
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

        return null;
    }
}

export default MyAccountDetails;
