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
import { Link } from 'react-router-dom';
import ContentWrapper from 'Component/ContentWrapper';
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary';
import CheckoutShippingStep from 'Component/CheckoutShippingStep';
import CheckoutPreviewAndPaymentsStep from 'Component/CheckoutPreviewAndPaymentsStep';
import { getUrlParam } from 'Util/Url';
import { customerType } from 'Type/Account';
import './CheckoutPage.style';

export const CHECKOUT_BASE_URL = 'checkout';
export const CHECKOUT_STEP_SHIPPING = 'shipping';
export const CHECKOUT_STEP_REVIEW_AND_PAYMENTS = 'review-and-payments';
export const CHECKOUT_STEP_SUCCESS = 'success';

class CheckoutPage extends Component {
    static changeUrlByCheckoutStep(props, state) {
        const { history } = props;
        const { checkoutStep } = state;
        history.push(`/${CHECKOUT_BASE_URL}/${checkoutStep}`, state);
    }

    constructor(props) {
        super(props);

        const {
            location: { state },
            location,
            match
        } = props;

        this.state = {
            checkoutStep: CHECKOUT_STEP_SHIPPING, // shipping or review-and-payments
            prevCheckoutStep: CHECKOUT_STEP_SHIPPING,
            showSummary: true,
            shippingAddress: {},
            billingAddress: {},
            addressesAreChecked: false,
            carrierCode: '',
            methodCode: '',
            paymentMethods: [],
            paymentTotals: {},
            orderID: '',
            ...state
        };

        const { checkoutStep } = this.state;
        if (getUrlParam(match, location) !== checkoutStep) {
            CheckoutPage.changeUrlByCheckoutStep(this.props, state || this.state);
        }

        this.renderMap = {
            [CHECKOUT_STEP_SHIPPING]: () => this.renderShippingStep(),
            [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: () => this.renderReviewAndPaymentsStep(),
            [CHECKOUT_STEP_SUCCESS]: () => this.renderCheckoutSuccessStep()
        };

        this.subHeadingMap = {
            [CHECKOUT_STEP_SHIPPING]: __('Shipping information'),
            [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: __('Review and payment information'),
            [CHECKOUT_STEP_SUCCESS]: __('Order information')
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { prevCheckoutStep, checkoutStep } = state;
        const {
            updateToggleHeaderAndFooter
            // match,
            // location,
            // location: { state: locationState }
        } = props;
        const stateToBeUpdated = {};

        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: false });

        // if (getUrlParam(match, location) !== checkoutStep && locationState) {
        //     const { locationState: { checkoutStep: locationCheckoutStep } } = location;
        //     stateToBeUpdated.checkoutStep = locationCheckoutStep;
        //     stateToBeUpdated.prevCheckoutStep = locationCheckoutStep;
        // }

        if (prevCheckoutStep !== checkoutStep) {
            CheckoutPage.changeUrlByCheckoutStep(props, state);
            stateToBeUpdated.prevCheckoutStep = checkoutStep;
        }

        return stateToBeUpdated;
    }

    componentDidMount() {
        const { updateToggleHeaderAndFooter } = this.props;
        const { isSignedIn } = this.props;

        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: false });
        if (isSignedIn) return this.requestCustomerData().then(() => this.getDefaultAddresses());

        return this.getDefaultAddresses();
    }

    getDefaultAddresses() {
        const { customer } = this.props;
        const { shippingAddress, billingAddress } = this.state;

        if (Object.entries(customer).length) {
            const { addresses } = customer;

            Object.values(addresses).map((address) => {
                const { default_shipping, default_billing } = address;

                if (default_shipping && !Object.entries(shippingAddress).length) {
                    this.setState({ shippingAddress: address });
                }

                if (default_billing && !Object.entries(billingAddress).length) {
                    this.setState({ billingAddress: address });
                }

                return null;
            });
        }

        this.setState({ addressesAreChecked: true });
    }

    requestCustomerData() {
        const { requestCustomerData } = this.props;
        const options = {
            withAddresses: true
        };

        this.setState({ addressesAreChecked: false });

        return requestCustomerData(options);
    }

    saveAddressInformation(addressInformation) {
        const { saveAddressInformation, showNotification } = this.props;
        const {
            shipping_address,
            billing_address,
            shipping_carrier_code,
            shipping_method_code
        } = addressInformation;

        this.setState({
            shippingAddress: shipping_address,
            billingAddress: billing_address,
            carrierCode: shipping_carrier_code,
            methodCode: shipping_method_code,
            addressesAreChecked: false
        });

        return saveAddressInformation(addressInformation).then(
            ({ saveAddressInformation }) => {
                const { payment_methods, totals } = saveAddressInformation;
                this.setState({
                    checkoutStep: CHECKOUT_STEP_REVIEW_AND_PAYMENTS,
                    paymentMethods: payment_methods,
                    paymentTotals: totals,
                    addressesAreChecked: true
                });
            },
            (err) => {
                showNotification('error', err[0].debugMessage);
                this.setState({
                    checkoutStep: CHECKOUT_STEP_SHIPPING
                });
            }
        );
    }

    savePaymentInformationAndPlaceOrder(paymentInformation) {
        const {
            savePaymentInformationAndPlaceOrder,
            removeCartAndObtainNewGuest,
            showNotification
        } = this.props;

        return savePaymentInformationAndPlaceOrder(paymentInformation).then(
            ({ savePaymentInformationAndPlaceOrder: { orderID } }) => {
                const { updateToggleHeaderAndFooter } = this.props;

                updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: true });
                removeCartAndObtainNewGuest();

                this.setState({
                    orderID,
                    checkoutStep: CHECKOUT_STEP_SUCCESS,
                    showSummary: false
                });
            },
            (err) => {
                showNotification('error', err[0].debugMessage);
                this.setState({
                    checkoutStep: CHECKOUT_STEP_SHIPPING
                });
            }
        );
    }

    /**
     * Render function for shipping information step
     * @returns {*}
     */
    renderShippingStep() {
        const { shippingAddress, billingAddress, addressesAreChecked } = this.state;
        const { isSignedIn, customer: { email }, countryList } = this.props;

        return (
            <CheckoutShippingStep
              saveAddressInformation={ addressInformation => this.saveAddressInformation(addressInformation) }
              shippingAddress={ shippingAddress }
              billingAddress={ billingAddress }
              isSignedIn={ isSignedIn }
              email={ email }
              finishedLoading={ addressesAreChecked }
              countryList={ countryList }
            />
        );
    }

    /**
     * Render function for order review and payment details step
     * @returns {*}
     */
    renderReviewAndPaymentsStep() {
        const { isSignedIn, customer: { email }, countryList } = this.props;
        const {
            shippingAddress,
            billingAddress,
            paymentMethods,
            addressesAreChecked
        } = this.state;

        return (
            <CheckoutPreviewAndPaymentsStep
              billingAddress={ billingAddress }
              shippingAddress={ shippingAddress }
              paymentMethods={ paymentMethods }
              savePaymentInformationAndPlaceOrder={ (
                  paymentInformation => this.savePaymentInformationAndPlaceOrder(paymentInformation)
              ) }
              email={ email }
              isSignedIn={ isSignedIn }
              finishedLoading={ addressesAreChecked }
              countryList={ countryList }
            />
        );
    }

    /**
     * Render function for order success page
     * @returns {*}
     */
    renderCheckoutSuccessStep() {
        const { orderID } = this.state;

        return (
            <div>
                <h1>{ __('Thank you for your purchase!') }</h1>
                <p>{ __('Your order # is: %s.', orderID) }</p>
                <p>{ __('We`ll email you an order confirmation with details and tracking info.') }</p>
                <Link to="/">{ __('Continue Shopping') }</Link>
            </div>
        );
    }

    renderCheckoutStepsIndicator() {
        const { checkoutStep } = this.state;
        const renderStepArray = Object.keys(this.renderMap);

        return (
            <div
              block="CheckoutPage"
              elem="StepIndicatorWrapper"
              aria-label={ __('Step indicator') }
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
                            <strong>{ __('Step %s', renderStepArray.length - i) }</strong>
                            { this.subHeadingMap[key] }
                        </span>
                    </div>
                )) }
            </div>
        );
    }

    /**
     * render function calls approperiate renderer based on step
     * @returns {*}
     */
    render() {
        const {
            checkoutStep, methodCode, showSummary, paymentTotals
        } = this.state;
        const { products, totals } = this.props;
        const stepRenderFunction = this.renderMap[checkoutStep];
        const subHeading = this.subHeadingMap[checkoutStep];

        return (
            <main block="CheckoutPage">
                <header block="CheckoutPage" elem="Header">
                    <ContentWrapper label={ __('Checkout heading') }>
                        <h1>{ __('Checkout') }</h1>
                        <h3>{ subHeading }</h3>
                        { this.renderCheckoutStepsIndicator() }
                    </ContentWrapper>
                </header>

                <ContentWrapper
                  wrapperMix={ { block: 'CheckoutPage', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { stepRenderFunction() }
                    { showSummary && (
                        <CheckoutOrderSummary
                          totals={ Object.keys(paymentTotals).length ? paymentTotals : totals }
                          products={ products }
                          shippingMethod={ methodCode }
                        />
                    ) }
                </ContentWrapper>
            </main>
        );
    }
}

CheckoutPage.propTypes = {
    // isHeaderAndFooterVisible: PropTypes.bool.isRequired,
    updateToggleHeaderAndFooter: PropTypes.func.isRequired,
    savePaymentInformationAndPlaceOrder: PropTypes.func.isRequired,
    saveAddressInformation: PropTypes.func.isRequired,
    removeCartAndObtainNewGuest: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    requestCustomerData: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    countryList: PropTypes.arrayOf(PropTypes.shape).isRequired,
    customer: customerType.isRequired
};

export default CheckoutPage;
