/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutPaymentMethods from 'Component/CheckoutPaymentMethods';
import Field from 'Component/Field';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import './CheckoutPreviewAndPaymentsStep.style';

export const FIRSTNAME_FIELD_ID = 'firstname';
export const LASTNAME_FIELD_ID = 'lastname';
export const COMPANY_FIELD_ID = 'company';
export const STREET_0_FIELD_ID = 'street_0';
export const STREET_1_FIELD_ID = 'street_1';
export const CITY_FIELD_ID = 'city';
export const STATE_FIELD_ID = 'region';
export const ZIP_FIELD_ID = 'postcode';
export const PHONE_FIELD_ID = 'telephone';
export const COUNTRY_FIELD_ID = 'country_id';
export const DEFAULT_COUNTRY = 'US';
export const DEFAULT_REGION = { region_code: 'AL', region: 'Alabama', region_id: 1 };

export const STATE_NEW_ADDRESS = 'newAddress';
export const STATE_DEFAULT_ADDRESS = 'defaultAddress';
export const STATE_SAME_ADDRESS = 'sameAddress';

class CheckoutPreviewAndPaymentsStep extends Component {
    constructor(props) {
        super(props);

        const {
            shippingAddress,
            billingAddress,
            paymentMethods
        } = props;

        const { street } = billingAddress;

        this.state = {
            email: '',
            shippingAddress,
            billingAddress,
            street: { ...street },
            billingIsSame: false,
            paymentMethods,
            activePaymentMethod: {},
            loadingPaymentInformationSave: false,
            defaultBillingAddress: false,
            state: STATE_NEW_ADDRESS,
            regionList: []
        };

        this.fieldMap = {
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
            [STATE_FIELD_ID]: {
                label: __('State'),
                validation: [],
                defaultValue: DEFAULT_REGION,
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
                defaultValue: DEFAULT_COUNTRY,
                onChange: (countryId) => {
                    this.getAvailableRegions(countryId);
                }
            },
            [PHONE_FIELD_ID]: {
                label: __('Phone Number'),
                validation: ['telephone']
            }
        };

        this.renderMap = {
            [STATE_NEW_ADDRESS]: () => (this.renderNewAddress()),
            [STATE_DEFAULT_ADDRESS]: () => (this.renderAddressPreview(STATE_DEFAULT_ADDRESS)),
            [STATE_SAME_ADDRESS]: () => (this.renderAddressPreview(STATE_SAME_ADDRESS))
        };
    }

    static getDerivedStateFromProps(state, props) {
        const { billingAddress, email, isSignedIn } = state;
        const { defaultBillingAddress } = props;

        if (Object.entries(billingAddress).length && !defaultBillingAddress) {
            return { billingAddress, defaultBillingAddress: true, state: STATE_DEFAULT_ADDRESS };
        }

        if (isSignedIn) return { email };

        return null;
    }

    componentDidMount() {
        const { countryList } = this.props;

        if (countryList.length) {
            this.getAvailableRegions(DEFAULT_COUNTRY);
        }
    }

    componentDidUpdate(prevProps) {
        const { defaultBillingAddress } = this.state;
        const { countryList } = this.props;

        if (!prevProps.countryList.length && countryList.length) this.getAvailableRegions(DEFAULT_COUNTRY);

        if (defaultBillingAddress) return this.handleFieldChange;

        return null;
    }

    onFormSuccess() {
        const { savePaymentInformationAndPlaceOrder } = this.props;
        const correctAddress = this.getAddressFromState();

        const { activePaymentMethod: { code: method } } = this.state;

        const paymentInformation = {
            paymentMethod: { method },
            billing_address: correctAddress
        };

        this.setState({ loadingPaymentInformationSave: true, finishedLoading: false });

        savePaymentInformationAndPlaceOrder(paymentInformation);
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

        if (regionList.length) {
            const { region_id } = region || DEFAULT_REGION;
            const correctRegion = regionList.reduce((correctRegion, listRegion) => {
                const { id: listId } = listRegion;
                if (region_id === listId) correctRegion.push(listRegion);
                return correctRegion;
            }, []);

            const { code: region_code, name: regionName, id: regionId } = correctRegion[0] || regionList[0];

            return this.setState({
                country_id,
                regionList,
                region: { region_code, region: regionName, region_id: regionId }
            });
        }

        const { region: regionName } = region || DEFAULT_REGION;

        return this.setState({
            country_id,
            regionList,
            region: regionName
        });
    }

    getAddressFromState() {
        const { state, billingAddress, shippingAddress } = this.state;

        switch (state) {
        case STATE_DEFAULT_ADDRESS:
            return this.trimAddress(billingAddress);
        case STATE_SAME_ADDRESS:
            return this.trimAddress(shippingAddress);
        default:
            return this.trimAddress(this.state);
        }
    }

    getButtonParams() {
        const { state, defaultBillingAddress } = this.state;
        const { isSignedIn } = this.props;

        if (defaultBillingAddress) {
            if (state === 'newAddress') {
                return { message: (__("I'd like to use the default address")), type: STATE_DEFAULT_ADDRESS };
            }

            if (isSignedIn) {
                return { message: (__("I'd like to use a different address")), type: STATE_NEW_ADDRESS };
            }
        }

        return null;
    }

    trimAddress(address) {
        const { email: stateEmail, shippingAddress: { email: shippingEmail } } = this.state;
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
        } = address;

        const { region_id, region_code } = region || address;
        const email = stateEmail || shippingEmail;

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

    handleSelectPaymentMethod(method) {
        this.setState({ activePaymentMethod: method });
    }

    changeState(state, billingValue) {
        const { shippingAddress, defaultBillingAddress, country_id } = this.state;
        const { billingAddress } = this.props;

        this.getAvailableRegions(country_id || DEFAULT_COUNTRY);

        if (state === STATE_SAME_ADDRESS) {
            return this.setState({ state, billingAddress: shippingAddress, billingIsSame: billingValue });
        }

        if (state === STATE_DEFAULT_ADDRESS && !defaultBillingAddress) {
            return this.setState({ state: STATE_NEW_ADDRESS, billingAddress: {}, billingIsSame: billingValue });
        }

        if (state === STATE_DEFAULT_ADDRESS && defaultBillingAddress) {
            return this.setState({ state, billingAddress, billingIsSame: billingValue });
        }

        return this.setState({ state, billingIsSame: billingValue });
    }

    renderField(id, overrideStateValue) {
        const { [id]: stateValue } = this.state;
        const { countryList } = this.props;
        const {
            type = 'text',
            label,
            note,
            defaultValue,
            checked,
            name,
            validation = ['notEmpty'],
            onChange = value => this.setState({ [id]: value }, this.handleFieldChange)
        } = this.fieldMap[id];

        return (
            <Field
              id={ id }
              type={ type }
              label={ label }
              note={ note }
              name={ name }
              checked={ checked }
              options={ countryList }
              value={ overrideStateValue || stateValue || defaultValue }
              validation={ validation }
              onChange={ onChange }
            />
        );
    }

    renderRegionField(id, overrideStateValue) {
        const { [id]: stateValue, regionList } = this.state;
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
              type={ (regionList && regionList.length) ? 'select' : type }
              label={ label }
              note={ note }
              options={ regionList }
              value={ typeof fieldValue === 'object' ? fieldValue.region_id : fieldValue }
              validation={ validation }
              onChange={ onChange }
            />
        );
    }

    renderAddressPreview(addressType) {
        const { shippingAddress, billingAddress } = this.state;
        const correctAddress = (addressType === 'sameAddress') ? shippingAddress : billingAddress;
        const {
            firstname,
            lastname,
            company,
            street,
            city,
            region_code,
            postalcode,
            country_id,
            telephone
        } = correctAddress;

        return (
            <>
                <address
                  block="CheckoutPreviewAndPaymentsStep"
                  elem="ShippingAddressPreview"
                >
                    <dl>
                        <dt>{ __('Contact details:') }</dt>
                        <dd>{ `${ firstname } ${ lastname }` }</dd>
                        { company && (<>
                            <dt>{ __('Company name:') }</dt>
                            <dd>{ company }</dd>
                        </>)}
                        <dd>{ telephone }</dd>
                        <dt>{ __('Billing address:') }</dt>
                        <dd>{ `${country_id}, ${region_code}, ${city}` }</dd>
                        <dd>{ street[0] }</dd>
                        <dd>{ street[1] }</dd>
                        <dd>{ postalcode }</dd>
                    </dl>
                </address>
            </>
        );
    }

    renderNewAddress() {
        const { street } = this.state;
        return (
            <>
                { this.renderField(FIRSTNAME_FIELD_ID) }
                { this.renderField(LASTNAME_FIELD_ID) }
                { this.renderField(COMPANY_FIELD_ID) }
                { this.renderField(STREET_0_FIELD_ID, street[0]) }
                { this.renderField(STREET_1_FIELD_ID, street[1]) }
                { this.renderField(CITY_FIELD_ID) }
                { this.renderRegionField(STATE_FIELD_ID) }
                { this.renderField(ZIP_FIELD_ID) }
                { this.renderField(COUNTRY_FIELD_ID) }
                { this.renderField(PHONE_FIELD_ID) }
            </>
        );
    }

    renderStateButton() {
        const buttonsParams = this.getButtonParams();

        return (
            buttonsParams && (
            <button
              type="button"
              onClick={ () => this.changeState(buttonsParams.type, false) }
            >
                {buttonsParams.message}
            </button>)
        );
    }

    render() {
        const { finishedLoading } = this.props;
        const {
            paymentMethods,
            billingIsSame,
            activePaymentMethod,
            shippingAddress,
            state,
            loadingPaymentInformationSave
        } = this.state;
        const renderFunction = this.renderMap[state];
        const { code } = activePaymentMethod;

        return (
            <Form
              onSubmitSuccess={ validFields => this.onFormSuccess(validFields) }
              key="review_and_payment_step"
            >
                <Loader isLoading={ !finishedLoading || loadingPaymentInformationSave } />

                <CheckoutPaymentMethods
                  paymentMethods={ paymentMethods }
                  onSelectPaymentMethod={ method => this.handleSelectPaymentMethod(method) }
                />

                <fieldset>
                    <legend>{ __('Billing address') }</legend>

                    { this.renderStateButton() }

                    { shippingAddress && !!Object.entries(shippingAddress).length && (
                        <Field
                          id="sameAsShippingAddress"
                          type="checkbox"
                          label={ __('My billing and shipping address are the same') }
                          value={ billingIsSame }
                          checked={ billingIsSame }
                          onChange={ (value) => {
                              this.changeState(value ? STATE_SAME_ADDRESS : STATE_DEFAULT_ADDRESS, value);
                          } }
                        />)
                     }

                    { renderFunction() }

                </fieldset>

                <button type="submit" disabled={ !code }>{ __('Place Order') }</button>
            </Form>
        );
    }
}

CheckoutPreviewAndPaymentsStep.propTypes = {
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
    savePaymentInformationAndPlaceOrder: PropTypes.func.isRequired,
    paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
    finishedLoading: PropTypes.bool.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    countryList: PropTypes.arrayOf(PropTypes.shape).isRequired
};

export default CheckoutPreviewAndPaymentsStep;
