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
import { updateShippingPrice } from 'Store/Cart/Cart.action';
import { updateEmail, updateShippingFields } from 'Store/Checkout/Checkout.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { customerType } from 'Type/Account';
import { HistoryType } from 'Type/Common';
import { TotalsType } from 'Type/MiniCart';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteGuestQuoteId, getCartTotalSubPrice, getGuestQuoteId } from 'Util/Cart';
import history from 'Util/History';
import {
    debounce,
    fetchMutation,
    fetchQuery,
    getErrorMessage
} from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { appendWithStoreCode } from 'Util/Url';

import Checkout from './Checkout.component';
import {
    BILLING_STEP, DETAILS_STEP, PAYMENT_TOTALS, SHIPPING_STEP, UPDATE_EMAIL_CHECK_FREQUENCY
} from './Checkout.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);
export const CheckoutDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Checkout/Checkout.dispatcher'
);

/** @namespace Route/Checkout/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    totals: state.CartReducer.cartTotals,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    customer: state.MyAccountReducer.customer,
    guest_checkout: state.ConfigReducer.guest_checkout,
    countries: state.ConfigReducer.countries,
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable,
    isMobile: state.ConfigReducer.device.isMobile,
    isInStoreActivated: state.ConfigReducer.delivery_instore_active
});

/** @namespace Route/Checkout/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resetCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)
    ),
    resetGuestCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => {
            dispatcher.resetGuestCart(dispatch);
            dispatcher.createGuestEmptyCart(dispatch);
        }
    ),
    toggleBreadcrumbs: (state) => dispatch(toggleBreadcrumbs(state)),
    showErrorNotification: (message) => dispatch(showNotification('error', message)),
    showInfoNotification: (message) => dispatch(showNotification('info', message)),
    showSuccessNotification: (message) => dispatch(showNotification('success', message)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    setNavigationState: (stateName) => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options, dispatch)
    ),
    updateShippingFields: (fields) => dispatch(updateShippingFields(fields)),
    updateEmail: (email) => dispatch(updateEmail(email)),
    checkEmailAvailability: (email) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, email)
    ),
    updateShippingPrice: (data) => dispatch(updateShippingPrice(data))
});

/** @namespace Route/Checkout/Container */
export class CheckoutContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        showInfoNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        setNavigationState: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        resetCart: PropTypes.func.isRequired,
        resetGuestCart: PropTypes.func.isRequired,
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
        ).isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                step: PropTypes.string
            })
        }).isRequired,
        updateShippingFields: PropTypes.func.isRequired,
        updateEmail: PropTypes.func.isRequired,
        checkEmailAvailability: PropTypes.func.isRequired,
        isEmailAvailable: PropTypes.bool.isRequired,
        updateShippingPrice: PropTypes.func.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
        cartTotalSubPrice: PropTypes.number.isRequired,
        isInStoreActivated: PropTypes.bool.isRequired
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
        goBack: this.goBack.bind(this),
        handleSelectDeliveryMethod: this.handleSelectDeliveryMethod.bind(this),
        onStoreSelect: this.onStoreSelect.bind(this),
        onShippingMethodSelect: this.onShippingMethodSelect.bind(this)
    };

    checkEmailAvailability = debounce((email) => {
        const { checkEmailAvailability } = this.props;
        checkEmailAvailability(email);
    }, UPDATE_EMAIL_CHECK_FREQUENCY);

    __construct(props) {
        super.__construct(props);

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
            billingAddress: {},
            selectedShippingMethod: '',
            checkoutStep: is_virtual ? BILLING_STEP : SHIPPING_STEP,
            orderID: '',
            paymentTotals: BrowserDatabase.getItem(PAYMENT_TOTALS) || {},
            email: '',
            isGuestEmailSaved: false,
            isCreateUser: false,
            estimateAddress: {},
            isPickInStoreMethodSelected: false
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
            history.push(appendWithStoreCode('/cart'));
        }

        // if guest checkout is disabled and user is not logged in => throw him to homepage
        if (!guest_checkout && !isSignedIn()) {
            history.push(appendWithStoreCode('/'));
        }

        updateMeta({ title: __('Checkout') });
    }

    componentDidUpdate(prevProps, prevState) {
        const { match: { params: { step: urlStep } }, isEmailAvailable, updateEmail } = this.props;
        const { match: { params: { step: prevUrlStep } } } = prevProps;
        const { email } = this.state;
        const { email: prevEmail } = prevState;

        // Handle going back from billing to shipping
        if (/shipping/.test(urlStep) && /billing/.test(prevUrlStep)) {
            BrowserDatabase.deleteItem(PAYMENT_TOTALS);

            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                checkoutStep: SHIPPING_STEP,
                isGuestEmailSaved: false
            });
        }

        if (email !== prevEmail) {
            this.checkEmailAvailability(email);
        }

        if (!isEmailAvailable) {
            updateEmail(email);
        }

        return null;
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

    onShippingMethodSelect(selectedShippingMethod) {
        this.setState({ selectedShippingMethod });
    }

    onShippingEstimationFieldsChange(address) {
        const { requestsSent } = this.state;
        const guestQuoteId = getGuestQuoteId();

        if (!guestQuoteId) {
            return;
        }

        this.setState({
            isDeliveryOptionsLoading: true,
            requestsSent: requestsSent + 1,
            estimateAddress: address
        });

        fetchMutation(CheckoutQuery.getEstimateShippingCosts(
            address,
            guestQuoteId
        )).then(
            /** @namespace Route/Checkout/Container/onShippingEstimationFieldsChangeFetchMutationThen */
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

    handleSelectDeliveryMethod() {
        const { isPickInStoreMethodSelected } = this.state;

        this.setState({ isPickInStoreMethodSelected: !isPickInStoreMethodSelected });
    }

    onStoreSelect(address) {
        this.setState({ selectedStoreAddress: address });
    }

    goBack() {
        const { checkoutStep } = this.state;

        if (checkoutStep === BILLING_STEP) {
            this.setState({
                isLoading: false
            });
            BrowserDatabase.deleteItem(PAYMENT_TOTALS);
        }

        history.goBack();
    }

    setDetailsStep(orderID) {
        const { resetCart, resetGuestCart, setNavigationState } = this.props;

        deleteGuestQuoteId();
        BrowserDatabase.deleteItem(PAYMENT_TOTALS);

        if (isSignedIn()) {
            resetCart();
        } else {
            resetGuestCart();
        }

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

    setShippingAddress = async (isDefaultShipping = false) => {
        const { shippingAddress } = this.state;
        const { region, region_id, ...address } = shippingAddress;

        const mutation = MyAccountQuery.getCreateAddressMutation({
            ...address,
            region: { region, region_id },
            default_shipping: isDefaultShipping
        });

        const data = await fetchMutation(mutation);

        if (data?.createCustomerAddress) {
            this.setState({
                shippingAddress: {
                    ...shippingAddress,
                    id: data.createCustomerAddress.id
                }
            });
        }

        return true;
    };

    containerProps() {
        const {
            cartTotalSubPrice,
            history,
            isEmailAvailable,
            isMobile,
            setHeaderState,
            totals,
            isInStoreActivated
        } = this.props;
        const {
            billingAddress,
            checkoutStep,
            email,
            estimateAddress,
            isCreateUser,
            isDeliveryOptionsLoading,
            isGuestEmailSaved,
            isLoading,
            orderID,
            paymentMethods,
            paymentTotals,
            selectedShippingMethod,
            shippingAddress,
            shippingMethods,
            selectedStoreAddress,
            isPickInStoreMethodSelected
        } = this.state;

        return {
            billingAddress,
            cartTotalSubPrice,
            checkoutStep,
            checkoutTotals: this._getCheckoutTotals(),
            email,
            estimateAddress,
            history,
            isCreateUser,
            isDeliveryOptionsLoading,
            isEmailAvailable,
            isGuestEmailSaved,
            isInStoreActivated,
            isLoading,
            isMobile,
            orderID,
            paymentMethods,
            paymentTotals,
            selectedShippingMethod,
            setHeaderState,
            shippingAddress,
            shippingMethods,
            totals,
            selectedStoreAddress,
            isPickInStoreMethodSelected
        };
    }

    _handleError = (error) => {
        const { showErrorNotification } = this.props;

        this.setState({
            isDeliveryOptionsLoading: false,
            isLoading: false
        }, () => {
            showErrorNotification(getErrorMessage(error));
        });

        return false;
    };

    _getPaymentMethods() {
        fetchQuery(CheckoutQuery.getPaymentMethodsQuery(
            getGuestQuoteId()
        )).then(
            /** @namespace Route/Checkout/Container/fetchQueryThen */
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
        const { updateEmail } = this.props;
        const guestCartId = getGuestQuoteId();

        if (!guestCartId) {
            return null;
        }

        const mutation = CheckoutQuery.getSaveGuestEmailMutation(email, guestCartId);

        updateEmail(email);

        return fetchMutation(mutation).then(
            /** @namespace Route/Checkout/Container/saveGuestEmailFetchMutationThen */
            ({ setGuestEmailOnCart: data }) => {
                if (data) {
                    this.setState({ isGuestEmailSaved: true });
                }

                return data;
            },
            this._handleError
        );
    }

    async createUserOrSaveGuest() {
        const {
            createAccount,
            totals: { is_virtual },
            showSuccessNotification,
            isEmailAvailable
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

        if (!isCreateUser || !isEmailAvailable) {
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

        showSuccessNotification(__('Your account has been created successfully!'));

        if (!is_virtual) {
            return this.setShippingAddress(true);
        }

        return true;
    }

    prepareAddressInformation(addressInformation) {
        const {
            shipping_address: {
                id,
                save_in_address_book,
                guest_email,
                ...shippingAddress
            } = {},
            billing_address: {
                id: dropId,
                save_in_address_book: dropSaveInAddressBook,
                guest_email: dropGuestEmail,
                ...billingAddress
            } = {},
            ...data
        } = addressInformation;

        return {
            ...data,
            shipping_address: shippingAddress,
            billing_address: billingAddress
        };
    }

    async saveAddressInformation(addressInformation) {
        const { updateShippingPrice } = this.props;
        const { shipping_address, shipping_method_code } = addressInformation;

        this.setState({
            isLoading: true,
            shippingAddress: shipping_address,
            selectedShippingMethod: shipping_method_code
        });

        if (!isSignedIn()) {
            if (!await this.createUserOrSaveGuest()) {
                this.setState({ isLoading: false });

                return;
            }
        }

        fetchMutation(CheckoutQuery.getSaveAddressInformation(
            this.prepareAddressInformation(addressInformation),
            getGuestQuoteId()
        )).then(
            /** @namespace Route/Checkout/Container/saveAddressInformationFetchMutationThen */
            ({ saveAddressInformation: data }) => {
                const { payment_methods, totals } = data;

                updateShippingPrice(totals);

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
        const { totals: { is_virtual } } = this.props;
        const {
            billing_address: {
                firstname: billingFirstName,
                lastname: billingLastName
            },
            billing_address: billingAddress
        } = paymentInformation;

        /**
         * If cart contains only virtual products then set firstname & lastname
         * from billing step into shippingAddress for user creating.
         */
        if (is_virtual) {
            this.setState({
                shippingAddress: {
                    firstname: billingFirstName,
                    lastname: billingLastName
                }
            });
        }

        this.setState({ isLoading: true, billingAddress });

        if (!isSignedIn()) {
            if (!await this.createUserOrSaveGuest()) {
                this.setState({ isLoading: false });

                return;
            }
        }

        await this.saveBillingAddress(paymentInformation).then(
            /** @namespace Route/Checkout/Container/saveBillingAddressThen */
            () => this.savePaymentMethodAndPlaceOrder(paymentInformation),
            this._handleError
        );
    }

    trimAddressMagentoStyle(address) {
        const { countries } = this.props;

        const {
            id, // drop this
            country_id,
            region_code, // drop this
            purchaseOrderNumber, // drop this
            region_id,
            region,
            guest_email,
            ...restOfBillingAddress
        } = address;

        const newAddress = {
            ...restOfBillingAddress,
            country_code: country_id,
            region,
            region_id
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
        const isCustomerSignedIn = isSignedIn();
        const guest_cart_id = !isCustomerSignedIn ? getGuestQuoteId() : '';

        if (!isCustomerSignedIn && !getGuestQuoteId) {
            return;
        }

        const { billing_address, same_as_shipping } = paymentInformation;
        const {
            shippingAddress: {
                id: shippingAddressId = null
            } = {}
        } = this.state;
        const billingAddress = {
            address: this.trimAddressMagentoStyle(billing_address)
        };

        if (same_as_shipping && shippingAddressId) {
            billingAddress.customer_address_id = shippingAddressId;
        }

        await fetchMutation(CheckoutQuery.getSetBillingAddressOnCart({
            guest_cart_id,
            same_as_shipping,
            billing_address: billingAddress
        }));
    }

    async savePaymentMethodAndPlaceOrder(paymentInformation) {
        const { paymentMethod: { code, additional_data, purchase_order_number } } = paymentInformation;
        const isCustomerSignedIn = isSignedIn();
        const guest_cart_id = !isCustomerSignedIn ? getGuestQuoteId() : '';

        if (!isCustomerSignedIn && !guest_cart_id) {
            return;
        }

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code,
                    [code]: additional_data,
                    purchase_order_number
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
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
