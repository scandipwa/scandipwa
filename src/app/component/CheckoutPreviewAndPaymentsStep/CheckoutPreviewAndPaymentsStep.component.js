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
const STATE_FIELD_ID = 'region_id';
const ZIP_FIELD_ID = 'postcode';
const PHONE_FIELD_ID = 'telephone';
const COUNTRY_FIELD_ID = 'country_id';

class CheckoutPreviewAndPaymentsStep extends Component {
    constructor(props) {
        super(props);

        const {
            shippingAddress,
            paymentMethods
        } = props;

        const { street } = shippingAddress;

        this.state = {
            ...shippingAddress,
            street: { ...street },
            billingIsSame: true,
            paymentMethods,
            activePaymentMethod: {},
            loadingPaymentInformationSave: false
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

    onFormSuccess() {
        const { savePaymentInformationAndPlaceOrder } = this.props;
        const { activePaymentMethod: { code: method }, street, region_id } = this.state;

        const address = {
            ...this.state,
            region_id: parseInt(region_id, 10),
            street: Object.values(street)
        };
        delete address.paymentMethods;
        delete address.activePaymentMethod;
        delete address.loadingPaymentInformationSave;
        delete address.billingIsSame;

        const paymentInformation = {
            paymentMethod: { method },
            billing_address: address
        };

        this.setState({ loadingPaymentInformationSave: true });
        savePaymentInformationAndPlaceOrder(paymentInformation).then(
            () => this.setState({ loadingPaymentInformationSave: false })
        );
    }

    handleSelectPaymentMethod(method) {
        this.setState({ activePaymentMethod: method });
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

    renderShippingAddressPreview() {
        const {
            shippingAddress: {
                firstname,
                lastname,
                company,
                street,
                city,
                region_id,
                postalcode,
                country_id,
                telephone
            }
        } = this.props;

        return (
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
                    <dd>{ `${country_id}, ${region_id}, ${city}` }</dd>
                    <dd>{ street[0] }</dd>
                    <dd>{ street[1] }</dd>
                    <dd>{ postalcode }</dd>
                </dl>
            </address>
        );
    }

    render() {
        const {
            paymentMethods,
            billingIsSame,
            street,
            activePaymentMethod,
            loadingPaymentInformationSave
        } = this.state;
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

                    <Field
                      id="sameAsShippingAddress"
                      type="checkbox"
                      label="My billing and shipping address are the same"
                      value={ billingIsSame }
                      checked={ billingIsSame }
                      onChange={ value => this.setState({ billingIsSame: value }) }
                    />

                    { billingIsSame
                        ? this.renderShippingAddressPreview()
                        : (
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
                        )
                }
                </fieldset>

                <button type="submit" disabled={ !code }>Place Order</button>
            </Form>
        );
    }
}

CheckoutPreviewAndPaymentsStep.propTypes = {
    shippingAddress: PropTypes.object.isRequired,
    savePaymentInformationAndPlaceOrder: PropTypes.func.isRequired,
    paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CheckoutPreviewAndPaymentsStep;
