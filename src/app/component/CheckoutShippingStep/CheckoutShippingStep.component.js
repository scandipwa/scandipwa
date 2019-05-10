/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */

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
import Form from 'Component/Form';
import Field from 'Component/Field';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';
import Loader from 'Component/Loader';
import { makeCancelable } from 'Util/Promise';
import './CheckoutShippingStep.style';

const EMAIL_FIELD_ID = 'email';
const FIRSTNAME_FIELD_ID = 'firstname';
const LASTNAME_FIELD_ID = 'lastname';
const COMPANY_FIELD_ID = 'company';
const STREET_0_FIELD_ID = 'street_0';
const STREET_1_FIELD_ID = 'street_1';
const CITY_FIELD_ID = 'city';
const REGION_FIELD_ID = 'region';
const REGION_ID_FIELD_ID = 'region_id';
const ZIP_FIELD_ID = 'postcode';
const PHONE_FIELD_ID = 'telephone';
const COUNTRY_FIELD_ID = 'country_id';

const STATE_NEW_ADDRESS = 'newAddress';
const STATE_DEFAULT_ADDRESS = 'defaultAddress';

class CheckoutShippingStep extends Component {
    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        // this.changeState = this.changeState.bind(this);

        this.state = {
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
        };

        this.fieldMap = {
            [EMAIL_FIELD_ID]: {
                label: 'Email Address',
                note: 'You can create an account after checkout.',
                validation: ['notEmpty', 'email']
            },
            [FIRSTNAME_FIELD_ID]: { label: 'First Name' },
            [LASTNAME_FIELD_ID]: { label: 'Last Name' },
            [COMPANY_FIELD_ID]: { label: 'Company', validation: [] },
            [STREET_0_FIELD_ID]: {
                label: 'Street Address',
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
            [CITY_FIELD_ID]: { label: 'City' },
            // [STATE_FIELD_ID]: {
            //     label: 'State',
            //     validation: [],
            //     selectOptions: [],
            //     onChange: (value) => {
            //         const { regionList } = this.state;
            //         if (typeof value === 'number') {
            //             const regionValue = regionList.reduce((regionValue, region) => {
            //                 const { id: regionId } = region;

            //                 if (value === regionId) regionValue.push(region);

            //                 return regionValue;
            //             }, []);
            //             const { code: region_code, name: region, id: region_id } = regionValue[0];
            //             const correctRegion = { region_code, region, region_id };

            //             return this.setState({ region: correctRegion }, this.handleFieldChange);
            //         }

            //         const region = { region_code: value, region: value, region_id: 0 };
            //         return this.setState({ region }, this.handleFieldChange);
            //     }
            // },
            [ZIP_FIELD_ID]: { label: 'Postal Code' },
            // [COUNTRY_FIELD_ID]: {
            //     label: 'Country',
            //     type: 'select',
            //     value: '',
            //     placeholder: 'Select a country',
            //     selectOptions: [],
            //     onChange: (countryId) => {
            //         this.getAvailableRegions(countryId);
            //     }
            // },
            [PHONE_FIELD_ID]: { label: 'Phone Number' }
        };

        this.renderMap = {
            [STATE_NEW_ADDRESS]: () => (this.renderNewAddress()),
            [STATE_DEFAULT_ADDRESS]: () => (this.renderDefaultShippingAddress())
        };
    }

    // static getDerivedStateFromProps(props, state) {
    //     const {
    //         shippingAddress,
    //         isSignedIn,
    //         email
    //     } = props;
    //     const { fieldsArePopulated } = state;

    //     if (isSignedIn && Object.entries(shippingAddress).length && !fieldsArePopulated) {
    //         const {
    //             city,
    //             company,
    //             country_id,
    //             firstname,
    //             lastname,
    //             postcode,
    //             region,
    //             region_id,
    //             region_code,
    //             street,
    //             telephone
    //         } = shippingAddress;

    //         const regionObject = region || { region_code, region: region_code, region_id };

    //         return {
    //             city,
    //             company,
    //             country_id,
    //             email,
    //             firstname,
    //             lastname,
    //             postcode,
    //             region: regionObject,
    //             street,
    //             telephone,
    //             fieldsArePopulated: true,
    //             defaultShippingAddress: true,
    //             state: STATE_DEFAULT_ADDRESS
    //         };
    //     }

    //     if (isSignedIn) return { email };

    //     return null;
    // }

    componentDidUpdate(prevProps) {
        const { finishedLoading, shippingAddress } = this.props;

        if (!prevProps.finishedLoading && finishedLoading && Object.entries(shippingAddress).length) {
            this.handleFieldChange();
        }

        // if (!prevCountryList.length && countryList.length) this.updateCountryField(countryList);
    }

    onSelectShippingMethod(method) {
        this.setState({ activeShippingMethod: method });
    }

    onFormSuccess() {
        const { showNotification, saveAddressInformation, billingAddress } = this.props;
        const { activeShippingMethod: { method_code, carrier_code } } = this.state;
        const trimmedBillingAddress = Object.entries(billingAddress).length ? this.trimAddress(billingAddress) : {};
        const trimmedShippingAddress = this.trimAddress(this.state);

        if (!method_code || !carrier_code) {
            showNotification('error', 'No shipping method specified');
        } else {
            const addressInformation = {
                shipping_address: trimmedShippingAddress,
                billing_address: trimmedBillingAddress,
                shipping_carrier_code: carrier_code,
                shipping_method_code: method_code
            };

            this.setState({ loadingShippingInformationSave: true });
            saveAddressInformation(addressInformation);
        }
    }

    // updateCountryField(countryList) {
    //     this.fieldMap[COUNTRY_FIELD_ID].selectOptions = countryList.map(({ id, label }) => ({ id, label, name: id }));
    // }

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

    // changeState(state) {
    //     const { country_id } = this.state;
    //     this.setState({ state });
    // }

    handleFieldChange() {
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
                err => console.log(err)
            );
        }, 1000);
    }

    renderField(id, overrideStateValue) {
        const { [id]: stateValue } = this.state;
        // const { countryList: notFormatedList } = this.props;
        const {
            type = 'text',
            label,
            note,
            name,
            validation = ['notEmpty'],
            placeholder,
            selectOptions,
            onChange = value => this.setState({ [id]: value }, this.handleFieldChange)
        } = this.fieldMap[id];

        // const countryList = notFormatedList.map(({ id, label }) => ({ id, label, value: id }))

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
            />
        );
    }

    renderCountrySelect() {
        const { countryList } = this.props;
        const { country_id } = this.state;

        return (
            <Field
              id={ COUNTRY_FIELD_ID }
              name={ COUNTRY_FIELD_ID }
              type="select"
              label="Country"
              selectOptions={ countryList.map(({ id, label }, index) => ({ id, label, value: index })) }
              validation={ ['notEmpty'] }
              value={ country_id }
              onChange={ index => this.setState({
                  country_id: countryList[index].value,
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
                  id={ REGION_ID_FIELD_ID }
                  name={ REGION_ID_FIELD_ID }
                  type="select"
                  label="State"
                  selectOptions={ regions.map(({ id, name }) => ({ id, label: name, value: id })) }
                  validation={ ['notEmpty'] }
                  value={ region_id }
                  onChange={ region_id => this.setState({ region_id: parseInt(region_id, 10), region: null }, this.handleFieldChange) }
                />
            );
        }

        return (
            <Field
              id={ REGION_FIELD_ID }
              name={ REGION_FIELD_ID }
              type="text"
              label="Region"
              onChange={ region => this.setState({ region, region_id: null }, this.handleFieldChange) }
              value={ region }
            />
        );
    }

    // renderRegionField(id, overrideStateValue) {
    //     const { [id]: stateValue, regionList: notFormatedList = [] } = this.state;
    //     const {
    //         type = 'text',
    //         label,
    //         note,
    //         defaultValue,
    //         name,
    //         validation = ['notEmpty'],
    //         onChange = value => this.setState({ [id]: value }, this.handleFieldChange)
    //     } = this.fieldMap[id];

    //     const fieldValue = overrideStateValue || stateValue || defaultValue;
    //     const regionList = notFormatedList.map(region => ({ ...region, label: region.name }));

    //     return (
    //         <Field
    //           id={ id }
    //           name={ name || id }
    //           type={ (regionList && regionList.length) ? 'select' : type }
    //           label={ label }
    //           note={ note }
    //           selectOptions={ regionList }
    //           value={ typeof fieldValue === 'object' ? fieldValue.region_id : fieldValue }
    //           validation={ validation }
    //           onChange={ onChange }
    //         />
    //     );
    // }

    renderNewAddress() {
        const { street, defaultShippingAddress } = this.state;
        const { isSignedIn } = this.props;

        return (
            <>
                {defaultShippingAddress
                    && (
                    <div block="CheckoutShippingStep" elem="ButtonWrapper">
                        <button
                        //   onClick={ () => this.changeState(STATE_DEFAULT_ADDRESS) }
                          block="CheckoutShippingStep"
                          elem="ButtonDefault"
                        >
                            {"I'd like to use the default shipping address"}
                        </button>
                    </div>)
                }
                { !isSignedIn && (
                    <fieldset>
                        <legend>Email Address</legend>
                        { this.renderField(EMAIL_FIELD_ID) }
                    </fieldset>)
                }
                <fieldset>
                    <legend>Shipping Address</legend>
                    { this.renderField(FIRSTNAME_FIELD_ID) }
                    { this.renderField(LASTNAME_FIELD_ID) }
                    { this.renderField(COMPANY_FIELD_ID) }
                    { this.renderField(STREET_0_FIELD_ID, street[0]) }
                    { this.renderField(STREET_1_FIELD_ID, street[1]) }
                    { this.renderField(CITY_FIELD_ID) }
                    {/* { this.renderRegionField(STATE_FIELD_ID) } */}
                    { this.renderRegionField() }
                    { this.renderField(ZIP_FIELD_ID) }
                    {/* { this.renderField(COUNTRY_FIELD_ID) } */}
                    { this.renderCountrySelect() }
                    { this.renderField(PHONE_FIELD_ID) }
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
            postalcode
        } = this.state;

        const { region: regionName } = region;

        return (
            <>
                <address
                  block="CheckoutShippingStep"
                  elem="ShippingAddressPreview"
                >
                    <dl>
                        <dt>Contact details:</dt>
                        <dd>{ `${ firstname } ${ lastname }` }</dd>
                        { company && (<>
                            <dt>Company name</dt>
                            <dd>{ company }</dd>
                        </>)}
                        <dt>Shipping address:</dt>
                        <dd>{ `${country_id }, ${regionName}, ${city}` }</dd>
                        <dd>{ street[0] }</dd>
                        <dd>{ street[1] }</dd>
                        <dd>{ postalcode }</dd>
                        <dd>{ telephone }</dd>
                    </dl>
                </address>
                <button
                  block="CheckoutShippingStep"
                  elem="ButtonNew"
                //   onClick={ () => this.changeState(STATE_NEW_ADDRESS) }
                >
                    {"I'd like to use a different address"}
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
            state
        } = this.state;
        const renderFunction = this.renderMap[state];
        const { method_code } = activeShippingMethod;

        return (
            <Form
              onSubmitSuccess={ validFields => this.onFormSuccess(validFields) }
              key="shipping_step"
            >
                <Loader isLoading={ isSignedIn && !finishedLoading } />

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
                    Next step
                </button>
            </Form>
        );
    }
}

CheckoutShippingStep.propTypes = {
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
};

export default CheckoutShippingStep;
