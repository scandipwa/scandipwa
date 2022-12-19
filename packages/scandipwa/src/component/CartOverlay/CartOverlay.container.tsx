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

import { MouseEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Page } from 'Component/Header/Header.config';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { IndexedCartItem } from 'Store/Cart/Cart.type';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartTotalSubPrice,
} from 'Util/Cart';
import history from 'Util/History';
import { getProductInStock } from 'Util/Product/Extract';
import { StockCheckProduct } from 'Util/Product/Product.type';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import CartOverlay from './CartOverlay.component';
import {
    CartOverlayComponentContainerPropKeys,
    CartOverlayComponentProps,
    CartOverlayContainerMapDispatchProps,
    CartOverlayContainerMapStateProps,
    CartOverlayContainerProps,
    CartOverlayContainerState,
} from './CartOverlay.type';

export const NavigationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Navigation/Navigation.dispatcher'
);

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/CartOverlay/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CartOverlayContainerMapStateProps => ({
    totals: state.CartReducer.cartTotals,
    isMobile: state.ConfigReducer.device.isMobile,
    guest_checkout: state.ConfigReducer.guest_checkout,
    currencyCode: state.CartReducer.cartTotals?.prices?.quote_currency_code,
    activeOverlay: state.OverlayReducer.activeOverlay,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    cartShippingPrice: getCartShippingPrice(state),
    cartShippingSubPrice: getCartShippingSubPrice(state),
    cartDisplaySettings: state.ConfigReducer.cartDisplayConfig,
    minimumOrderAmount: state.CartReducer.cartTotals.minimum_order_amount || {},
});

/** @namespace Component/CartOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CartOverlayContainerMapDispatchProps => ({
    setNavigationState: (stateName) => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName),
    ),
    changeHeaderState: (state) => NavigationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state),
    ),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    showNotification: (type, message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(type, message),
    ),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
});

/** @namespace Component/CartOverlay/Container */
export class CartOverlayContainer extends PureComponent<CartOverlayContainerProps> {
    static defaultProps: Partial<CartOverlayContainerProps> = {
        guest_checkout: true,
        cartTotalSubPrice: null,
        cartShippingPrice: 0,
        cartShippingSubPrice: null,
        currencyCode: undefined,
        minimumOrderAmount: {},
    };

    state: CartOverlayContainerState = {
        isEditing: false,
    };

    containerFunctions = {
        changeHeaderState: this.changeHeaderState.bind(this),
        handleCheckoutClick: this.handleCheckoutClick.bind(this),
        scrollToTop: this.scrollToTop.bind(this),
    };

    containerProps(): Pick<CartOverlayComponentProps, CartOverlayComponentContainerPropKeys> {
        const {
            totals,
            totals: {
                items = [],
            } = {},
            showOverlay,
            currencyCode,
            activeOverlay,
            cartTotalSubPrice,
            cartDisplaySettings,
            isMobile,
            cartShippingPrice,
            cartShippingSubPrice,
            minimumOrderAmount: {
                minimum_order_amount_reached: minimumOrderAmountReached = true,
            },
        } = this.props;
        const { isEditing } = this.state;

        return {
            totals,
            showOverlay,
            currencyCode,
            activeOverlay,
            cartTotalSubPrice,
            cartDisplaySettings,
            isEditing,
            isMobile,
            cartShippingPrice,
            cartShippingSubPrice,
            minimumOrderAmountReached,
            hasOutOfStockProductsInCart: this.hasOutOfStockProductsInCartItems(items),
        };
    }

    hasOutOfStockProductsInCartItems(items: IndexedCartItem[] = []): boolean {
        return items.some(({ product }) => !getProductInStock(product as Partial<StockCheckProduct>));
    }

    handleCheckoutClick(e: MouseEvent): void {
        const {
            guest_checkout,
            showOverlay,
            showNotification,
            setNavigationState,
            hideActiveOverlay,
            totals,
        } = this.props;

        // to prevent outside-click handler trigger
        e.nativeEvent.stopImmediatePropagation();

        const hasOutOfStockProductsInCart = this.hasOutOfStockProductsInCartItems(totals.items);

        if (hasOutOfStockProductsInCart) {
            showNotification(
                NotificationType.ERROR,
                __('Cannot proceed to checkout. Remove out of stock products first.'),
            );

            e.preventDefault();

            return;
        }

        // Guest checkout enabled or user is signed in => proceed to the checkout
        if (guest_checkout || isSignedIn()) {
            hideActiveOverlay();
            history.push({ pathname: appendWithStoreCode(CheckoutStepUrl.CHECKOUT_URL) });
            scrollToTop();

            return;
        }

        // there is no mobile, as cart overlay is not visible here
        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
        showNotification(NotificationType.INFO, __('Please sign-in to complete checkout!'));
        setNavigationState({ name: CUSTOMER_ACCOUNT_OVERLAY_KEY, title: 'Sign in' });
    }

    changeHeaderState(): void {
        const {
            changeHeaderState,
            totals: { total_quantity = 0 },
        } = this.props;
        const title = __('%s Items', total_quantity || 0);

        changeHeaderState({
            name: Page.CART_OVERLAY,
            title,
            onEditClick: () => {
                this.setState({ isEditing: true });
                changeHeaderState({
                    name: Page.CART_EDITING,
                    title,
                    onOkClick: () => this.setState({ isEditing: false }),
                    onCancelClick: () => this.setState({ isEditing: false }),
                });
            },
            onCloseClick: () => this.setState({ isEditing: false }),
        });
    }

    scrollToTop(): void {
        scrollToTop();
    }

    render(): ReactElement {
        return (
            <CartOverlay
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayContainer);
