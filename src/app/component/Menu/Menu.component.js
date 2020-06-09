/* eslint-disable react/jsx-no-bind */
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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import media from 'Util/Media';
import Link from 'Component/Link';
import isMobile from 'Util/Mobile';
import Image from 'Component/Image';
import { MenuType } from 'Type/Menu';
import CmsBlock from 'Component/CmsBlock';
import { getSortedItems } from 'Util/Menu';
import StoreSwitcher from 'Component/StoreSwitcher';

import './Menu.style';

export default class MenuOverlay extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        activeMenuItemsStack: PropTypes.array.isRequired,
        handleSubcategoryClick: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        onCategoryHover: PropTypes.func.isRequired
    };

    renderItemContentImage(icon, itemMods) {
        const { isBanner, isLogo, type } = itemMods;

        if (!icon
            || (!isMobile.any() && !isBanner && !isLogo)
            || (isMobile && type === 'subcategory')
        ) {
            return null;
        }

        return (
            <Image
              mix={ { block: 'Menu', elem: 'Image', mods: itemMods } }
              src={ icon && media(icon) }
              ratio="custom"
            />
        );
    }

    renderItemTitle(isBanner, title) {
        if (isBanner) {
            return (
                <button
                  block="Menu"
                  elem="Button"
                  mix={ { block: 'Button' } }
                >
                    { title }
                </button>
            );
        }

        return title;
    }

    renderItemContent(item, itemMods = {}) {
        const { title, icon } = item;
        const { isBanner } = itemMods;

        return (
            <figure
              block="Menu"
              elem="ItemFigure"
              mods={ itemMods }
            >
                { this.renderItemContentImage(icon, itemMods) }
                <figcaption
                  block="Menu"
                  elem="ItemCaption"
                  mods={ itemMods }
                >
                    { this.renderItemTitle(isBanner, title) }
                </figcaption>
            </figure>
        );
    }

    renderDesktopSubLevelItems(item, mods) {
        const { closeMenu } = this.props;
        const {
            url,
            item_id,
            cms_page_identifier
        } = item;

        const path = cms_page_identifier ? `/${ cms_page_identifier}` : url;

        return (
            <Link
              key={ item_id }
              onClick={ closeMenu }
              to={ path }
              block="Menu"
              elem="Link"
            >
                { this.renderItemContent(item, mods) }
            </Link>
        );
    }

    renderDesktopSubLevel(category) {
        const { children, item_class } = category;
        const childrenArray = getSortedItems(Object.values(children));

        if (isMobile.any() || !childrenArray.length) {
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
            >
                <div
                  block="Menu"
                  elem="ItemList"
                  mods={ { ...mods } }
                >
                    { childrenArray.map(item => this.renderDesktopSubLevelItems(item, mods)) }
                </div>
            </div>
        );
    }

    renderSubLevelItems = (item) => {
        const { closeMenu, handleSubcategoryClick } = this.props;
        const {
            url,
            item_id,
            children,
            cms_page_identifier,
            title
        } = item;

        const childrenArray = Object.values(children);
        const path = cms_page_identifier ? `/${ cms_page_identifier}` : url;
        const subcategoryMods = { type: 'subcategory' };

        return childrenArray.length && isMobile.any() ? (
            <div
              key={ item_id }
              onClick={ e => handleSubcategoryClick(e, item) }
              tabIndex="0"
              role="button"
            >
                { this.renderItemContent(item, subcategoryMods) }
                { this.renderSubLevel(item) }
            </div>
        ) : (
            <div
              block="Menu"
              elem="SubItemWrapper"
              key={ item_id }
            >
                <Link
                  key={ item_id }
                  onClick={ closeMenu }
                  to={ path }
                  block="Menu"
                  elem="Link"
                >
                    { title }
                </Link>
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
            return <CmsBlock identifiers={ [header_cms] } />;
        }

        return (
            <div block="Menu" elem="Promotion">
                <h3 block="Menu" elem="PageLink">
                    <Link
                      to="/page/about-us"
                      onClick={ closeMenu }
                      block="Menu"
                      elem="Link"
                    >
                        { __('ABOUT US') }
                    </Link>
                </h3>
                <h3 block="Menu" elem="PageLink">
                    <Link
                      to="/page/about-us"
                      onClick={ closeMenu }
                      block="Menu"
                      elem="Link"
                    >
                        { __('CONTACTS') }
                    </Link>
                </h3>
                <div block="Menu" elem="Social">
                    <CmsBlock identifiers={ ['social-links'] } />
                </div>
            </div>
        );
    }

    renderSubMenuDesktopItems = (item) => {
        const { item_id, children } = item;

        if (!Object.keys(children).length) {
            return null;
        }

        const { activeMenuItemsStack } = this.props;
        const mods = activeMenuItemsStack.includes(item_id);

        return (
            <div
              block="Menu"
              elem="SubCategoriesWrapper"
              mods={ { isVisible: mods } }
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="SubCategoriesWrapperInner"
                >
                    <div
                      block="Menu"
                      elem="SubCategories"
                    >
                        { this.renderSubLevel(item) }
                    </div>
                    { this.renderAdditionalInformation() }
                </div>
            </div>
        );
    };

    renderSubMenuDesktop(itemList) {
        if (isMobile.any()) {
            return null;
        }

        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map(this.renderSubMenuDesktopItems);
    }

    renderAdditionalInformation(checkMobile = false) {
        if (checkMobile && !isMobile.any()) {
            return null;
        }

        return (
            <>
                { this.renderStoreSwitcher() }
                { this.renderPromotionCms() }
            </>
        );
    }

    renderFirstLevelItems(item) {
        const { activeMenuItemsStack, handleSubcategoryClick, onCategoryHover } = this.props;
        const { item_id, children, url } = item;
        const childrenArray = Object.values(children);
        const isHovered = activeMenuItemsStack.includes(item_id);
        const itemMods = { type: 'main' };

        if (childrenArray.length && isMobile.any()) {
            return (
                <div
                  onClick={ e => handleSubcategoryClick(e, item) }
                  tabIndex="0"
                  block="Menu"
                  elem="SubCatLink"
                  role="button"
                >
                    { this.renderItemContent(item, itemMods) }
                    { this.renderSubLevel(item) }

                </div>
            );
        }

        return (
            <Link
              to={ url }
              block="Menu"
              elem="Link"
              id={ item_id }
              onMouseEnter={ () => onCategoryHover(item) }
              mods={ { isHovered } }
            >
                { this.renderItemContent(item, itemMods) }
            </Link>
        );
    }

    renderFirstLevel = (item) => {
        const { item_id } = item;

        return (
            <li key={ item_id } block="Menu" elem="Item">
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

        const {
            0: { children, title: mainCategoriesTitle }
        } = categoryArray;

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

    renderStoreSwitcher() {
        return <StoreSwitcher />;
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
