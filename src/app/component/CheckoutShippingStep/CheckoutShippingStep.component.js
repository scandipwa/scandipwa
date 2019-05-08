/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */

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
const STATE_FIELD_ID = 'region';
const ZIP_FIELD_ID = 'postcode';
const PHONE_FIELD_ID = 'telephone';
const COUNTRY_FIELD_ID = 'country_id';
const DEFAULT_COUNTRY = 'US';
const DEFAULT_REGION = { region_code: 'AL', region: 'Alabama', region_id: 1 };

const STATE_NEW_ADDRESS = 'newAddress';
const STATE_DEFAULT_ADDRESS = 'defaultAddress';

class CheckoutShippingStep extends Component {
    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.changeState = this.changeState.bind(this);

        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            company: '',
            street: [],
            city: '',
            region: DEFAULT_REGION,
            postcode: '',
            country_id: DEFAULT_COUNTRY,
            telephone: '',
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
            [STATE_FIELD_ID]: {
                label: 'State',
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
            [ZIP_FIELD_ID]: { label: 'Postal Code' },
            [COUNTRY_FIELD_ID]: {
                label: 'Country',
                type: 'select',
                defaultValue: DEFAULT_COUNTRY,
                onChange: (countryId) => {
                    this.getAvailableRegions(countryId);
                }
            },
            [PHONE_FIELD_ID]: { label: 'Phone Number' }
        };

        this.renderMap = {
            [STATE_NEW_ADDRESS]: () => (this.renderNewAddress()),
            [STATE_DEFAULT_ADDRESS]: () => (this.renderDefaultShippingAddress())
        };
    }

    static getDerivedStateFromProps(props, state) {
        const {
            shippingAddress,
            isSignedIn,
            email
        } = props;
        const { fieldsArePopulated } = state;

        if (isSignedIn && Object.entries(shippingAddress).length && !fieldsArePopulated) {
            const {
                city,
                company,
                country_id,
                firstname,
                lastname,
                postcode,
                region,
                region_id,
                region_code,
                street,
                telephone
            } = shippingAddress;

            const regionObject = region || { region_code, region: region_code, region_id };

            return {
                city,
                company,
                country_id,
                email,
                firstname,
                lastname,
                postcode,
                region: regionObject,
                street,
                telephone,
                fieldsArePopulated: true,
                defaultShippingAddress: true,
                state: STATE_DEFAULT_ADDRESS
            };
        }

        if (isSignedIn) return { email };

        return null;
    }

    componentDidUpdate(prevProps) {
        const { finishedLoading, shippingAddress, countryList } = this.props;
        const { country_id } = this.state;

        if (!prevProps.finishedLoading && finishedLoading && Object.entries(shippingAddress).length) {
            this.handleFieldChange();
        }

        if (!prevProps.countryList.length && countryList.length) this.getAvailableRegions(country_id);
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

    getAvailableRegions(country_id) {
        const { countryList } = this.props;
        const { region } = this.state;
        const regionList = countryList.reduce((regionList, countryRegions) => {
            const { available_regions, id } = countryRegions;

            if (available_regions && country_id === id) {
                regionList.push(...available_regions);
            }

            return regionList;
        }, []);

        const {
            code,
            name,
            region_code,
            region: regionName,
            id
        } = region;
        // } = regionList[0] || region;

        // TODO inccorect data passed on different user journeys
        return this.setState(
            {
                regionList,
                region: { region_code: code || region_code, region: name || regionName, region_id: id }
                // region: regionList[0]
                //     || { region_code: code || region_code, region: name || regionName, region_id: 0 }
            }
        );
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
            street,
            telephone
        } = address;
        const { region_id, region_code } = region || address;

        return {
            city,
            company,
            country_id,
            email,
            firstname,
            lastname,
            postcode,
            region_id,
            region_code,
            street: Object.values(street),
            telephone
        };
    }

    changeState(state) {
        this.setState({ state });
        this.getAvailableRegions();
    }

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
                region: { region_id },
                postcode,
                country_id
            } = this.state;

            const addressToEstimate = {
                city,
                region_id: parseInt(region_id, 10),
                postcode,
                country_id,
                street: Object.values(street)
            };

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
        const { [id]: stateValue, regionList } = this.state;
        const { countryList } = this.props;
        const {
            type = 'text',
            label,
            note,
            defaultValue,
            validation = ['notEmpty'],
            onChange = value => this.setState({ [id]: value }, this.handleFieldChange)
        } = this.fieldMap[id];
        const fieldValue = overrideStateValue || stateValue || defaultValue;

        return (
            <Field
              id={ id }
              type={ (id === 'region' && regionList && regionList.length) ? 'select' : type }
              label={ label }
              note={ note }
              options={ id === 'country_id' ? countryList : regionList }
              value={ typeof fieldValue === 'object' ? fieldValue.region : fieldValue }
              validation={ validation }
              onChange={ onChange }
            />
        );
    }

    renderNewAddress() {
        const { street, defaultShippingAddress } = this.state;
        const { isSignedIn } = this.props;

        return (
            <>
                {defaultShippingAddress
                    && (
                    <div block="CheckoutShippingStep" elem="ButtonWrapper">
                        <button
                          onClick={ () => this.changeState(STATE_DEFAULT_ADDRESS) }
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
                    { this.renderField(STATE_FIELD_ID) }
                    { this.renderField(ZIP_FIELD_ID) }
                    { this.renderField(COUNTRY_FIELD_ID) }
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
                  onClick={ () => this.changeState(STATE_NEW_ADDRESS) }
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

                <button type="submit" disabled={ !method_code }>Next step</button>
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
        street: PropTypes.array,
        telephone: PropTypes.string
    }).isRequired,
    countryList: PropTypes.arrayOf(PropTypes.shape).isRequired
};

export default CheckoutShippingStep;
