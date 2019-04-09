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
import { Link } from 'react-router-dom';
import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';
import './CheckoutPage.style';

const CHECKOUT_STEP_SHIPPING = 'shipping';
const CHECKOUT_STEP_REVIEW_AND_PAYMENTS = 'review-and-payments';
const CHECKOUT_STEP_SUCCESS = 'success';

const paymentMethods = {
    checkmo: {
        title: 'Check Money order'
    },
    paypal: {
        title: 'PayPal Express checkout'
    },
    klarna: {
        title: 'Klarna smooth payments'
    }
};

// TODO move to somewhere
const shippingMethods = {
    freeshipping_freeshipping: {
        title: 'Economy',
        carrier_title: 'Free Ground Shipping',
        price: 0.00
    },
    flatrate_flatrate: {
        title: 'Flatrate',
        carrier_title: 'Flatrate shipping',
        price: 10.00
    },
    ups_11: {
        title: 'UPS Standard',
        carrier_title: 'United Parcel Service',
        price: 15.00
    }
};

class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkoutStep: CHECKOUT_STEP_SHIPPING, // shipping or review-and-payments

            email: '',

            shippingAddress: {
                firstname: '',
                lastname: '',
                company: '',
                street: ['', ''],
                city: '',
                state: '',
                zip: '',
                country: '',
                phone: ''
            },

            shippingMethod: '',

            paymentMethod: '',

            billingIsSame: true,

            billingAddress: {
                firstname: '',
                lastname: '',
                company: '',
                street: ['', ''],
                city: '',
                state: '',
                zip: '',
                country: '',
                phone: ''
            },

            discountCode: '',
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    renderPaymentMethod(index, data) {
        const { paymentMethod } = this.state;
        return (
            <tr key={ index } onClick={ () => this.setState({ paymentMethod: index }) }>
                <td>
                    <Field
                        id={ index }
                        type="radio"
                        block="paymentMethodTable"
                        elem={ index }
                        value={ index }
                        checked={ paymentMethod }
                        onChange={ index => this.setState({ paymentMethod: index }) }
                    />
                </td>
                <td>{ data.title }</td>
            </tr>
        );
    }

    placeOrder() {
        //todo
    }

    /**
     * handle shipping method change
     * @param method
     */
    handleSelectShippingMethod = (method) => {
        this.setState({ shippingMethod: method })
    };

    render() {
        const {
            checkoutStep,
            email,
            shippingAddress,
            shippingMethod,
            paymentMethods,
            billingIsSame,
            billingAddress,
        } = this.state;

        const {
            products,
            totals
        } = this.props;

        return (
            <main block="CheckoutPage">
                <ContentWrapper
                    wrapperMix={ { block: 'CheckoutPage', elem: 'Wrapper' } }
                    label="Checkout page"
                >
                    <div
                        block="CheckoutPage"
                        elem="CheckoutSteps"
                    >
                        <h1 block="CheckoutPage" elem="Heading">
                            Checkout
                        </h1>

                        { checkoutStep === CHECKOUT_STEP_SHIPPING ? (
                            <div block="checkoutStep" elem="shippingStep">
                                <fieldset block="CheckoutStep" elem="legend">
                                    <legend>Email Address</legend>
                                    <Field
                                        id="email"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="email"
                                        placeholder=""
                                        label="Email Address"
                                        note="You can create an account after checkout."
                                        value={ email }
                                        validation={ ['notEmpty', 'email'] }
                                        onChange={ email => this.setState({ email: email }) }
                                    />
                                </fieldset>

                                <fieldset block="CheckoutStep" elem="legend">
                                    <legend>Shipping Address</legend>
                                    <Field
                                        id="firstname"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="firstname"
                                        placeholder=""
                                        label="First Name"
                                        value={ shippingAddress.firstname }
                                        validation={ ['notEmpty'] }
                                        onChange={ firstname => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                firstname: firstname
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="lastname"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="lastname"
                                        placeholder=""
                                        label="Last Name"
                                        value={ shippingAddress.lastname }
                                        validation={ ['notEmpty'] }
                                        onChange={ lastname => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                lastname: lastname
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="company"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="company"
                                        placeholder=""
                                        label="Company"
                                        value={ shippingAddress.company }
                                        onChange={ company => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                company: company
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="street0"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="street0"
                                        placeholder=""
                                        label="Street Address"
                                        value={ shippingAddress.street[0] }
                                        validation={ ['notEmpty'] }
                                        onChange={ street => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                street: { ...this.state.shippingAddress.street, 0: street }
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="street1"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="street1"
                                        placeholder=""
                                        value={ shippingAddress.street[1] }
                                        onChange={ street => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                street: { ...this.state.shippingAddress.street, 1: street }
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="city"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="city"
                                        placeholder=""
                                        label="City"
                                        value={ shippingAddress.city }
                                        validation={ ['notEmpty'] }
                                        onChange={ city => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                city: city
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="state"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="state"
                                        placeholder=""
                                        label="State"
                                        value={ shippingAddress.state }
                                        validation={ ['notEmpty'] }
                                        onChange={ state => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                state: state
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="zip"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="zip"
                                        placeholder=""
                                        label="Postal Code"
                                        value={ shippingAddress.zip }
                                        validation={ ['notEmpty'] }
                                        onChange={ zip => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                zip: zip
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="country"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="country"
                                        placeholder=""
                                        value={ shippingAddress.country }
                                        label="Country"
                                        validation={ ['notEmpty'] }
                                        onChange={ country => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                country: country
                                            }
                                        }) }
                                    />

                                    <Field
                                        id="phone"
                                        type="text"
                                        block="checkoutFieldset"
                                        elem="phone"
                                        placeholder=""
                                        label="Phone Number"
                                        value={ shippingAddress.phone }
                                        validation={ ['notEmpty', 'telephone'] }
                                        onChange={ phone => this.setState({
                                            shippingAddress: {
                                                ...this.state.shippingAddress,
                                                phone: phone
                                            }
                                        }) }
                                    />
                                </fieldset>

                                <CheckoutShippingMethods
                                    onSelectShippingMethod={ this.handleSelectShippingMethod }
                                />

                                <button
                                    onClick={ () => this.setState({ checkoutStep: CHECKOUT_STEP_REVIEW_AND_PAYMENTS }) }>
                                    Next step
                                </button>
                            </div>
                        ) : checkoutStep === CHECKOUT_STEP_REVIEW_AND_PAYMENTS ? (
                            <div block="checkoutStep" elem="reviewAndPayments">
                                <fieldset block="CheckoutStep" elem="legend">
                                    <legend>Payment Method</legend>
                                    <table block="CheckoutStep" elem="OptionsTable">
                                        <tbody>
                                        { Object.keys(paymentMethods).map((index) => {
                                            return this.renderPaymentMethod(index, paymentMethods[index]);
                                        }) }
                                        </tbody>
                                    </table>
                                </fieldset>

                                <fieldset block="CheckoutStep" elem="legend">
                                    <legend>Billing Address</legend>

                                    <Field
                                        id="sameAsShippingAddress"
                                        type="checkbox"
                                        block="billingAddress"
                                        elem="sameAsShippingAddressCheckbox"
                                        label="My billing and shipping address are the same"
                                        value={ billingIsSame }
                                        checked={ billingIsSame }
                                        onChange={ () => this.setState({ billingIsSame: !billingIsSame }) }
                                    />
                                </fieldset>

                                { billingIsSame ? (
                                    <address>
                                        { `${ shippingAddress.firstname } ${ shippingAddress.lastname }` }<br />
                                        { shippingAddress.company }<br />
                                        { shippingAddress.street[0] }<br />
                                        { shippingAddress.street[1] }<br />
                                        { shippingAddress.city }<br />
                                        { shippingAddress.state }<br />
                                        { shippingAddress.zip }<br />
                                        { shippingAddress.country }<br />
                                        { shippingAddress.phone }<br />
                                    </address>
                                ) : (
                                    <div>
                                        <fieldset block="CheckoutStep" elem="legend">
                                            <Field
                                                id="firstname"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="firstname"
                                                placeholder=""
                                                label="First Name"
                                                value={ billingAddress.firstname }
                                                validation={ ['notEmpty'] }
                                                onChange={ firstname => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        firstname: firstname
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="lastname"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="lastname"
                                                placeholder=""
                                                label="Last Name"
                                                value={ billingAddress.lastname }
                                                validation={ ['notEmpty'] }
                                                onChange={ lastname => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        lastname: lastname
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="company"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="company"
                                                placeholder=""
                                                label="Company"
                                                value={ billingAddress.company }
                                                onChange={ company => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        company: company
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="street0"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="street0"
                                                placeholder=""
                                                label="Street Address"
                                                value={ billingAddress.street[0] }
                                                validation={ ['notEmpty'] }
                                                onChange={ street => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        street: { ...this.state.billingAddress.street, 0: street }
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="street1"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="street1"
                                                placeholder=""
                                                value={ billingAddress.street[1] }
                                                onChange={ street => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        street: { ...this.state.billingAddress.street, 1: street }
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="city"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="city"
                                                placeholder=""
                                                label="City"
                                                value={ billingAddress.city }
                                                validation={ ['notEmpty'] }
                                                onChange={ city => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        city: city
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="state"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="state"
                                                placeholder=""
                                                label="State"
                                                value={ billingAddress.state }
                                                validation={ ['notEmpty'] }
                                                onChange={ state => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        state: state
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="zip"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="zip"
                                                placeholder=""
                                                label="Postal Code"
                                                value={ billingAddress.zip }
                                                validation={ ['notEmpty'] }
                                                onChange={ zip => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        zip: zip
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="country"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="country"
                                                placeholder=""
                                                label="Country"
                                                value={ billingAddress.country }
                                                validation={ ['notEmpty'] }
                                                onChange={ country => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        country: country
                                                    }
                                                }) }
                                            />

                                            <Field
                                                id="phone"
                                                type="text"
                                                block="checkoutFieldset"
                                                elem="phone"
                                                placeholder=""
                                                label="Phone Number"
                                                value={ billingAddress.phone }
                                                validation={ ['notEmpty', 'telephone'] }
                                                onChange={ phone => this.setState({
                                                    billingAddress: {
                                                        ...this.state.billingAddress,
                                                        phone: phone
                                                    }
                                                }) }
                                            />
                                        </fieldset>
                                    </div>
                                ) }

                                <button onClick={ () => this.setState({ checkoutStep: CHECKOUT_STEP_SUCCESS }) }>
                                    Place Order
                                </button>
                            </div>
                        ) : checkoutStep === CHECKOUT_STEP_SUCCESS ? (
                            <div>
                                <h1>Thank you for your purchase!</h1>
                                <p>Your order # is: 000000003.</p>

                                <p>We'll email you an order confirmation with details and tracking info.</p>

                                <Link to="/">Continue Shopping</Link>
                            </div>
                        ) : null }
                    </div>

                    <CheckoutOrderSummary
                        totals={ totals }
                        products={ products }
                        shippingMethod={ (shippingMethod) ? shippingMethods[shippingMethod] : {} }
                    />
                </ContentWrapper>
            </main>
        );
    }
}

export default CheckoutPage;
