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

import { Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import Link from 'Component/Link';
import Logo from 'Component/Logo';
import { TotalsType } from 'Type/MiniCart';
import MenuOverlay from 'Component/MenuOverlay';
import CartOverlay from 'Component/CartOverlay';
import ClickOutside from 'Component/ClickOutside';
import SearchOverlay from 'Component/SearchOverlay';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import NavigationAbstract, { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.component';

import './Header.style';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';

export const PDP = 'pdp';
export const POPUP = 'popup';
export const CATEGORY = 'category';
export const CUSTOMER_ACCOUNT = 'customer_account';
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
        onSearchBarClick: PropTypes.func.isRequired,
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
            close: true,
            title: true
        },
        [CUSTOMER_ACCOUNT_PAGE]: {
            back: true,
            title: true
        },
        [MENU]: {
            close: true,
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
            close: true,
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

    searchBarRef = createRef();

    onClearSearchButtonClick = this.onClearSearchButtonClick.bind(this);

    onClearSearchButtonClick() {
        const { onClearSearchButtonClick } = this.props;
        this.searchBarRef.current.focus();
        onClearSearchButtonClick();
    }

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
            searchCriteria, onSearchOutsideClick,
            onSearchBarClick, onSearchBarChange
        } = this.props;

        return (
            <Fragment key="search">
                <ClickOutside onClick={ onSearchOutsideClick }>
                    <div
                      block="Header"
                      elem="SearchWrapper"
                      aria-label="Search"
                    >
                        <input
                          id="search-field"
                          ref={ this.searchBarRef }
                          placeholder={ __('Type a new search') }
                          block="Header"
                          elem="SearchField"
                          onClick={ onSearchBarClick }
                          onChange={ onSearchBarChange }
                          value={ searchCriteria }
                          mods={ {
                              isVisible: isSearchVisible,
                              type: 'searchField'
                          } }
                        />
                        <SearchOverlay
                          searchCriteria={ searchCriteria }
                        />
                    </div>
                </ClickOutside>
                <button
                  block="Header"
                  elem="Button"
                  onClick={ this.onClearSearchButtonClick }
                  mods={ {
                      type: 'searchClear',
                      isVisible: isSearchVisible
                  } }
                  aria-label="Clear search"
                />
            </Fragment>
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

    renderMinicartButton(isVisible = false) {
        const { cartTotals: { items_qty }, onMinicartOutsideClick, onMinicartButtonClick } = this.props;

        return (
            <ClickOutside onClick={ onMinicartOutsideClick } key="minicart">
                <div>
                    <button
                      block="Header"
                      elem="Button"
                      mods={ { isVisible, type: 'minicart' } }
                      onClick={ onMinicartButtonClick }
                      aria-label="Minicart"
                    >
                        <span aria-label="Items in cart">{ items_qty || '0' }</span>
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
        const { navigationState: { name } } = this.props;

        return (
            <header block="Header" mods={ { name } }>
                <nav block="Header" elem="Nav">
                    { this.renderNavigationState() }
                </nav>
            </header>
        );
    }
}
