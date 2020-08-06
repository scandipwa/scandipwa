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

import './CategoryPage.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CategoryDetails from 'Component/CategoryDetails';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import { CATEGORY_FILTER_OVERLAY_ID } from 'Component/CategoryFilterOverlay/CategoryFilterOverlay.config';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryProductList from 'Component/CategoryProductList';
import CategorySort from 'Component/CategorySort';
import ContentWrapper from 'Component/ContentWrapper';
import Html from 'Component/Html';
import { CategoryTreeType } from 'Type/Category';
import { FilterInputType, FilterType } from 'Type/ProductList';
import isMobile from 'Util/Mobile';

export class CategoryPage extends PureComponent {
    static propTypes = {
        category: CategoryTreeType.isRequired,
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
        onSortChange: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        selectedFilters: FilterType.isRequired,
        filter: FilterInputType.isRequired,
        search: PropTypes.string,
        isContentFiltered: PropTypes.bool,
        isMatchingListFilter: PropTypes.bool,
        isMatchingInfoFilter: PropTypes.bool,
        totalPages: PropTypes.number
    };

    static defaultProps = {
        isContentFiltered: true,
        isMatchingListFilter: false,
        isMatchingInfoFilter: false,
        totalPages: 1,
        search: ''
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
            isMatchingInfoFilter
        } = this.props;

        return (
            <CategoryFilterOverlay
              availableFilters={ filters }
              customFiltersValues={ selectedFilters }
              isMatchingInfoFilter={ isMatchingInfoFilter }
            />
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

    renderItemsCount(isVisibleOnMobile = false) {
        const { isMatchingListFilter } = this.props;

        if (isVisibleOnMobile && !isMobile.any()) {
            return null;
        }

        if (!isVisibleOnMobile && isMobile.any()) {
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
            isMatchingListFilter
        } = this.props;

        return (
            <div block="CategoryPage" elem="ProductListWrapper">
                { this.renderItemsCount(true) }
                <CategoryProductList
                  filter={ filter }
                  search={ search }
                  sort={ selectedSort }
                  selectedFilters={ selectedFilters }
                  isMatchingListFilter={ isMatchingListFilter }
                />
            </div>
        );
    }

    renderCmsBlock() {
        const { category: { cms_block } } = this.props;

        if (!cms_block) {
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

    renderContent() {
        return (
            <>
                { this.renderFilterOverlay() }
                { this.renderCategoryDetails() }
                <aside block="CategoryPage" elem="Miscellaneous">
                    { this.renderItemsCount() }
                    { this.renderCategorySort() }
                    { this.renderFilterButton() }
                </aside>
                { this.renderCategoryProductList() }
                { this.renderCmsBlock() }
            </>
        );
    }

    render() {
        return (
            <main block="CategoryPage">
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CategoryPage',
                      elem: 'Wrapper'
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
