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
import {
    CATEGORY_FILTER_OVERLAY_ID
} from 'Component/CategoryFilterOverlay/CategoryFilterOverlay.component';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import CategoryProductList from 'Component/CategoryProductList';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryDetails from 'Component/CategoryDetails';
import ContentWrapper from 'Component/ContentWrapper';
import CategorySort from 'Component/CategorySort';
import { CategoryTreeType } from 'Type/Category';
import { FilterType, FilterInputType } from 'Type/ProductList';
import './CategoryPage.style';
import isMobile from 'Util/Mobile';

export default class CategoryPage extends PureComponent {
    static propTypes = {
        category: CategoryTreeType.isRequired,
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
        getFilterUrl: PropTypes.func.isRequired,
        onSortChange: PropTypes.func.isRequired,
        updateFilter: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        selectedFilters: FilterType.isRequired,
        filter: FilterInputType.isRequired,
        search: PropTypes.string.isRequired,
        isContentFiltered: PropTypes.bool,
        totalPages: PropTypes.number
    };

    static defaultProps = {
        isContentFiltered: true,
        totalPages: 1
    };

    onFilterButtonClick = this.onFilterButtonClick.bind(this);

    onFilterButtonClick() {
        const { toggleOverlayByKey } = this.props;
        toggleOverlayByKey(CATEGORY_FILTER_OVERLAY_ID);
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
        const { isContentFiltered, totalPages } = this.props;

        if (!isContentFiltered && totalPages === 0) {
            return null;
        }

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
            filters,
            selectedFilters,
            updateFilter,
            getFilterUrl
        } = this.props;

        return (
            <CategoryFilterOverlay
              getFilterUrl={ getFilterUrl }
              availableFilters={ filters }
              customFiltersValues={ selectedFilters }
              updateFilter={ updateFilter }
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

    renderItemsCount(isVisibleOnMobile = false) {
        if (isVisibleOnMobile && !isMobile.any()) {
            return null;
        }

        if (!isVisibleOnMobile && isMobile.any()) {
            return null;
        }

        return <CategoryItemsCount />;
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
            <div block="CategoryPage" elem="ProductListWrapper">
                { this.renderItemsCount(true) }
                <CategoryProductList
                  filter={ filter }
                  search={ search }
                  sort={ selectedSort }
                  selectedFilters={ selectedFilters }
                  getIsNewCategory={ getIsNewCategory }
                />
            </div>
        );
    }

    render() {
        return (
            <main block="CategoryPage">
                <ContentWrapper
                  wrapperMix={ { block: 'CategoryPage', elem: 'Wrapper' } }
                  label="Category page"
                >
                    { this.renderFilterOverlay() }
                    { this.renderCategoryDetails() }
                    <aside block="CategoryPage" elem="Miscellaneous">
                        { this.renderItemsCount() }
                        { this.renderCategorySort() }
                        { this.renderFilterButton() }
                    </aside>
                    { this.renderCategoryProductList() }
                </ContentWrapper>
            </main>
        );
    }
}
