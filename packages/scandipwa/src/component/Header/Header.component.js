/* eslint-disable max-len */

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
import { createRef, lazy, Suspense } from 'react';

import CartIcon from 'Component/CartIcon';
import ChevronIcon from 'Component/ChevronIcon';
import { LEFT } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import CompareIcon from 'Component/CompareIcon';
import CurrencySwitcher from 'Component/CurrencySwitcher';
import ExclamationMarkIcon from 'Component/ExclamationMarkIcon';
import Link from 'Component/Link';
import Logo from 'Component/Logo';
import Menu from 'Component/Menu';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import NavigationAbstract from 'Component/NavigationAbstract/NavigationAbstract.component';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import OfflineNotice from 'Component/OfflineNotice';
import PopupSuspense from 'Component/PopupSuspense';
import SearchField from 'Component/SearchField';
import ShareIcon from 'Component/ShareIcon';
import StoreSwitcher from 'Component/StoreSwitcher';
import UserIcon from 'Component/UserIcon';
import { DeviceType } from 'Type/Device.type';
import { TotalsType } from 'Type/MiniCart.type';
import { isSignedIn } from 'Util/Auth';
import { isCrawler, isSSR } from 'Util/Browser';
import { decodeString } from 'Util/Common';
import CSS from 'Util/CSS';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';

import {
    CART,
    CART_EDITING,
    CART_OVERLAY,
    CATEGORY,
    CHECKOUT,
    CHECKOUT_ACCOUNT,
    CHECKOUT_SUCCESS,
    CMS_PAGE,
    CONTACT_US,
    CUSTOMER_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE,
    CUSTOMER_ORDER,
    CUSTOMER_SUB_ACCOUNT,
    CUSTOMER_WISHLIST,
    FILTER,
    MENU,
    MENU_SUBCATEGORY,
    NO_MATCH,
    PDP,
    POPUP,
    PRODUCT_COMPARE,
    SEARCH
} from './Header.config';

import './Header.style';

export const CartOverlay = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "overlay" */ 'Component/CartOverlay'));
export const MyAccountOverlay = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "overlay" */ 'Component/MyAccountOverlay'));

/** @namespace Component/Header/Component */
export class Header extends NavigationAbstract {
    static propTypes = {
        navigationState: PropTypes.shape({
            name: PropTypes.string,
            onBackClick: PropTypes.func,
            title: PropTypes.string
        }).isRequired,
        cartTotals: TotalsType.isRequired,
        compareTotals: PropTypes.number.isRequired,
        Loading: PropTypes.bool.isRequired,
        onBackButtonClick: PropTypes.func.isRequired,
        onCloseButtonClick: PropTypes.func.isRequired,
        onSearchBarFocus: PropTypes.func.isRequired,
        onClearSearchButtonClick: PropTypes.func.isRequired,
        onMyAccountButtonClick: PropTypes.func.isRequired,
        onSearchBarChange: PropTypes.func.isRequired,
        isWishlistLoading: PropTypes.bool.isRequired,
        onEditButtonClick: PropTypes.func.isRequired,
        onMinicartButtonClick: PropTypes.func.isRequired,
        onOkButtonClick: PropTypes.func.isRequired,
        onCancelButtonClick: PropTypes.func.isRequired,
        onSearchOutsideClick: PropTypes.func.isRequired,
        onMyAccountOutsideClick: PropTypes.func.isRequired,
        onMinicartOutsideClick: PropTypes.func.isRequired,
        isClearEnabled: PropTypes.bool.isRequired,
        searchCriteria: PropTypes.string.isRequired,
        shareWishlist: PropTypes.func.isRequired,
        header_logo_src: PropTypes.string,
        logo_alt: PropTypes.string,
        logo_height: PropTypes.number,
        logo_width: PropTypes.number,
        isLoading: PropTypes.bool,
        showMyAccountLogin: PropTypes.bool,
        isCheckout: PropTypes.bool.isRequired,
        onSignIn: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        logo_alt: 'ScandiPWA logo',
        logo_height: 25,
        logo_width: 200,
        showMyAccountLogin: false,
        header_logo_src: '',
        isLoading: true
    };

    logoRef = createRef();

    stateMap = {
        [DEFAULT_STATE_NAME]: {
            title: true,
            logo: true
        },
        [NO_MATCH]: {
            title: true
        },
        [POPUP]: {
            title: true,
            close: true
        },
        [PDP]: {
            back: true,
            title: true
        },
        [CATEGORY]: {
            back: true,
            title: true
        },
        [CUSTOMER_ACCOUNT]: {
            title: true
        },
        [CUSTOMER_SUB_ACCOUNT]: {
            title: true,
            back: true
        },
        [CUSTOMER_ACCOUNT_PAGE]: {
            title: true
        },
        [CUSTOMER_WISHLIST]: {
            share: true,
            title: true
        },
        [CUSTOMER_ORDER]: {
            title: true,
            back: true
        },
        [MENU]: {
            search: true
        },
        [MENU_SUBCATEGORY]: {
            back: true,
            title: true,
            search: true
        },
        [SEARCH]: {
            search: true
        },
        [CART]: {
            title: true
        },
        [CART_OVERLAY]: {
            title: true
        },
        [CART_EDITING]: {
            ok: true,
            title: true,
            cancel: true
        },
        [FILTER]: {
            close: true,
            title: true
        },
        [CHECKOUT]: {
            back: true,
            title: true,
            account: true
        },
        [CHECKOUT_SUCCESS]: {
            title: true,
            account: true
        },
        [CHECKOUT_ACCOUNT]: {
            title: true,
            close: true
        },
        [CMS_PAGE]: {
            back: true,
            title: true
        },
        [CONTACT_US]: {
            title: true,
            back: true
        },
        [PRODUCT_COMPARE]: {
            title: true,
            back: true
        }
    };

    renderMap = {
        cancel: this.renderCancelButton.bind(this),
        back: this.renderBackButton.bind(this),
        close: this.renderCloseButton.bind(this),
        title: this.renderTitle.bind(this),
        logo: this.renderLogo.bind(this),
        search: this.renderSearchField.bind(this),
        renderDesktopIcons: this.renderDesktopIcons.bind(this),
        share: this.renderShareWishListButton.bind(this),
        ok: this.renderOkButton.bind(this)
    };

    // PureComponent suits perfectly for current component, as changes in almost all props (7+) need to trigger rerender.
    // Yet shouldComponentUpdate() is overridden in another component also extending NavigationAbstract
    // (i.e. NavigationTabs) to minimize rerenders. => We can't extend PureComponent from Header.
    // This is why shallow comparison behavior for all props  (like in PureComponent) is used here.
    shouldComponentUpdate(nextProps) {
        return Object.keys(nextProps).some((key) => nextProps[key] !== this.props[key]);
    }

    renderBackButton(isVisible = false) {
        const { onBackButtonClick, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <button
              key="back"
              block="Header"
              elem="Button"
              mods={ { type: 'back', isVisible } }
              onClick={ onBackButtonClick }
              aria-label="Go back"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            >
                <ChevronIcon direction={ LEFT } />
            </button>
        );
    }

    renderCloseButton(isVisible = false) {
        const { onCloseButtonClick, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <button
              key="close"
              block="Header"
              elem="Button"
              mods={ { type: 'close', isVisible } }
              onClick={ onCloseButtonClick }
              aria-label="Close"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            >
                <CloseIcon />
            </button>
        );
    }

    renderMenu() {
        const { isCheckout, device: { isMobile } } = this.props;

        if (isMobile || isCheckout) {
            return null;
        }

        return <Menu />;
    }

    renderSearchField(isVisible = false) {
        const {
            searchCriteria,
            onSearchOutsideClick,
            onSearchBarFocus,
            onSearchBarChange,
            onClearSearchButtonClick,
            navigationState: { name },
            isCheckout,
            hideActiveOverlay
        } = this.props;

        if (isCheckout) {
            return null;
        }

        return (
            <SearchField
              key="search"
              searchCriteria={ searchCriteria }
              onSearchOutsideClick={ onSearchOutsideClick }
              onSearchBarFocus={ onSearchBarFocus }
              onSearchBarChange={ onSearchBarChange }
              onClearSearchButtonClick={ onClearSearchButtonClick }
              isVisible={ isVisible }
              isActive={ name === SEARCH }
              hideActiveOverlay={ hideActiveOverlay }
            />
        );
    }

    renderShareWishListButton(isVisible = false) {
        const {
            isWishlistLoading,
            shareWishlist
        } = this.props;

        return (
            <button
              key="share"
              block="Header"
              elem="Button"
              mods={ { type: 'share', isVisible } }
              onClick={ shareWishlist }
              aria-label="Share"
              aria-hidden={ !isVisible }
              disabled={ isWishlistLoading }
            >
                <ShareIcon />
            </button>
        );
    }

    renderCompareCount() {
        const { compareTotals, Loading } = this.props;

        if (!compareTotals || Loading === true) {
            return null;
        }

        return (
            <span
              aria-label="Items in cart"
              block="Header"
              elem="CompareCount"
            >
                { compareTotals }
            </span>
        );
    }

    renderComparePageButton() {
        const {
            device: {
                isMobile
            } = {},
            isCheckout
        } = this.props;

        if (isCheckout || isMobile) {
            return null;
        }

        return (
            <div
              block="Header"
              elem="CompareButtonWrapper"
              key="compare"
            >
                <Link
                  to="compare"
                  key="compare"
                  block="Header"
                  elem="Button"
                  mods={ { type: 'compare' } }
                  aria-label={ __('Compare Page') }
                >
                    <CompareIcon />
                    { this.renderCompareCount() }
                </Link>
            </div>
        );
    }

    renderTitle(isVisible = false) {
        const { navigationState: { title } } = this.props;

        return (
            <h1
              key="title"
              block="Header"
              elem="Title"
              mods={ { isVisible } }
            >
                { title ? (<span>{ decodeString(title.replace(/\+/g, ' ')) }</span>) : (<span>{ title }</span>) }
            </h1>
        );
    }

    renderLogoImage() {
        const {
            header_logo_src,
            logo_alt,
            logo_height,
            logo_width
        } = this.props;

        // if no src defined from the backend, pass null in order to display placeholder
        // and prevent unnecessary load of corrupted resource
        const logoSrc = header_logo_src ? media(header_logo_src, LOGO_MEDIA) : null;

        CSS.setVariable(this.logoRef, 'header-logo-height', `${logo_height}px`);
        CSS.setVariable(this.logoRef, 'header-logo-width', `${logo_width}px`);

        return (
            <Logo
              src={ logoSrc }
              alt={ logo_alt }
              title={ logo_alt }
            />
        );
    }

    renderLogo(isVisible = false) {
        const { isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <Link
              to="/"
              aria-label="Go to homepage by clicking on ScandiPWA logo"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
              block="Header"
              elem="LogoWrapper"
              mods={ { isVisible } }
              key="logo"
            >
                { this.renderLogoImage() }
            </Link>
        );
    }

    renderAccountOverlayFallback() {
        return (
            <PopupSuspense
              actualOverlayKey={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
            />
        );
    }

    renderAccountOverlay() {
        const {
            isCheckout,
            showMyAccountLogin,
            onSignIn
        } = this.props;

        // This is here to prevent the popup-suspense from rendering
        if (!showMyAccountLogin) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderAccountOverlayFallback() }>
                <MyAccountOverlay
                  onSignIn={ onSignIn }
                  isCheckout={ isCheckout }
                />
            </Suspense>
        );
    }

    renderAccountButton() {
        const {
            onMyAccountButtonClick,
            device
        } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <button
              block="Header"
              elem="MyAccountWrapper"
              tabIndex="0"
              onClick={ onMyAccountButtonClick }
              aria-label="Open my account"
              id="myAccount"
            >
                <UserIcon />
            </button>
        );
    }

    renderAccount(isVisible = false) {
        const {
            onMyAccountOutsideClick,
            isCheckout,
            device: { isMobile }
        } = this.props;

        // on mobile hide button if not in checkout
        if (isMobile && !isCheckout) {
            return null;
        }

        if (isCheckout && isSignedIn()) {
            return null;
        }

        return (
            <div key="account" block="Header" elem="MyAccountContainer">
                { this.renderWelcomeMessage() }
                <ClickOutside
                  onClick={ onMyAccountOutsideClick }
                >
                    <div
                      aria-label="My account"
                      block="Header"
                      elem="MyAccount"
                    >
                        { this.renderAccountButton(isVisible) }
                        { this.renderAccountOverlay() }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    renderMinicartItemsQty() {
        const { cartTotals: { items_qty } } = this.props;

        if (!items_qty) {
            return null;
        }

        return (
            <span
              aria-label="Items in cart"
              block="Header"
              elem="MinicartItemCount"
            >
                { items_qty }
            </span>
        );
    }

    renderMinicartOverlayFallback() {
        return (
            <PopupSuspense
              actualOverlayKey={ CART_OVERLAY }
            />
        );
    }

    renderMinicartOverlay() {
        const { shouldRenderCartOverlay } = this.props;

        if (!shouldRenderCartOverlay) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderMinicartOverlayFallback() }>
                <CartOverlay />
            </Suspense>
        );
    }

    renderMinicartButton() {
        const {
            onMinicartButtonClick
        } = this.props;

        return (
            <button
              block="Header"
              elem="MinicartButtonWrapper"
              tabIndex="0"
              onClick={ onMinicartButtonClick }
              aria-label={ __('Cart') }
            >
                <CartIcon />
                { this.renderMinicartItemsQty() }
            </button>
        );
    }

    renderMinicart(isVisible = false) {
        const {
            onMinicartOutsideClick,
            isCheckout,
            device: { isMobile }
        } = this.props;

        if (isMobile || isCheckout) {
            return null;
        }

        return (
            <ClickOutside
              onClick={ onMinicartOutsideClick }
              key="minicart"
            >
                <div
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'minicart' } }
                >
                    { this.renderMinicartButton() }
                    { this.renderMinicartOverlay() }
                </div>
            </ClickOutside>
        );
    }

    renderDesktopIcons() {
        return (
            <div
              block="Header"
              elem="IconsWrapper"
            >
                { this.renderAccount() }
                { this.renderComparePageButton() }
                { this.renderMinicart() }
            </div>
        );
    }

    renderOkButton(isVisible = false) {
        const { onOkButtonClick } = this.props;

        return (
            <button
              key="ok"
              block="Header"
              elem="Button"
              mods={ { type: 'ok', isVisible } }
              onClick={ onOkButtonClick }
              aria-label="Save changes"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            >
                { __('OK') }
            </button>
        );
    }

    renderWelcomeMessage() {
        const { firstname } = this.props;

        if (!isSignedIn() || !firstname) {
            return null;
        }

        return (
            <div
              block="Header"
              elem="Welcome"
              mods={ { type: 'Welcome' } }
            >
                { __('Welcome, %s!', firstname) }
            </div>
        );
    }

    renderCancelButton(isVisible = false) {
        const { onCancelButtonClick } = this.props;

        return (
            <button
              key="cancel"
              block="Header"
              elem="Button"
              mods={ { type: 'cancel', isVisible } }
              onClick={ onCancelButtonClick }
              aria-label="Cancel changes"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            >
                { __('Cancel') }
            </button>
        );
    }

    renderTopMenu() {
        const { device: { isMobile } } = this.props;

        if (isMobile) {
            return null;
        }

        return (
            <div block="Header" elem="TopMenu">
                <div block="Header" elem="News">
                    <ExclamationMarkIcon />
                    <span>{ __('Check new arrivals') }</span>
                    <Link
                      to="/"
                      key="news"
                      block="Header"
                      elem="NewsButton"
                    >
                        { __('here!') }
                    </Link>
                </div>
                <div block="Header" elem="Switcher">
                    <CurrencySwitcher />
                    <StoreSwitcher />
                </div>
            </div>
        );
    }

    render() {
        const { stateMap } = this;
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout,
            device: { isMobile }
        } = this.props;

        if (!isMobile) {
            // hide edit button on desktop
            stateMap[CUSTOMER_WISHLIST].edit = false;
            stateMap[CUSTOMER_WISHLIST].share = false;
            stateMap[CART_OVERLAY].edit = false;
        }

        return (
            <section
              block="Header"
              elem="Wrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                <header
                  block="Header"
                  mods={ { name, isHiddenOnMobile, isCheckout } }
                  mix={ { block: 'FixedElement', elem: 'Top' } }
                  ref={ this.logoRef }
                >
                    { this.renderTopMenu() }
                    <nav block="Header" elem="Nav">
                        { this.renderNavigationState() }
                    </nav>
                    { this.renderMenu() }
                </header>
                <OfflineNotice />
            </section>
        );
    }
}

export default Header;
