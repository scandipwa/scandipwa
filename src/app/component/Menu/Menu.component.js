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
import { MENU_SUBCATEGORY, MENU } from 'Component/Header';
import StoreSwitcher from 'Component/StoreSwitcher';

import './Menu.style';

export default class MenuOverlay extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    state = { activeMenuItemsStack: [] };

    onVisible = () => {
        const { changeHeaderState } = this.props;
        changeHeaderState({ name: MENU });
    };

    handleSubcategoryClick(e, activeSubcategory) {
        const { activeMenuItemsStack } = this.state;
        const { changeHeaderState, goToPreviousHeaderState } = this.props;
        const { item_id, title } = activeSubcategory;

        e.stopPropagation();
        changeHeaderState({
            name: MENU_SUBCATEGORY,
            force: true,
            title,
            onBackClick: () => {
                this.setState(({ activeMenuItemsStack }) => (
                    { activeMenuItemsStack: activeMenuItemsStack.slice(1) }
                ));
                goToPreviousHeaderState();
            }
        });

        if (!activeMenuItemsStack.includes(item_id)) {
            this.setState({ activeMenuItemsStack: [item_id, ...activeMenuItemsStack] });
        }
    }

    handleCategoryHover(activeSubcategory) {
        if (isMobile.any()) {
            return;
        }

        const { activeMenuItemsStack } = this.state;
        const { item_id } = activeSubcategory;

        if (!activeMenuItemsStack.includes(item_id)) {
            this.setState({ activeMenuItemsStack: [item_id] });
        }
    }

    closeMenu() {
        if (isMobile.any()) {
            return;
        }

        this.setState({ activeMenuItemsStack: [] });
    }

    renderItemContentImage(icon, itemMods) {
        if (!icon) {
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

    renderItemContent(item, itemMods = {}, renderImage = false) {
        const { title, icon, item_class } = item;
        const { isBanner } = itemMods;

        return (
            <figure
              block="Menu"
              elem="ItemFigure"
              mods={ itemMods }
                // eslint-disable-next-line react/forbid-dom-props
              className={ item_class }
            >
                { renderImage ? this.renderItemContentImage(icon, itemMods) : null }
                <figcaption
                  block="Menu"
                  elem="ItemCaption"
                  mods={ itemMods }
                >
                    { isBanner ? (
                        <button
                          block="Menu"
                          elem="Button"
                          mix={ { block: 'Button' } }
                        >
                            { title }
                        </button>
                    ) : (
                        title
                    ) }
                </figcaption>
            </figure>
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
                    { childrenArray.map((item) => {
                        const {
                            url,
                            item_id,
                            cms_page_identifier,
                            title
                        } = item;

                        const path = cms_page_identifier ? `/${ cms_page_identifier}` : url;

                        return (
                            <Link
                              key={ item_id }
                              onClick={ () => this.closeMenu() }
                              to={ path }
                              block="Menu"
                              elem="Link"
                            >
                                { isBanner || isLogo ? (
                                    this.renderItemContent(item, mods, true)
                                ) : (
                                    title
                                ) }
                            </Link>
                        );
                    }) }
                </div>
            </div>
        );
    }

    renderSubLevel(category) {
        const { activeMenuItemsStack } = this.state;
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
                    { childrenArray.map((item) => {
                        const {
                            url,
                            item_id,
                            children,
                            cms_page_identifier,
                            title
                        } = item;

                        const childrenArray = Object.values(children);
                        const path = cms_page_identifier ? `/${ cms_page_identifier}` : url;

                        return childrenArray.length && isMobile.any() ? (
                            <div
                              key={ item_id }
                              onClick={ e => this.handleSubcategoryClick(e, item) }
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
                                  onClick={ () => this.closeMenu() }
                                  to={ path }
                                  block="Menu"
                                  elem="Link"
                                >
                                    { title }
                                </Link>
                                { this.renderDesktopSubLevel(item) }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }

    renderFirstLevel(itemList, itemMods) {
        const { activeMenuItemsStack } = this.state;
        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map((item) => {
            const { item_id, children, url } = item;
            const childrenArray = Object.values(children);
            const renderImage = !!isMobile.any();
            const isHovered = activeMenuItemsStack.includes(item_id);

            return (
                <li key={ item_id } block="Menu" elem="Item">
                    { childrenArray.length && isMobile.any() ? (
                        <div
                          onClick={ e => this.handleSubcategoryClick(e, item) }
                          tabIndex="0"
                          block="Menu"
                          elem="SubCatLink"
                          role="button"
                        >
                            { this.renderItemContent(item, itemMods, renderImage) }
                            { this.renderSubLevel(item) }

                        </div>
                    ) : (
                        <Link
                          to={ url }
                          block="Menu"
                          elem="Link"
                          onMouseEnter={ () => this.handleCategoryHover(item) }
                          mods={ { isHovered } }
                        >
                            { this.renderItemContent(item, itemMods, renderImage) }
                        </Link>
                    ) }
                </li>
            );
        });
    }

    renderPromotionCms() {
        const { header_content: { header_cms } = {} } = window.contentConfiguration;

        if (header_cms) {
            return <CmsBlock identifiers={ [header_cms] } />;
        }

        return (
            <div block="Menu" elem="Promotion">
                <h3 block="Menu" elem="PageLink">
                    <Link
                      to="/page/about-us"
                      onClick={ () => this.closeMenu() }
                      block="Menu"
                      elem="Link"
                    >
                        { __('ABOUT US') }
                    </Link>
                </h3>
                <h3 block="Menu" elem="PageLink">
                    <Link
                      to="/page/about-us"
                      onClick={ () => this.closeMenu() }
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

    renderSubMenuDesktop(itemList) {
        if (isMobile.any()) {
            return null;
        }

        const { activeMenuItemsStack } = this.state;
        const childrenArray = getSortedItems(Object.values(itemList));
        const mods = activeMenuItemsStack.length > 0;

        return (
            <div
              block="Menu"
              elem="SubCategoriesWrapper"
              mods={ { isVisible: mods } }
            >
                <div
                  block="Menu"
                  elem="SubCategoriesWrapperInner"
                >
                    <div
                      block="Menu"
                      elem="SubCategories"
                    >
                        { childrenArray.map(item => this.renderSubLevel(item)) }
                    </div>
                    { this.renderAdditionalInformation() }
                </div>
            </div>
        );
    }

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return null;
        }

        const {
            0: { children, title: mainCategoriesTitle }
        } = categoryArray;

        const mainMods = { type: 'main' };

        return (
            <>
                <div block="Menu" elem="MainCategories">
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ mainMods }
                      aria-label={ mainCategoriesTitle }
                    >
                        { this.renderFirstLevel(children, mainMods) }
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
        return (
            <div
              block="Menu"
              elem="MenuWrapper"
              onMouseLeave={ () => this.closeMenu() }
            >
                { this.renderTopLevel() }
            </div>
        );
    }
}
