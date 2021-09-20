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

import { connect } from 'react-redux';

// eslint-disable-next-line max-len
import ProductConfigurableAttributesContainer from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';

import CategoryConfigurableAttributes from './CategoryConfigurableAttributes.component';

/** @namespace Component/CategoryConfigurableAttributes/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    currency_code: state.ConfigReducer.currencyData.current_currency_code,
    show_product_count: state.ConfigReducer.layered_navigation_product_count_enabled,
    childrenCategories: state.CategoryReducer.category.children,
    categoryItems: state.ProductListReducer.pages
});

/** @namespace Component/CategoryConfigurableAttributes/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CategoryConfigurableAttributes/Container */
export class CategoryConfigurableAttributesContainer extends ProductConfigurableAttributesContainer {
    containerFunctions = {
        ...this.containerFunctions,
        getSubCategories: this.getSubCategories.bind(this)
    };

    containerProps() {
        const {
            currency_code,
            show_product_count,
            childrenCategories
        } = this.props;

        return {
            currency_code,
            show_product_count,
            childrenCategories,
            ...super.containerProps()
        };
    }

    getSearchCategories() {
        const { categoryItems } = this.props;
        const allCategoryItems = Object.values(categoryItems).reduce((prev, next) => [...prev, ...next], []);
        const categoryIds = allCategoryItems.reduce(
            (prev, { categories }) => [...prev, ...categories.map(({ id }) => id.toString())], []
        );

        return Array.from(new Set(categoryIds));
    }

    getCategorySubCategories() {
        const { childrenCategories } = this.props;
        return childrenCategories.map(({ id }) => id.toString());
    }

    getSubCategories(option) {
        const { isSearchPage } = this.props;
        const optionWithSubcategories = { ...option };
        const { attribute_values } = option;

        const categoryItemsIds = isSearchPage ? this.getSearchCategories() : this.getCategorySubCategories();
        const subCategoriesIds = attribute_values.filter((item) => categoryItemsIds.includes(item));
        optionWithSubcategories.attribute_values = subCategoriesIds;

        return optionWithSubcategories;
    }

    render() {
        return (
            <CategoryConfigurableAttributes
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigurableAttributesContainer);
