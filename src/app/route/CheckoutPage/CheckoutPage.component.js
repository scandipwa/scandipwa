/* eslint-disable no-console */
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

import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'Component/Link';
import { history } from 'Route';
import { TotalsType } from 'Type/MiniCart';
import { ProductType } from 'Type/ProductList';
import ContentWrapper from 'Component/ContentWrapper';
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary';
import CheckoutShippingStep from 'Component/CheckoutShippingStep';
import CheckoutPreviewAndPaymentsStep from 'Component/CheckoutPreviewAndPaymentsStep';
import { getUrlParam } from 'Util/Url';
import { customerType } from 'Type/Account';
import { MatchType, LocationType } from 'Type/Common';
import { CHECKOUT } from 'Component/Header';
import './CheckoutPage.style';

export const CHECKOUT_BASE_URL = 'checkout';
export const CHECKOUT_STEP_SHIPPING = 'shipping';
export const CHECKOUT_STEP_REVIEW_AND_PAYMENTS = 'review-and-payments';
export const CHECKOUT_STEP_SUCCESS = 'success';

class CheckoutPage extends Component {
    static propTypes = {
        savePaymentInformationAndPlaceOrder: PropTypes.func.isRequired,
        saveAddressInformation: PropTypes.func.isRequired,
        removeCartAndObtainNewGuest: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        countryList: PropTypes.arrayOf(PropTypes.shape).isRequired,
        customer: customerType.isRequired,
        products: PropTypes.objectOf(ProductType),
        totals: TotalsType.isRequired,
        match: MatchType.isRequired,
        location: LocationType.isRequired
    };

    static defaultProps = {
        products: {}
    };

    static changeUrlByCheckoutStep(props, state) {
        const { history } = props;
        const { checkoutStep } = state;
        history.push(`/${CHECKOUT_BASE_URL}/${checkoutStep}`, state);
    }

    renderMap = {
        [CHECKOUT_STEP_SHIPPING]: () => this.renderShippingStep(),
        [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: () => this.renderReviewAndPaymentsStep(),
        [CHECKOUT_STEP_SUCCESS]: () => this.renderCheckoutSuccessStep()
    };

    headerTitleMap = {
        [CHECKOUT_STEP_SHIPPING]: __('1. Shipping'),
        [CHECKOUT_STEP_REVIEW_AND_PAYMENTS]: __('2. Payment type'),
        [CHECKOUT_STEP_SUCCESS]: __('Order information')
    };

    constructor(props) {
        super(props);

        const {
            location: { state },
            location,
            match,
            customer
        } = props;

        this.state = {
            checkoutStep: CHECKOUT_STEP_SHIPPING, // shipping or review-and-payments
            prevCheckoutStep: CHECKOUT_STEP_SHIPPING,
            prevCustomer: customer,
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
    }

    static getDerivedStateFromProps(props, state) {
        const { prevCheckoutStep, checkoutStep, prevCustomer: { prevCustomerId } } = state;
        const { customer: { id } } = props;

        const stateToBeUpdated = (id !== prevCustomerId)
            ? CheckoutPage.getDefaultAddresses(props, state)
            : {};

        if (prevCheckoutStep !== checkoutStep) {
            CheckoutPage.changeUrlByCheckoutStep(props, state);
            stateToBeUpdated.prevCheckoutStep = checkoutStep;
        }

        return stateToBeUpdated;
    }

    componentDidMount() {
        const { isSignedIn, toggleBreadcrumbs } = this.props;

        toggleBreadcrumbs();

        if (!isSignedIn) {
            this.updateHeader();
        }
    }

    static getDefaultAddresses(props, state) {
        const { customer } = props;
        const { shippingAddress, billingAddress } = state;
        const newState = {};

        if (Object.entries(customer).length) {
            const { addresses } = customer;

            Object.values(addresses).map((address) => {
                const { default_shipping, default_billing } = address;

                if (default_shipping && !Object.entries(shippingAddress).length) {
                    newState.shippingAddress = address;
                }

                if (default_billing && !Object.entries(billingAddress).length) {
                    newState.billingAddress = address;
                }

                return null;
            });
        }

        return { ...newState, addressesAreChecked: true };
    }

    updateHeader() {
        const { setHeaderState } = this.props;
        const { checkoutStep } = this.state;

        setHeaderState({
            name: CHECKOUT,
            title: this.headerTitleMap[checkoutStep],
            onBackClick: () => history.push('/')
        });
    }

    requestCustomerData() {
        const { requestCustomerData } = this.props;
        const options = {
            withAddresses: true
        };

        this.setState({ addressesAreChecked: false });

        return requestCustomerData(options);
    }

    saveAddressInformation({ addressInformation }) {
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
                }, this.updateHeader);
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
                removeCartAndObtainNewGuest();

                this.setState({
                    orderID,
                    checkoutStep: CHECKOUT_STEP_SUCCESS,
                    showSummary: false
                }, this.updateHeader);
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
                <h1
                  block="CheckoutPage"
                  elem="Heading"
                  mods={ { hasDivider: true } }
                >
                    Thank you for your purchase!
                </h1>
                <p
                  block="CheckoutPage"
                  elem="SuccessOrderNumber"
                >
                    { __('Your order # is:') }
                    <strong>{ orderID }</strong>
                </p>
                <p
                  block="CheckoutPage"
                  elem="SuccessOrderDetails"
                >
                    { __('We`ll email you an order confirmation with details and tracking info.') }
                </p>
                <Link
                  block="CheckoutPage"
                  elem="SuccessButton"
                  mix={ { block: 'Button' } }
                  to="/"
                >
                    { __('Continue Shopping') }
                </Link>
            </div>
        );
    }

    /**
     * render function calls approperiate renderer based on step
     * @returns {*}
     */
    render() {
        const {
            checkoutStep, showSummary, paymentTotals
        } = this.state;
        const { products, totals } = this.props;
        const stepRenderFunction = this.renderMap[checkoutStep];
        return (
            <main block="CheckoutPage">
                <ContentWrapper
                  wrapperMix={ { block: 'CheckoutPage', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    <div block="CheckoutPage" elem="Step">
                        { !Object.keys(products).length && checkoutStep !== CHECKOUT_STEP_SUCCESS
                            ? (<p>No products</p>)
                            : stepRenderFunction() }
                    </div>
                    { showSummary && (
                        <CheckoutOrderSummary
                          totals={ Object.keys(paymentTotals).length ? paymentTotals : totals }
                          products={ products }
                        />
                    ) }
                </ContentWrapper>
            </main>
        );
    }
}

export default CheckoutPage;
