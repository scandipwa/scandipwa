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

import { lazy, PureComponent, Suspense } from 'react';

import CategoryDetails from 'Component/CategoryDetails';
import { CATEGORY_FILTER_OVERLAY_ID } from 'Component/CategoryFilterOverlay/CategoryFilterOverlay.config';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryProductList from 'Component/CategoryProductList';
import CategorySort from 'Component/CategorySort';
import { CategorySortField } from 'Component/CategorySort/CategorySort.type';
import ContentWrapper from 'Component/ContentWrapper';
import FilterIcon from 'Component/FilterIcon';
import GridIcon from 'Component/GridIcon';
import Html from 'Component/Html';
import ListIcon from 'Component/ListIcon';
import Loader from 'Component/Loader';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { ReactElement } from 'Type/Common.type';
import { isCrawler, isSSR } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';

import {
    CategoryDisplayMode,
    CategoryPageLayout,
    LAYOUT_KEY
} from './CategoryPage.config';
import { CategoryPageComponentProps, CategoryPageComponentState } from './CategoryPage.type';

import './CategoryPage.style';

export const CategoryFilterOverlay = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "overlays-category" */ 'Component/CategoryFilterOverlay'
));

/** @namespace Route/CategoryPage/Component */
export class CategoryPage<
P extends CategoryPageComponentProps = CategoryPageComponentProps,
S extends CategoryPageComponentState = CategoryPageComponentState
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
        selectedLayoutType: undefined
    };

    __construct(props: CategoryPageComponentProps): void {
        super.__construct?.(props);
        this.onFilterButtonClick = this.onFilterButtonClick.bind(this);

        this.state = {
            activeLayoutType: undefined
        } as S;
    }

    static getDerivedStateFromProps(props: CategoryPageComponentProps): Partial<CategoryPageComponentState> {
        const {
            isMobile,
            defaultPlpType,
            selectedLayoutType
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

    onFilterButtonClick(): void {
        const { toggleOverlayByKey } = this.props;

        toggleOverlayByKey(CATEGORY_FILTER_OVERLAY_ID);
    }

    displayProducts(): boolean {
        const {
            category: {
                display_mode = CategoryDisplayMode.PRODUCTS
            } = {}
        } = this.props;

        return display_mode === null
            || display_mode === CategoryDisplayMode.PRODUCTS
            || display_mode === CategoryDisplayMode.BOTH;
    }

    displayCmsBlock(): boolean {
        const { category: { display_mode } = {} } = this.props;

        return display_mode === CategoryDisplayMode.CMS_BLOCK
            || display_mode === CategoryDisplayMode.BOTH;
    }

    renderCategoryDetails(): ReactElement {
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
            isMatchingInfoFilter

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
              onClick={ this.onFilterButtonClick }
            >
                <FilterIcon />
                <span>{ __('Filters') }</span>
                { this.renderFiltersCount() }
            </button>
        );
    }

<<<<<<< HEAD:packages/scandipwa/src/route/CategoryPage/CategoryPage.component.tsx
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
=======
    renderFilterPlaceholder() {
>>>>>>> scandipwa/master:packages/scandipwa/src/route/CategoryPage/CategoryPage.component.js
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
            isSearchPage
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
            isMobile
        } = this.props;

        const { options = [] } = sortFields;
        const updatedSortFields: CategorySortField[] = options.map(({ value: id, label }) => ({ id, label }));
        const { sortDirection, sortKey } = selectedSort;

        if (isMobile && !isMatchingInfoFilter) {
            return this.renderFilterButtonPlaceholder();
        }

        return (
            <CategorySort
              isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
              isMatchingInfoFilter={ isMatchingInfoFilter }
              onSortChange={ onSortChange }
              sortFields={ updatedSortFields }
              sortKey={ sortKey }
              sortDirection={ sortDirection }
            />
        );
    }

    renderLayoutButton(type: CategoryPageLayout): ReactElement {
        const {
            onGridButtonClick,
            onListButtonClick
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
                          mods: { isActive: activeLayoutType === CategoryPageLayout.GRID }
                      } }
                      aria-label="grid"
                    >
                        <GridIcon isActive={ activeLayoutType === CategoryPageLayout.GRID } />
                    </button>
            );
        case CategoryPageLayout.LIST:
            return (
                    <button
                      key={ type }
                      onClick={ onListButtonClick }
                      mix={ {
                          block: CategoryPageLayout.LIST,
                          mods: { isActive: activeLayoutType === CategoryPageLayout.LIST }
                      } }
                      aria-label="list"
                    >
                        <ListIcon isActive={ activeLayoutType === CategoryPageLayout.LIST } />
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

<<<<<<< HEAD:packages/scandipwa/src/route/CategoryPage/CategoryPage.component.tsx
    renderItemsCount(isVisibleOnMobile = false): ReactElement {
        const { isMatchingListFilter, isMobile, totalItems } = this.props;
=======
    renderItemsCount(isVisibleOnMobile = false) {
        const { isMatchingListFilter, isMobile } = this.props;
>>>>>>> scandipwa/master:packages/scandipwa/src/route/CategoryPage/CategoryPage.component.js

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
                  layout={ activeLayoutType || CategoryPageLayout.GRID }
                />
            </div>
        );
    }

    renderCmsBlock(): ReactElement {
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

<<<<<<< HEAD:packages/scandipwa/src/route/CategoryPage/CategoryPage.component.tsx
    renderMiscellaneous(): ReactElement {
        const { totalItems } = this.props;

        if (totalItems === 0 || !this.displayProducts()) {
            return <aside block="CategoryPage" elem="Miscellaneous" mods={ { noResults: true } } />;
        }

=======
    renderMiscellaneous() {
>>>>>>> scandipwa/master:packages/scandipwa/src/route/CategoryPage/CategoryPage.component.js
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
