import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Overlay from 'Component/Overlay';
import { MENU_SUBCATEGORY } from 'Component/Header';
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
        const { title, item_id } = item;

        return (
            <figure
              block="MenuOverlay"
              elem="ItemFigure"
              mods={ itemMods }
            >
                <figcaption
                  id={ item_id }
                  block="MenuOverlay"
                  elem="ItemCaption"
                  mods={ itemMods }
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
            <ul block="MenuOverlay" elem="Menu">
                <li>
                    <p
                      block="MenuOverlay"
                      elem="Banner"
                    >
                        {/* TODO: remove hard-code */}
                        Imagine 2019
                        <strong>up to 20% off sale</strong>
                    </p>
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
    menu: MenuType.isRequired,
    hideActiveOverlay: PropTypes.func.isRequired,
    goToPreviousHeaderState: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

export default MenuOverlay;
