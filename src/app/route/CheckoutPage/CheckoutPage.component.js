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
import { Link } from 'react-router-dom';
import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary';
import CheckoutShippingMethods from 'Component/CheckoutShippingMethods';
import './CheckoutPage.style';
import CheckoutPaymentMethods from '../../component/CheckoutPaymentMethods';

const CHECKOUT_STEP_SHIPPING = 'shipping';
const CHECKOUT_STEP_REVIEW_AND_PAYMENTS = 'review-and-payments';
const CHECKOUT_STEP_SUCCESS = 'success';

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

        this.renderMap = {
            [CHECKOUT_STEP_SHIPPING]: () => this.renderShippingStep(),
            [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: () => this.renderReviewAndPaymentsStep(),
            [CHECKOUT_STEP_SUCCESS]: () => this.renderCheckoutSuccessStep()
        };
    }

    componentDidMount() {
        const { updateToggleHeaderAndFooter } = this.props;
        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: false });
    }

    componentDidUpdate(prevProps) {
    }

    placeOrder() {
        //todo
    }

    /**
     * handle shipping method change
     * @param method
     */
    handleSelectShippingMethod = (method) => {
        this.setState({ shippingMethod: method });
    };

    handleSelectPaymentMethod = (method) => {
        this.setState({ paymentMethod: method });
    };

    /**
     * Render function for shipping information step
     * @returns {*}
     */
    renderShippingStep() {
        const {
            email,
            shippingAddress: {
                firstname,
                lastname,
                company,
                street,
                city,
                state,
                zip,
                country,
                phone
            }
        } = this.state;

        return (
            <div block="checkoutStep" elem="shippingStep">
                <fieldset block="CheckoutStep" elem="legend">
                    <legend>Email Address</legend>
                    <Field
                        id="email"
                        type="text"
                        block="checkoutFieldset"
                        elem="email"
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
                        label="First Name"
                        value={ firstname }
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
                        label="Last Name"
                        value={ lastname }
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
                        label="Company"
                        value={ company }
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
                        label="Street Address"
                        value={ street[0] }
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
                        value={ street[1] }
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
                        label="City"
                        value={ city }
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
                        label="State"
                        value={ state }
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
                        label="Postal Code"
                        value={ zip }
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
                        value={ country }
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
                        label="Phone Number"
                        value={ phone }
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
                    shippingMethods={ shippingMethods }
                    onSelectShippingMethod={ this.handleSelectShippingMethod }
                />

                <button
                    onClick={ () => this.setState({ checkoutStep: CHECKOUT_STEP_REVIEW_AND_PAYMENTS }) }
                >
                    Next step
                </button>
            </div>
        );
    }

    /**
     * Render function for order review and payment details step
     * @returns {*}
     */
    renderReviewAndPaymentsStep() {
        const {
            billingIsSame,
            shippingAddress,
            billingAddress: {
                firstname,
                lastname,
                company,
                street,
                city,
                state,
                zip,
                country,
                phone
            }
        } = this.state;
        return (
            <div block="checkoutStep" elem="reviewAndPayments">
                <CheckoutPaymentMethods
                    paymentMethods={ paymentMethods }
                    onSelectPaymentMethod={ this.handleSelectPaymentMethod }
                />

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
                        { `${ shippingAddress.firstname } ${ shippingAddress.lastname }` }
                        { shippingAddress.company }
                        { shippingAddress.street[0] }
                        { shippingAddress.street[1] }
                        { shippingAddress.city }
                        { shippingAddress.state }
                        { shippingAddress.zip }
                        { shippingAddress.country }
                        { shippingAddress.phone }
                    </address>
                ) : (
                    <div>
                        <fieldset block="CheckoutStep" elem="legend">
                            <Field
                                id="firstname"
                                type="text"
                                block="checkoutFieldset"
                                elem="firstname"
                                label="First Name"
                                value={ firstname }
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
                                label="Last Name"
                                value={ lastname }
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
                                label="Company"
                                value={ company }
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
                                label="Street Address"
                                value={ street[0] }
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
                                value={ street[1] }
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
                                label="City"
                                value={ city }
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
                                label="State"
                                value={ state }
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
                                label="Postal Code"
                                value={ zip }
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
                                label="Country"
                                value={ country }
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
                                label="Phone Number"
                                value={ phone }
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
        );
    }

    /**
     * Render function for order success page
     * @returns {*}
     */
    renderCheckoutSuccessStep() {
        return (
            <div>
                <h1>Thank you for your purchase!</h1>
                <p>Your order # is: 000000003.</p>

                <p>We'll email you an order confirmation with details and tracking info.</p>

                <Link to="/">Continue Shopping</Link>
            </div>
        );
    }

    /**
     * render function calls approperiate renderer based on step
     * @returns {*}
     */
    render() {
        const {
            checkoutStep,
            shippingMethod
        } = this.state;

        const {
            products,
            totals
        } = this.props;

        const renderFunction = this.renderMap[checkoutStep];

        return (
            <main block="CheckoutPage">
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CheckoutPage',
                      elem: 'Wrapper'
                  } }
                  label="Checkout page"
                >
                    <div block="CheckoutPage" elem="CheckoutSteps">
                        <h1 block="CheckoutPage" elem="Heading">
                            Checkout
                        </h1>

                        { renderFunction() }
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

CheckoutPage.propTypes = {
    isHeaderAndFooterVisible: PropTypes.bool.isRequired,
    updateToggleHeaderAndFooter: PropTypes.func.isRequired
};

export default CheckoutPage;
