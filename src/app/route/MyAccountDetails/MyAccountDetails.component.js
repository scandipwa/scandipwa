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
import TextPlaceholder from 'Component/TextPlaceholder';
import { Redirect } from 'react-router';
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
            correctAddress: {},
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

    /**
     * Redirect back to account overview
     */
    componentDidUpdate() {
        const { history, location: { state } } = this.props;

        if (state.length) {
            this.changeState(state);
            history.replace({ state: {} });
        }
    }

    /**
     * Check if all fields are valid before sending changes
     * @param {Object} fields
     * @param {Object} invalidFields
     */
    onUpdateAttempt(fields, invalidFields) {
        const { showNotification } = this.props;

        if (invalidFields) {
            showNotification('error', 'Incorrect data! Please resolve all field validation errors.');
        }
        this.setState({ isLoading: !invalidFields });
    }

    /**
     * Update Customer Account information and redirect to overview page
     * @param {Object} fields
     */
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

    /**
     * Change Custoemr Password and redirect to overview page
     * @param {Object} fields
     */
    onChangePasswordSuccess(fields) {
        const { changeCustomerPassword, customer } = this.props;
        const {
            id,
            email
        } = customer;

        changeCustomerPassword(fields, { id, email }).then(() => this.redirectBackToOverview());
    }

    /**
     * Update default Shipping/Billing address for customer and redirect to overview page
     * @param {Object} fields
     * @param {Object} correctAddress
     */
    onUpdateAddressSuccess(fields, correctAddress) {
        const { updateCustomerAddress, createCustomerAddress } = this.props;
        const isAddressCreation = typeof correctAddress === 'string';
        const default_shipping = typeof correctAddress === 'string'
            ? correctAddress === 'shipping'
            : correctAddress.default_shipping;
        const default_billing = typeof correctAddress === 'string'
            ? correctAddress === 'billing'
            : correctAddress.default_billing;
        const {
            city,
            company,
            country_id,
            firstname,
            lastname,
            postcode,
            region,
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
            region: { region },
            street,
            telephone,
            default_shipping,
            default_billing
        };

        if (isAddressCreation) {
            createCustomerAddress(addresses).then(() => this.redirectBackToOverview());
        } else {
            const { id } = correctAddress;
            updateCustomerAddress(id, { default_billing, default_shipping, ...addresses }).then(() => {
                this.redirectBackToOverview();
            });
        }
    }

    /**
     * Form fields are invalid
     */
    onFormError() {
        this.setState({ isLoading: false });
    }

    /**
     * Request all customer data, redirect to overview page and show a notification
     */
    redirectBackToOverview() {
        const { showNotification } = this.props;
        this.requestCustomerData().then(() => {
            this.changeState(STATE_ACCOUNT_OVERVIEW);
            showNotification('success', 'Changes have been saved to your account!');
        });
    }

    /**
     * Change state, change correctAddress if updating address
     * @param {String} state
     * @param {Object} correctAddress
     */
    changeState(state, correctAddress) {
        this.setState({ state, correctAddress });
    }

    /**
     * Get Customer Data from DB
     */
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

    /**
     * Render main account overview page
     */
    renderAccountOverview() {
        return (
            <>
            { this.renderAccountInformation() }
            { this.renderAddressBook() }
            </>
        );
    }

    /**
     * Render Customer Address Update page
     */
    renderUpdateAddress() {
        const { correctAddress } = this.state;
        const {
            firstname,
            lastname,
            company,
            telephone,
            street,
            city,
            postcode,
            region,
            country_id
        } = correctAddress;

        return (
            <>
                <Form
                  key="add-address"
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onUpdateAddressSuccess(fields, correctAddress) }
                  onSubmitError={ (fields, invalidFields) => this.onUpdateAttempt(fields, invalidFields) }
                >
                <fieldset block="MyAccountDetails" elem="AccountInfo">
                    <legend>Contact Information</legend>
                    <Field
                      type="text"
                      label="First name"
                      id="firstname"
                      validation={ ['notEmpty'] }
                      value={ firstname }
                    />
                    <Field type="text" label="Last name" id="lastname" validation={ ['notEmpty'] } value={ lastname } />
                    <Field type="text" label="Company" id="company" value={ company } />
                    <Field
                      type="text"
                      label="Phone Number"
                      id="telephone"
                      validation={ ['notEmpty'] }
                      value={ telephone }
                    />
                </fieldset>
                <fieldset block="MyAccountDetails" elem="AddressInfo">
                    <legend>Address</legend>
                    <Field
                      type="text"
                      label="Street Address"
                      id="street"
                      validation={ ['notEmpty'] }
                      value={ street && street[0] }
                    />
                    <Field type="text" label="City" id="city" validation={ ['notEmpty'] } value={ city } />
                    <Field type="text" label="Postcode" id="postcode" validation={ ['notEmpty'] } value={ postcode } />
                    <Field
                      type="text"
                      label="State/Province"
                      id="region"
                      validation={ ['notEmpty'] }
                      value={ region && region.region }
                    />
                    <Field
                      type="text"
                      label="Country"
                      id="country_id"
                      validation={ ['notEmpty'] }
                      value={ country_id }
                    />
                </fieldset>
                <button block="MyAccountDetails" elem="Submit" type="submit">Add Address</button>
                </Form>
            </>
        );
    }

    /**
     * Render Account Information edit page
     */
    renderEditInformation() {
        const { customer } = this.props;
        const { firstname, lastname, is_subscribed } = customer;

        return (
            <>
                <Form
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onUpdateAccountSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onUpdateAttempt(fields, invalidFields) }
                >
                    <fieldset block="MyAccountDetails" elem="AccountInfo">
                        <legend>Edit Account Information</legend>
                        <Field
                          type="text"
                          label="First name"
                          id="firstname"
                          validation={ ['notEmpty'] }
                          value={ firstname }
                        />
                        <Field
                          type="text"
                          label="Last name"
                          id="lastname"
                          validation={ ['notEmpty'] }
                          value={ lastname }
                        />
                        <Field
                          block="MyAccountDetails"
                          elem="Checkbox"
                          type="checkbox"
                          label="Subscribe to ScandiPWA newsletter"
                          id="is_subscribed"
                          checked={ is_subscribed }
                        />
                        <button block="MyAccountDetails" elem="Submit" type="submit">Save Changes</button>
                    </fieldset>
                </Form>
            </>
        );
    }

    /**
     * Render Customer Password edit page
     */
    renderEditPassword() {
        return (
            <>
                <Form
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onChangePasswordSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onUpdateAttempt(fields, invalidFields) }
                >
                    <fieldset block="MyAccountDetails" elem="AccountInfo">
                        <legend>Edit Password</legend>
                        <Field
                          type="password"
                          label="Current Password"
                          id="currentPassword"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label="New Password"
                          id="newPassword"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label="Confirm New Password"
                          id="confirmPassword"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <button block="MyAccountDetails" elem="Submit" type="submit">Save New Password</button>
                    </fieldset>
                </Form>
            </>
        );
    }

    /**
     * Render Account Information block
     */
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
                    <div block="MyAccountDetails" elem="Actions">
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
                </div>
            </fieldset>
        );
    }

    /**
     * Render Customer Address block
     * @param {String} addressType
     */
    renderAddress(addressType) {
        const { customer: { addresses } } = this.props;

        if (addresses) {
            const correctAddress = addresses.filter(address => address[`default_${addressType}`])[0];

            if (correctAddress) {
                const {
                    firstname,
                    lastname,
                    street,
                    region: { region },
                    city,
                    country_id,
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
                        <div block="MyAccountDetails" elem="Field">
                            { city }
                            ,&nbsp;
                            { region }
                            ,&nbsp;
                            { country_id }
                        </div>
                        <div block="MyAccountDetails" elem="Field">{ telephone }</div>
                        <div block="MyAccountDetails" elem="Actions">
                            <button
                              block="Button"
                              mods={ { likeLink: true } }
                              onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, correctAddress) }
                            >
                                Edit Address
                            </button>
                        </div>
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
                <div block="MyAccountDetails" elem="Actions">
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, addressType) }
                    >
                        Add New Address
                    </button>
                </div>
            </>
        );
    }

    /**
     * Render Custoenr Address Book block
     */
    renderAddressBook() {
        return (
            <fieldset block="MyAccountDetails" elem="AddressBook">
                <legend>
                    <span>Address Book</span>
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
        const { customer, isSignedIn } = this.props;

        if (!isSignedIn) {
            return <Redirect to="/" />;
        }

        if (customer && Object.keys(customer).length) {
            return (
                <main block="MyAccountDetails" aria-label="My Account Details">
                    <div block="MyAccountDetails" elem="Wrapper">
                        <ul block="MyAccountDetails" elem="Sidebar">
                            <li
                              onClick={ () => this.changeState(STATE_ACCOUNT_OVERVIEW) }
                              onKeyPress={ () => this.changeState(STATE_ACCOUNT_OVERVIEW)}
                            >
                                My Account
                            </li>
                            <li>My Orders</li>
                        </ul>
                        <div block="MyAccountDetails" elem="Content">
                            { renderFunction() }
                        </div>
                    </div>
                </main>
            );
        }

        return (
            <main block="MyAccountDetails" aria-label="My Account Details">
                <div block="MyAccountDetails" elem="Wrapper">
                    <ul block="MyAccountDetails" elem="Sidebar">
                        <li>My Account</li>
                        <li>My Orders</li>
                    </ul>
                    <div block="MyAccountDetails" elem="Content">
                    <fieldset block="MyAccountDetails" elem="AccountInfo">
                        <legend>Account Information</legend>
                        <div block="MyAccountDetails" elem="FieldWrapper">
                            <div block="MyAccountDetails" elem="Field">
                                <TextPlaceholder length="medium" />
                            </div>
                            <div block="MyAccountDetails" elem="Field"><TextPlaceholder length="short" /></div>
                            <div block="MyAccountDetails" elem="Field">
                                <TextPlaceholder length="short" />
                            </div>
                            <div block="MyAccountDetails" elem="Actions">
                                <TextPlaceholder length="medium" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset block="MyAccountDetails" elem="AddressBook">
                        <legend>
                            <span>Address Book</span>
                        </legend>
                        <div block="MyAccountDetails" elem="FieldWrapper">
                            <div block="MyAccountDetails" elem="AddressWrapper">
                                <div block="MyAccountDetails" elem="FieldWrapper">
                                    <h4>Default Billing Address</h4>
                                    <div block="MyAccountDetails" elem="Field">
                                        <TextPlaceholder length="medium" />
                                    </div>
                                    <div block="MyAccountDetails" elem="Field"><TextPlaceholder length="short" /></div>
                                    <div block="MyAccountDetails" elem="Field">
                                        <TextPlaceholder length="medium" />
                                    </div>
                                    <div block="MyAccountDetails" elem="Field"><TextPlaceholder length="short" /></div>
                                    <div block="MyAccountDetails" elem="Actions">
                                        <TextPlaceholder length="short" />
                                    </div>
                                </div>
                                <div block="MyAccountDetails" elem="FieldWrapper">
                                    <h4>Default Shipping Address</h4>
                                    <div block="MyAccountDetails" elem="Field">
                                        <TextPlaceholder length="medium" />
                                    </div>
                                    <div block="MyAccountDetails" elem="Field"><TextPlaceholder length="short" /></div>
                                    <div block="MyAccountDetails" elem="Field">
                                        <TextPlaceholder length="medium" />
                                    </div>
                                    <div block="MyAccountDetails" elem="Field"><TextPlaceholder length="short" /></div>
                                    <div block="MyAccountDetails" elem="Actions">
                                        <TextPlaceholder length="short" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    </div>
                </div>
            </main>
        );
    }
}

MyAccountDetails.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    showNotification: PropTypes.func.isRequired,
    requestCustomerData: PropTypes.func.isRequired,
    updateCustomerData: PropTypes.func.isRequired,
    createCustomerAddress: PropTypes.func.isRequired,
    updateCustomerAddress: PropTypes.func.isRequired,
    changeCustomerPassword: PropTypes.func.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired
};

export default MyAccountDetails;
