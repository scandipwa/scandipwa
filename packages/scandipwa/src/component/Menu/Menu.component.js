/* eslint-disable jsx-a11y/click-events-have-key-events */
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

import CompareIcon from 'Component/CompareIcon';
import CurrencySwitcher from 'Component/CurrencySwitcher';
import Link from 'Component/Link';
import MenuItem from 'Component/MenuItem';
import StoreSwitcher from 'Component/StoreSwitcher';
import { DeviceType } from 'Type/Device.type';
import { MenuType } from 'Type/Menu.type';
import { getSortedItems } from 'Util/Menu';
import { debounce } from 'Util/Request';

import { SCROLL_DEBOUNCE_DELAY } from './Menu.config';

import './Menu.style';

/** @namespace Component/Menu/Component */
export class Menu extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        compareTotals: PropTypes.number.isRequired,
        activeMenuItemsStack: PropTypes.arrayOf(PropTypes.string).isRequired,
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
        const { item_id } = item;
        const { closeMenu, activeMenuItemsStack } = this.props;

        return (
            <MenuItem
              activeMenuItemsStack={ activeMenuItemsStack }
              item={ item }
              itemMods={ mods }
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

        const isLogo = item_class === 'Menu-ItemFigure_type_logo';
        const mods = {
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
                  mods={ mods }
                >
                    { childrenArray.map((item) => this.renderDesktopSubLevelItems(item, mods)) }
                </div>
            </div>
        );
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    renderSubLevelItems(item, isSecondLevel) {
        const {
            handleSubcategoryClick,
            activeMenuItemsStack,
            onCategoryHover,
            closeMenu,
            device
        } = this.props;

        const { item_id, children } = item;

        const childrenArray = Object.values(children);
        const subcategoryMods = { type: 'subcategory', isSecondLevel };

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
                      itemMods={ { ...subcategoryMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                      isExpandable
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
              onClick={ this.stopPropagation }
              role="button"
              tabIndex="-1"
            >
                <MenuItem
                  activeMenuItemsStack={ activeMenuItemsStack }
                  item={ item }
                  itemMods={ subcategoryMods }
                  closeMenu={ closeMenu }
                  isLink
                />
                { this.renderDesktopSubLevel(item) }
            </div>
        );
    }

    renderSubLevel(category, isSecondLevel = false) {
        const { activeMenuItemsStack, device } = this.props;
        const { item_id, children, title } = category;
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
                    { device.isMobile && (
                        <MenuItem
                          activeMenuItemsStack={ activeMenuItemsStack }
                          item={ { ...category, title: __('All %s', title) } }
                          itemMods={ { ...subcategoryMods, isSecondLevel } }
                          isLink
                        />
                    ) }
                    { childrenArray.map((item) => this.renderSubLevelItems(item, isSecondLevel)) }
                </div>
            </div>
        );
    }

    renderSubMenuDesktopItems(item) {
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
    }

    renderSubMenuDesktop(itemList) {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map(this.renderSubMenuDesktopItems.bind(this));
    }

    renderAdditionalInformation(checkMobile = false) {
        const { device } = this.props;

        if (checkMobile && !device.isMobile) {
            return null;
        }

        return (
            <>
                { this.renderCurrencySwitcher() }
                { this.renderStoreSwitcher() }
                { this.renderComparePageLink() }
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

        const { children, item_id } = item;
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
                      itemMods={ { ...itemMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                      isExpandable
                    />
                    { this.renderSubLevel(item, true) }
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

    renderFirstLevel(item) {
        const { item_id } = item;

        return (
            <li
              block="Menu"
              elem="Item"
              key={ item_id }
            >
                { this.renderFirstLevelItems.call(this, item) }
            </li>
        );
    }

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
                    { this.renderAdditionalInformation(true) }
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ { type: 'main' } }
                      aria-label={ mainCategoriesTitle }
                    >
                        { childrenArray.map(this.renderFirstLevel.bind(this)) }
                    </ul>
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

    renderCompareCount() {
        const { compareTotals } = this.props;

        if (compareTotals < 1) {
            return null;
        }

        return (
            <span
              block="Menu"
              elem="CompareCountInMenu"
            >
                { `(${ compareTotals })` }
            </span>
        );
    }

    renderComparePageLink() {
        const { device } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <div block="Menu" elem="CompareLinkWrapper">
                <Link to="compare" block="Menu" elem="CompareLink">
                    <CompareIcon />
                    <h4>{ __('Compare products') }</h4>
                    { this.renderCompareCount() }
                </Link>
            </div>
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
