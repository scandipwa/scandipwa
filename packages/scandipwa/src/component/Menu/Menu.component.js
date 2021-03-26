/* eslint-disable jsx-a11y/click-events-have-key-events */
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

import CmsBlock from 'Component/CmsBlock';
import CurrencySwitcher from 'Component/CurrencySwitcher';
import Link from 'Component/Link';
import MenuItem from 'Component/MenuItem';
import StoreSwitcher from 'Component/StoreSwitcher';
import { DeviceType } from 'Type/Device';
import { MenuType } from 'Type/Menu';
import { getSortedItems } from 'Util/Menu';
import { debounce } from 'Util/Request';

import { HEADER_CMS_BLOCK, SCROLL_DEBOUNCE_DELAY } from './Menu.config';

import './Menu.style';

/** @namespace Component/Menu/Component */
export class Menu extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        activeMenuItemsStack: PropTypes.array.isRequired,
        handleSubcategoryClick: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        onCategoryHover: PropTypes.func.isRequired,
        device: DeviceType.isRequired
    };

    componentDidMount() {
        const { closeMenu } = this.props;

        this.debouncedCloseMenu = debounce(closeMenu, SCROLL_DEBOUNCE_DELAY);

        window.addEventListener('scroll', this.debouncedCloseMenu);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debouncedCloseMenu);
    }

    renderDesktopSubLevelItems(item, mods) {
        const { item_id, item_class } = item;
        const { closeMenu, activeMenuItemsStack } = this.props;

        const isHideOnDesktop = item_class === 'Menu-ItemFigure_type_hideOnDesktop';
        const itemMods = { ...mods, isHideOnDesktop };

        return (
            <MenuItem
              activeMenuItemsStack={ activeMenuItemsStack }
              item={ item }
              itemMods={ itemMods }
              closeMenu={ closeMenu }
              isLink
              key={ item_id }
            />
        );
    }

    renderDesktopSubLevel(category) {
        const { device } = this.props;
        const { children, item_class, item_id } = category;
        const childrenArray = getSortedItems(Object.values(children));

        if (device.isMobile || !childrenArray.length) {
            return null;
        }

        const isBanner = item_class === 'Menu-ItemFigure_type_banner';
        const isLogo = item_class === 'Menu-ItemFigure_type_logo';
        const mods = {
            isBanner: !!isBanner,
            isLogo: !!isLogo
        };

        return (
            <div
              block="Menu"
              elem="SubLevelDesktop"
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="ItemList"
                  mods={ { ...mods } }
                >
                    { childrenArray.map((item) => this.renderDesktopSubLevelItems(item, mods)) }
                </div>
            </div>
        );
    }

    renderSubLevelItems = (item) => {
        const {
            handleSubcategoryClick,
            activeMenuItemsStack,
            onCategoryHover,
            closeMenu,
            device
        } = this.props;

        const {
            item_id,
            children,
            item_class
        } = item;

        const isBanner = item_class === 'Menu-ItemFigure_type_banner';
        const isHideOnDesktop = item_class === 'Menu-ItemFigure_type_hideOnDesktop';
        const mods = {
            isBanner: !!isBanner,
            isHideOnDesktop: !!isHideOnDesktop
        };

        const childrenArray = Object.values(children);
        const subcategoryMods = { type: 'subcategory' };

        if (childrenArray.length && device.isMobile) {
            return (
                <div
                  key={ item_id }
                  // TODO: split into smaller components
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ (e) => handleSubcategoryClick(e, item) }
                  tabIndex="0"
                  role="button"
                >
                    <MenuItem
                      activeMenuItemsStack={ activeMenuItemsStack }
                      item={ item }
                      itemMods={ subcategoryMods }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                    />
                    { this.renderSubLevel(item) }
                </div>
            );
        }

        return (
            <div
              block="Menu"
              elem="SubItemWrapper"
              key={ item_id }
              mods={ mods }
            >
                <MenuItem
                  activeMenuItemsStack={ activeMenuItemsStack }
                  item={ item }
                  closeMenu={ closeMenu }
                  isLink
                />
                { this.renderDesktopSubLevel(item) }
            </div>
        );
    };

    renderSubLevel(category) {
        const { activeMenuItemsStack } = this.props;
        const { item_id, children } = category;
        const childrenArray = getSortedItems(Object.values(children));
        const isVisible = activeMenuItemsStack.includes(item_id);
        const subcategoryMods = { type: 'subcategory' };

        return (
            <div
              block="Menu"
              elem="SubMenu"
              mods={ { isVisible } }
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="ItemList"
                  mods={ { ...subcategoryMods } }
                >
                    { childrenArray.map(this.renderSubLevelItems) }
                </div>
            </div>
        );
    }

    renderPromotionCms() {
        const { closeMenu } = this.props;
        const { header_content: { header_cms } = {} } = window.contentConfiguration;

        if (header_cms) {
            return <CmsBlock identifier={ header_cms } blockType={ HEADER_CMS_BLOCK } />;
        }

        return (
            <div block="Menu" elem="Promotion">
                <h3 block="Menu" elem="PageLink">
                    <Link
                      to="/about-us"
                      onClick={ closeMenu }
                      block="Menu"
                      elem="Link"
                    >
                        { __('ABOUT US') }
                    </Link>
                </h3>
                <h3 block="Menu" elem="PageLink">
                    <Link
                      to="/about-us"
                      onClick={ closeMenu }
                      block="Menu"
                      elem="Link"
                    >
                        { __('CONTACTS') }
                    </Link>
                </h3>
                <div block="Menu" elem="Social">
                    <CmsBlock identifier="social-links" />
                </div>
            </div>
        );
    }

    renderSubMenuDesktopItems = (item) => {
        const { item_id, children } = item;

        if (!Object.keys(children).length) {
            return null;
        }

        const { activeMenuItemsStack, closeMenu } = this.props;
        const isVisible = activeMenuItemsStack.includes(item_id);

        if (!isVisible) {
            return null;
        }

        return (
            <div
              block="Menu"
              elem="SubCategoriesWrapper"
              mods={ { isVisible } }
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="SubCategoriesWrapperInner"
                  mods={ { isVisible } }
                >
                    <div
                      block="Menu"
                      elem="SubCategories"
                    >
                        { this.renderSubLevel(item) }
                    </div>
                    { this.renderAdditionalInformation() }
                </div>
                <div
                  block="Menu"
                  elem="Overlay"
                  mods={ { isVisible } }
                  onMouseEnter={ closeMenu }
                />
            </div>
        );
    };

    renderSubMenuDesktop(itemList) {
        const { device } = this.props;
        if (device.isMobile) {
            return null;
        }

        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map(this.renderSubMenuDesktopItems);
    }

    renderAdditionalInformation(checkMobile = false) {
        const { device } = this.props;
        if (checkMobile && !device.isMobile) {
            return null;
        }

        return (
            <>
                { this.renderStoreSwitcher() }
                { this.renderCurrencySwitcher() }
                { this.renderComparePageLink() }
                { this.renderPromotionCms() }
            </>
        );
    }

    renderFirstLevelItems(item) {
        const {
            activeMenuItemsStack,
            handleSubcategoryClick,
            onCategoryHover,
            closeMenu,
            device
        } = this.props;

        const { children } = item;
        const childrenArray = Object.values(children);
        const itemMods = { type: 'main' };

        if (childrenArray.length && device.isMobile) {
            return (
                <div
                  // TODO: split into smaller components
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ (e) => handleSubcategoryClick(e, item) }
                  tabIndex="0"
                  block="Menu"
                  elem="SubCatLink"
                  role="button"
                >
                    <MenuItem
                      activeMenuItemsStack={ activeMenuItemsStack }
                      item={ item }
                      itemMods={ itemMods }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                    />
                    { this.renderSubLevel(item) }
                </div>
            );
        }

        return (
            <MenuItem
              activeMenuItemsStack={ activeMenuItemsStack }
              item={ item }
              itemMods={ itemMods }
              onCategoryHover={ onCategoryHover }
              closeMenu={ closeMenu }
              isLink
            />
        );
    }

    renderFirstLevel = (item) => {
        const { item_id, item_class } = item;

        const isHideOnDesktop = item_class === 'Menu-ItemFigure_type_hideOnDesktop';

        return (
            <li
              block="Menu"
              elem="Item"
              key={ item_id }
              mods={ { isHideOnDesktop } }
            >
                { this.renderFirstLevelItems(item) }
            </li>
        );
    };

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return null;
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        const childrenArray = getSortedItems(Object.values(children));

        return (
            <>
                <div block="Menu" elem="MainCategories">
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ { type: 'main' } }
                      aria-label={ mainCategoriesTitle }
                    >
                        { childrenArray.map(this.renderFirstLevel) }
                    </ul>
                    { this.renderAdditionalInformation(true) }
                </div>
                { this.renderSubMenuDesktop(children) }
            </>
        );
    }

    renderCurrencySwitcher() {
        const { device } = this.props;
        if (!device.isMobile) {
            return null;
        }

        return <CurrencySwitcher />;
    }

    renderStoreSwitcher() {
        const { device } = this.props;
        if (!device.isMobile) {
            return null;
        }

        return <StoreSwitcher />;
    }

    renderComparePageLink() {
        const { device } = this.props;
        if (!device.isMobile) {
            return null;
        }

        return (
            <h3 block="Menu" elem="CompareLinkWrapper">
                <Link to="compare" block="Menu" elem="CompareLink">
                    { __('Compare') }
                </Link>
            </h3>
        );
    }

    render() {
        const { closeMenu } = this.props;

        return (
            <div
              block="Menu"
              elem="MenuWrapper"
              onMouseLeave={ closeMenu }
            >
                { this.renderTopLevel() }
            </div>
        );
    }
}

export default Menu;
