/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */

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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Form from 'Component/Form';
import Field from 'Component/Field';
import validationConfig from 'Component/Form/Form.config';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';
import Loader from 'Component/Loader';
import { makeCancelable } from 'Util/Promise';
import { fetchMutation } from 'Util/Request';
import { CheckEmailQuery } from 'Query';
import './CheckoutShippingStep.style';

export const EMAIL_FIELD_ID = 'email';
export const FIRSTNAME_FIELD_ID = 'firstname';
export const LASTNAME_FIELD_ID = 'lastname';
export const COMPANY_FIELD_ID = 'company';
export const STREET_0_FIELD_ID = 'street_0';
export const STREET_1_FIELD_ID = 'street_1';
export const CITY_FIELD_ID = 'city';
export const REGION_FIELD_ID = 'region';
export const ZIP_FIELD_ID = 'postcode';
export const PHONE_FIELD_ID = 'telephone';
export const COUNTRY_FIELD_ID = 'country_id';
export const DEFAULT_COUNTRY = 'US';
export const DEFAULT_REGION = { region_code: 'AL', region: 'Alabama', region_id: 1 };

export const STATE_NEW_ADDRESS = 'newAddress';
export const STATE_DEFAULT_ADDRESS = 'defaultAddress';

class CheckoutShippingStep extends PureComponent {
    static propTypes = {
        estimateShippingCost: PropTypes.func.isRequired,
        saveAddressInformation: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        finishedLoading: PropTypes.bool.isRequired,
        billingAddress: PropTypes.shape({
            city: PropTypes.string,
            company: PropTypes.string,
            country_id: PropTypes.string,
            email: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            postcode: PropTypes.string,
            region_id: PropTypes.number,
            region: PropTypes.string,
            street: PropTypes.array,
            telephone: PropTypes.string
        }).isRequired,
        shippingAddress: PropTypes.shape({
            city: PropTypes.string,
            company: PropTypes.string,
            country_id: PropTypes.string,
            email: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            postcode: PropTypes.string,
            region_id: PropTypes.number,
            region: PropTypes.string,
            street: PropTypes.array,
            telephone: PropTypes.string
        }).isRequired,
        countryList: PropTypes.arrayOf(PropTypes.shape).isRequired
    }

    state = {
        email: '',
        firstname: '',
        lastname: '',
        company: '',
        street: [],
        city: '',
        region: null,
        region_id: null,
        postcode: '',
        country_id: 0,
        telephone: '',

        selectedCountryIndex: null,
        shippingMethods: [],
        activeShippingMethod: {},
        loadingShippingMethods: false,
        loadingShippingInformationSave: false,
        fieldsArePopulated: false,
        defaultShippingAddress: false,
        state: STATE_NEW_ADDRESS
    }

    handleFieldChange = this.handleFieldChange.bind(this);
    emailNote = __('You can create an account after checkout.');
    emailLoginNote = __('Looks like you already have account with us, please, log in!');

    renderMap = {
        [STATE_NEW_ADDRESS]: () => (this.renderNewAddress()),
        [STATE_DEFAULT_ADDRESS]: () => (this.renderDefaultShippingAddress())
    }

    constructor(props) {
        super(props);

        const { showNotification } = props;

        this.fieldMap = {
            [EMAIL_FIELD_ID]: {
                label: __('Email Address'),
                note: this.emailNote,
                message: '',
                validation: ['notEmpty', 'email'],
                onBlur: (event) => {
                    const email = event.currentTarget.value;

                    if (validationConfig.email.validate({ value: email })) {
                        fetchMutation(
                            CheckEmailQuery.getCheckIsEmailAvailableMutation(email)
                        ).then(
                            ({ checkIsEmailAvailable: { isAvailable } }) => {
                                const { email } = this.state;

                                this.fieldMap[EMAIL_FIELD_ID].note = isAvailable
                                    ? this.emailNote : this.emailLoginNote;
                                this.fieldMap[EMAIL_FIELD_ID].noteDisplayMode = isAvailable
                                    ? null : 'visibleAlways';

                                // Will force re-render
                                this.setState({ email });
                            },
                            err => showNotification('error', err[0].debugMessage)
                        );
                    }
                }
            },
            [FIRSTNAME_FIELD_ID]: { label: __('First Name') },
            [LASTNAME_FIELD_ID]: { label: __('Last Name') },
            [COMPANY_FIELD_ID]: { label: __('Company'), validation: [] },
            [STREET_0_FIELD_ID]: {
                label: __('Street Address'),
                onChange: (street) => {
                    const { street: stateStreet } = this.state;
                    this.setState({ street: { ...stateStreet, 0: street } }, this.handleFieldChange);
                }
            },
            [STREET_1_FIELD_ID]: {
                onChange: (street) => {
                    const { street: stateStreet } = this.state;
                    this.setState({ street: { ...stateStreet, 1: street } }, this.handleFieldChange);
                },
                validation: []
            },
            [CITY_FIELD_ID]: { label: __('City') },
            [REGION_FIELD_ID]: {
                label: __('State'),
                validation: [],
                onChange: (value) => {
                    const { regionList } = this.state;
                    if (typeof value === 'number') {
                        const regionValue = regionList.reduce((regionValue, region) => {
                            const { id: regionId } = region;

                            if (value === regionId) regionValue.push(region);

                            return regionValue;
                        }, []);
                        const { code: region_code, name: region, id: region_id } = regionValue[0];
                        const correctRegion = { region_code, region, region_id };

                        return this.setState({ region: correctRegion }, this.handleFieldChange);
                    }

                    const region = { region_code: value, region: value, region_id: 0 };
                    return this.setState({ region }, this.handleFieldChange);
                }
            },
            [ZIP_FIELD_ID]: { label: __('Postal Code') },
            [COUNTRY_FIELD_ID]: {
                label: __('Country'),
                type: 'select',
                defaultValue: DEFAULT_COUNTRY
            },
            [PHONE_FIELD_ID]: {
                label: 'Phone Number',
                validation: ['telephone']
            }
        };
    }

    componentDidUpdate(prevProps) {
        const { finishedLoading, shippingAddress } = this.props;

        if (!prevProps.finishedLoading && finishedLoading && Object.entries(shippingAddress).length) {
            this.handleFieldChange();
        }
    }

    onSelectShippingMethod(method) {
        this.setState({ activeShippingMethod: method });
    }

    onFormSuccess() {
        const { showNotification, saveAddressInformation, billingAddress } = this.props;
        const { activeShippingMethod } = this.state;
        const { method_code, carrier_code } = activeShippingMethod;
        const trimmedBillingAddress = Object.entries(billingAddress).length ? this.trimAddress(billingAddress) : {};
        const trimmedShippingAddress = this.trimAddress(this.state);

        if (!method_code || !carrier_code) {
            showNotification('error', __('No shipping method specified'));
        } else {
            const addressInformation = {
                addressInformation: {
                    shipping_address: trimmedShippingAddress,
                    billing_address: trimmedBillingAddress,
                    shipping_carrier_code: carrier_code,
                    shipping_method_code: method_code
                },
                shippingMethod: activeShippingMethod
            };

            this.setState({
                loadingShippingInformationSave: true
            });

            saveAddressInformation(addressInformation);
        }
    }

    trimAddress(address) {
        const {
            city,
            company,
            country_id,
            email,
            firstname,
            lastname,
            postcode,
            region,
            region_id,
            street,
            telephone
        } = address;

        return {
            city,
            company,
            country_id,
            email,
            firstname,
            lastname,
            postcode,
            region,
            region_id,
            street: Object.values(street),
            telephone
        };
    }

    handleFieldChange() {
        const { showNotification } = this.props;

        this.setState({ loadingShippingMethods: true });

        if (this.shippingMethodEstimationTimeout) {
            clearTimeout(this.shippingMethodEstimationTimeout);
            if (this.estimatePromise) this.estimatePromise.cancel();
        }

        this.shippingMethodEstimationTimeout = setTimeout(() => {
            const { estimateShippingCost } = this.props;

            const {
                street,
                city,
                region,
                region_id,
                postcode,
                country_id
            } = this.state;

            const addressToEstimate = {
                city,
                postcode,
                country_id,
                street: Object.values(street)
            };

            if (region) addressToEstimate.region = region;
            if (region_id) addressToEstimate.region_id = region_id;

            this.estimatePromise = makeCancelable(estimateShippingCost(addressToEstimate));
            this.estimatePromise.promise.then(
                ({ estimateShippingCosts: shippingMethods }) => this.setState({
                    shippingMethods,
                    loadingShippingMethods: false
                }),
                err => showNotification('error', err[0].debugMessage)
            );
        }, 1000);
    }

    renderField(id, overrideStateValue) {
        const { [id]: stateValue } = this.state;

        const {
            type = 'text',
            label,
            note,
            name,
            placeholder,
            autocomplete,
            selectOptions,
            onChange = value => this.setState({ [id]: value }, this.handleFieldChange),
            validation = ['notEmpty'],
            onBlur
        } = this.fieldMap[id];

        return (
            <Field
              id={ id }
              name={ name || id }
              type={ type }
              label={ label }
              note={ note }
              selectOptions={ selectOptions }
              value={ overrideStateValue || stateValue }
              validation={ validation }
              placeholder={ placeholder }
              onChange={ onChange }
              autocomplete={ autocomplete }
              onBlur={ onBlur }
            />
        );
    }

    renderCountrySelect() {
        const { countryList } = this.props;
        const { selectedCountryIndex } = this.state;

        return (
            <Field
              id={ COUNTRY_FIELD_ID }
              name={ COUNTRY_FIELD_ID }
              type="select"
              placeholder="Country"
              selectOptions={ countryList.map(({ id, label }, index) => ({ id, label, value: index })) }
              validation={ ['notEmpty'] }
              value={ selectedCountryIndex }
              onChange={ index => this.setState({
                  country_id: countryList[index].id,
                  selectedCountryIndex: index
              }, this.handleFieldChange) }
            />
        );
    }

    renderRegionField() {
        const { selectedCountryIndex, region, region_id } = this.state;
        const { countryList } = this.props;
        const regions = selectedCountryIndex ? countryList[selectedCountryIndex].available_regions : null;

        if (regions) {
            return (
                <Field
                  id={ REGION_FIELD_ID }
                  name={ REGION_FIELD_ID }
                  type="select"
                  placeholder="State"
                  selectOptions={ regions.map(({ id, name }) => ({ id, label: name, value: id })) }
                  validation={ ['notEmpty'] }
                  value={ region_id }
                  onChange={ region_id => this.setState({
                      region_id: parseInt(region_id, 10),
                      region: null
                  }, this.handleFieldChange) }
                />
            );
        }

        return (
            <Field
              id={ REGION_FIELD_ID }
              name={ REGION_FIELD_ID }
              type="text"
              placeholder="Region"
              onChange={ region => this.setState({
                  region,
                  region_id: null
              }, this.handleFieldChange) }
              value={ region }
            />
        );
    }

    renderNewAddress() {
        const { street, defaultShippingAddress } = this.state;
        const { isSignedIn } = this.props;

        return (
            <>
                { defaultShippingAddress
                    && (
                        <div block="CheckoutShippingStep" elem="ButtonWrapper">
                            <button
                              block="CheckoutShippingStep"
                              elem="ButtonDefault"
                            >
                                { __("I'd like to use the default shipping address") }
                            </button>
                        </div>
                    ) }
                { !isSignedIn
                    && (
                        <fieldset>
                            <legend
                              block="CheckoutPage"
                              elem="Heading"
                              mods={ { hasDivider: true } }
                            >
                                { __('1. Shipping') }
                            </legend>
                            { this.renderField(EMAIL_FIELD_ID) }
                            { this.renderField(PHONE_FIELD_ID) }
                        </fieldset>
                    ) }
                <fieldset>
                    <legend block="CheckoutPage" elem="Heading">
                        { __('Shipping Address') }
                    </legend>
                    { this.renderField(FIRSTNAME_FIELD_ID) }
                    { this.renderField(LASTNAME_FIELD_ID) }
                    { this.renderField(COMPANY_FIELD_ID) }
                    { this.renderField(STREET_0_FIELD_ID, street[0]) }
                    { this.renderField(CITY_FIELD_ID) }
                    { this.renderRegionField() }
                    { this.renderField(ZIP_FIELD_ID) }
                    { this.renderCountrySelect() }
                </fieldset>
            </>
        );
    }

    renderDefaultShippingAddress() {
        const {
            firstname,
            lastname,
            company,
            telephone,
            country_id,
            region,
            city,
            street,
            postcode
        } = this.state;

        const { region: regionName } = region;

        return (
            <>
                <address
                  block="CheckoutShippingStep"
                  elem="ShippingAddressPreview"
                >
                    <dl>
                        <dt>{ __('Contact details:') }</dt>
                        <dd>{ `${ firstname } ${ lastname }` }</dd>
                        { company
                            && (
                                <>
                                    <dt>{ __('Company name') }</dt>
                                    <dd>{ company }</dd>
                                </>
                            ) }
                        <dt>{ __('Shipping address:') }</dt>
                        <dd>{ `${country_id }, ${regionName}, ${city}` }</dd>
                        <dd>{ street[0] }</dd>
                        <dd>{ street[1] }</dd>
                        <dd>{ postcode }</dd>
                        <dd>{ telephone }</dd>
                    </dl>
                </address>
                <button
                  block="CheckoutShippingStep"
                  elem="ButtonNew"
                >
                    { __("I'd like to use a different address") }
                </button>
            </>
        );
    }

    render() {
        const { isSignedIn, finishedLoading } = this.props;
        const {
            shippingMethods,
            loadingShippingMethods,
            activeShippingMethod,
            loadingShippingInformationSave,
            state
        } = this.state;
        const renderFunction = this.renderMap[state];
        const { method_code } = activeShippingMethod;

        return (
            <Form
              mix={ { block: 'CheckoutShippingStep' } }
              onSubmitSuccess={ validFields => this.onFormSuccess(validFields) }
              key="shipping_step"
            >
                <Loader isLoading={ (isSignedIn && !finishedLoading) || loadingShippingInformationSave } />

                { renderFunction() }

                <CheckoutShippingMethods
                  shippingMethods={ shippingMethods }
                  loadingShippingMethods={ loadingShippingMethods }
                  onSelectShippingMethod={ method => this.onSelectShippingMethod(method) }
                />

                <button
                  block="Button"
                  type="submit"
                  disabled={ !method_code }
                >
                    Choose payment type
                </button>
            </Form>
        );
    }
}

export default CheckoutShippingStep;
