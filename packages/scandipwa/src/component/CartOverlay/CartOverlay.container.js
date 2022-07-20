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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import STATUS from 'Component/CartItem/CartItem.config';
import { CART_EDITING, CART_OVERLAY } from 'Component/Header/Header.config';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { CartDisplayType, TotalsType } from 'Type/MiniCart.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartTotalSubPrice
} from 'Util/Cart';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import CartOverlay from './CartOverlay.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/CartOverlay/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    totals: state.CartReducer.cartTotals,
    isMobile: state.ConfigReducer.device.isMobile,
    guest_checkout: state.ConfigReducer.guest_checkout,
    currencyCode: state.CartReducer.cartTotals.quote_currency_code,
    activeOverlay: state.OverlayReducer.activeOverlay,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    cartShippingPrice: getCartShippingPrice(state),
    cartShippingSubPrice: getCartShippingSubPrice(state),
    cartDisplaySettings: state.ConfigReducer.cartDisplayConfig,
    minimumOrderAmount: state.CartReducer.cartTotals.minimum_order_amount
});

/** @namespace Component/CartOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    setNavigationState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    updateTotals: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateTotals(dispatch, options)
    ),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/CartOverlay/Container */
export class CartOverlayContainer extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        guest_checkout: PropTypes.bool,
        changeHeaderState: PropTypes.func.isRequired,
        showOverlay: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        setNavigationState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        cartTotalSubPrice: PropTypes.number,
        cartDisplaySettings: CartDisplayType.isRequired,
        currencyCode: PropTypes.string,
        activeOverlay: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired,
        cartShippingPrice: PropTypes.number,
        cartShippingSubPrice: PropTypes.number,
        minimumOrderAmount: PropTypes.shape({
            minimum_order_amount_reached: PropTypes.bool,
            minimum_order_description: PropTypes.string
        })
    };

    static defaultProps = {
        guest_checkout: true,
        cartTotalSubPrice: null,
        cartShippingPrice: 0,
        cartShippingSubPrice: null,
        currencyCode: null,
        minimumOrderAmount: {}
    };

    state = {
        isEditing: false,
        isCartItemLoading: false
    };

    containerFunctions = {
        changeHeaderState: this.changeHeaderState.bind(this),
        handleCheckoutClick: this.handleCheckoutClick.bind(this),
        onCartItemLoading: this.onCartItemLoading.bind(this)
    };

    containerProps() {
        const {
            totals,
            totals: {
                items = []
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
                minimum_order_amount_reached: minimumOrderAmountReached = true
            }
        } = this.props;
        const { isEditing, isCartItemLoading } = this.state;

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
            isCartItemLoading,
            minimumOrderAmountReached,
            hasOutOfStockProductsInCart: this.hasOutOfStockProductsInCartItems(items)
        };
    }

    hasOutOfStockProductsInCartItems(items = []) {
        return items.some(({ status = STATUS.ok }) => status !== STATUS.ok);
    }

    handleCheckoutClick(e) {
        const {
            guest_checkout,
            showOverlay,
            showNotification,
            setNavigationState,
            hideActiveOverlay,
            totals
        } = this.props;

        // to prevent outside-click handler trigger
        e.nativeEvent.stopImmediatePropagation();

        const hasOutOfStockProductsInCart = this.hasOutOfStockProductsInCartItems(totals.items);

        if (hasOutOfStockProductsInCart) {
            showNotification('error', __('Cannot proceed to checkout. Remove out of stock products first.'));
            e.preventDefault();

            return;
        }

        // Guest checkout enabled or user is signed in => proceed to the checkout
        if (guest_checkout || isSignedIn()) {
            hideActiveOverlay();
            history.push({ pathname: appendWithStoreCode(CHECKOUT_URL) });
            scrollToTop();

            return;
        }

        // there is no mobile, as cart overlay is not visible here
        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
        showNotification('info', __('Please sign-in to complete checkout!'));
        setNavigationState({ name: CUSTOMER_ACCOUNT_OVERLAY_KEY, title: 'Sign in' });
    }

    changeHeaderState() {
        const {
            changeHeaderState,
            totals: { count = 0 }
        } = this.props;
        const title = __('%s Items', count || 0);

        changeHeaderState({
            name: CART_OVERLAY,
            title,
            onEditClick: () => {
                this.setState({ isEditing: true });
                changeHeaderState({
                    name: CART_EDITING,
                    title,
                    onOkClick: () => this.setState({ isEditing: false }),
                    onCancelClick: () => this.setState({ isEditing: false })
                });
            },
            onCloseClick: () => this.setState({ isEditing: false })
        });
    }

    onCartItemLoading(isCartItemLoading) {
        this.setState({ isCartItemLoading });
    }

    render() {
        return (
            <CartOverlay
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayContainer);
