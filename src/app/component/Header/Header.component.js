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

import NavigationAbstract, { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.component';
import SearchField from 'Component/SearchField';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import ClickOutside from 'Component/ClickOutside';
import CartOverlay from 'Component/CartOverlay';
import MenuOverlay from 'Component/MenuOverlay';
import { LOGO_MEDIA } from 'Util/Media/Media';
import { TotalsType } from 'Type/MiniCart';
import isMobile from 'Util/Mobile';
import Link from 'Component/Link';
import Logo from 'Component/Logo';
import media from 'Util/Media';

import './Header.style';

export const PDP = 'pdp';
export const POPUP = 'popup';
export const CATEGORY = 'category';
export const CUSTOMER_ACCOUNT = 'customer_account';
export const CUSTOMER_SUB_ACCOUNT = 'customer_sub_account';
export const CUSTOMER_ACCOUNT_PAGE = 'customer_account_page';
export const HOME_PAGE = 'home';
export const MENU = 'menu';
export const MENU_SUBCATEGORY = 'menu_subcategory';
export const SEARCH = 'search';
export const FILTER = 'filter';
export const CART = 'cart';
export const CART_EDITING = 'cart_editing';
export const CHECKOUT = 'checkout';
export const CMS_PAGE = 'cms-page';

export default class Header extends NavigationAbstract {
    static propTypes = {
        navigationState: PropTypes.object.isRequired,
        cartTotals: TotalsType.isRequired,
        onBackButtonClick: PropTypes.func.isRequired,
        onCloseButtonClick: PropTypes.func.isRequired,
        onSearchBarFocus: PropTypes.func.isRequired,
        onMenuButtonClick: PropTypes.func.isRequired,
        onClearSearchButtonClick: PropTypes.func.isRequired,
        onMyAccountButtonClick: PropTypes.func.isRequired,
        onSearchBarChange: PropTypes.func.isRequired,
        onClearButtonClick: PropTypes.func.isRequired,
        onEditButtonClick: PropTypes.func.isRequired,
        onMinicartButtonClick: PropTypes.func.isRequired,
        onOkButtonClick: PropTypes.func.isRequired,
        onCancelButtonClick: PropTypes.func.isRequired,
        onSearchOutsideClick: PropTypes.func.isRequired,
        onMenuOutsideClick: PropTypes.func.isRequired,
        onMyAccountOutsideClick: PropTypes.func.isRequired,
        onMinicartOutsideClick: PropTypes.func.isRequired,
        isClearEnabled: PropTypes.bool.isRequired,
        searchCriteria: PropTypes.string.isRequired,
        header_logo_src: PropTypes.string,
        logo_alt: PropTypes.string,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        logo_alt: 'ScandiPWA logo',
        header_logo_src: '',
        isLoading: true
    };

    stateMap = {
        [DEFAULT_STATE_NAME]: {
            title: true,
            logo: true
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
        [MENU]: {
            search: true
        },
        [MENU_SUBCATEGORY]: {
            back: true,
            title: true
        },
        [SEARCH]: {
            back: true,
            search: true
        },
        [CART]: {
            title: true,
            edit: true
        },
        [CART_EDITING]: {
            ok: true,
            title: true,
            cancel: true
        },
        [FILTER]: {
            close: true,
            clear: true,
            title: true
        },
        [CHECKOUT]: {
            back: true,
            title: true
        },
        [CMS_PAGE]: {
            back: true,
            title: true
        }
    };

    renderMap = {
        cancel: this.renderCancelButton.bind(this),
        back: this.renderBackButton.bind(this),
        close: this.renderCloseButton.bind(this),
        menu: this.renderMenuButton.bind(this),
        search: this.renderSearchField.bind(this),
        title: this.renderTitle.bind(this),
        logo: this.renderLogo.bind(this),
        account: this.renderAccountButton.bind(this),
        minicart: this.renderMinicartButton.bind(this),
        clear: this.renderClearButton.bind(this),
        edit: this.renderEditButton.bind(this),
        ok: this.renderOkButton.bind(this)
    };

    renderBackButton(isVisible = false) {
        const { onBackButtonClick } = this.props;

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
            />
        );
    }

    renderCloseButton(isVisible = false) {
        const { onCloseButtonClick } = this.props;

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
            />
        );
    }

    renderMenuButton(isVisible = false) {
        const { onMenuOutsideClick, onMenuButtonClick } = this.props;

        if (isMobile.any()) return null;

        return (
            <ClickOutside onClick={ onMenuOutsideClick } key="menu">
                <div>
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'menu' } }
                      aria-label="Go to menu and search"
                      aria-hidden={ !isVisible }
                      tabIndex={ isVisible ? 0 : -1 }
                      onClick={ onMenuButtonClick }
                    />
                    <MenuOverlay />
                </div>
            </ClickOutside>
        );
    }

    renderSearchField(isSearchVisible = false) {
        const {
            searchCriteria,
            onSearchOutsideClick,
            onSearchBarFocus,
            onSearchBarChange,
            onClearSearchButtonClick,
            navigationState: { name }
        } = this.props;

        return (
            <SearchField
              key="search"
              searchCriteria={ searchCriteria }
              onSearchOutsideClick={ onSearchOutsideClick }
              onSearchBarFocus={ onSearchBarFocus }
              onSearchBarChange={ onSearchBarChange }
              onClearSearchButtonClick={ onClearSearchButtonClick }
              isVisible={ isSearchVisible }
              isActive={ name === SEARCH }
            />
        );
    }

    renderTitle(isVisible = false) {
        const { navigationState: { title } } = this.props;

        return (
            <h2
              key="title"
              block="Header"
              elem="Title"
              mods={ { isVisible } }
            >
                { title }
            </h2>
        );
    }

    renderLogoImage() {
        const {
            header_logo_src,
            logo_alt
        } = this.props;

        return (
            <Logo
              src={ media(header_logo_src, LOGO_MEDIA) }
              alt={ logo_alt }
            />
        );
    }

    renderLogo(isVisible = false) {
        const { isLoading } = this.props;

        if (isLoading) return null;

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
              itemScope
              itemType="http://schema.org/Organization"
            >
                <meta itemProp="legalName" content="ScandiPWA" />
                <meta itemProp="parentOrganization" content="Scandiweb" />
                { this.renderLogoImage() }
            </Link>
        );
    }

    renderAccountButton(isVisible = false) {
        const { onMyAccountOutsideClick, onMyAccountButtonClick } = this.props;

        if (isMobile.any()) return null;

        return (
            <ClickOutside onClick={ onMyAccountOutsideClick } key="account">
                <div aria-label="My account">
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'account' } }
                      onClick={ onMyAccountButtonClick }
                      aria-label="Open my account"
                    />
                    <MyAccountOverlay />
                </div>
            </ClickOutside>
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

    renderMinicartButton(isVisible = false) {
        const { onMinicartOutsideClick, onMinicartButtonClick } = this.props;

        if (isMobile.any()) return null;

        return (
            <ClickOutside onClick={ onMinicartOutsideClick } key="minicart">
                <div
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'minicart' } }
                >
                    <button
                      onClick={ onMinicartButtonClick }
                      aria-label="Minicart"
                      block="Header"
                      elem="MinicartButton"
                    >
                        { this.renderMinicartItemsQty() }
                    </button>
                    <CartOverlay />
                </div>
            </ClickOutside>
        );
    }

    renderClearButton(isVisible = false) {
        const { isClearEnabled, onClearButtonClick } = this.props;

        return (
            <button
              key="clear"
              block="Header"
              elem="Button"
              mods={ { type: 'clear', isVisible, isDisabled: !isClearEnabled } }
              onClick={ onClearButtonClick }
              aria-label="Clear"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            />
        );
    }

    renderEditButton(isVisible = false) {
        const { onEditButtonClick } = this.props;

        return (
            <button
              key="edit"
              block="Header"
              elem="Button"
              mods={ { type: 'edit', isVisible } }
              onClick={ onEditButtonClick }
              aria-label="Clear"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
            />
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

    render() {
        const { navigationState: { name, isHiddenOnMobile = false } } = this.props;

        return (
            <header block="Header" mods={ { name, isHiddenOnMobile } }>
                <nav block="Header" elem="Nav">
                    { this.renderNavigationState() }
                </nav>
            </header>
        );
    }
}
