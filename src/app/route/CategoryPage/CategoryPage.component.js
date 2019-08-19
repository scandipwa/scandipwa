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
import React, { PureComponent } from 'react';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import CategoryProductList from 'Component/CategoryProductList';
import CategoryPagination from 'Component/CategoryPagination';
import TextPlaceholder from 'Component/TextPlaceholder';
import CategoryDetails from 'Component/CategoryDetails';
import ContentWrapper from 'Component/ContentWrapper';
import CategorySort from 'Component/CategorySort';
import { CategoryTreeType } from 'Type/Category';
import { PagesType, FilterType } from 'Type/ProductList';
import Meta from 'Component/Meta';
import './CategoryPage.style';

class CategoryPage extends PureComponent {
    constructor(props) {
        super(props);

        this.onFilterButtonClick = this.onFilterButtonClick.bind(this);
    }

    onFilterButtonClick() {
        const { toggleOverlayByKey, changeHeaderState } = this.props;

        toggleOverlayByKey('category-filter');
        changeHeaderState({ name: 'filter', title: __('Filters') });
    }

    renderItemCount() {
        const { totalItems, isPagesLoading } = this.props;

        return (
            <p block="CategoryPage" elem="ItemsCount">
                <TextPlaceholder
                  content={ (isPagesLoading
                      ? __('Products are loading...')
                      : __('%s items found', totalItems)
                  ) }
                />
            </p>
        );
    }

    renderProductList() {
        const {
            pages,
            requestNextPage,
            updatePage,
            isPagesLoading,
            pageParams: { totalPages },
            selectedFilters
        } = this.props;

        return (
            <CategoryProductList
              pages={ pages }
              isLoading={ isPagesLoading }
              totalPages={ totalPages }
              selectedFilters={ selectedFilters }
              loadPage={ requestNextPage }
              updatePage={ updatePage }
            />
        );
    }

    renderCategoryDetails() {
        const { category } = this.props;

        return (
            <CategoryDetails
              category={ category }
            />
        );
    }

    renderFilterButton() {
        return (
            <button
              block="CategoryPage"
              elem="Filter"
              onClick={ this.onFilterButtonClick }
            >
                { __('Filter') }
            </button>
        );
    }

    renderFilterOverlay() {
        const {
            minPriceRange,
            maxPriceRange,
            filters,
            selectedFilters,
            selectedPriceRange,
            updatePriceRange,
            updateFilter,
            getFilterUrl
        } = this.props;

        return (
            <CategoryFilterOverlay
              getFilterUrl={ getFilterUrl }
              availableFilters={ filters }
              customFiltersValues={ selectedFilters }
              updateFilter={ updateFilter }
              updatePriceRange={ updatePriceRange }
              priceValue={ selectedPriceRange }
              minPriceValue={ minPriceRange }
              maxPriceValue={ maxPriceRange }
            />
        );
    }

    renderCategorySort() {
        const { sortFields, selectedSort, onSortChange } = this.props;
        const { options = {} } = sortFields;
        const updatedSortFields = Object.values(options).map(({ value: id, label }) => ({ id, label }));
        const { sortDirection, sortKey } = selectedSort;

        return (
            <CategorySort
              onSortChange={ onSortChange }
              sortFields={ updatedSortFields }
              sortKey={ sortKey }
              sortDirection={ sortDirection }
            />
        );
    }

    renderCategoryPagination() {
        const {
            category,
            requestPage,
            isPagesLoading,
            pageParams: { totalPages, currentPage }
        } = this.props;

        if (isPagesLoading) return null;

        return (
            <CategoryPagination
              category={ category }
              totalPages={ totalPages }
              currentPage={ currentPage }
              ariaLabel={ __('Catalog navigation') }
              getPage={ requestPage }
            />
        );
    }

    render() {
        const { category } = this.props;

        return (
            <main block="CategoryPage">
                <ContentWrapper
                  wrapperMix={ { block: 'CategoryPage', elem: 'Wrapper' } }
                  label="Category page"
                >
                    <Meta metaObject={ category } />
                    { this.renderFilterOverlay() }
                    { this.renderCategoryDetails() }
                    <aside block="CategoryPage" elem="Miscellaneous">
                        { this.renderItemCount() }
                        { this.renderCategorySort() }
                        { this.renderFilterButton() }
                    </aside>
                    { this.renderProductList() }
                    { this.renderCategoryPagination() }
                </ContentWrapper>
            </main>
        );
    }
}

CategoryPage.propTypes = {
    category: CategoryTreeType.isRequired,
    pages: PagesType.isRequired,
    totalItems: PropTypes.number.isRequired,
    minPriceRange: PropTypes.number.isRequired,
    maxPriceRange: PropTypes.number.isRequired,
    filters: PropTypes.objectOf(PropTypes.shape).isRequired,
    sortFields: PropTypes.shape({
        options: PropTypes.array
    }).isRequired,
    selectedSort: PropTypes.shape({
        sortDirection: PropTypes.oneOf([
            'ASC',
            'DESC'
        ]),
        sortKey: PropTypes.string
    }).isRequired,
    selectedPriceRange: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }).isRequired,
    pageParams: PropTypes.shape({
        totalPages: PropTypes.number,
        currentPage: PropTypes.number
    }).isRequired,
    getFilterUrl: PropTypes.func.isRequired,
    isPagesLoading: PropTypes.bool.isRequired,
    onSortChange: PropTypes.func.isRequired,
    requestPage: PropTypes.func.isRequired,
    requestNextPage: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updatePriceRange: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    toggleOverlayByKey: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired,
    selectedFilters: FilterType.isRequired
};

export default CategoryPage;
