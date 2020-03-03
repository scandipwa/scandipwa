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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BRAINTREE, KLARNA } from 'Component/CheckoutPayments/CheckoutPayments.component';
import { CART_TAB } from 'Component/NavigationTabs/NavigationTabs.component';
import { TOP_NAVIGATION_TYPE, BOTTOM_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { fetchMutation, fetchQuery } from 'Util/Request';
import { showNotification } from 'Store/Notification';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs';
import BrowserDatabase from 'Util/BrowserDatabase';
import { changeNavigationState } from 'Store/Navigation';
import CheckoutQuery from 'Query/Checkout.query';
import MyAccountQuery from 'Query/MyAccount.query';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { TotalsType } from 'Type/MiniCart';
import { HistoryType } from 'Type/Common';
import { isSignedIn } from 'Util/Auth';

import Checkout, { SHIPPING_STEP, BILLING_STEP, DETAILS_STEP } from './Checkout.component';

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';
export const STRIPE_AUTH_REQUIRED = 'Authentication Required: ';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    resetCart: () => CartDispatcher.updateInitialCartData(dispatch),
    toggleBreadcrumbs: state => dispatch(toggleBreadcrumbs(state)),
    showErrorNotification: message => dispatch(showNotification('error', message)),
    setHeaderState: stateName => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    setNavigationState: stateName => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    createAccount: options => MyAccountDispatcher.createAccount(options, dispatch)
});

export class CheckoutContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        setNavigationState: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired,
        resetCart: PropTypes.func.isRequired,
        totals: TotalsType.isRequired,
        history: HistoryType.isRequired
    };

    containerFunctions = {
        setLoading: this.setLoading.bind(this),
        setDetailsStep: this.setDetailsStep.bind(this),
        savePaymentInformation: this.savePaymentInformation.bind(this),
        saveAddressInformation: this.saveAddressInformation.bind(this),
        onShippingEstimationFieldsChange: this.onShippingEstimationFieldsChange.bind(this),
        onEmailChange: this.onEmailChange.bind(this),
        onCreateUserChange: this.onCreateUserChange.bind(this),
        onPasswordChange: this.onPasswordChange.bind(this)
    };

    customPaymentMethods = [
        KLARNA,
        BRAINTREE
    ];

    constructor(props) {
        super(props);

        const {
            toggleBreadcrumbs,
            history,
            totals: {
                items = [],
                is_virtual
            }
        } = props;

        toggleBreadcrumbs(false);

        if (!items.length) history.push('/cart');

        this.state = {
            isLoading: is_virtual,
            isDeliveryOptionsLoading: false,
            requestsSent: 0,
            paymentMethods: [],
            shippingMethods: [],
            shippingAddress: {},
            checkoutStep: is_virtual ? BILLING_STEP : SHIPPING_STEP,
            orderID: '',
            paymentTotals: BrowserDatabase.getItem(PAYMENT_TOTALS) || {},
            email: '',
            isCreateUser: false,
            isGuestEmailSaved: false
        };

        if (is_virtual) {
            this._getPaymentMethods();
        }
    }

    componentWillUnmount() {
        const { toggleBreadcrumbs } = this.props;
        toggleBreadcrumbs(true);
    }

    onEmailChange(email) {
        this.setState({ email });
    }

    onCreateUserChange() {
        const { isCreateUser } = this.state;
        this.setState({ isCreateUser: !isCreateUser });
    }

    onPasswordChange(password) {
        this.setState({ password });
    }

    onShippingEstimationFieldsChange(address) {
        const { requestsSent } = this.state;

        this.setState({
            isDeliveryOptionsLoading: true,
            requestsSent: requestsSent + 1
        });

        fetchMutation(CheckoutQuery.getEstimateShippingCosts(
            address,
            this._getGuestCartId()
        )).then(
            ({ estimateShippingCosts: shippingMethods }) => {
                const { requestsSent } = this.state;

                this.setState({
                    shippingMethods,
                    isDeliveryOptionsLoading: requestsSent > 1,
                    requestsSent: requestsSent - 1
                });
            },
            this._handleError
        );
    }

    setDetailsStep(orderID) {
        const { resetCart, setNavigationState } = this.props;

        // For some reason not logged in user cart preserves qty in it
        if (!isSignedIn()) {
            BrowserDatabase.deleteItem(GUEST_QUOTE_ID);
        }

        BrowserDatabase.deleteItem(PAYMENT_TOTALS);
        resetCart();

        this.setState({
            isLoading: false,
            paymentTotals: {},
            checkoutStep: DETAILS_STEP,
            orderID
        });

        setNavigationState({
            name: CART_TAB
        });
    }

    setLoading(isLoading = true) {
        this.setState({ isLoading });
    }

    setShippingAddress = async () => {
        const { shippingAddress } = this.state;
        const { region, region_id, ...address } = shippingAddress;

        const mutation = MyAccountQuery.getCreateAddressMutation({
            ...address, region: { region, region_id }
        });

        await fetchMutation(mutation);

        return true;
    };

    containerProps = () => {
        const { paymentTotals } = this.state;

        return {
            checkoutTotals: this._getCheckoutTotals(),
            paymentTotals
        };
    };

    _handleError = (error) => {
        const { showErrorNotification } = this.props;
        const [{ message, debugMessage }] = error;

        this.setState({
            isDeliveryOptionsLoading: false,
            isLoading: false
        }, () => {
            showErrorNotification(debugMessage || message);
        });

        return false;
    };

    _handlePaymentError = (error, paymentInformation) => {
        const [{ debugMessage: message = '' }] = error;
        const { paymentMethod: { handleAuthorization } } = paymentInformation;

        if (handleAuthorization && message.startsWith(STRIPE_AUTH_REQUIRED)) {
            const secret = message.substring(STRIPE_AUTH_REQUIRED.length);

            handleAuthorization(
                paymentInformation,
                secret,
                paymentInformation => this.savePaymentInformation(paymentInformation)
            );
        } else {
            this._handleError(error);
        }
    };

    _getGuestCartId = () => BrowserDatabase.getItem(GUEST_QUOTE_ID);

    _getPaymentMethods() {
        fetchQuery(CheckoutQuery.getPaymentMethodsQuery(
            this._getGuestCartId()
        )).then(
            ({ getPaymentMethods: paymentMethods }) => {
                this.setState({ isLoading: false, paymentMethods });
            },
            this._handleError
        );
    }

    _getCheckoutTotals() {
        const { totals: cartTotals } = this.props;
        const { paymentTotals: { shipping_amount } } = this.state;

        return shipping_amount
            ? { ...cartTotals, shipping_amount }
            : cartTotals;
    }

    saveGuestEmail() {
        const { email } = this.state;
        const guestCartId = BrowserDatabase.getItem(GUEST_QUOTE_ID);
        const mutation = CheckoutQuery.getSaveGuestEmailMutation(email, guestCartId);

        return fetchMutation(mutation).then(
            ({ setGuestEmailOnCart: data }) => {
                if (data) {
                    this.setState({ isGuestEmailSaved: true });
                }

                return true;
            },
            this._handleError
        );
    }

    async createUserOrSaveGuest() {
        const {
            createAccount,
            totals: { is_virtual }
        } = this.props;

        const {
            email,
            password,
            isCreateUser,
            shippingAddress: {
                firstname,
                lastname
            }
        } = this.state;

        if (!isCreateUser) {
            return this.saveGuestEmail();
        }

        const options = {
            customer: {
                email,
                firstname,
                lastname
            },
            password
        };

        const creation = await createAccount(options);

        if (!creation) {
            return creation;
        }

        if (!is_virtual) {
            return this.setShippingAddress();
        }

        return true;
    }

    async saveAddressInformation(addressInformation) {
        const { shipping_address } = addressInformation;

        this.setState({
            isLoading: true,
            shippingAddress: shipping_address
        });

        if (!isSignedIn()) {
            if (!await this.createUserOrSaveGuest()) {
                this.setState({ isLoading: false });
                return;
            }
        }

        fetchMutation(CheckoutQuery.getSaveAddressInformation(
            addressInformation,
            this._getGuestCartId()
        )).then(
            ({ saveAddressInformation: data }) => {
                const { payment_methods, totals } = data;

                BrowserDatabase.setItem(
                    totals,
                    PAYMENT_TOTALS,
                    ONE_MONTH_IN_SECONDS
                );

                this.setState({
                    isLoading: false,
                    paymentMethods: payment_methods,
                    checkoutStep: BILLING_STEP,
                    paymentTotals: totals
                });
            },
            this._handleError
        );
    }

    async savePaymentInformation(paymentInformation) {
        const { paymentMethod: { method } } = paymentInformation;
        const { isGuestEmailSaved } = this.state;
        this.setState({ isLoading: true });

        if (!isSignedIn() && !isGuestEmailSaved) {
            if (!await this.createUserOrSaveGuest()) {
                this.setState({ isLoading: false });
                return;
            }
        }

        if (this.customPaymentMethods.includes(method)) {
            this.savePaymentMethodAndPlaceOrder(paymentInformation);
            return;
        }

        this.savePaymentInformationAndPlaceOrder(paymentInformation);
    }

    async savePaymentMethodAndPlaceOrder(paymentInformation) {
        const { paymentMethod: { method: code, additional_data } } = paymentInformation;
        const guest_cart_id = !isSignedIn() ? this._getGuestCartId() : '';

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code, [code]: additional_data
                }
            }));

            const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));
            const { placeOrder: { order: { order_id } } } = orderData;

            this.setDetailsStep(order_id);
        } catch (e) {
            this._handleError(e);
        }
    }

    savePaymentInformationAndPlaceOrder(paymentInformation) {
        fetchMutation(CheckoutQuery.getSavePaymentInformationAndPlaceOrder(
            paymentInformation,
            this._getGuestCartId()
        )).then(
            ({ savePaymentInformationAndPlaceOrder: data }) => {
                const { orderID } = data;
                this.setDetailsStep(orderID);
            },
            (error) => {
                this._handlePaymentError(error, paymentInformation);
            }
        );
    }

    render() {
        return (
            <Checkout
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
