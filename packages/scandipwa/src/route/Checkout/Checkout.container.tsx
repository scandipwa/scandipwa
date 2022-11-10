/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { NavigationTabsMap } from 'Component/NavigationTabs/NavigationTabs.config';
import { ProductType } from 'Component/Product/Product.config';
import CheckoutQuery from 'Query/Checkout.query';
import { PaymentMethod, SetGuestEmailOnCartOutput, ShippingMethod } from 'Query/Checkout.type';
import MyAccountQuery from 'Query/MyAccount.query';
import { CART_URL } from 'Route/CartPage/CartPage.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { toggleBreadcrumbs } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { updateShippingPrice } from 'Store/Cart/Cart.action';
import { CartTotals } from 'Store/Cart/Cart.type';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { CheckoutAddress } from 'Store/Checkout/Checkout.type';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { setPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { GQLCartAddressInput, GQLEstimateShippingCostsAddress, GQLSaveAddressInformation } from 'Type/Graphql.type';
import { removeEmptyStreets } from 'Util/Address';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteCartId, getCartId, getCartTotalSubPrice } from 'Util/Cart';
import history from 'Util/History';
import {
    debounce,
    fetchMutation,
    fetchQuery,
    getErrorMessage,
} from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import Checkout from './Checkout.component';
import {
    CHECKOUT_URL_REGEX,
    CheckoutSteps,
    CheckoutStepUrl,
    CheckoutUrlSteps,
    PAYMENT_TOTALS,
    UPDATE_EMAIL_CHECK_FREQUENCY,
} from './Checkout.config';
import {
    AddressInformation,
    CheckoutComponentProps,
    CheckoutContainerDispatchProps,
    CheckoutContainerFunctions,
    CheckoutContainerMapStateProps,
    CheckoutContainerProps,
    CheckoutContainerPropsKeys,
    CheckoutContainerState,
    PaymentInformation,
} from './Checkout.type';

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
export const mapStateToProps = (state: RootState): CheckoutContainerMapStateProps => ({
    selectedStore: state.StoreInPickUpReducer.store,
    totals: state.CartReducer.cartTotals,
    isCartLoading: state.CartReducer.isLoading,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    customer: state.MyAccountReducer.customer,
    guest_checkout: state.ConfigReducer.guest_checkout,
    countries: state.ConfigReducer.countries,
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable,
    isMobile: state.ConfigReducer.device.isMobile,
    isInStoreActivated: state.ConfigReducer.delivery_instore_active,
    isGuestNotAllowDownloadable: state.ConfigReducer.downloadable_disable_guest_checkout,
    savedEmail: state.CheckoutReducer.email,
    isSignedIn: state.MyAccountReducer.isSignedIn,
    shippingFields: state.CheckoutReducer.shippingFields,
    minimumOrderAmount: state.CartReducer.cartTotals.minimum_order_amount,
    shippingMethods: state.CheckoutReducer.shippingMethods,
    shippingAddress: state.CheckoutReducer.shippingAddress,
    isCreateUser: state.CheckoutReducer.isCreateUser,
    isVisibleEmailRequired: state.CheckoutReducer.isVisibleEmailRequired,
    password: state.CheckoutReducer.password,
    isPickInStoreMethodSelected: state.CheckoutReducer.isPickInStoreMethodSelected,
});

/** @namespace Route/Checkout/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutContainerDispatchProps => ({
    setPickUpStore: (store) => dispatch(setPickUpStore(store)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resetCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch, !!getAuthorizationToken()),
    ),
    resetGuestCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => {
            dispatcher.resetGuestCart(dispatch);
            dispatcher.createGuestEmptyCart(dispatch);
        },
    ),
    toggleBreadcrumbs: (state) => dispatch(toggleBreadcrumbs(state)),
    showErrorNotification: (message) => dispatch(showNotification(NotificationType.ERROR, message)),
    showInfoNotification: (message) => dispatch(showNotification(NotificationType.INFO, message)),
    showSuccessNotification: (message) => dispatch(showNotification(NotificationType.SUCCESS, message)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    setNavigationState: (stateName) => dispatch(
        changeNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE, stateName),
    ),
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options, dispatch),
    ),
    checkEmailAvailability: (email) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, email),
    ),
    updateShippingPrice: (data) => dispatch(updateShippingPrice(data)),
    updateCheckoutStore: (state) => dispatch(updateCheckoutStore(state)),
});

/** @namespace Route/Checkout/Container */
export class CheckoutContainer extends PureComponent<CheckoutContainerProps, CheckoutContainerState> {
    static defaultProps: Partial<CheckoutContainerProps> = {
        cartTotalSubPrice: null,
        minimumOrderAmount: undefined,
        shippingFields: {},
    };

    containerFunctions: CheckoutContainerFunctions = {
        setDetailsStep: this.setDetailsStep.bind(this),
        savePaymentInformation: this.savePaymentInformation.bind(this),
        saveAddressInformation: this.saveAddressInformation.bind(this),
        onShippingEstimationFieldsChange: this.onShippingEstimationFieldsChange.bind(this),
        onEmailChange: this.onEmailChange.bind(this),
        goBack: this.goBack.bind(this),
        handleSelectDeliveryMethod: this.handleSelectDeliveryMethod.bind(this),
        onChangeEmailRequired: this.onChangeEmailRequired.bind(this),
    };

    checkEmailAvailability = debounce((email: string) => {
        const { checkEmailAvailability } = this.props;

        checkEmailAvailability(email);
    }, UPDATE_EMAIL_CHECK_FREQUENCY);

    __construct(props: CheckoutContainerProps): void {
        super.__construct?.(props);

        this._handleError = this._handleError.bind(this);

        const {
            toggleBreadcrumbs,
            totals: {
                is_virtual,
            },
            savedEmail,
        } = props;

        toggleBreadcrumbs(false);

        this.state = {
            isLoading: !!is_virtual,
            requestsSent: 0,
            billingAddress: undefined,
            checkoutStep: this.determineCheckoutStepFromUrl(),
            orderID: '',
            paymentTotals: BrowserDatabase.getItem(PAYMENT_TOTALS) || undefined,
            email: savedEmail || '',
        };
    }

    componentDidMount(): void {
        const {
            guest_checkout,
            updateMeta,
            isGuestNotAllowDownloadable,
        } = this.props;

        const { email } = this.state;

        this.handleRedirectIfNoItemsInCart();
        this.handleRedirectIfLessThanMinAmountInCart();

        // if guest checkout is disabled and user is not logged in => throw him to homepage
        if (!guest_checkout && !isSignedIn()) {
            history.push(appendWithStoreCode('/'));
        }

        // if guest is not allowed to checkout with downloadable => redirect to login page
        if (!isSignedIn() && isGuestNotAllowDownloadable) {
            this.handleRedirectIfDownloadableInCart();
        }

        if (email) {
            this.checkEmailAvailability(email);
        }

        updateMeta({ title: __('Checkout') });
    }

    componentDidUpdate(
        prevProps: CheckoutContainerProps,
        prevState: CheckoutContainerState,
    ): void {
        const {
            match: {
                params: {
                    step: urlStep = '',
                },
            },
            isEmailAvailable,
            updateCheckoutStore,
            isCartLoading,
            shippingFields,
            shippingFields: {
                shipping_method,
            },
            totals: {
                is_virtual,
            },
            isVisibleEmailRequired,
            showInfoNotification,
        } = this.props;

        const {
            match: {
                params: {
                    step: prevUrlStep = '',
                },
            },
            isCartLoading: prevIsCartLoading,
            isVisibleEmailRequired: prevIsVisibleEmailRequired,
        } = prevProps;

        const { email, checkoutStep } = this.state;
        const { email: prevEmail } = prevState;
        const { location: { pathname = '' } } = history;

        this.handleRedirectIfNoItemsInCart();
        this.handleRedirectIfLessThanMinAmountInCart();

        if (prevIsCartLoading && !isCartLoading) {
            if (checkoutStep === CheckoutSteps.SHIPPING_STEP) {
                if (is_virtual) {
                    history.replace(appendWithStoreCode(CheckoutStepUrl.BILLING_URL));
                    this._getPaymentMethods();
                    // eslint-disable-next-line react/no-did-update-set-state
                    this.setState({ checkoutStep: CheckoutSteps.BILLING_STEP });
                } else if (pathname.match(CHECKOUT_URL_REGEX)) {
                    history.replace(appendWithStoreCode(CheckoutStepUrl.SHIPPING_URL));
                }
            }

            const shouldGoToShipping = (
                !shipping_method
                 && !is_virtual
                 && checkoutStep === CheckoutSteps.BILLING_STEP
            );

            if (shouldGoToShipping) {
                showInfoNotification(__('Please add a shipping address and a shipping method!'));
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ checkoutStep: CheckoutSteps.SHIPPING_STEP });
            }

            this.saveShippingFieldsAsShippingAddress(shippingFields, !!is_virtual);
        }

        // Handle going back from billing to shipping
        if (
            urlStep.includes(CheckoutUrlSteps.SHIPPING_URL_STEP)
             && prevUrlStep.includes(CheckoutUrlSteps.BILLING_URL_STEP)
        ) {
            BrowserDatabase.deleteItem(PAYMENT_TOTALS);

            updateCheckoutStore({ isGuestEmailSaved: false });

            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                checkoutStep: CheckoutSteps.SHIPPING_STEP,
            });
        }

        if (urlStep.includes(
            CheckoutUrlSteps.BILLING_URL_STEP,
        ) && prevUrlStep.includes(
            CheckoutUrlSteps.DETAILS_URL_STEP,
        )) {
            BrowserDatabase.deleteItem(PAYMENT_TOTALS);
            history.push(appendWithStoreCode(CART_URL));
        }

        if (email !== prevEmail) {
            this.checkEmailAvailability(email);

            if (email && isVisibleEmailRequired !== prevIsVisibleEmailRequired) {
                this.onChangeEmailRequired();
            }
        }

        if (!isEmailAvailable) {
            updateCheckoutStore({ email });
        }
    }

    componentWillUnmount(): void {
        const { toggleBreadcrumbs, setPickUpStore } = this.props;

        toggleBreadcrumbs(true);
        setPickUpStore(null);
    }

    saveShippingFieldsAsShippingAddress(address: Record<string, unknown>, is_virtual: boolean): void {
        const {
            street_0,
            street_1,
            street_2,
            shipping_method,
            ...data
        } = address;
        const { savedEmail, updateCheckoutStore } = this.props;
        const { checkoutStep } = this.state;

        updateCheckoutStore(
            is_virtual
                ? {
                    shippingAddress: {},
                    isGuestEmailSaved: false,
                }
                : {
                    shippingAddress: data,
                    isGuestEmailSaved: savedEmail ? checkoutStep !== CheckoutSteps.SHIPPING_STEP : false,
                },
        );

        this.setState({
            email: savedEmail,
        });
    }

    onEmailChange(email: string): void {
        this.setState({ email });
    }

    onShippingEstimationFieldsChange(address: GQLEstimateShippingCostsAddress): void {
        const { updateCheckoutStore } = this.props;
        const { requestsSent } = this.state;
        const cartId = getCartId();

        if (!cartId) {
            return;
        }

        updateCheckoutStore({
            isDeliveryOptionsLoading: true,
            estimateAddress: address,
        });
        this.setState({
            requestsSent: requestsSent + 1,
        });

        fetchMutation<'estimateShippingCosts', ShippingMethod, true>(CheckoutQuery.getEstimateShippingCosts(
            address,
            cartId,
        )).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/onShippingEstimationFieldsChange/fetchMutation/then */
            ({ estimateShippingCosts: shippingMethods }) => {
                const { requestsSent } = this.state;
                updateCheckoutStore({ isDeliveryOptionsLoading: requestsSent > 1, shippingMethods });
                this.setState({
                    requestsSent: requestsSent - 1,
                });
            },
            this._handleError,
        );
    }

    determineCheckoutStepFromUrl(): CheckoutSteps {
        const {
            match: {
                params: {
                    step: urlStep = '',
                },
            },
            totals: {
                is_virtual,
            },
        } = this.props;
        const { location: { pathname = '' } } = history;

        if (urlStep.includes(CheckoutUrlSteps.DETAILS_URL_STEP)) {
            return CheckoutSteps.DETAILS_STEP;
        }

        if (urlStep.includes(CheckoutUrlSteps.BILLING_URL_STEP) || is_virtual) {
            if (pathname.match(CHECKOUT_URL_REGEX)) {
                history.replace(appendWithStoreCode(CheckoutStepUrl.BILLING_URL));
            }

            this._getPaymentMethods();

            return CheckoutSteps.BILLING_STEP;
        }

        return CheckoutSteps.SHIPPING_STEP;
    }

    handleRedirectIfNoItemsInCart(): void {
        const {
            totals: {
                items = [],
            },
            isCartLoading,
            showInfoNotification,
        } = this.props;

        const { checkoutStep, orderID } = this.state;

        if (
            (!isCartLoading && !items.length)
             || (checkoutStep === CheckoutSteps.DETAILS_STEP && !orderID)
        ) {
            if (checkoutStep !== CheckoutSteps.DETAILS_STEP) {
                showInfoNotification(__('Please add at least one product to cart!'));
            }

            if (!(orderID && checkoutStep === CheckoutSteps.DETAILS_STEP)) {
                history.push(appendWithStoreCode(CART_URL));
            }
        }
    }

    handleRedirectIfLessThanMinAmountInCart(): void {
        const {
            minimumOrderAmount: { minimum_order_amount_reached = true } = {},
        } = this.props;

        const { checkoutStep } = this.state;

        if (!minimum_order_amount_reached && checkoutStep !== CheckoutSteps.DETAILS_STEP) {
            history.push(appendWithStoreCode(CART_URL));
        }
    }

    handleRedirectIfDownloadableInCart(): void {
        const { totals: { items }, showInfoNotification } = this.props;

        const isDownloadable = items?.find(({ product }) => product.type_id === ProductType.DOWNLOADABLE);

        if (!isDownloadable) {
            return;
        }

        showInfoNotification(__('Please sign in or remove downloadable products from cart!'));
        history.replace(appendWithStoreCode(AccountPageUrl.LOGIN_URL));
    }

    handleSelectDeliveryMethod(): void {
        const { updateCheckoutStore, isPickInStoreMethodSelected } = this.props;

        updateCheckoutStore({ isPickInStoreMethodSelected: !isPickInStoreMethodSelected });
    }

    onChangeEmailRequired(): void {
        const { updateCheckoutStore } = this.props;
        const { email } = this.state;

        updateCheckoutStore({ isVisibleEmailRequired: !email });
    }

    goBack(): void {
        const { checkoutStep } = this.state;

        if (checkoutStep === CheckoutSteps.BILLING_STEP) {
            this.setState({
                isLoading: false,
            });
            BrowserDatabase.deleteItem(PAYMENT_TOTALS);
        }

        history.goBack();
    }

    setDetailsStep(orderID: string): void {
        const { resetCart, resetGuestCart, setNavigationState } = this.props;

        deleteCartId();
        BrowserDatabase.deleteItem(PAYMENT_TOTALS);

        if (isSignedIn()) {
            resetCart();
        } else {
            resetGuestCart();
        }

        this.setState({
            isLoading: false,
            paymentTotals: undefined,
            checkoutStep: CheckoutSteps.DETAILS_STEP,
            orderID,
        });

        setNavigationState({
            name: NavigationTabsMap.CART_TAB,
        });
    }

    async setShippingAddress(isDefaultShipping = false): Promise<boolean> {
        const { shippingAddress, updateCheckoutStore } = this.props;
        const { region, region_id, ...address } = shippingAddress || {};

        const mutation = MyAccountQuery.getCreateAddressMutation({
            ...address,
            region: { region, region_id },
            default_shipping: isDefaultShipping,
        });

        const data = await fetchMutation(mutation);

        if (data?.createCustomerAddress) {
            updateCheckoutStore({
                shippingAddress: {
                    ...shippingAddress,
                    id: data.createCustomerAddress.id,
                },
            });
        }

        return true;
    }

    containerProps(): Pick<CheckoutComponentProps, CheckoutContainerPropsKeys> {
        const {
            cartTotalSubPrice,
            isEmailAvailable,
            isMobile,
            setHeaderState,
            totals,
            isInStoreActivated,
            isSignedIn,
            isCartLoading,
            shippingMethods,
            isPickInStoreMethodSelected,
        } = this.props;
        const {
            billingAddress,
            checkoutStep,
            email,
            isLoading,
            orderID,
        } = this.state;

        return {
            billingAddress,
            cartTotalSubPrice,
            checkoutStep,
            checkoutTotals: this._getCheckoutTotals(),
            email,
            isEmailAvailable,
            isInStoreActivated,
            isSignedIn,
            isLoading,
            isMobile,
            orderID,
            setHeaderState,
            shippingMethods,
            totals,
            isPickInStoreMethodSelected,
            isCartLoading,
        };
    }

    _handleError(error: NetworkError | NetworkError[]): boolean {
        const { showErrorNotification, updateCheckoutStore } = this.props;

        this.setState({
            isLoading: false,
        }, () => {
            updateCheckoutStore({ isDeliveryOptionsLoading: false });
            showErrorNotification(getErrorMessage(error));
        });

        return false;
    }

    _getPaymentMethods(): void {
        const { updateCheckoutStore } = this.props;
        const cartId = getCartId();

        if (!cartId) {
            return;
        }

        fetchQuery<'getPaymentMethods', PaymentMethod, true>(CheckoutQuery.getPaymentMethodsQuery(
            cartId,
        )).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/_getPaymentMethods/fetchQuery/then */
            ({ getPaymentMethods: paymentMethods }) => {
                updateCheckoutStore({
                    paymentMethods,
                });
                this.setState({ isLoading: false });
            },
            this._handleError,
        );
    }

    _getCheckoutTotals(): CartTotals | CartTotals & { shipping_amount: number } {
        const { totals: cartTotals } = this.props;
        const { paymentTotals: { shipping_amount = 0 } = {} } = this.state;

        return shipping_amount
            ? { ...cartTotals, shipping_amount }
            : cartTotals;
    }

    saveGuestEmail(): Promise<SetGuestEmailOnCartOutput | boolean> | null {
        const { email } = this.state;
        const { updateCheckoutStore } = this.props;
        const guestCartId = getCartId();

        if (!email) {
            updateCheckoutStore({ isVisibleEmailRequired: false });
            this.onChangeEmailRequired();
        }

        if (!guestCartId || !email) {
            return null;
        }

        const mutation = CheckoutQuery.getSaveGuestEmailMutation(email, guestCartId);

        updateCheckoutStore({ email });

        return fetchMutation(mutation).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/saveGuestEmail/fetchMutation/then */
            ({ setGuestEmailOnCart: data }) => {
                if (data) {
                    updateCheckoutStore({ isGuestEmailSaved: true });
                }

                return data;
            },
            this._handleError,
        );
    }

    async createUserOrSaveGuest(): Promise<boolean | SetGuestEmailOnCartOutput | 'confirmation_required' | null> {
        const {
            createAccount,
            totals: { is_virtual },
            showSuccessNotification,
            isEmailAvailable,
            shippingAddress: {
                firstname,
                lastname,
            } = {},
            isCreateUser,
            password,
        } = this.props;

        const {
            email,
        } = this.state;

        if (!isCreateUser || !isEmailAvailable) {
            return this.saveGuestEmail();
        }

        const options = {
            customer: {
                email,
                firstname,
                lastname,
            },
            password,
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

    prepareAddressInformation(addressInformation: AddressInformation): GQLSaveAddressInformation {
        const {
            shipping_address,
            billing_address,
            ...data
        } = addressInformation;

        if ('save_in_address_book' in shipping_address && 'save_in_address_book' in billing_address) {
            const {
                id,
                save_in_address_book,
                ...shippingAddress
            } = shipping_address;
            const {
                id: dropId,
                save_in_address_book: dropSaveInBook,
                ...billingAddress
            } = billing_address;

            return {
                ...data,
                shipping_address: shippingAddress,
                billing_address: billingAddress,
            };
        }

        return {
            ...data,
            shipping_address,
            billing_address,
        };
    }

    async saveAddressInformation(addressInformation: AddressInformation): Promise<void> {
        const { updateShippingPrice, updateCheckoutStore, shippingMethods } = this.props;
        const { shipping_address, shipping_method_code } = addressInformation;

        const selectedShippingMethod = shippingMethods.find(
            (method) => `${method.carrier_code}_${method.method_code}` === shipping_method_code,
        );

        updateCheckoutStore({
            shippingAddress: shipping_address,
            selectedShippingMethod,
        });

        this.setState({
            isLoading: true,
        });

        if (!isSignedIn()) {
            if (!(await this.createUserOrSaveGuest())) {
                this.setState({ isLoading: false });

                return;
            }
        }

        const cartId = getCartId();

        if (!cartId) {
            return;
        }

        fetchMutation(CheckoutQuery.getSaveAddressInformation(
            this.prepareAddressInformation(addressInformation),
            cartId,
        )).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/saveAddressInformation/fetchMutation/then */
            ({ saveAddressInformation: data }) => {
                const { payment_methods, totals } = data;
                updateCheckoutStore({
                    paymentMethods: payment_methods,
                });
                updateShippingPrice(totals);

                BrowserDatabase.setItem(
                    totals,
                    PAYMENT_TOTALS,
                    ONE_MONTH_IN_SECONDS,
                );

                this.setState({
                    isLoading: false,
                    checkoutStep: CheckoutSteps.BILLING_STEP,
                    paymentTotals: totals,
                });
            },
            this._handleError,
        );
    }

    async savePaymentInformation(paymentInformation: PaymentInformation): Promise<void> {
        const {
            totals: {
                is_virtual,
            },
            updateCheckoutStore,
        } = this.props;
        const {
            billing_address: {
                firstname: billingFirstName,
                lastname: billingLastName,
            },
            billing_address: billingAddress,
        } = paymentInformation;

        /**
          * If cart contains only virtual products then set firstname & lastname
          * from billing step into shippingAddress for user creating.
          */
        if (is_virtual) {
            updateCheckoutStore({
                shippingAddress: {
                    firstname: billingFirstName,
                    lastname: billingLastName,
                },
            });
        }

        this.setState({ isLoading: true, billingAddress });

        if (!isSignedIn()) {
            if (!(await this.createUserOrSaveGuest())) {
                this.setState({ isLoading: false });

                return;
            }
        }

        await this.saveBillingAddress(paymentInformation).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/savePaymentInformation/saveBillingAddress/then */
            () => this.savePaymentMethodAndPlaceOrder(paymentInformation),
            this._handleError,
        );
    }

    trimAddressMagentoStyle(address: CheckoutAddress): GQLCartAddressInput {
        const { countries } = this.props;

        const {
            id, // drop this
            country_id,
            region_code, // drop this
            purchaseOrderNumber, // drop this
            region_id,
            region,
            street,
            guest_email,
            ...restOfBillingAddress
        } = address;

        const newAddress = {
            ...restOfBillingAddress,
            country_code: country_id,
            region,
            region_id,
            street: removeEmptyStreets(street || ['']),
        };

        /**
          * If there is no region specified, but there is region ID
          * get the region code by the country ID
          */
        if (region_id) {
            // find a country by country ID
            const { available_regions } = countries.find(
                ({ id }) => id === country_id,
            ) || {};

            if (!available_regions) {
                return newAddress;
            }

            // find region by region ID
            const { code } = available_regions.find(
                ({ id }) => +id === +region_id,
            ) || {};

            if (!code) {
                return newAddress;
            }

            newAddress.region = code;
        }

        return newAddress;
    }

    async saveBillingAddress(paymentInformation: PaymentInformation): Promise<void> {
        const isCustomerSignedIn = isSignedIn();
        const cart_id = getCartId();

        if (!isCustomerSignedIn && !cart_id) {
            return;
        }

        if (!cart_id) {
            return;
        }

        const { billing_address, same_as_shipping } = paymentInformation;
        const {
            shippingAddress: {
                id: shippingAddressId = null,
            } = {},
        } = this.props;
        const billingAddress: { address: GQLCartAddressInput; customer_address_id?: number } = {
            address: this.trimAddressMagentoStyle(billing_address),
        };

        if (same_as_shipping && shippingAddressId) {
            billingAddress.customer_address_id = shippingAddressId;
        }

        await fetchMutation(CheckoutQuery.getSetBillingAddressOnCart({
            cart_id,
            billing_address: billingAddress,
        }));
    }

    async savePaymentMethodAndPlaceOrder(paymentInformation: PaymentInformation): Promise<void> {
        const { paymentMethod: { code, additional_data, purchase_order_number } } = paymentInformation;
        const isCustomerSignedIn = isSignedIn();
        const cart_id = getCartId();

        if (!isCustomerSignedIn && !cart_id) {
            return;
        }

        if (!cart_id) {
            return;
        }

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                cart_id,
                payment_method: {
                    code,
                    [code]: additional_data,
                    purchase_order_number,
                },
            }));

            const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(cart_id));
            const { placeOrder: { order: { order_id } } } = orderData;

            this.setDetailsStep(order_id);
        } catch (e) {
            this._handleError(e as unknown as NetworkError | NetworkError[]);
        }
    }

    render(): ReactElement {
        return (
             <Checkout
               { ...this.containerFunctions }
               { ...this.containerProps() }
             />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
