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
import CheckoutShippingStep from 'Component/CheckoutShippingStep';
import CheckoutPaymentMethods from 'Component/CheckoutPaymentMethods';
import DiscountCoupons from 'Component/DiscountCoupons';
import './CheckoutPage.style';

const CHECKOUT_STEP_SHIPPING = 'shipping';
const CHECKOUT_STEP_REVIEW_AND_PAYMENTS = 'review-and-payments';
const CHECKOUT_STEP_SUCCESS = 'success';

const shippingMethods = {
    freeshipping_freeshipping: {
        title: 'Economy',
        carrier_title: 'Free Ground Shipping',
        price: 0.0
    },
    flatrate_flatrate: {
        title: 'Flatrate',
        carrier_title: 'Flatrate shipping',
        price: 10.0
    },
    ups_11: {
        title: 'UPS Standard',
        carrier_title: 'United Parcel Service',
        price: 15.0
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
            showSummary: true,

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

            discountCode: ''
        };

        this.renderMap = {
            [CHECKOUT_STEP_SHIPPING]: () => this.renderShippingStep(),
            [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: () => this.renderReviewAndPaymentsStep(),
            [CHECKOUT_STEP_SUCCESS]: () => this.renderCheckoutSuccessStep()
        };

        this.subHeadingMap = {
            [CHECKOUT_STEP_SHIPPING]: 'Shipping information',
            [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: 'Review and payment information',
            [CHECKOUT_STEP_SUCCESS]: 'Order information'
        };
    }

    componentDidMount() {
        const { updateToggleHeaderAndFooter } = this.props;
        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: false });
    }

    componentDidUpdate(prevProps) {}

    /**
     * handle shipping method change
     * @param method
     */
    handleSelectShippingMethod = (method) => {
        this.setState({ shippingMethod: method });
    };

    /**
     * Handle payment method change
     * @param method
     */
    handleSelectPaymentMethod = (method) => {
        this.setState({ paymentMethod: method });
    };

    /**
     * Go to next step
     */
    goToReviewAndPaymentsStep = () => {
        this.setState({
            checkoutStep: CHECKOUT_STEP_REVIEW_AND_PAYMENTS,
            showSummary: true
        });
    };

    /**
     * Place order and hide summary
     */
    placeOrder = () => {
        // show header and footer
        const { updateToggleHeaderAndFooter } = this.props;
        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: true });

        this.setState({
            checkoutStep: CHECKOUT_STEP_SUCCESS,
            showSummary: false
        });
    };

    /**
     * Render function for shipping information step
     * @returns {*}
     */
    renderShippingStep() {
        return <CheckoutShippingStep />;
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
                firstname, lastname, company, street, city, state, zip, country, phone
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

                {billingIsSame ? (
                    <address block="CheckoutStep" elem="ShippingAddressPreview">
                        <span>{ `${ shippingAddress.firstname } ${ shippingAddress.lastname }` }</span>
                        <span>{ shippingAddress.company }</span>
                        <span>{ shippingAddress.street[0] }</span>
                        <span>{ shippingAddress.street[1] }</span>
                        <span>{ shippingAddress.city }</span>
                        <span>{ shippingAddress.state }</span>
                        <span>{ shippingAddress.zip }</span>
                        <span>{ shippingAddress.country }</span>
                        <span>{ shippingAddress.phone }</span>
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
                                      firstname
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
                                      lastname
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
                                      company
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
                                      city
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
                                      state
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
                                      zip
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
                                      country
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
                                      phone
                                  }
                              }) }
                            />
                        </fieldset>
                    </div>
                )}

                <button onClick={ this.placeOrder }>Place Order</button>
                <DiscountCoupons />
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
                <p>We&#39;ll email you an order confirmation with details and tracking info.</p>
                <Link to="/">Continue Shopping</Link>
            </div>
        );
    }

    /**
     * render function calls approperiate renderer based on step
     * @returns {*}
     */
    render() {
        const { checkoutStep, shippingMethod, showSummary } = this.state;
        const { products, totals } = this.props;
        const renderFunction = this.renderMap[checkoutStep];
        const subHeading = this.subHeadingMap[checkoutStep];
        const renderStepArray = Object.keys(this.renderMap);

        return (
            <main block="CheckoutPage">
                <header block="CheckoutPage" elem="Header">
                    <ContentWrapper
                      label="Checkout heading"
                    >
                        <h1>Checkout</h1>
                        <h3>{ subHeading }</h3>
                        <div
                          block="CheckoutPage"
                          elem="StepIndicatorWrapper"
                          aria-label="Step indicator"
                        >
                            { renderStepArray.reverse().map((key, i) => (
                                <div
                                  block="CheckoutPage"
                                  elem="StepIndicator"
                                  mods={ { isActive: key === checkoutStep } }
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={ i }
                                >
                                    <span>
                                        <strong>{ `Step ${ renderStepArray.length - i }` }</strong>
                                        { this.subHeadingMap[key] }
                                    </span>
                                </div>
                            )) }
                        </div>
                    </ContentWrapper>
                </header>

                <ContentWrapper
                  wrapperMix={ {
                      block: 'CheckoutPage',
                      elem: 'Wrapper'
                  } }
                  label="Checkout page"
                >
                    <div block="CheckoutPage" elem="CheckoutSteps">
                        { renderFunction() }
                    </div>

                    { showSummary && (
                        <CheckoutOrderSummary
                          totals={ totals }
                          products={ products }
                          shippingMethod={ shippingMethod ? shippingMethods[shippingMethod] : {} }
                        />
                    ) }
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
