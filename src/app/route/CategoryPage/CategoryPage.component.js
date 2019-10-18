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
import { PureComponent } from 'react';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import CategoryProductList from 'Component/CategoryProductList';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryDetails from 'Component/CategoryDetails';
import ContentWrapper from 'Component/ContentWrapper';
import CategorySort from 'Component/CategorySort';
import { CategoryTreeType } from 'Type/Category';
import { FilterType, FilterInputType } from 'Type/ProductList';
import Meta from 'Component/Meta';
import './CategoryPage.style';

export default class CategoryPage extends PureComponent {
    static propTypes = {
        category: CategoryTreeType.isRequired,
        minPriceRange: PropTypes.number.isRequired,
        maxPriceRange: PropTypes.number.isRequired,
        getIsNewCategory: PropTypes.func.isRequired,
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
        getFilterUrl: PropTypes.func.isRequired,
        onSortChange: PropTypes.func.isRequired,
        updateFilter: PropTypes.func.isRequired,
        updatePriceRange: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        selectedFilters: FilterType.isRequired,
        filter: FilterInputType.isRequired,
        search: PropTypes.string.isRequired
    };

    onFilterButtonClick = this.onFilterButtonClick.bind(this);

    onFilterButtonClick() {
        const { toggleOverlayByKey, changeHeaderState } = this.props;

        toggleOverlayByKey('category-filter');
        changeHeaderState({ name: 'filter', title: __('Filters') });
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

    renderCategoryProductList() {
        const {
            filter,
            search,
            selectedSort,
            selectedFilters,
            getIsNewCategory
        } = this.props;

        return (
            <CategoryProductList
              filter={ filter }
              search={ search }
              sort={ selectedSort }
              selectedFilters={ selectedFilters }
              getIsNewCategory={ getIsNewCategory }
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
                        <CategoryItemsCount />
                        { this.renderCategorySort() }
                        { this.renderFilterButton() }
                    </aside>
                    { this.renderCategoryProductList() }
                </ContentWrapper>
            </main>
        );
    }
}
