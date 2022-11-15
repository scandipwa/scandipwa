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
import { SetGuestEmailOnCartOutput, ShippingMethod } from 'Query/Checkout.type';
import { CART_URL } from 'Route/CartPage/CartPage.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { updateBreadcrumbsStore } from 'Store/Breadcrumbs/Breadcrumbs.action';
import { CartTotals } from 'Store/Cart/Cart.type';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { setPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { GQLEstimateShippingCostsAddress, GQLSaveAddressInformation } from 'Type/Graphql.type';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteCartId, getCartId, getCartTotalSubPrice } from 'Util/Cart';
import history from 'Util/History';
import { debounce, fetchMutation } from 'Util/Request';
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
    UPDATE_SHIPPING_COST_ESTIMATES_FREQUENCY,
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
    email: state.CheckoutReducer.email,
    isSignedIn: state.MyAccountReducer.isSignedIn,
    shippingFields: state.CheckoutReducer.shippingFields,
    minimumOrderAmount: state.CartReducer.cartTotals.minimum_order_amount,
    shippingMethods: state.CheckoutReducer.shippingMethods,
    shippingAddress: state.CheckoutReducer.shippingAddress,
    isCreateUser: state.CheckoutReducer.isCreateUser,
    isVisibleEmailRequired: state.CheckoutReducer.isVisibleEmailRequired,
    password: state.CheckoutReducer.password,
    isPickInStoreMethodSelected: state.CheckoutReducer.isPickInStoreMethodSelected,
    isCheckoutLoading: state.CheckoutReducer.isCheckoutLoading,
});

/** @namespace Route/Checkout/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutContainerDispatchProps => ({
    setPickUpStore: (store) => dispatch(setPickUpStore(store)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resetCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateInitialCartData(!!getAuthorizationToken()),
    ),
    resetGuestCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => {
            dispatcher.resetGuestCart();
            dispatcher.createGuestEmptyCart();
        },
    ),
    updateBreadcrumbsStore: (state) => dispatch(updateBreadcrumbsStore(state)),
    showErrorNotification: (message) => dispatch(showNotification(NotificationType.ERROR, message)),
    showInfoNotification: (message) => dispatch(showNotification(NotificationType.INFO, message)),
    showSuccessNotification: (message) => dispatch(showNotification(NotificationType.SUCCESS, message)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    setNavigationState: (stateName) => dispatch(
        changeNavigationState(NavigationType.BOTTOM_NAVIGATION_TYPE, stateName),
    ),
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options),
    ),
    checkEmailAvailability: (email) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.checkIsEmailAvailable(email),
    ),
    setShippingAddress: (isDefaultShipping) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.setShippingAddress(isDefaultShipping),
    ),
    saveBillingAddress: (paymentInformation) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.saveBillingAddress(paymentInformation),
    ),
    getPaymentMethods: () => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getPaymentMethods(),
    ),
    saveGuestEmail: (email) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.saveGuestEmail(email),
    ),
    handleCheckoutError: (error) => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleError(error),
    ),
    onChangeEmailRequired: () => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.onChangeEmailRequired(),
    ),
    updateShippingPrice: (data) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateShippingPrice(data),
    ),
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
        goBack: this.goBack.bind(this),
        handleSelectDeliveryMethod: this.handleSelectDeliveryMethod.bind(this),
    };

    checkEmailAvailability = debounce((email: string) => {
        const { checkEmailAvailability } = this.props;

        checkEmailAvailability(email);
    }, UPDATE_EMAIL_CHECK_FREQUENCY);

    handleFetchEstimateShippingCosts = debounce(({ address, cartId } : { address: GQLEstimateShippingCostsAddress; cartId: string }) => {
        const { updateCheckoutStore, handleCheckoutError } = this.props;
        const { requestsSent } = this.state;

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
            /** @namespace Route/Checkout/Container/CheckoutContainer/debounce/fetchMutation/then */
            ({ estimateShippingCosts: shippingMethods }) => {
                const { requestsSent } = this.state;

                updateCheckoutStore({ isDeliveryOptionsLoading: requestsSent > 1, shippingMethods });
                this.setState({
                    requestsSent: requestsSent - 1,
                });
            },
            handleCheckoutError,
        );
    }, UPDATE_SHIPPING_COST_ESTIMATES_FREQUENCY);

    __construct(props: CheckoutContainerProps): void {
        super.__construct?.(props);

        const {
            updateBreadcrumbsStore,
        } = props;

        updateBreadcrumbsStore({ areBreadcrumbsVisible: false });

        this.state = {
            requestsSent: 0,
            billingAddress: undefined,
            checkoutStep: this.determineCheckoutStepFromUrl(),
            orderID: '',
            paymentTotals: BrowserDatabase.getItem(PAYMENT_TOTALS) || undefined,
        };
    }

    componentDidMount(): void {
        const {
            guest_checkout,
            updateMeta,
            isGuestNotAllowDownloadable,
            email,
        } = this.props;

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
            getPaymentMethods,
            onChangeEmailRequired,
            email,
        } = this.props;

        const {
            match: {
                params: {
                    step: prevUrlStep = '',
                },
            },
            isCartLoading: prevIsCartLoading,
            isVisibleEmailRequired: prevIsVisibleEmailRequired,
            email: prevEmail,
        } = prevProps;

        const { checkoutStep } = this.state;
        const { location: { pathname = '' } } = history;

        this.handleRedirectIfNoItemsInCart();
        this.handleRedirectIfLessThanMinAmountInCart();

        if (prevIsCartLoading && !isCartLoading) {
            if (checkoutStep === CheckoutSteps.SHIPPING_STEP) {
                if (is_virtual) {
                    history.replace(appendWithStoreCode(CheckoutStepUrl.BILLING_URL));
                    getPaymentMethods();
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
                onChangeEmailRequired();
            }
        }

        if (!isEmailAvailable) {
            updateCheckoutStore({ email });
        }
    }

    componentWillUnmount(): void {
        const { updateBreadcrumbsStore, setPickUpStore } = this.props;

        updateBreadcrumbsStore({ areBreadcrumbsVisible: true });
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
        const { email, updateCheckoutStore } = this.props;
        const { checkoutStep } = this.state;

        updateCheckoutStore(
            is_virtual
                ? {
                    shippingAddress: {},
                    isGuestEmailSaved: false,
                }
                : {
                    shippingAddress: data,
                    isGuestEmailSaved: email ? checkoutStep !== CheckoutSteps.SHIPPING_STEP : false,
                },
        );
    }

    onShippingEstimationFieldsChange(address: GQLEstimateShippingCostsAddress): void {
        const cartId = getCartId();

        if (!cartId) {
            return;
        }
        this.handleFetchEstimateShippingCosts({ address, cartId });
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
            getPaymentMethods,
        } = this.props;
        const { location: { pathname = '' } } = history;

        if (urlStep.includes(CheckoutUrlSteps.DETAILS_URL_STEP)) {
            return CheckoutSteps.DETAILS_STEP;
        }

        if (urlStep.includes(CheckoutUrlSteps.BILLING_URL_STEP) || is_virtual) {
            if (pathname.match(CHECKOUT_URL_REGEX)) {
                history.replace(appendWithStoreCode(CheckoutStepUrl.BILLING_URL));
            }

            getPaymentMethods();

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

    goBack(): void {
        const { checkoutStep } = this.state;

        if (checkoutStep === CheckoutSteps.BILLING_STEP) {
            updateCheckoutStore({ isCheckoutLoading: false });
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
            paymentTotals: undefined,
            checkoutStep: CheckoutSteps.DETAILS_STEP,
            orderID,
        });
        updateCheckoutStore({ isCheckoutLoading: false });

        setNavigationState({
            name: NavigationTabsMap.CART_TAB,
        });
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
            isCheckoutLoading,
            email,
        } = this.props;
        const {
            billingAddress,
            checkoutStep,
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
            isCheckoutLoading,
            isMobile,
            orderID,
            setHeaderState,
            shippingMethods,
            totals,
            isPickInStoreMethodSelected,
            isCartLoading,
        };
    }

    _getCheckoutTotals(): CartTotals | CartTotals & { shipping_amount: number } {
        const { totals: cartTotals } = this.props;
        const { paymentTotals: { shipping_amount = 0 } = {} } = this.state;

        return shipping_amount
            ? { ...cartTotals, shipping_amount }
            : cartTotals;
    }

    async createUserOrSaveGuest(): Promise<boolean | SetGuestEmailOnCartOutput | 'confirmation_required' | void> {
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
            setShippingAddress,
            saveGuestEmail,
            email,
        } = this.props;

        if (!isCreateUser || !isEmailAvailable) {
            return saveGuestEmail(email);
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
            return setShippingAddress(true);
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
        const {
            updateShippingPrice,
            updateCheckoutStore,
            handleCheckoutError,
            shippingMethods,
        } = this.props;
        const { shipping_address, shipping_method_code } = addressInformation;

        const selectedShippingMethod = shippingMethods.find(
            (method) => `${method.carrier_code}_${method.method_code}` === shipping_method_code,
        );

        updateCheckoutStore({
            shippingAddress: shipping_address,
            selectedShippingMethod,
        });

        updateCheckoutStore({ isCheckoutLoading: true });

        if (!isSignedIn()) {
            if (!(await this.createUserOrSaveGuest())) {
                updateCheckoutStore({ isCheckoutLoading: false });

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
                    checkoutStep: CheckoutSteps.BILLING_STEP,
                    paymentTotals: totals,
                });
                updateCheckoutStore({ isCheckoutLoading: false });
            },
            handleCheckoutError,
        );
    }

    async savePaymentInformation(paymentInformation: PaymentInformation): Promise<void> {
        const {
            totals: {
                is_virtual,
            },
            updateCheckoutStore,
            saveBillingAddress,
            handleCheckoutError,
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

        this.setState({ billingAddress });
        updateCheckoutStore({ isCheckoutLoading: true });

        if (!isSignedIn()) {
            if (!(await this.createUserOrSaveGuest())) {
                updateCheckoutStore({ isCheckoutLoading: false });

                return;
            }
        }

        await saveBillingAddress(paymentInformation).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/savePaymentInformation/saveBillingAddress/then */
            () => this.savePaymentMethodAndPlaceOrder(paymentInformation),
            handleCheckoutError,
        );
    }

    async savePaymentMethodAndPlaceOrder(paymentInformation: PaymentInformation): Promise<void> {
        const { handleCheckoutError } = this.props;
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
            handleCheckoutError(e as NetworkError);
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
