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
import Overlay from 'Component/Overlay';
import CmsBlock from 'Component/CmsBlock';
import { getSortedItems } from 'Util/Menu';
import { MENU_SUBCATEGORY, MENU } from 'Component/Header';
import StoreSwitcher from 'Component/StoreSwitcher';

import './MenuOverlay.style';

export const MENU_OVERLAY_KEY = 'menu';

export default class MenuOverlay extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    state = { activeMenuItemsStack: [] };

    closeMenuOverlay = this.closeMenuOverlay.bind(this);

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

    closeMenuOverlay(e) {
        const { hideActiveOverlay } = this.props;

        e.stopPropagation();

        this.setState({ activeMenuItemsStack: [] });
        hideActiveOverlay();
    }

    renderItemContentImage(icon, itemMods) {
        if (!icon) return null;

        return (
            <Image
              mix={ { block: 'MenuOverlay', elem: 'Image', mods: itemMods } }
              src={ icon && media(icon) }
              ratio="16x9"
            />
        );
    }

    renderItemContent(item, mods = {}) {
        const { title, icon, item_class } = item;
        const itemMods = item_class === 'MenuOverlay-ItemFigure_type_banner' ? { type: 'banner' } : mods;

        return (
            <figure
              block="MenuOverlay"
              elem="ItemFigure"
              mods={ itemMods }
              // eslint-disable-next-line react/forbid-dom-props
              className={ item_class }
            >
                { this.renderItemContentImage(icon, itemMods) }
                <figcaption
                  block="MenuOverlay"
                  elem="ItemCaption"
                  mods={ itemMods }
                >
                    { title }
                </figcaption>
            </figure>
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
              block="MenuOverlay"
              elem="SubMenu"
              mods={ { isVisible } }
            >
                <div
                  block="MenuOverlay"
                  elem="ItemList"
                  mods={ { ...subcategoryMods } }
                >
                    { childrenArray.map((item) => {
                        const {
                            url,
                            item_id,
                            children,
                            cms_page_identifier
                        } = item;

                        const childrenArray = Object.values(children);

                        const path = cms_page_identifier ? `/${ cms_page_identifier}` : url;

                        return (childrenArray.length
                            ? (
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
                                <Link
                                  key={ item_id }
                                  to={ path }
                                  onClick={ this.closeMenuOverlay }
                                  block="MenuOverlay"
                                  elem="Link"
                                >
                                    { this.renderItemContent(item, subcategoryMods) }
                                </Link>
                            )
                        );
                    }) }
                </div>
            </div>
        );
    }

    renderFirstLevel(itemList, itemMods) {
        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map((item) => {
            const { item_id, children, url } = item;
            const childrenArray = Object.values(children);

            return (
                <li key={ item_id } block="MenuOverlay" elem="Item">
                    { childrenArray.length
                        ? (
                            <div
                              onClick={ e => this.handleSubcategoryClick(e, item) }
                              tabIndex="0"
                              role="button"
                            >
                                { this.renderItemContent(item, itemMods) }
                                { this.renderSubLevel(item) }
                            </div>
                        ) : (
                            <Link
                              to={ url }
                              onClick={ this.closeMenuOverlay }
                              block="MenuOverlay"
                              elem="Link"
                            >
                                { this.renderItemContent(item, itemMods) }
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
            <>
                <h3 block="MenuOverlay" elem="PageLink">
                    <Link
                      to="/page/about-us"
                      onClick={ this.closeMenuOverlay }
                      block="MenuOverlay"
                      elem="Link"
                    >
                        { __('ABOUT US') }
                    </Link>
                </h3>
                <h3 block="MenuOverlay" elem="PageLink">
                    <Link
                      to="/page/about-us"
                      onClick={ this.closeMenuOverlay }
                      block="MenuOverlay"
                      elem="Link"
                    >
                    { __('CONTACTS') }
                    </Link>
                </h3>
                <div block="MenuOverlay" elem="Social">
                    <CmsBlock identifiers={ ['social-links'] } />
                </div>
            </>
        );
    }

    renderAdditionalInformation() {
        return (
            <aside block="MenuOverlay" elem="AdditionalInformation">
                { this.renderPromotionCms() }
            </aside>
        );
    }

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) return null;

        const {
            0: { children: mainCategories, title: mainCategoriesTitle }
        } = categoryArray;

        const mainMods = { type: 'main' };

        return (
            <div block="MenuOverlay" elem="Menu">
                <ul
                  block="MenuOverlay"
                  elem="ItemList"
                  mods={ mainMods }
                  aria-label={ mainCategoriesTitle }
                >
                    { this.renderFirstLevel(mainCategories, mainMods) }
                </ul>
                { this.renderAdditionalInformation() }
            </div>
        );
    }

    renderStoreSwitcher() {
        return (
            <StoreSwitcher />
        );
    }

    render() {
        return (
            <Overlay
              id={ MENU_OVERLAY_KEY }
              mix={ { block: 'MenuOverlay' } }
              onVisible={ this.onVisible }
              isStatic={ !!isMobile.any() }
            >
                { this.renderStoreSwitcher() }
                { this.renderTopLevel() }
            </Overlay>
        );
    }
}
