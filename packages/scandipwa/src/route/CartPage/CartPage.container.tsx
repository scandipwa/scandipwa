/* eslint-disable react/prop-types */
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
import { TotalsItem } from 'Query/Cart.type';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { IndexedCartItem } from 'Store/Cart/Cart.type';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import {
    getCartShippingPrice,
    getCartShippingSubPrice,
    getCartSubtotal,
    getCartSubtotalSubPrice,
    getCartTotalSubPrice,
    getItemsCountLabel,
    trimCrossSellDuplicateItems
} from 'Util/Cart';
import history from 'Util/History';
import { getProductInStock } from 'Util/Product/Extract';
import { StockCheckProduct } from 'Util/Product/Product.type';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import CartPage from './CartPage.component';
import {
    CartPageComponentContainerPropKeys,
    CartPageComponentProps,
    CartPageContainerFunctions,
    CartPageContainerMapDispatchProps,
    CartPageContainerMapStateProps,
    CartPageContainerProps,
    CartPageContainerState
} from './CartPage.type';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Route/CartPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CartPageContainerMapStateProps => ({
    totals: state.CartReducer.cartTotals,
    headerState: state.NavigationReducer[ NavigationType.TOP_NAVIGATION_TYPE ].navigationState,
    guest_checkout: state.ConfigReducer.guest_checkout,
    device: state.ConfigReducer.device,
    cartDisplayConfig: state.ConfigReducer.cartDisplayConfig,
    cartSubtotal: getCartSubtotal(state),
    cartSubtotalSubPrice: getCartSubtotalSubPrice(state),
    cartTotalSubPrice: getCartTotalSubPrice(state),
    cartShippingPrice: getCartShippingPrice(state),
    cartShippingSubPrice: getCartShippingSubPrice(state),
    isLoading: state.CartReducer.isLoading,
    minimumOrderAmount: state.CartReducer.cartTotals.minimum_order_amount
});

/** @namespace Route/CartPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CartPageContainerMapDispatchProps => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, state)),
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    ),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateCrossSellProducts: (items) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateCrossSellProducts(items as unknown as TotalsItem[], dispatch)
    )
});

/** @namespace Route/CartPage/Container */
export class CartPageContainer extends PureComponent<CartPageContainerProps, CartPageContainerState> {
    containerFunctions: CartPageContainerFunctions = {
        onCheckoutButtonClick: this.onCheckoutButtonClick.bind(this),
        onCartItemLoading: this.onCartItemLoading.bind(this)
    };

    state: CartPageContainerState = {
        areDetailsLoaded: false,
        isCartItemLoading: false,
        isInitialLoad: true
    };

    componentDidMount(): void {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Cart') });

        this._updateBreadcrumbs();
        this._changeHeaderState();
        this._updateCrossSellProducts();
    }

    componentDidUpdate(prevProps: CartPageContainerProps): void {
        const {
            changeHeaderState,
            totals: { total_quantity = 0 },
            headerState,
            headerState: { name },
            isLoading
        } = this.props;

        const {
            totals: { total_quantity: prevItemsQty = 0 },
            headerState: { name: prevName }
        } = prevProps;

        const { isInitialLoad } = this.state;

        if (name !== prevName) {
            if (name === Page.CART) {
                this._changeHeaderState();
            }
        }

        if (total_quantity !== prevItemsQty && prevItemsQty !== undefined) {
            const title = getItemsCountLabel(total_quantity);

            changeHeaderState({
                ...headerState,
                title
            });
        }

        if (total_quantity !== prevItemsQty) {
            this._updateCrossSellProducts();
        }

        if (!isLoading && isInitialLoad) {
            this.toggleIsInitialLoad();
        }
    }

    containerProps(): Pick<CartPageComponentProps, CartPageComponentContainerPropKeys> {
        const {
            totals,
            totals: {
                items = []
            } = {},
            device,
            minimumOrderAmount: {
                minimum_order_amount_reached: minimumOrderAmountReached = true,
                minimum_order_description: minimumOrderDescription = ''
            }
        } = this.props;

        const { areDetailsLoaded, isCartItemLoading, isInitialLoad } = this.state;

        return {
            hasOutOfStockProductsInCart: this.hasOutOfStockProductsInCartItems(items),
            totals,
            isCartItemLoading,
            device,
            isInitialLoad,
            minimumOrderAmountReached,
            minimumOrderDescription,
            areDetailsLoaded
        };
    }

    toggleIsInitialLoad(): void {
        this.setState({ isInitialLoad: false });
    }

    hasOutOfStockProductsInCartItems(items: IndexedCartItem[]): boolean {
        return items.some(({ product }) => !getProductInStock(product as Partial<StockCheckProduct>));
    }

    onCheckoutButtonClick(e: MouseEvent): void {
        const {
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
                pathname: appendWithStoreCode(CheckoutStepUrl.CHECKOUT_URL)
            });
            scrollToTop();

            return;
        }

        if (isSignedIn()) {
            history.push({
                pathname: appendWithStoreCode(CheckoutStepUrl.CHECKOUT_URL)
            });
            scrollToTop();

            return;
        }

        // fir notification whatever device that is
        showNotification(NotificationType.INFO, __('Please sign-in to complete checkout!'));

        if (device.isMobile) { // for all mobile devices, simply switch route
            history.push({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });

            return;
        }

        // for desktop, just open customer overlay
        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
    }

    onCartItemLoading(isCartItemLoading: boolean): void {
        this.setState({ isCartItemLoading });
    }

    _updateBreadcrumbs(): void {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            { url: CART_URL, name: __('Shopping cart') }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    _changeHeaderState(): void {
        const { changeHeaderState, totals: { total_quantity = 0 } } = this.props;
        const title = getItemsCountLabel(total_quantity);

        changeHeaderState({
            name: Page.CART,
            title,
            onCloseClick: () => history.goBack()
        });
    }

    async _updateCrossSellProducts(): Promise<void> {
        const {
            updateCrossSellProducts,
            totals: {
                items = []
            } = {}
        } = this.props;

        const list = trimCrossSellDuplicateItems(items);

        await updateCrossSellProducts(list);

        this.setState({ areDetailsLoaded: true });
    }

    render(): ReactElement {
        return (
            <CartPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
