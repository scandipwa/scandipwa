/* eslint-disable react/forbid-dom-props */
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

import { PureComponent, Suspense } from 'react';

import CategoryDetails from 'Component/CategoryDetails';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryProductList from 'Component/CategoryProductList';
import { CategorySortField } from 'Component/CategorySort/CategorySort.type';
import ContentWrapper from 'Component/ContentWrapper';
// import Html from 'Component/Html';
import Loader from 'Component/Loader';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { lowPriorityLazy } from 'Util/Request/LowPriorityRender';

import {
    CategoryDisplayMode,
    CategoryPageLayout,
    LAYOUT_KEY,
} from './CategoryPage.config';
import { CategoryPageComponentProps, CategoryPageComponentState } from './CategoryPage.type';

import './CategoryPage.style';

export const CategoryFilterOverlay = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "overlays-category" */ 'Component/CategoryFilterOverlay'
));
export const FilterIcon = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "category-misc" */ 'Component/FilterIcon'
));
export const GridIcon = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "category-misc" */ 'Component/GridIcon'
));
export const ListIcon = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "category-misc" */ 'Component/ListIcon'
));
export const CategorySort = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "category-misc" */ 'Component/CategorySort'
));

/** @namespace Route/CategoryPage/Component */
export class CategoryPageComponent<
P extends CategoryPageComponentProps = CategoryPageComponentProps,
S extends CategoryPageComponentState = CategoryPageComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CategoryPageComponentProps> = {
        isContentFiltered: true,
        isMatchingListFilter: false,
        isCurrentCategoryLoaded: false,
        isMatchingInfoFilter: false,
        totalPages: 1,
        defaultPlpType: undefined,
        plpTypes: [],
        search: '',
        appliedFiltersCount: 0,
        selectedLayoutType: undefined,
    };

    state = {
        activeLayoutType: undefined,
    } as S;

    static getDerivedStateFromProps(props: CategoryPageComponentProps): Partial<CategoryPageComponentState> {
        const {
            isMobile,
            defaultPlpType,
            selectedLayoutType,
        } = props;

        /*
        * Use stored plpType from the BrowserDatabase
        * if there is one
        */
        const storedPlpType = BrowserDatabase.getItem<CategoryPageLayout>(LAYOUT_KEY) || selectedLayoutType;

        if (storedPlpType) {
            const activeLayoutType = isMobile
                ? CategoryPageLayout.GRID
                : storedPlpType || defaultPlpType;

            return { activeLayoutType };
        }

        const activeLayoutType = isMobile
            ? CategoryPageLayout.GRID
            : selectedLayoutType || defaultPlpType;

        return { activeLayoutType };
    }

    displayProducts() {
        const { displayMode } = this.props;

        return displayMode === null
            || displayMode === CategoryDisplayMode.PRODUCTS
            || displayMode === CategoryDisplayMode.BOTH;
    }

    displayCmsBlock(): boolean {
        const { category: { display_mode } = {} } = this.props;

        return display_mode === CategoryDisplayMode.CMS_BLOCK
            || display_mode === CategoryDisplayMode.BOTH;
    }

    renderCategoryDetails(): ReactElement {
        const {
            category,
            isCurrentCategoryLoaded,
        } = this.props;

        return (
            <CategoryDetails
              category={ category }
              isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
            />
        );
    }

    renderFiltersCount(): ReactElement {
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

    renderFilterButton(): ReactElement {
        const {
            isContentFiltered,
            totalPages,
            category: { is_anchor },
            isSearchPage,
            isCurrentCategoryLoaded,
            isMatchingInfoFilter,
            onFilterButtonClick,
        } = this.props;

        if (!isMatchingInfoFilter) {
            return this.renderFilterButtonPlaceholder();
        }

        if ((!isContentFiltered && totalPages === 0) || (!is_anchor && !isSearchPage) || !isCurrentCategoryLoaded) {
            return null;
        }

        return (
            <button
              block="CategoryPage"
              elem="Filter"
              onClick={ onFilterButtonClick }
            >
                <Suspense fallback={ null }><FilterIcon /></Suspense>
                <span>{ __('Filters') }</span>
                { this.renderFiltersCount() }
            </button>
        );
    }

    renderPlaceholder(block: string): ReactElement {
        return (
            <>
                <div block={ block } elem="SwatchList">
                    <div block={ block } elem="Placeholder" />
                    <div block={ block } elem="Placeholder" />
                    <div block={ block } elem="Placeholder" />
                </div>
                <Loader isLoading />
            </>
        );
    }

    renderFilterPlaceholder(): ReactElement {
        return (
            <div block="CategoryPage" elem="PlaceholderWrapper">
                <div block="CategoryPage" elem="PlaceholderContainer">
                    <h3 block="CategoryPage" elem="PlaceholderHeading">
                        { __('Shopping Options') }
                    </h3>
                    <div block="CategoryPage" elem="PlaceholderList">
                        <div block="CategoryPage" elem="PlaceholderListItem" />
                        <div block="CategoryPage" elem="PlaceholderListItem" />
                        <div block="CategoryPage" elem="PlaceholderListItem" />
                    </div>
                    <Loader isLoading />
                </div>
            </div>
        );
    }

    renderFilterButtonPlaceholder(): ReactElement {
        return (
            <p block="CategoryPage" elem="FilterButtonPlaceholder">
                <TextPlaceholder length={ TextPlaceHolderLength.SHORT } />
            </p>
        );
    }

    renderFilterOverlay(): ReactElement {
        const {
            filters,
            selectedFilters,
            isMatchingInfoFilter,
            isSearchPage,
        } = this.props;

        const { category: { is_anchor } } = this.props;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderFilterPlaceholder() || null }>
                <CategoryFilterOverlay
                  availableFilters={ filters }
                  customFiltersValues={ selectedFilters }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                  isCategoryAnchor={ !!is_anchor }
                  isSearchPage={ isSearchPage }
                  renderPlaceholder={ this.renderPlaceholder }
                />
            </Suspense>
        );
    }

    renderCategorySort(): ReactElement {
        const {
            sortFields,
            selectedSort,
            onSortChange,
            isMatchingInfoFilter,
            isCurrentCategoryLoaded,
            isMobile,
        } = this.props;

        const { options = [] } = sortFields;
        const updatedSortFields: CategorySortField[] = options.map(({ value: id, label }) => ({ id, label }));
        const { sortDirection, sortKey } = selectedSort;

        if (isMobile && !isMatchingInfoFilter) {
            return this.renderFilterButtonPlaceholder();
        }

        return (
            <Suspense fallback={ null }>
                <CategorySort
                  isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                  onSortChange={ onSortChange }
                  sortFields={ updatedSortFields }
                  sortKey={ sortKey }
                  sortDirection={ sortDirection }
                />
            </Suspense>
        );
    }

    renderLayoutButton(type: CategoryPageLayout): ReactElement {
        const {
            onGridButtonClick,
            onListButtonClick,
        } = this.props;

        const { activeLayoutType } = this.state;

        switch (type) {
        case CategoryPageLayout.GRID:
            return (
                <button
                  key={ type }
                  onClick={ onGridButtonClick }
                  mix={ {
                      block: CategoryPageLayout.GRID,
                      mods: { isActive: activeLayoutType === CategoryPageLayout.GRID },
                  } }
                  aria-label="grid"
                >
                    <Suspense fallback={ null }><GridIcon isActive={ activeLayoutType === CategoryPageLayout.GRID } /></Suspense>
                </button>
            );
        case CategoryPageLayout.LIST:
            return (
                <button
                  key={ type }
                  onClick={ onListButtonClick }
                  mix={ {
                      block: CategoryPageLayout.LIST,
                      mods: { isActive: activeLayoutType === CategoryPageLayout.LIST },
                  } }
                  aria-label="list"
                >
                    <Suspense fallback={ null }><ListIcon isActive={ activeLayoutType === CategoryPageLayout.LIST } /></Suspense>
                </button>
            );
        default:
            return false;
        }
    }

    renderLayoutButtons(): ReactElement {
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

    renderItemsCount(isVisibleOnMobile = false): ReactElement {
        const { isMatchingListFilter, isMobile } = this.props;

        if ((isVisibleOnMobile && !isMobile) || (!isVisibleOnMobile && isMobile)) {
            return null;
        }

        return (
            <CategoryItemsCount
              isMatchingListFilter={ isMatchingListFilter }
            />
        );
    }

    renderCategoryProductList(): ReactElement {
        const {
            filter,
            search,
            selectedSort,
            selectedFilters,
            isMatchingListFilter,
            isCurrentCategoryLoaded,
            isMatchingInfoFilter,
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
                  layout={ activeLayoutType || CategoryPageLayout.GRID }
                />
            </div>
        );
    }

    renderCmsBlock(): ReactElement {
        const { category: { cms_block }, isCurrentCategoryLoaded } = this.props;

        if (!cms_block || !this.displayCmsBlock() || !isCurrentCategoryLoaded) {
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
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={ { __html: content } }
            />
        );
    }

    renderMiscellaneous(): ReactElement {
        const { totalItems } = this.props;

        if (totalItems === 0 || !this.displayProducts()) {
            return <aside block="CategoryPage" elem="Miscellaneous" mods={ { noResults: true } } />;
        }

        return (
            <aside block="CategoryPage" elem="Miscellaneous">
                { this.renderItemsCount() }
                <div
                  block="CategoryPage"
                  elem="MiscellaneousLayoutWrapper"
                >
                  <div
                    block="CategoryPage"
                    elem="LayoutWrapper"
                    mods={ { isPrerendered: isSSR() || isCrawler() } }
                  >
                      { this.renderLayoutButtons() }
                      { this.renderCategorySort() }
                  </div>
                  <div
                    block="CategoryPage"
                    elem="LayoutWrapper"
                    mods={ { isPrerendered: isSSR() || isCrawler() } }
                  >
                      { this.renderFilterButton() }
                  </div>
                </div>
            </aside>
        );
    }

    renderContent(): ReactElement {
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

    render(): ReactElement {
        const hideProducts = !this.displayProducts();
        const { totalItems } = this.props;

        return (
            <main block="CategoryPage" mods={ { noResults: totalItems === 0 } }>
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CategoryPage',
                      elem: 'Wrapper',
                      mods: { hideProducts },
                  } }
                  label="Category page"
                >
                    { this.renderContent() }
                </ContentWrapper>
            </main>
        );
    }
}

export default CategoryPageComponent;
