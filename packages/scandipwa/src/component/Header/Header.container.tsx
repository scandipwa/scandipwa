/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { Location } from 'history';
import { ChangeEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import { NavigationAbstractContainer } from 'Component/NavigationAbstract/NavigationAbstract.container';
import { SHARE_WISHLIST_POPUP_ID } from 'Component/ShareWishlistPopup/ShareWishlistPopup.config';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationState, NavigationType } from 'Store/Navigation/Navigation.type';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import Header from './Header.component';
import { Page } from './Header.config';
import {
    HeaderComponentProps,
    HeaderContainerMapStateProps,
    HeaderContainerProps,
    HeaderContainerPropsKeys,
    HeaderContainerState,
    HeaderMapDispatchToProps
} from './Header.type';

/** @namespace Component/Header/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): HeaderContainerMapStateProps => ({
    navigationState: state.NavigationReducer[ NavigationType.TOP_NAVIGATION_TYPE ].navigationState,
    cartTotals: state.CartReducer.cartTotals,
    totals: state.CartReducer.cartTotals,
    compareTotals: state.ProductCompareReducer.count,
    Loading: state.MyAccountReducer.isLoading,
    header_logo_src: state.ConfigReducer.header_logo_src,
    isOffline: state.OfflineReducer.isOffline,
    logo_alt: state.ConfigReducer.logo_alt,
    logo_height: state.ConfigReducer.logo_height,
    logo_width: state.ConfigReducer.logo_width,
    isLoading: state.ConfigReducer.isLoading,
    device: state.ConfigReducer.device,
    activeOverlay: state.OverlayReducer.activeOverlay,
    isWishlistLoading: state.WishlistReducer.isLoading
});

/** @namespace Component/Header/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): HeaderMapDispatchToProps => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    showPopup: (payload) => dispatch(showPopup(SHARE_WISHLIST_POPUP_ID, payload)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(NavigationType.TOP_NAVIGATION_TYPE))
});

export const DEFAULT_HEADER_STATE = {
    name: DEFAULT_STATE_NAME,
    isHiddenOnMobile: false
};

/** @namespace Component/Header/Container */
export class HeaderContainer extends NavigationAbstractContainer<HeaderContainerProps, HeaderContainerState> {
    static defaultProps = {
        header_logo_src: ''
    };

    default_state = DEFAULT_HEADER_STATE;

    routeMap: Record<string, NavigationState> = {
        // eslint-disable-next-line max-len
        '/customer/account/confirm': { name: Page.CMS_PAGE, title: __('Confirm account'), onBackClick: () => history.push(appendWithStoreCode('/')) },
        '/category': { name: Page.CATEGORY },
        '/checkout/success': { name: Page.CHECKOUT_SUCCESS },
        '/checkout': { name: Page.CHECKOUT, onBackClick: (): void => history.push(appendWithStoreCode('/cart')) },
        '/customer/account': {
            name: Page.CUSTOMER_ACCOUNT_PAGE, onBackClick: (): void => history.push(appendWithStoreCode('/'))
        },
        '/product': { name: Page.PDP, onBackClick: (): void => history.goBack() },
        '/cart': { name: Page.CART },
        '/menu': { name: Page.MENU },
        '/page': { name: Page.CMS_PAGE, onBackClick: (): void => history.goBack() },
        '/contact': { name: Page.CONTACT_US, onBackClick: (): void => history.goBack() },
        '/': { name: DEFAULT_STATE_NAME, isHiddenOnMobile: true }
    };

    containerFunctions = {
        onBackButtonClick: this.onBackButtonClick.bind(this),
        onCloseButtonClick: this.onCloseButtonClick.bind(this),
        onSearchBarFocus: this.onSearchBarFocus.bind(this),
        onClearSearchButtonClick: this.onClearSearchButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onSearchBarChange: this.onSearchBarChange.bind(this),
        onEditButtonClick: this.onEditButtonClick.bind(this),
        onMinicartButtonClick: this.onMinicartButtonClick.bind(this),
        onOkButtonClick: this.onOkButtonClick.bind(this),
        onCancelButtonClick: this.onCancelButtonClick.bind(this),
        onSearchOutsideClick: this.onSearchOutsideClick.bind(this),
        onMyAccountOutsideClick: this.onMyAccountOutsideClick.bind(this),
        onMinicartOutsideClick: this.onMinicartOutsideClick.bind(this),
        onSignIn: this.onSignIn.bind(this),
        shareWishlist: this.shareWishlist.bind(this),
        hideActiveOverlay: this.props.hideActiveOverlay
    };

    containerProps(): Pick<HeaderComponentProps, HeaderContainerPropsKeys> {
        const {
            activeOverlay,
            navigationState,
            cartTotals,
            compareTotals,
            Loading,
            header_logo_src,
            logo_alt,
            logo_height,
            logo_width,
            isLoading,
            device,
            isWishlistLoading
        } = this.props;

        const {
            isClearEnabled,
            searchCriteria,
            showMyAccountLogin,
            shouldRenderCartOverlay
        } = this.state;

        const {
            location: {
                pathname
            }
        } = history;

        const isCheckout = pathname.includes(CheckoutStepUrl.CHECKOUT_URL);

        return {
            activeOverlay,
            navigationState,
            cartTotals,
            compareTotals,
            Loading,
            header_logo_src,
            logo_alt,
            logo_height,
            logo_width,
            isLoading,
            isClearEnabled,
            searchCriteria,
            isCheckout,
            showMyAccountLogin,
            device,
            isWishlistLoading,
            shouldRenderCartOverlay,
            firstname: this.getUserName()
        };
    }

    __construct(props: HeaderContainerProps): void {
        super.__construct?.(props);

        this.state = {
            prevPathname: '',
            searchCriteria: '',
            isClearEnabled: this.getIsClearEnabled(),
            showMyAccountLogin: false
        };
    }

    componentDidMount(): void {
        this.handleHeaderVisibility();
        super.componentDidMount();
    }

    componentDidUpdate(prevProps: HeaderContainerProps): void {
        this.hideSearchOnStateChange(prevProps);
        this.handleHeaderVisibility();
        this.navigateToShippingStep(prevProps);
    }

    shareWishlist(): void {
        const { showPopup } = this.props;
        showPopup({ title: __('Share Wishlist') });
    }

    navigateToShippingStep(prevProps: HeaderContainerProps): void {
        const { totals: { is_virtual, items } } = this.props;
        const { totals: { items: prevItems } } = prevProps;
        const { location: { pathname } } = history;

        if (pathname.includes(CheckoutStepUrl.BILLING_URL)
            && !is_virtual
            && items
            && prevItems
            && prevItems.length !== items.length
        ) {
            history.push({ pathname: appendWithStoreCode(CheckoutStepUrl.SHIPPING_URL) });
        }
    }

    getNavigationState(): NavigationState {
        const { navigationState } = this.props;

        const { pathname } = location;
        const { state: historyState } = window.history || {};
        const { state = {} } = historyState || {};

        // TODO: something here breaks /<STORE CODE> from being opened, and / when, the url-based stores are enabled.

        const activeRoute = Object.keys(this.routeMap)
            .find((route) => (
                route !== '/'
                || pathname === appendWithStoreCode('/')
                || pathname === '/'
            ) && pathname.includes(route));

        if (state.category || state.product || state.page || state.popupOpen) { // keep state if it category is in state
            return navigationState;
        }

        if (activeRoute && this.routeMap[ activeRoute ]) {
            return this.routeMap[ activeRoute ];
        }

        return this.default_state;
    }

    getUserName(): string | undefined {
        const { firstname } = BrowserDatabase.getItem(CUSTOMER) || {};

        return firstname;
    }

    hideSearchOnStateChange(prevProps: HeaderContainerProps): void {
        const { navigationState: { name: prevName } } = prevProps;
        const { navigationState: { name } } = this.props;

        if (prevName === Page.SEARCH && prevName !== name) {
            this.hideSearchOverlay();
        }
    }

    hideSearchOverlay(): void {
        const { hideActiveOverlay, activeOverlay } = this.props;

        this.setState({ searchCriteria: '' });

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        if (activeOverlay === Page.SEARCH) {
            hideActiveOverlay();
        }
    }

    handleHeaderVisibility(): void {
        const { navigationState: { isHiddenOnMobile } } = this.props;

        if (isHiddenOnMobile) {
            document.documentElement.classList.add('hiddenHeader');

            return;
        }

        document.documentElement.classList.remove('hiddenHeader');
    }

    handleMobileUrlChange(history: Location) {
        const { prevPathname } = this.state;
        const { pathname } = history;
        const isClearEnabled = this.getIsClearEnabled();

        if (prevPathname === pathname) {
            return { isClearEnabled };
        }

        return {
            isClearEnabled,
            showMyAccountLogin: false
        };
    }

    getIsClearEnabled(): boolean {
        const { location: { search } } = history;

        return new RegExp([
            'customFilters',
            'priceMax',
            'priceMin'
        ].join('|')).test(search);
    }

    onBackButtonClick(e: MouseEvent): void {
        const { navigationState: { onBackClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onBackClick) {
            onBackClick(e);
        }
    }

    onCloseButtonClick(e: MouseEvent): void {
        const { hideActiveOverlay, goToPreviousNavigationState } = this.props;
        const { navigationState: { onCloseClick } } = this.props;

        this.setState({ searchCriteria: '' });

        if (onCloseClick) {
            onCloseClick(e);
        }

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    onSearchOutsideClick(): void {
        const {
            goToPreviousNavigationState,
            navigationState: { name }
        } = this.props;

        if (name === Page.SEARCH) {
            this.hideSearchOverlay();
            goToPreviousNavigationState();
        }
    }

    onSearchBarFocus(): void {
        const {
            setNavigationState,
            goToPreviousNavigationState,
            showOverlay,
            navigationState: { name },
            device
        } = this.props;

        if (
            (!device.isMobile && name === Page.SEARCH)
            || (device.isMobile && name !== Page.MENU)
        ) {
            return;
        }

        showOverlay(Page.SEARCH);

        setNavigationState({
            name: Page.SEARCH,
            onBackClick: () => {
                showOverlay(Page.MENU);
                goToPreviousNavigationState();
            }
        });
    }

    onSearchBarChange(
        { target: { value: searchCriteria } }: ChangeEvent<HTMLInputElement> | { target: { value: string } }
    ): void {
        this.setState({ searchCriteria });
    }

    onClearSearchButtonClick(): void {
        this.setState({ searchCriteria: '' });
    }

    onMyAccountButtonClick(): void {
        const {
            showOverlay,
            setNavigationState
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: appendWithStoreCode(AccountPageUrl.ACCOUNT_URL) });

            return;
        }

        this.setState({ showMyAccountLogin: true }, () => {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({
                name: Page.CHECKOUT_ACCOUNT,
                title: 'Sign in',
                onCloseClick: this.closeOverlay
            });
        });
    }

    onMyAccountOutsideClick(): void {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name },
            device
        } = this.props;

        if (device.isMobile
            || (name !== Page.CUSTOMER_ACCOUNT
            && name !== Page.CUSTOMER_SUB_ACCOUNT
            && name !== Page.CHECKOUT_ACCOUNT)
        ) {
            return;
        }

        if (name === Page.CUSTOMER_SUB_ACCOUNT) {
            goToPreviousNavigationState();
        }

        this.goToDefaultHeaderState();
        hideActiveOverlay();
    }

    closeOverlay(): void {
        const { location: { pathname } } = history;

        if (pathname.includes(CheckoutStepUrl.CHECKOUT_URL)) {
            this.setState({ showMyAccountLogin: false });
        }
    }

    onSignIn(): void {
        const { navigationState: { title }, totals: { is_virtual }, goToPreviousNavigationState } = this.props;
        const { location: { pathname } } = history;

        goToPreviousNavigationState();

        if (pathname.includes(CheckoutStepUrl.CHECKOUT_URL)) {
            this.setState({ showMyAccountLogin: false });
        }

        if (pathname.includes(CheckoutStepUrl.BILLING_URL) && title && !is_virtual) {
            history.push({ pathname: appendWithStoreCode(CheckoutStepUrl.SHIPPING_URL) });
        }
    }

    onMinicartButtonClick(): void {
        const {
            showOverlay,
            navigationState: { name },
            device
        } = this.props;

        if (name === Page.CART_OVERLAY) {
            return;
        }

        if (!device.isMobile) {
            this.setState({ shouldRenderCartOverlay: true });

            showOverlay(Page.CART_OVERLAY);

            return;
        }

        history.push(appendWithStoreCode(`/${Page.CART}`));
    }

    onMinicartOutsideClick(): void {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name },
            device
        } = this.props;

        if (device.isMobile || name !== Page.CART_OVERLAY) {
            return;
        }

        goToPreviousNavigationState();
        hideActiveOverlay();
    }

    onEditButtonClick(e: MouseEvent): void {
        const { navigationState: { onEditClick } } = this.props;

        if (onEditClick) {
            onEditClick(e);
        }
    }

    onOkButtonClick(e: MouseEvent): void {
        const {
            navigationState: { onOkClick, shouldNotGoToPrevState = false },
            goToPreviousNavigationState
        } = this.props;

        if (onOkClick) {
            onOkClick(e);
        }

        if (!shouldNotGoToPrevState) {
            goToPreviousNavigationState();
        }
    }

    onCancelButtonClick(): void {
        const {
            navigationState: { onCancelClick },
            goToPreviousNavigationState
        } = this.props;

        if (onCancelClick) {
            onCancelClick();
        }

        goToPreviousNavigationState();
    }

    render(): ReactElement {
        return (
            <Header
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
