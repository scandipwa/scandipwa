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

import CategoryDetails from 'Component/CategoryDetails';
import CategoryFilterOverlay from 'Component/CategoryFilterOverlay';
import { CATEGORY_FILTER_OVERLAY_ID } from 'Component/CategoryFilterOverlay/CategoryFilterOverlay.config';
import CategoryItemsCount from 'Component/CategoryItemsCount';
import CategoryProductList from 'Component/CategoryProductList';
import CategorySort from 'Component/CategorySort';
import ContentWrapper from 'Component/ContentWrapper';
import Html from 'Component/Html';
import { CategoryTreeType } from 'Type/Category';
import { DeviceType } from 'Type/Device';
import { FilterInputType, FilterType } from 'Type/ProductList';

import {
    DISPLAY_MODE_BOTH,
    DISPLAY_MODE_CMS_BLOCK,
    DISPLAY_MODE_PRODUCTS
} from './CategoryPage.config';

import './CategoryPage.style';

/** @namespace Route/CategoryPage/Component */
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
        isCurrentCategoryLoaded: PropTypes.bool,
        isMatchingListFilter: PropTypes.bool,
        isMatchingInfoFilter: PropTypes.bool,
        totalPages: PropTypes.number,
        device: DeviceType.isRequired,
        is_anchor: PropTypes.bool,
        defaultPlpType: PropTypes.string,
        plpTypes: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        isContentFiltered: true,
        isMatchingListFilter: false,
        isCurrentCategoryLoaded: false,
        isMatchingInfoFilter: false,
        totalPages: 1,
        is_anchor: true,
        search: '',
        defaultPlpType: '',
        plpTypes: []
    };

    state = {};

    onFilterButtonClick = this.onFilterButtonClick.bind(this);

    onGridButtonClick = this.onGridButtonClick.bind(this);

    onListButtonClick = this.onListButtonClick.bind(this);

    componentDidUpdate() {
        const { layout } = this.state;

        if (!layout) {
            this.setDefaultPlpType();
        }
    }

    onFilterButtonClick() {
        const { toggleOverlayByKey } = this.props;
        toggleOverlayByKey(CATEGORY_FILTER_OVERLAY_ID);
    }

    onGridButtonClick() {
        this.setState({ layout: 'grid' });
    }

    onListButtonClick() {
        this.setState({ layout: 'list' });
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

    setDefaultPlpType() {
        const { defaultPlpType } = this.props;

        this.setState({ layout: defaultPlpType });
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

    renderFilterButton() {
        const { isContentFiltered, totalPages, category: { is_anchor } } = this.props;

        if ((!isContentFiltered && totalPages === 0) || !is_anchor) {
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

        const { category: { is_anchor } } = this.props;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <CategoryFilterOverlay
              availableFilters={ filters }
              customFiltersValues={ selectedFilters }
              isMatchingInfoFilter={ isMatchingInfoFilter }
              isCategoryAnchor={ !!is_anchor }
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

    renderLayoutButton = (type) => {
        const { layout } = this.state;

        switch (type) {
        case 'grid':
            return (
                <button
                  onClick={ this.onGridButtonClick }
                  mix={ { block: 'grid', mods: { isActive: layout === 'grid' } } }
                >
                    { __('Grid') }
                </button>
            );
        case 'list':
            return (
                <button
                  onClick={ this.onListButtonClick }
                  mix={ { block: 'list', mods: { isActive: layout === 'list' } } }
                >
                    { __('List') }
                </button>
            );
        default:
            return false;
        }
    };

    renderLayoutButtons() {
        const { plpTypes } = this.props;

        if (plpTypes.length !== 2) {
            return null;
        }

        return (
            <div block="CategoryPage" elem="LayoutButtons">
                { plpTypes.map(this.renderLayoutButton) }
            </div>
        );
    }

    renderItemsCount(isVisibleOnMobile = false) {
        const { isMatchingListFilter, device } = this.props;

        if (isVisibleOnMobile && !device.isMobile) {
            return null;
        }

        if (!isVisibleOnMobile && device.isMobile) {
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

        const { layout } = this.state;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <div block="CategoryPage" elem="ProductListWrapper">
                { this.renderItemsCount(true) }
                <CategoryProductList
                  filter={ filter }
                  search={ search }
                  sort={ selectedSort }
                  selectedFilters={ selectedFilters }
                  isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
                  isMatchingListFilter={ isMatchingListFilter }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                  layout={ layout }
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
        if (!this.displayProducts()) {
            return null;
        }

        return (
            <aside block="CategoryPage" elem="Miscellaneous">
                <div block="CategoryPage" elem="LayoutWrapper">
                    { this.renderLayoutButtons() }
                    { this.renderItemsCount() }
                </div>
                { this.renderCategorySort() }
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

        return (
            <main block="CategoryPage">
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
