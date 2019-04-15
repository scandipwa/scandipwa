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
import './CheckoutPage.style';

const CHECKOUT_BASE_URL = 'checkout';
const CHECKOUT_STEP_SHIPPING = 'shipping';
const CHECKOUT_STEP_REVIEW_AND_PAYMENTS = 'review-and-payments';
const CHECKOUT_STEP_SUCCESS = 'success';

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
            carrierCode: '',
            methodCode: '',
            paymentMethods: [],
            paymentTotals: {},
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
            [CHECKOUT_STEP_SHIPPING]: 'Shipping information',
            [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: 'Review and payment information',
            [CHECKOUT_STEP_SUCCESS]: 'Order information'
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { prevCheckoutStep, checkoutStep } = state;
        const { updateToggleHeaderAndFooter } = props;
        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: false });

        if (prevCheckoutStep !== checkoutStep) {
            CheckoutPage.changeUrlByCheckoutStep(props, state);
            return { prevCheckoutStep: checkoutStep };
        }

        return null;
    }

    componentDidMount() {
        const { updateToggleHeaderAndFooter } = this.props;
        updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: false });
    }

    // /**
    //  * Place order and hide summary
    //  */
    // placeOrder = () => {
    //     // show header and footer
    //     const { updateToggleHeaderAndFooter } = this.props;
    //     updateToggleHeaderAndFooter({ isHeaderAndFooterVisible: true });

    //     this.setState({
    //         checkoutStep: CHECKOUT_STEP_SUCCESS,
    //         showSummary: false
    //     });
    // };

    saveAddressInformation(addressInformation) {
        const { saveAddressInformation } = this.props;
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
            methodCode: shipping_method_code
        });

        return saveAddressInformation(addressInformation).then(
            ({ saveAddressInformation }) => {
                const { payment_methods, totals } = saveAddressInformation;
                this.setState({
                    checkoutStep: CHECKOUT_STEP_REVIEW_AND_PAYMENTS,
                    paymentMethods: payment_methods,
                    paymentTotals: totals
                });
            },
            err => console.log(err)
        );
    }

    savePaymentInformationAndPlaceOrder(paymentInformation) {
        const { savePaymentInformationAndPlaceOrder } = this.props;

        return savePaymentInformationAndPlaceOrder(paymentInformation).then(
            ({ savePaymentInformationAndPlaceOrder }) => {
                console.log(savePaymentInformationAndPlaceOrder);
            },
            err => console.log(err)
        );
    }

    /**
     * Render function for shipping information step
     * @returns {*}
     */
    renderShippingStep() {
        return (
            <CheckoutShippingStep
              saveAddressInformation={ addressInformation => this.saveAddressInformation(addressInformation) }
            />
        );
    }

    /**
     * Render function for order review and payment details step
     * @returns {*}
     */
    renderReviewAndPaymentsStep() {
        const {
            shippingAddress,
            paymentMethods
        } = this.state;

        return (
            <CheckoutPreviewAndPaymentsStep
              shippingAddress={ shippingAddress }
              paymentMethods={ paymentMethods }
              savePaymentInformationAndPlaceOrder={ paymentInformation => this.savePaymentInformationAndPlaceOrder(paymentInformation) }
            />
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

    renderCheckoutStepsIndicator() {
        const { checkoutStep } = this.state;
        const renderStepArray = Object.keys(this.renderMap);

        return (
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
        )
    }

    /**
     * render function calls approperiate renderer based on step
     * @returns {*}
     */
    render() {
        const { checkoutStep, methodCode, showSummary } = this.state;
        const { products, totals } = this.props;
        const stepRenderFunction = this.renderMap[checkoutStep];
        const subHeading = this.subHeadingMap[checkoutStep];

        return (
            <main block="CheckoutPage">
                <header block="CheckoutPage" elem="Header">
                    <ContentWrapper
                      label="Checkout heading"
                    >
                        <h1>Checkout</h1>
                        <h3>{ subHeading }</h3>
                        { this.renderCheckoutStepsIndicator() }
                    </ContentWrapper>
                </header>

                <ContentWrapper
                  wrapperMix={ { block: 'CheckoutPage', elem: 'Wrapper' } }
                  label="Checkout page"
                >
                    { stepRenderFunction() }
                    { showSummary && (
                        <CheckoutOrderSummary
                          totals={ totals }
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
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default CheckoutPage;
