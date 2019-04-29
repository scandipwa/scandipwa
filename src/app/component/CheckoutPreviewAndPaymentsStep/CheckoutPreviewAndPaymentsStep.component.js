/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutPaymentMethods from 'Component/CheckoutPaymentMethods';
import Field from 'Component/Field';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import './CheckoutPreviewAndPaymentsStep.style';

const EMAIL_FIELD_ID = 'email';
const FIRSTNAME_FIELD_ID = 'firstname';
const LASTNAME_FIELD_ID = 'lastname';
const COMPANY_FIELD_ID = 'company';
const STREET_0_FIELD_ID = 'street_0';
const STREET_1_FIELD_ID = 'street_1';
const CITY_FIELD_ID = 'city';
const STATE_FIELD_ID = 'region_code';
const ZIP_FIELD_ID = 'postcode';
const PHONE_FIELD_ID = 'telephone';
const COUNTRY_FIELD_ID = 'country_id';
const DEFAULT_COUNTRY = 'US';

const STATE_NEW_ADDRESS = 'newAddress';
const STATE_DEFAULT_ADDRESS = 'defaultAddress';
const STATE_SAME_ADDRESS = 'sameAddress';

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
            [STATE_FIELD_ID]: { label: 'State', validation: [] },
            [ZIP_FIELD_ID]: { label: 'Postal Code' },
            [COUNTRY_FIELD_ID]: { label: 'Country', type: 'select', value: DEFAULT_COUNTRY },
            [PHONE_FIELD_ID]: { label: 'Phone Number' }
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

    componentDidUpdate(props, state) {
        const { defaultBillingAddress } = state;

        if (defaultBillingAddress) return this.handleFieldChange;

        return null;
    }

    onFormSuccess() {
        const { savePaymentInformationAndPlaceOrder } = this.props;
        const correctAddress = this.getAddressFromState();

        const {
            activePaymentMethod: { code: method }
        } = this.state;

        const paymentInformation = {
            paymentMethod: { method },
            billing_address: correctAddress
        };

        this.setState({ loadingPaymentInformationSave: true });
        savePaymentInformationAndPlaceOrder(paymentInformation).then(
            () => this.setState({ loadingPaymentInformationSave: false })
        );
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

        if (defaultBillingAddress && state === 'newAddress') {
            return { message: ("I'd like to use the default address"), type: STATE_DEFAULT_ADDRESS };
        }

        if (state !== 'newAddress') {
            return { message: ("I'd like to use a different address"), type: STATE_NEW_ADDRESS };
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
            // TODO: change to actual region id when reigon select is introduced
            region_id: region_id || 0,
            region_code,
            street: Object.values(street),
            telephone
        };
    }

    handleSelectPaymentMethod(method) {
        this.setState({ activePaymentMethod: method });
    }

    changeState(state, billingValue) {
        const { shippingAddress, defaultBillingAddress } = this.state;
        const { billingAddress } = this.props;

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
        const {
            type = 'text',
            label,
            note,
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
              value={ overrideStateValue || stateValue }
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
                        <dt>Contact details:</dt>
                        <dd>{ `${ firstname } ${ lastname }` }</dd>
                        { company && (<>
                            <dt>Company name</dt>
                            <dd>{ company }</dd>
                        </>)}
                        <dd>{ telephone }</dd>
                        <dt>Billing address:</dt>
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
                { this.renderField(STATE_FIELD_ID) }
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
        const {
            paymentMethods,
            billingIsSame,
            activePaymentMethod,
            loadingPaymentInformationSave,
            shippingAddress,
            state
        } = this.state;
        const renderFunction = this.renderMap[state];
        const { code } = activePaymentMethod;

        return (
            <Form
              onSubmitSuccess={ validFields => this.onFormSuccess(validFields) }
              key="review_and_payment_step"
            >
                <Loader isLoading={ loadingPaymentInformationSave } />

                <CheckoutPaymentMethods
                  paymentMethods={ paymentMethods }
                  onSelectPaymentMethod={ method => this.handleSelectPaymentMethod(method) }
                />

                <fieldset>
                    <legend>Billing Address</legend>

                    { this.renderStateButton() }

                    { shippingAddress && !!Object.entries(shippingAddress).length && (
                        <Field
                          id="sameAsShippingAddress"
                          type="checkbox"
                          label="My billing and shipping address are the same"
                          value={ billingIsSame }
                          checked={ billingIsSame }
                          onChange={ (value) => {
                              this.changeState(value ? STATE_SAME_ADDRESS : STATE_DEFAULT_ADDRESS, value);
                          } }
                        />)
                     }

                    { renderFunction() }

                </fieldset>

                <button type="submit" disabled={ !code }>Place Order</button>
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
    paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CheckoutPreviewAndPaymentsStep;
