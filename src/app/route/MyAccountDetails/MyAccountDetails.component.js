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
import { customerType } from 'Type/Account';
import './MyAccountDetails.style';

export const STATE_ACCOUNT_OVERVIEW = 'accountOverview';
export const STATE_EDIT_INFORMATION = 'editInformation';
export const STATE_EDIT_PASSWORD = 'editPassword';
export const STATE_UPDATE_ADDRESS = 'updateAddress';
export const DEFAULT_COUNTRY = 'US';
export const DEFAULT_REGION = 'AL';

class MyAccountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: STATE_ACCOUNT_OVERVIEW,
            correctAddress: {},
            isLoading: false,
            selectValue: '',
            isSubscribed: null
        };

        this.renderMap = {
            [STATE_ACCOUNT_OVERVIEW]: () => (this.renderAccountOverview()),
            [STATE_UPDATE_ADDRESS]: () => (this.renderUpdateAddress()),
            [STATE_EDIT_INFORMATION]: () => (this.renderEditInformation()),
            [STATE_EDIT_PASSWORD]: () => (this.renderEditPassword())
        };

        this.changeState = this.changeState.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { state: pageState } = state;

        if (pageState === STATE_UPDATE_ADDRESS) {
            const { countryList } = props;
            const { correctAddress, selectValue } = state;
            const country_id = correctAddress && correctAddress.country_id;
            const countryValue = selectValue || country_id || DEFAULT_COUNTRY;

            const regionSelect = countryList.reduce((regionSelect, countryRegions) => {
                const { available_regions, id } = countryRegions;

                if (available_regions && countryValue === id) {
                    regionSelect.push(...available_regions);
                }

                return regionSelect;
            }, []);

            const regionType = regionSelect.length ? 'select' : 'text';

            return { regionSelect, regionType };
        }
        return null;
    }

    componentDidMount() {
        this.requestCustomerData();
        this.updateBreadcrumbs();
    }

    /**
     * Redirect back to account overview
     */
    componentDidUpdate() {
        const { history, location: { state }, customer } = this.props;
        const { isSubscribed } = this.state;

        if (isSubscribed === null) {
            const is_subscribed = customer ? customer.is_subscribed : null;
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ isSubscribed: is_subscribed });
        }

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
            showNotification('error', __('Incorrect data! Please resolve all field validation errors.'));
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
        const { changeCustomerPassword, customer, showNotification } = this.props;
        const {
            id,
            email
        } = customer;

        const { confirmPassword, newPassword } = fields;
        if (newPassword !== confirmPassword) return showNotification('error', __('Passwords do not match!'));

        return changeCustomerPassword(fields, { id, email }).then(
            (value) => {
                if (value.type !== 'SHOW_NOTIFICATION') this.redirectBackToOverview();
            }
        );
    }

    /**
     * Update default Shipping/Billing address for customer and redirect to overview page
     * @param {Object} fields
     * @param {Object} correctAddress
     */
    onUpdateAddressSuccess(fields, correctAddress) {
        const { regionState, regionType } = this.state;
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
        const useSelectValues = regionType === 'select' && regionState;
        const addresses = {
            city,
            company,
            country_id,
            firstname,
            lastname,
            postcode,
            region: {
                region_code: useSelectValues ? regionState.code : region,
                region: useSelectValues ? regionState.region : region,
                region_id: useSelectValues ? regionState.id : 0
            },
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
    redirectBackToOverview(hideNotification) {
        const { showNotification } = this.props;
        this.requestCustomerData().then(() => {
            this.changeState(STATE_ACCOUNT_OVERVIEW);
            if (!hideNotification) showNotification('success', __('Changes have been saved to your account!'));
        });
    }

    /**
     * Change state, change correctAddress if updating address
     * @param {String} state
     * @param {Object} correctAddress
     */
    changeState(state, correctAddress) {
        this.setState({ state, correctAddress, selectValue: '' });
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
                name: __('My Account')
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    /**
     * Save country select state
     * @param {String} value
     */
    changeSelectValue(value, selectId) {
        if (selectId === 'region' && typeof value === 'number') {
            const { regionSelect } = this.state;
            const regionValue = regionSelect.reduce((regionValue, region) => {
                const { id } = region;

                if (value === id) {
                    regionValue.push(region);
                }

                return regionValue;
            }, []);

            return this.setState({ regionState: regionValue[0] });
        }

        if (selectId === 'country') return this.setState({ selectValue: value });

        return null;
    }

    /**
     * Render main account overview page
     */
    renderAccountOverview() {
        return (
            <>
                <h1>{ __('My Account') }</h1>
                { this.renderAccountInformation() }
                { this.renderAddressBook() }
            </>
        );
    }

    /**
     * Render Customer Address Update page
     */
    renderUpdateAddress() {
        const {
            correctAddress,
            selectValue,
            regionSelect,
            regionState,
            regionType
        } = this.state;
        const { countryList } = this.props;
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
        const countryValue = selectValue || country_id || DEFAULT_COUNTRY;
        const regionValue = (regionState && regionState.code)
            || (region && region.region)
            || (regionType === 'select' ? DEFAULT_REGION : '');

        return (
            <>
                <Form
                  key="add-address"
                  onSubmit={ () => this.onUpdateAttempt() }
                  onSubmitSuccess={ fields => this.onUpdateAddressSuccess(fields, correctAddress) }
                  onSubmitError={ (fields, invalidFields) => this.onUpdateAttempt(fields, invalidFields) }
                >
                    <fieldset block="MyAccountDetails" elem="AccountInfo">
                        <legend>{ __('Contact Information') }</legend>
                        <Field
                          type="text"
                          label={ __('First name') }
                          id="firstname"
                          validation={ ['notEmpty'] }
                          value={ firstname }
                        />
                        <Field
                          type="text"
                          label={ __('Last name') }
                          id="lastname"
                          validation={ ['notEmpty'] }
                          value={ lastname }
                        />
                        <Field type="text" label="Company" id="company" value={ company } />
                        <Field
                          type="text"
                          label={ __('Phone Number') }
                          id="telephone"
                          validation={ ['notEmpty', 'telephone'] }
                          value={ telephone }
                        />
                    </fieldset>
                    <fieldset block="MyAccountDetails" elem="AddressInfo">
                        <legend>{ __('Address') }</legend>
                        <Field
                          type="text"
                          label={ __('Street Address') }
                          id="street"
                          validation={ ['notEmpty'] }
                          value={ street && street[0] }
                        />
                        <Field
                          type="text"
                          label={ __('City') }
                          id="city"
                          validation={ ['notEmpty'] }
                          value={ city }
                        />
                        <Field
                          type="text"
                          label={ __('Postcode') }
                          id="postcode"
                          validation={ ['notEmpty'] }
                          value={ postcode }
                        />
                        <Field
                          type={ regionType }
                          label={ __('State/Province') }
                          id="region"
                          options={ regionSelect }
                          validation={ ['notEmpty'] }
                          value={ regionValue }
                          onChange={ (value) => { this.changeSelectValue(value, 'region'); } }
                        />
                        <Field
                          type="select"
                          label={ __('Country') }
                          id="country_id"
                          options={ countryList }
                          value={ countryValue }
                          onChange={ (value) => { this.changeSelectValue(value, 'country'); } }
                        />
                    </fieldset>
                    <button block="MyAccountDetails" elem="Submit" type="submit">
                        { __('Add Address') }
                    </button>
                </Form>
            </>
        );
    }

    /**
     * Render Account Information edit page
     */
    renderEditInformation() {
        const { customer } = this.props;
        const { isSubscribed } = this.state;

        if (!customer) {
            return this.redirectBackToOverview(true);
        }

        const { firstname, lastname } = customer;

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
                          label={ __('First name') }
                          id="firstname"
                          validation={ ['notEmpty'] }
                          value={ firstname }
                        />
                        <Field
                          type="text"
                          label={ __('Last name') }
                          id="lastname"
                          validation={ ['notEmpty'] }
                          value={ lastname }
                        />
                        <Field
                          block="MyAccountDetails"
                          elem="Checkbox"
                          type="checkbox"
                          label={ __('Subscribe to ScandiPWA newsletter') }
                          id="is_subscribed"
                          checked={ isSubscribed }
                          value={ isSubscribed }
                          onChange={ value => this.setState({ isSubscribed: value }) }
                        />
                        <button block="MyAccountDetails" elem="Submit" type="submit">
                            { __('Save Changes') }
                        </button>
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
                        <legend>{ __('Edit Password') }</legend>
                        <Field
                          type="password"
                          label={ __('Current Password') }
                          id="currentPassword"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label={ __('New Password') }
                          id="newPassword"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label={ __('Confirm New Password') }
                          id="confirmPassword"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <button block="MyAccountDetails" elem="Submit" type="submit">
                            { __('Save New Password') }
                        </button>
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
            is_subscribed,
            id
        } = customer || {};
        const fullName = (firstname && lastname) ? `${firstname} ${lastname}` : <TextPlaceholder length="medium" />;
        const showNewsletter = id
            ? __('Subscribed to newsletter: %s', is_subscribed ? __('Yes') : __('No'))
            : <TextPlaceholder length="medium" />;
        const editButtonMessage = id ? __('Edit') : <TextPlaceholder length="short" />;
        const editPasswordButtonMessage = id ? __('Change Password') : <TextPlaceholder length="short" />;

        return (
            <fieldset block="MyAccountDetails" elem="AccountInfo">
                <legend>{ __('Account Information') }</legend>
                <div block="MyAccountDetails" elem="FieldWrapper">
                    <div block="MyAccountDetails" elem="Field">
                        { fullName }
                    </div>
                    <div block="MyAccountDetails" elem="Field">{ email }</div>
                    <div block="MyAccountDetails" elem="Field">
                        { showNewsletter }
                    </div>
                    <div block="MyAccountDetails" elem="Actions">
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_EDIT_INFORMATION) }
                        >
                            { editButtonMessage }
                        </button>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_EDIT_PASSWORD) }
                        >
                            { editPasswordButtonMessage }
                        </button>
                    </div>
                </div>
            </fieldset>
        );
    }

    renderAddressFields(correctAddress = { region: {} }) {
        const {
            firstname,
            lastname,
            street,
            region: { region },
            city,
            country_id,
            telephone,
            id
        } = correctAddress;
        const location = (city && region && country_id)
            ? `${city}, ${region}, ${country_id}`
            : <TextPlaceholder length="medium" />;
        const buttonMessage = id ? __('Edit Address') : <TextPlaceholder length="short" />;
        const fullName = (firstname && lastname) ? `${firstname} ${lastname}` : <TextPlaceholder length="medium" />;


        return (
            <>
                <div block="MyAccountDetails" elem="Field">
                    { fullName }
                </div>
                <div block="MyAccountDetails" elem="Field">{ street || <TextPlaceholder length="short" /> }</div>
                <div block="MyAccountDetails" elem="Field">
                    { location }
                </div>
                <div block="MyAccountDetails" elem="Field">{ telephone || <TextPlaceholder length="short" /> }</div>
                <div block="MyAccountDetails" elem="Actions">
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, correctAddress) }
                    >
                        { buttonMessage }
                    </button>
                </div>
            </>
        );
    }

    /**
     * Render Customer Address block
     * @param {String} addressType
     */
    renderAddress(addressType) {
        const { customer } = this.props;
        const { addresses } = customer || {};

        if (customer && !Object.keys(customer).length) {
            return this.renderAddressFields();
        }

        if (addresses) {
            const correctAddress = addresses.filter(address => address[`default_${addressType}`])[0];

            if (correctAddress) {
                return this.renderAddressFields(correctAddress);
            }
        }

        return (
            <>
                <div>
                    { `No default ${addressType} address has been set.` }
                </div>
                <div block="MyAccountDetails" elem="Actions">
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ () => this.changeState(STATE_UPDATE_ADDRESS, addressType) }
                    >
                        { __('Add New Address') }
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
                    <span>{ __('Address Book') }</span>
                </legend>
                <div block="MyAccountDetails" elem="FieldWrapper">
                    <div block="MyAccountDetails" elem="AddressWrapper">
                        <div block="MyAccountDetails" elem="FieldWrapper">
                            <h4>{ __('Default Billing Address') }</h4>
                            { this.renderAddress('billing') }
                        </div>
                        <div block="MyAccountDetails" elem="FieldWrapper">
                            <h4>{ __('Default Shipping Address') }</h4>
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
        const { isSignedIn } = this.props;

        if (!isSignedIn) {
            return <Redirect to="/" />;
        }

        return (
            <main block="MyAccountDetails" aria-label={ __('My Account Details') }>
                <div block="MyAccountDetails" elem="Wrapper">
                    <ul block="MyAccountDetails" elem="Sidebar">
                        <li
                          onClick={ () => this.changeState(STATE_ACCOUNT_OVERVIEW) }
                          onKeyPress={ () => this.changeState(STATE_ACCOUNT_OVERVIEW)}
                        >
                            { __('My Account') }
                        </li>
                        <li>
                            { __('My Orders') }
                        </li>
                    </ul>
                    <div block="MyAccountDetails" elem="Content">
                        { renderFunction() }
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
    isSignedIn: PropTypes.bool.isRequired,
    countryList: PropTypes.arrayOf(PropTypes.shape).isRequired,
    customer: customerType.isRequired
};

export default MyAccountDetails;
