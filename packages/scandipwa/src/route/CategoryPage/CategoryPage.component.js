/* eslint-disable react/forbid-dom-props */
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
import { lazy, PureComponent, Suspense } from 'react';

import CategoryDetails from 'Component/CategoryDetails';
import { CATEGORY_FILTER_OVERLAY_ID } from 'Component/CategoryFilterOverlay/CategoryFilterOverlay.config';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryProductList from 'Component/CategoryProductList';
import CategorySort from 'Component/CategorySort';
import ContentWrapper from 'Component/ContentWrapper';
import FilterIcon from 'Component/FilterIcon';
import GridIcon from 'Component/GridIcon';
import Html from 'Component/Html';
import ListIcon from 'Component/ListIcon';
import Loader from 'Component/Loader';
import {
    CategoryTreeType, FilterInputType, FilterType, SortFieldsType
} from 'Type/Category.type';
import { SortDirectionType } from 'Type/Direction.type';
import { AttributesType } from 'Type/ProductList.type';
import { isCrawler, isSSR } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';

import {
    DISPLAY_MODE_BOTH,
    DISPLAY_MODE_CMS_BLOCK,
    DISPLAY_MODE_PRODUCTS,
    GRID_LAYOUT,
    LAYOUT_KEY,
    LIST_LAYOUT
} from './CategoryPage.config';

import './CategoryPage.style';

export const CategoryFilterOverlay = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "overlays-category" */ 'Component/CategoryFilterOverlay'
));

/** @namespace Route/CategoryPage/Component */
export class CategoryPage extends PureComponent {
    static propTypes = {
        category: CategoryTreeType.isRequired,
        filters: AttributesType.isRequired,
        sortFields: SortFieldsType.isRequired,
        selectedSort: PropTypes.shape({
            sortDirection: SortDirectionType,
            sortKey: PropTypes.string
        }).isRequired,
        onSortChange: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        selectedFilters: FilterType.isRequired,
        filter: FilterInputType.isRequired,
        search: PropTypes.string,
        isContentFiltered: PropTypes.bool,
        isCurrentCategoryLoaded: PropTypes.bool,
        isMatchingListFilter: PropTypes.bool,
        isMatchingInfoFilter: PropTypes.bool,
        isSearchPage: PropTypes.bool.isRequired,
        totalPages: PropTypes.number,
        totalItems: PropTypes.number.isRequired,
        isMobile: PropTypes.bool.isRequired,
        onGridButtonClick: PropTypes.func.isRequired,
        onListButtonClick: PropTypes.func.isRequired,
        defaultPlpType: PropTypes.string,
        selectedLayoutType: PropTypes.string,
        plpTypes: PropTypes.arrayOf(PropTypes.string),
        appliedFiltersCount: PropTypes.number
    };

    static defaultProps = {
        isContentFiltered: true,
        isMatchingListFilter: false,
        isCurrentCategoryLoaded: false,
        isMatchingInfoFilter: false,
        totalPages: 1,
        defaultPlpType: '',
        plpTypes: [],
        search: '',
        appliedFiltersCount: 0,
        selectedLayoutType: ''
    };

    state = {};

    onFilterButtonClick = this.onFilterButtonClick.bind(this);

    static getDerivedStateFromProps(props) {
        const {
            isMobile,
            defaultPlpType,
            selectedLayoutType
        } = props;

        /*
        * Use stored plpType from the BrowserDatabase
        * if there is one
        */
        const storedPlpType = BrowserDatabase.getItem(LAYOUT_KEY) || selectedLayoutType;

        if (storedPlpType) {
            const activeLayoutType = isMobile
                ? GRID_LAYOUT
                : storedPlpType || defaultPlpType;

            return { activeLayoutType };
        }

        const activeLayoutType = isMobile
            ? GRID_LAYOUT
            : selectedLayoutType || defaultPlpType;

        return { activeLayoutType };
    }

    onFilterButtonClick() {
        const { toggleOverlayByKey } = this.props;
        toggleOverlayByKey(CATEGORY_FILTER_OVERLAY_ID);
    }

    displayProducts() {
        const {
            category: {
                display_mode = DISPLAY_MODE_PRODUCTS
            } = {}
        } = this.props;

        return display_mode === null
            || display_mode === DISPLAY_MODE_PRODUCTS
            || display_mode === DISPLAY_MODE_BOTH;
    }

    displayCmsBlock() {
        const { category: { display_mode } = {} } = this.props;

        return display_mode === DISPLAY_MODE_CMS_BLOCK
            || display_mode === DISPLAY_MODE_BOTH;
    }

    renderCategoryDetails() {
        const {
            category,
            isCurrentCategoryLoaded
        } = this.props;

        return (
            <CategoryDetails
              category={ category }
              isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
            />
        );
    }

    renderFiltersCount() {
        const { appliedFiltersCount } = this.props;

        if (!appliedFiltersCount) {
            return null;
        }

        return (
            <span block="CategoryPage" elem="Subheading">
                { ` (${appliedFiltersCount})` }
            </span>
        );
    }

    renderFilterButton() {
        const {
            isContentFiltered,
            totalPages,
            category: { is_anchor },
            isSearchPage
        } = this.props;

        if ((!isContentFiltered && totalPages === 0) || (!is_anchor && !isSearchPage)) {
            return null;
        }

        return (
            <button
              block="CategoryPage"
              elem="Filter"
              onClick={ this.onFilterButtonClick }
            >
                <FilterIcon />
                <span>{ __('Filters') }</span>
                { this.renderFiltersCount() }
            </button>
        );
    }

    renderFilterPlaceholder() {
        return (
            <div block="CategoryPage" elem="FilterPlaceholder">
                <Loader isLoading />
            </div>
        );
    }

    renderFilterOverlay() {
        const {
            filters,
            selectedFilters,
            isMatchingInfoFilter,
            isSearchPage
        } = this.props;

        const { category: { is_anchor } } = this.props;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderFilterPlaceholder() }>
                <CategoryFilterOverlay
                  availableFilters={ filters }
                  customFiltersValues={ selectedFilters }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                  isCategoryAnchor={ !!is_anchor }
                  isSearchPage={ isSearchPage }
                />
            </Suspense>
        );
    }

    renderCategorySort() {
        const {
            sortFields,
            selectedSort,
            onSortChange,
            isMatchingInfoFilter
        } = this.props;

        const { options = {} } = sortFields;
        const updatedSortFields = Object.values(options).map(({ value: id, label }) => ({ id, label }));
        const { sortDirection, sortKey } = selectedSort;

        return (
            <CategorySort
              isMatchingInfoFilter={ isMatchingInfoFilter }
              onSortChange={ onSortChange }
              sortFields={ updatedSortFields }
              sortKey={ sortKey }
              sortDirection={ sortDirection }
            />
        );
    }

    renderLayoutButton(type) {
        const {
            onGridButtonClick,
            onListButtonClick
        } = this.props;

        const { activeLayoutType } = this.state;

        switch (type) {
        case GRID_LAYOUT:
            return (
                <button
                  key={ type }
                  onClick={ onGridButtonClick }
                  mix={ { block: GRID_LAYOUT, mods: { isActive: activeLayoutType === GRID_LAYOUT } } }
                  aria-label="grid"
                >
                    <GridIcon isActive={ activeLayoutType === GRID_LAYOUT } />
                </button>
            );
        case LIST_LAYOUT:
            return (
                <button
                  key={ type }
                  onClick={ onListButtonClick }
                  mix={ { block: LIST_LAYOUT, mods: { isActive: activeLayoutType === LIST_LAYOUT } } }
                  aria-label="list"
                >
                    <ListIcon isActive={ activeLayoutType === LIST_LAYOUT } />
                </button>
            );
        default:
            return false;
        }
    }

    renderLayoutButtons() {
        const { plpTypes } = this.props;

        /*
        * So far there is only two types of
        * the Storefront list modes
         */
        if (plpTypes.length !== 2) {
            return null;
        }

        return (
            <div block="CategoryPage" elem="LayoutButtons">
                { plpTypes.map(this.renderLayoutButton.bind(this)) }
            </div>
        );
    }

    renderItemsCount(isVisibleOnMobile = false) {
        const { isMatchingListFilter, isMobile, totalItems } = this.props;

        if ((isVisibleOnMobile && !isMobile) || (!isVisibleOnMobile && isMobile) || totalItems === 0) {
            return null;
        }

        return (
            <CategoryItemsCount
              isMatchingListFilter={ isMatchingListFilter }
            />
        );
    }

    renderCategoryProductList() {
        const {
            filter,
            search,
            selectedSort,
            selectedFilters,
            isMatchingListFilter,
            isCurrentCategoryLoaded,
            isMatchingInfoFilter
        } = this.props;

        const { activeLayoutType } = this.state;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <div
              block="CategoryPage"
              elem="ProductListWrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderItemsCount(true) }
                <CategoryProductList
                  filter={ filter }
                  search={ search }
                  sort={ selectedSort }
                  selectedFilters={ selectedFilters }
                  isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
                  isMatchingListFilter={ isMatchingListFilter }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                  layout={ activeLayoutType || GRID_LAYOUT }
                />
            </div>
        );
    }

    renderCmsBlock() {
        const { category: { cms_block } } = this.props;

        if (!cms_block || !this.displayCmsBlock()) {
            return null;
        }

        const { content, disabled } = cms_block;

        if (disabled) {
            return null;
        }

        return (
            <div
              block="CategoryPage"
              elem="CMS"
            >
                <Html content={ content } />
            </div>
        );
    }

    renderMiscellaneous() {
        const { totalItems } = this.props;

        if (totalItems === 0 || !this.displayProducts()) {
            return <aside block="CategoryPage" elem="Miscellaneous" mods={ { noResults: true } } />;
        }

        return (
            <aside block="CategoryPage" elem="Miscellaneous">
                { this.renderItemsCount() }
                <div
                  block="CategoryPage"
                  elem="LayoutWrapper"
                  mods={ { isPrerendered: isSSR() || isCrawler() } }
                >
                    { this.renderLayoutButtons() }
                    { this.renderCategorySort() }
                </div>
                { this.renderFilterButton() }
            </aside>
        );
    }

    renderContent() {
        return (
            <>
                { this.renderFilterOverlay() }
                { this.renderCategoryDetails() }
                { this.renderCmsBlock() }
                { this.renderMiscellaneous() }
                { this.renderCategoryProductList() }
            </>
        );
    }

    render() {
        const hideProducts = !this.displayProducts();
        const { totalItems } = this.props;

        return (
            <main block="CategoryPage" mods={ { noResults: totalItems === 0 } }>
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CategoryPage',
                      elem: 'Wrapper',
                      mods: { hideProducts }
                  } }
                  label="Category page"
                >
                    { this.renderContent() }
                </ContentWrapper>
            </main>
        );
    }
}

export default CategoryPage;
