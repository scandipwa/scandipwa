/* eslint-disable max-lines */
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
import { lazy } from 'react';

import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import ListIcon from 'Component/ListIcon';
import SearchIcon from 'Component/SearchIcon';
import UserIcon from 'Component/UserIcon';
import { isSignedIn } from 'Util/Auth';

import './Header.style.scss';
import './Footer.style.scss';

export const HamburgerMenu = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "navigation-extension" */
    '../component/HamburgerMenu'
));

export class HeaderPlugin {
    stateMap = (originalMember) => Object.entries(originalMember)
        .reduce((prev, [page, icons]) => ({
            ...prev,
            [page]: {
                ...icons,
                menu: icons.close !== true,
                searchIcon: true,
                search: true,
                account: true,
                minicart: true,
                logo: true,
                back: false,
                title: false
            }
        }), {});

    renderMap = (originalMember, instance) => ({
        menu: this.renderOpenMenuButton.bind(instance),
        searchIcon: this.renderSearchIcon.bind(instance),
        ...originalMember,
        logo: this.renderLogoMobile.bind(instance),
        search: this.renderSearchFieldMobile.bind(instance),
        closeSearch: this.renderCloseSearchIcon.bind(instance),
        account: this.renderAccount.bind(instance),
        minicart: this.renderMiniCart.bind(instance)
    });

    renderMiniCart(isVisible) {
        const {
            isSearchBarActive,
            onMinicartOutsideClick,
            isCheckout,
            device: { isMobile }
        } = this.props;

        if (isCheckout) {
            return null;
        }

        if (!isMobile) {
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

        if (isSearchBarActive) {
            return null;
        }

        return this.renderMinicartButton(isVisible);
    }

    renderLogoMobile(isVisible) {
        const { isSearchBarActive } = this.props;

        if (isSearchBarActive) {
            return null;
        }

        return this.renderLogo(isVisible);
    }

    renderCloseSearchIcon() {
        const {
            isSearchBarActive,
            onSearchBarDeactivate,
            device: { isMobile }
        } = this.props;

        if (!isSearchBarActive || !isMobile) {
            return null;
        }

        return (
            <button
              block="Header"
              elem="CloseSearchBtn"
              key="closeSearch"
              onClick={ onSearchBarDeactivate }
              aria-label={ __('Cancel Search') }
            >
                <CloseIcon />
            </button>
        );
    }

    renderSearchIcon() {
        const {
            isSearchBarActive,
            onSearchButtonClick,
            device: { isMobile }
        } = this.props;

        if (!isMobile || isSearchBarActive) {
            return null;
        }

        return (
            <button
              block="Header"
              elem="SearchBtn"
              key="searchBtn"
              onClick={ onSearchButtonClick }
              aria-label={ __('Start Search') }
            >
                <SearchIcon />
            </button>
        );
    }

    renderSearchFieldMobile() {
        const { isSearchBarActive, device: { isMobile } } = this.props;

        if (isMobile && !isSearchBarActive) {
            return null;
        }

        return this.renderSearchField(true);
    }

    renderAccount(isVisible = false) {
        const {
            onMobileMyAccountButtonClick,
            isSearchBarActive,
            device: { isMobile },
            isCheckout,
            onMyAccountOutsideClick
        } = this.props;

        if (isMobile) {
            if (isSearchBarActive) {
                return null;
            }

            return (
                <button
                  block="Header"
                  elem="AccountBtn"
                  key="accountBtn"
                  onClick={ onMobileMyAccountButtonClick }
                  aria-label="Open my account"
                >
                    <UserIcon />
                </button>
            );
        }

        if (isCheckout && isSignedIn()) {
            return null;
        }

        return (
            <div key="account">
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

    renderOpenMenuButton() {
        const {
            openSideMenu,
            closeSideMenu,
            isSearchBarActive,
            device: { isMobile }
        } = this.props;

        if (isSearchBarActive || !isMobile) {
            return null;
        }

        return (
            <ClickOutside
              onClick={ closeSideMenu }
              key="sideMenu"
            >
                <div block="Header" elem="HamburgerMenuWrapper">
                    <button
                      block="Header"
                      elem="OpenMenuBtn"
                      onClick={ openSideMenu }
                      aria-label={ __('Open Menu') }
                    >
                        <ListIcon />
                    </button>
                    <HamburgerMenu />
                </div>
            </ClickOutside>
        );
    }
}

const { renderMap, stateMap } = new HeaderPlugin();

export default {
    'Component/Header/Component': {
        'member-property': {
            renderMap,
            stateMap
        }
    }
};
