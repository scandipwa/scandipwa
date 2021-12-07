/* eslint-disable react/prop-types */
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

import { CART } from 'Component/Header/Header.config';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { DeviceType } from 'Type/Device.type';
import { TotalsType } from 'Type/MiniCart.type';
import { HistoryType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartSubtotal,
    getCartSubtotalSubPrice,
    getCartTotalSubPrice,
    getItemsCountLabel
} from 'Util/Cart';
import history from 'Util/History';
import { getProductInStock } from 'Util/Product/Extract';
import { appendWithStoreCode } from 'Util/Url';

import CartPage from './CartPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Route/CartPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    totals: state.CartReducer.cartTotals,
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    guest_checkout: state.ConfigReducer.guest_checkout,
    device: state.ConfigReducer.device,
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    cartSubtotal: getCartSubtotal(state),
    cartSubtotalSubPrice: getCartSubtotalSubPrice(state),
    cartTotalSubPrice: getCartTotalSubPrice(state),
    cartShippingPrice: getCartShippingPrice(state),
    cartShippingSubPrice: getCartShippingSubPrice(state)
});

/** @namespace Route/CartPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    ),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateCrossSellProducts: (items) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateCrossSellProducts(items, dispatch)
    )
});

/** @namespace Route/CartPage/Container */
export class CartPageContainer extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        updateCrossSellProducts: PropTypes.func.isRequired,
        showOverlay: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        guest_checkout: PropTypes.bool.isRequired,
        history: HistoryType.isRequired,
        totals: TotalsType.isRequired,
        device: DeviceType.isRequired
    };

    containerFunctions = {
        onCheckoutButtonClick: this.onCheckoutButtonClick.bind(this),
        onCartItemLoading: this.onCartItemLoading.bind(this)
    };

    state = {
        isCartItemLoading: false
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Cart') });

        this._updateBreadcrumbs();
        this._changeHeaderState();
        this._updateCrossSellProducts();
    }

    componentDidUpdate(prevProps) {
        const {
            changeHeaderState,
            totals: { items_qty = 0 },
            headerState,
            headerState: { name }
        } = this.props;

        const {
            totals: { items_qty: prevItemsQty = 0 },
            headerState: { name: prevName }
        } = prevProps;

        if (name !== prevName) {
            if (name === CART) {
                this._changeHeaderState();
            }
        }

        if (items_qty !== prevItemsQty && prevItemsQty !== undefined) {
            const title = getItemsCountLabel(items_qty);
            changeHeaderState({
                ...headerState,
                title
            });
        }

        if (items_qty !== prevItemsQty) {
            this._updateCrossSellProducts();
        }
    }

    containerProps() {
        const {
            totals,
            totals: {
                items = []
            } = {},
            device
        } = this.props;

        const { isCartItemLoading } = this.state;

        return {
            hasOutOfStockProductsInCart: this.hasOutOfStockProductsInCartItems(items),
            totals,
            isCartItemLoading,
            device
        };
    }

    hasOutOfStockProductsInCartItems(items) {
        return items.some(({ product }) => !getProductInStock(product));
    }

    onCheckoutButtonClick(e) {
        const {
            history,
            guest_checkout,
            showOverlay,
            showNotification,
            device,
            totals: { items = [] } = {}
        } = this.props;

        // to prevent outside-click handler trigger
        e.nativeEvent.stopImmediatePropagation();

        if (this.hasOutOfStockProductsInCartItems(items)) {
            return;
        }

        if (guest_checkout) {
            history.push({
                pathname: appendWithStoreCode(CHECKOUT_URL)
            });
            scrollToTop();

            return;
        }

        if (isSignedIn()) {
            history.push({
                pathname: appendWithStoreCode(CHECKOUT_URL)
            });
            scrollToTop();

            return;
        }

        // fir notification whatever device that is
        showNotification('info', __('Please sign-in to complete checkout!'));

        if (device.isMobile) { // for all mobile devices, simply switch route
            history.push({ pathname: appendWithStoreCode(ACCOUNT_URL) });

            return;
        }

        // for desktop, just open customer overlay
        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
    }

    onCartItemLoading(isCartItemLoading) {
        this.setState({ isCartItemLoading });
    }

    _updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            { url: '/cart', name: __('Shopping cart') }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    _changeHeaderState() {
        const { changeHeaderState, totals: { items_qty } } = this.props;
        const title = getItemsCountLabel(items_qty);

        changeHeaderState({
            name: CART,
            title,
            onCloseClick: () => history.goBack()
        });
    }

    _updateCrossSellProducts() {
        const {
            updateCrossSellProducts,
            totals: {
                items = []
            } = {}
        } = this.props;

        updateCrossSellProducts(items);
    }

    render() {
        return (
            <CartPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
