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

import './HeaderOverride.style.scss';

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
                back: false
            }
        }), {});

    renderMap = (originalMember, instance) => ({
        menu: this.renderOpenMenuButton.bind(instance),
        searchIcon: this.renderSearchIcon.bind(instance),
        ...originalMember,
        logo: this.renderLogoMobile.bind(instance),
        title: this.renderTitleMobile.bind(instance),
        search: this.renderSearchFieldMobile.bind(instance),
        account: this.renderMobileAccountButton.bind(instance),
        minicart: this.renderMiniCartMobile.bind(instance)
    });

    renderMiniCartMobile(isVisible) {
        const { isSearchBarActive } = this.props;

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

    renderTitleMobile(isVisible) {
        const { isSearchBarActive } = this.props;

        if (isSearchBarActive) {
            return null;
        }

        return this.renderTitle(isVisible);
    }

    renderSearchIcon() {
        const {
            isSearchBarActive,
            onSearchBarDeactivate,
            onSearchButtonClick,
            device: { isMobile }
        } = this.props;

        if (!isMobile) {
            return null;
        }

        if (isSearchBarActive) {
            return (
                <button
                  block="Header"
                  elem="BackBtn"
                  onClick={ onSearchBarDeactivate }
                  aria-label={ __('Cancel Search') }
                >
                    <CloseIcon />
                </button>
            );
        }

        return (
            <button
              block="Header"
              elem="SearchBtn"
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

    renderMobileAccountButton() {
        const { onMyAccountButtonClick, isSearchBarActive } = this.props;

        if (isSearchBarActive) {
            return null;
        }

        return (
            <button
              block="Header"
              elem="AccountBtn"
              onClick={ onMyAccountButtonClick }
              aria-label="Open my account"
            >
                <UserIcon />
            </button>
        );
    }

    renderOpenMenuButton() {
        const { openSideMenu, closeSideMenu, isSearchBarActive } = this.props;

        if (isSearchBarActive) {
            return null;
        }

        return (
            <ClickOutside
              onClick={ closeSideMenu }
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
