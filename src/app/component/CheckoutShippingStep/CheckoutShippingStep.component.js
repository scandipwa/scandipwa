/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'Component/Form';
import Field from 'Component/Field';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';
import Loader from 'Component/Loader';
import { makeCancelable } from 'Util/Promise';

const EMAIL_FIELD_ID = 'email';
const FIRSTNAME_FIELD_ID = 'firstname';
const LASTNAME_FIELD_ID = 'lastname';
const COMPANY_FIELD_ID = 'company';
const STREET_0_FIELD_ID = 'street_0';
const STREET_1_FIELD_ID = 'street_1';
const CITY_FIELD_ID = 'city';
const STATE_FIELD_ID = 'region_id';
const ZIP_FIELD_ID = 'postcode';
const PHONE_FIELD_ID = 'telephone';
const COUNTRY_FIELD_ID = 'country_id';

class CheckoutShippingStep extends Component {
    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);

        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            company: '',
            street: {},
            city: '',
            region_id: '',
            postcode: '',
            country_id: '',
            telephone: '',
            shippingMethods: [],
            activeShippingMethod: {},
            loadingShippingMethods: false,
            loadingShippingInformationSave: false
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
            [COUNTRY_FIELD_ID]: { label: 'Country' },
            [PHONE_FIELD_ID]: { label: 'Phone Number' }
        };
    }

    onSelectShippingMethod(method) {
        this.setState({ activeShippingMethod: method });
    }

    onFormSuccess() {
        const { showNotification, saveAddressInformation } = this.props;
        const { activeShippingMethod: { method_code, carrier_code }, region_id } = this.state;

        const address = { ...this.state, region_id: parseInt(region_id, 10) };
        delete address.shippingMethods;
        delete address.activeShippingMethod;
        delete address.loadingShippingMethods;
        delete address.loadingShippingInformationSave;

        if (!method_code || !carrier_code) {
            showNotification('error', 'No shipping method specified');
        } else {
            const addressInformation = {
                shipping_address: address,
                billing_address: address,
                shipping_carrier_code: carrier_code,
                shipping_method_code: method_code
            };

            this.setState({ loadingShippingInformationSave: true });
            saveAddressInformation(addressInformation);
        }
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
                region_id,
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

            this.estimatePromise = makeCancelable(estimateShippingCost(addressToEstimate))
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
        const {
            type = 'text',
            label,
            note,
            validation = ['notEmpty'],
            onChange = value => this.setState({ [id]: value }, this.handleFieldChange)
        } = this.fieldMap[id];

        return (
            <Field
              id={ id }
              type={ type }
              label={ label }
              note={ note }
              value={ overrideStateValue || stateValue }
              validation={ validation }
              onChange={ onChange }
            />
        );
    }

    render() {
        const {
            street,
            shippingMethods,
            loadingShippingMethods,
            activeShippingMethod,
            loadingShippingInformationSave
        } = this.state;
        const { method_code } = activeShippingMethod;

        return (
            <Form
              onSubmitSuccess={ validFields => this.onFormSuccess(validFields) }
              key="shipping_step"
            >
                <Loader isLoading={ loadingShippingInformationSave } />
                <fieldset>
                    <legend>Email Address</legend>
                    { this.renderField(EMAIL_FIELD_ID) }
                </fieldset>

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
    showNotification: PropTypes.func.isRequired
};

export default CheckoutShippingStep;
