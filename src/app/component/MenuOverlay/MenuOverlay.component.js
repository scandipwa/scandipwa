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
import Link from 'Component/Link';
import Image from 'Component/Image';
import Overlay from 'Component/Overlay';
import CmsBlock from 'Component/CmsBlock';
import { MENU_SUBCATEGORY } from 'Component/Header';
import { MenuType } from 'Type/Menu';
import './MenuOverlay.style';

export default class MenuOverlay extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired
    };

    state = { activeMenuItemsStack: [] };

    closeMenuOverlay = this.closeMenuOverlay.bind(this);

    showSubCategory(e, activeSubcategory) {
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

    renderItemContent(item, mods = {}) {
        const { title, icon, item_class } = item;
        const itemMods = item_class === 'MenuOverlay-ItemFigure_type_banner' ? { type: 'banner' } : mods;

        return (
            <figure block="MenuOverlay" elem="ItemFigure" mods={ itemMods }>
                <Image
                  mix={ { block: 'MenuOverlay', elem: 'Image', mods: itemMods } }
                  src={ icon && `/media/${icon}` }
                  ratio="16x9"
                  arePlaceholdersShown
                />
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
        const childrenArray = Object.values(children);
        const isVisible = activeMenuItemsStack.includes(item_id);
        const subcategoryMods = { type: 'subcategory' };

        return (
            <div
              block="MenuOverlay"
              elem="ItemList"
              mods={ { ...subcategoryMods, isVisible } }
            >
                { childrenArray.map((item) => {
                    const { url, item_id, children } = item;
                    const childrenArray = Object.values(children);

                    return (childrenArray.length
                        ? (
                            <div
                              key={ item_id }
                              onClick={ e => this.showSubCategory(e, item) }
                              tabIndex="0"
                              role="button"
                            >
                                { this.renderItemContent(item, subcategoryMods) }
                                { this.renderSubLevel(item) }
                            </div>
                        ) : (
                            <Link
                              key={ item_id }
                              to={ url }
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
        );
    }

    renderFirstLevel(itemList, itemMods) {
        return Object.values(itemList).map((item) => {
            const { item_id, children, url } = item;
            const childrenArray = Object.values(children);

            return (
                <li key={ item_id } block="MenuOverlay" elem="Item">
                    { childrenArray.length
                        ? (
                            <div
                              onClick={ e => this.showSubCategory(e, item) }
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

    renderAdditionalInformation() {
        return (
            <aside block="MenuOverlay" elem="AdditionalInformation">
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
            </aside>
        );
    }

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) return null;

        const {
            0: { children: mainCategories, title: mainCategoriesTitle },
            1: { children: trendingCategories, title: trendingCategoriesTitle }
        } = categoryArray;

        const mainMods = { type: 'main' };
        const trendingMods = { type: 'trending' };

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
                <ul
                  block="MenuOverlay"
                  elem="ItemList"
                  mods={ trendingMods }
                  aria-label={ trendingCategoriesTitle }
                >
                    <li block="MenuOverlay" elem="ItemListHeading">
                        { trendingCategoriesTitle }
                    </li>
                    { this.renderFirstLevel(trendingCategories, trendingMods) }
                </ul>
                { this.renderAdditionalInformation() }
            </div>
        );
    }

    render() {
        return (
            <Overlay
              id="menu"
              mix={ { block: 'MenuOverlay' } }
            >
                { this.renderTopLevel() }
            </Overlay>
        );
    }
}
