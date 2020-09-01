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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { CART_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import CheckoutQuery from 'Query/Checkout.query';
import MyAccountQuery from 'Query/MyAccount.query';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { GUEST_QUOTE_ID } from 'Store/Cart/Cart.dispatcher';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { customerType } from 'Type/Account';
import { HistoryType } from 'Type/Common';
import { TotalsType } from 'Type/MiniCart';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import history from 'Util/History';
import { fetchMutation, fetchQuery } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import Checkout from './Checkout.component';
import {
    BILLING_STEP, DETAILS_STEP, PAYMENT_TOTALS, SHIPPING_STEP, STRIPE_AUTH_REQUIRED
} from './Checkout.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

export const mapStateToProps = (state) => ({
    totals: state.CartReducer.cartTotals,
    customer: state.MyAccountReducer.customer,
    guest_checkout: state.ConfigReducer.guest_checkout,
    countries: state.ConfigReducer.countries
});

export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resetCart: () => CartDispatcher.then(({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)),
    toggleBreadcrumbs: (state) => dispatch(toggleBreadcrumbs(state)),
    showErrorNotification: (message) => dispatch(showNotification('error', message)),
    showInfoNotification: (message) => dispatch(showNotification('info', message)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    setNavigationState: (stateName) => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options, dispatch)
    )
});

export class CheckoutContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        showInfoNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        setNavigationState: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        resetCart: PropTypes.func.isRequired,
        guest_checkout: PropTypes.bool.isRequired,
        totals: TotalsType.isRequired,
        history: HistoryType.isRequired,
        customer: customerType.isRequired,
        countries: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                id: PropTypes.string,
                available_regions: PropTypes.arrayOf(
                    PropTypes.shape({
                        code: PropTypes.string,
                        name: PropTypes.string,
                        id: PropTypes.number
                    })
                )
            })
        ).isRequired
    };

    containerFunctions = {
        setLoading: this.setLoading.bind(this),
        setDetailsStep: this.setDetailsStep.bind(this),
        savePaymentInformation: this.savePaymentInformation.bind(this),
        saveAddressInformation: this.saveAddressInformation.bind(this),
        onShippingEstimationFieldsChange: this.onShippingEstimationFieldsChange.bind(this),
        onEmailChange: this.onEmailChange.bind(this),
        onCreateUserChange: this.onCreateUserChange.bind(this),
        onPasswordChange: this.onPasswordChange.bind(this),
        goBack: this.goBack.bind(this)
    };

    constructor(props) {
        super(props);

        const {
            toggleBreadcrumbs,
            totals: {
                is_virtual
            }
        } = props;

        toggleBreadcrumbs(false);

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

    componentDidMount() {
        const {
            history,
            showInfoNotification,
            guest_checkout,
            updateMeta,
            totals: {
                items = []
            }
        } = this.props;

        if (!items.length) {
            showInfoNotification(__('Please add at least one product to cart!'));
            history.push('/cart');
        }

        // if guest checkout is disabled and user is not logged in => throw him to homepage
        if (!guest_checkout && !isSignedIn()) {
            history.push('/');
        }

        updateMeta({ title: __('Checkout') });
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

    goBack() {
        const { checkoutStep } = this.state;

        if (checkoutStep === BILLING_STEP) {
            this.setState({
                isLoading: false,
                checkoutStep: SHIPPING_STEP
            });

            BrowserDatabase.deleteItem(PAYMENT_TOTALS);
        }

        history.goBack();
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
                (paymentInformation) => this.savePaymentInformation(paymentInformation)
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
        const { isGuestEmailSaved } = this.state;
        this.setState({ isLoading: true });

        if (!isSignedIn() && !isGuestEmailSaved) {
            if (!await this.createUserOrSaveGuest()) {
                this.setState({ isLoading: false });
                return;
            }
        }

        await this.saveBillingAddress(paymentInformation).then(
            () => this.savePaymentMethodAndPlaceOrder(paymentInformation),
            this._handleError
        );
    }

    trimAddressMagentoStyle(address) {
        const { countries } = this.props;

        const {
            country_id,
            region_code, // drop this
            region_id,
            region,
            ...restOfBillingAddress
        } = address;

        const newAddress = {
            ...restOfBillingAddress,
            country_code: country_id,
            region
        };

        /**
         * If there is no region specified, but there is region ID
         * get the region code by the country ID
         */
        if (region_id) {
            // find a country by country ID
            const { available_regions } = countries.find(
                ({ id }) => id === country_id
            ) || {};

            if (!available_regions) {
                return newAddress;
            }

            // find region by region ID
            const { code } = available_regions.find(
                ({ id }) => +id === +region_id
            ) || {};

            if (!code) {
                return newAddress;
            }

            newAddress.region = code;
        }

        return newAddress;
    }

    async saveBillingAddress(paymentInformation) {
        const guest_cart_id = !isSignedIn() ? this._getGuestCartId() : '';
        const { billing_address } = paymentInformation;

        await fetchMutation(CheckoutQuery.getSetBillingAddressOnCart({
            guest_cart_id,
            billing_address: {
                address: this.trimAddressMagentoStyle(billing_address)
            }
        }));
    }

    async savePaymentMethodAndPlaceOrder(paymentInformation) {
        const { paymentMethod: { code, additional_data } } = paymentInformation;
        const guest_cart_id = !isSignedIn() ? this._getGuestCartId() : '';

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code,
                    [code]: additional_data
                }
            }));

            const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));
            const { placeOrder: { order: { order_id } } } = orderData;

            this.setDetailsStep(order_id);
        } catch (e) {
            this._handleError(e);
        }
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
