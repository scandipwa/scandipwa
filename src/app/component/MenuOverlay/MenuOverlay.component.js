import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from 'Component/Image';
import Overlay from 'Component/Overlay';
import Html from 'Component/Html';
import { MENU_SUBCATEGORY } from 'Component/Header';
import { BlockListType } from 'Type/CMS';
import { MenuType } from 'Type/Menu';
import './MenuOverlay.style';

class MenuOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = { activeSubcategory: '' };

        this.closeMenuOverlay = this.closeMenuOverlay.bind(this);
    }

    showSubCategory(activeSubcategory) {
        const { changeHeaderState, goToPreviousHeaderState } = this.props;
        const { item_id, title } = activeSubcategory;

        changeHeaderState({
            name: MENU_SUBCATEGORY,
            title,
            onBackClick: () => {
                this.setState({ activeSubcategory: '' });
                goToPreviousHeaderState();
            }
        });

        this.setState({ activeSubcategory: item_id });
    }

    closeMenuOverlay(e) {
        const { hideActiveOverlay } = this.props;

        e.stopPropagation();

        this.setState({ activeSubcategory: '' });
        hideActiveOverlay();
    }

    renderItemContent(item, itemMods = {}) {
        const {
            title,
            item_id,
            icon,
            item_class
        } = item;
        const figureProps = { block: 'MenuOverlay', elem: 'ItemFigure' };

        if (item_class) {
            figureProps.className = item_class;
        } else {
            figureProps.mods = itemMods;
        }

        return (
            <figure { ...figureProps }>
                <Image
                  mix={ { block: 'MenuOverlay', elem: 'Image' } }
                  src={ `/media/${icon}` }
                  ratio="16x9"
                />
                <figcaption
                  id={ item_id }
                  block="MenuOverlay"
                  elem="ItemCaption"
                >
                    { title }
                </figcaption>
            </figure>
        );
    }

    renderItemList(itemList, itemMods) {
        return Object.values(itemList).map((item) => {
            const { item_id, children, url } = item;
            const childrenArray = Object.values(children);

            return (
                <li key={ item_id } block="MenuOverlay" elem="Item" aria-labelledby={ item_id }>
                    {
                        childrenArray.length
                            ? (
                                <button onClick={ this.showSubCategory.bind(this, item) }>
                                    { this.renderItemContent(item, itemMods) }
                                    { this.renderSubCategory(item) }
                                </button>
                            ) : (
                                <Link to={ `/category${url}` } onClick={ this.closeMenuOverlay }>
                                    { this.renderItemContent(item, itemMods) }
                                </Link>
                            )
                    }
                </li>
            );
        });
    }

    renderSubCategory(category) {
        const { activeSubcategory } = this.state;
        const { item_id, children } = category;
        const childrenArray = Object.values(children);
        const isVisible = activeSubcategory === item_id;
        const subcategoryMods = { type: 'subcategory' };

        return (
            <div
              id={ item_id }
              block="MenuOverlay"
              elem="ItemList"
              mods={ { ...subcategoryMods, isVisible } }
            >
                { childrenArray.map((item) => {
                    const { url, item_id } = item;

                    return (
                        <Link key={ item_id } to={ `/category${url}` } onClick={ this.closeMenuOverlay }>
                            { this.renderItemContent(item, subcategoryMods) }
                        </Link>
                    );
                }) }
            </div>
        );
    }

    renderMainCategory() {
        const { menu, blocks: { items } } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) return null;

        const {
            0: { children: mainCategories, title: mainCategoriesTitle },
            1: { children: trendingCategories, title: trendingCategoriesTitle }
        } = categoryArray;

        const mainMods = { type: 'main' };
        const trendingMods = { type: 'trending' };
        const getContent = id => ((items && items[id]) ? items[id].content : '');

        return (
            <ul block="MenuOverlay" elem="Menu">
                <li>
                    <div
                      block="MenuOverlay"
                      elem="Banner"
                    >
                        <Html content={ getContent('imagine-banner') } />
                    </div>
                    <ul
                      block="MenuOverlay"
                      elem="ItemList"
                      mods={ mainMods }
                      aria-label={ mainCategoriesTitle }
                    >
                        { this.renderItemList(mainCategories, mainMods) }
                    </ul>
                    <ul
                      block="MenuOverlay"
                      elem="ItemList"
                      mods={ trendingMods }
                      aria-label={ trendingCategoriesTitle }
                    >
                        <h2
                          block="MenuOverlay"
                          elem="ItemListHeading"
                        >
                            { trendingCategoriesTitle }
                        </h2>

                        { this.renderItemList(trendingCategories, trendingMods) }
                    </ul>
                    <hr
                      block="MenuOverlay"
                      elem="HorizontalRule"
                    />
                    <h3
                      block="MenuOverlay"
                      elem="PageLink"
                    >
                        <Link to="/page/about-us" onClick={ this.closeMenuOverlay }>
                            ABOUT US
                        </Link>
                    </h3>
                    <h3
                      block="MenuOverlay"
                      elem="PageLink"
                    >
                        <Link to="/page/about-us" onClick={ this.closeMenuOverlay }>
                            CONTACTS
                        </Link>
                    </h3>
                    <div
                      block="MenuOverlay"
                      elem="Social"
                    >
                        <Html content={ getContent('footer-social-links') } />
                    </div>
                </li>
            </ul>
        );
    }

    render() {
        return (
            <Overlay
              id="menu"
              mix={ { block: 'MenuOverlay' } }
            >
                { this.renderMainCategory() }
            </Overlay>
        );
    }
}

MenuOverlay.propTypes = {
    blocks: BlockListType.isRequired,
    menu: MenuType.isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    goToPreviousHeaderState: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

export default MenuOverlay;
