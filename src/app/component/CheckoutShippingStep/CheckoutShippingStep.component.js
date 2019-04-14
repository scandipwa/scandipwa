/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'Component/Form';
import Field from 'Component/Field';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';

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
            region_code: '',
            postcode: '',
            country_id: '',
            telephone: '',
            shippingMethods: []
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

    handleFieldChange() {
        if (this.shippingMethodEstimationTimeout) clearTimeout(this.shippingMethodEstimationTimeout);
        this.shippingMethodEstimationTimeout = setTimeout(() => {
            const { estimateShippingCost } = this.props;

            const {
                street,
                city,
                region_code,
                postcode,
                country_id
            } = this.state;

            const addressToEstimate = {
                city,
                region_code,
                postcode,
                country_id,
                street: Object.values(street)
            };

            estimateShippingCost(addressToEstimate).then(
                ({ estimateShippingCosts: shippingMethods }) => this.setState({ shippingMethods }),
                err => console.log(err)
            );
        }, 1000);
    }

    handleSelectShippingMethod(method) {
        console.log(method);
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
        const { street, shippingMethods } = this.state;

        console.log(shippingMethods);

        return (
            <Form>
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
                  onSelectShippingMethod={ () => this.handleSelectShippingMethod }
                />

                <button type="submit">Next step</button>
            </Form>
        );
    }
}

CheckoutShippingStep.propTypes = {
    estimateShippingCost: PropTypes.func.isRequired
};

export default CheckoutShippingStep;
