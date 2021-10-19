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
    currencyCode: state.ConfigReducer.currencyData.current_currency_code,
    showProductCount: state.ConfigReducer.layered_navigation_product_count_enabled,
    childrenCategories: state.CategoryReducer.category.children || []
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
            currencyCode,
            showProductCount,
            childrenCategories
        } = this.props;

        return {
            currencyCode,
            showProductCount,
            childrenCategories,
            ...super.containerProps()
        };
    }

    getCategorySubCategories() {
        const { childrenCategories } = this.props;
        return childrenCategories.map(({ id }) => id.toString());
    }

    getSubCategories(option) {
        const { isSearchPage } = this.props;
        const optionWithSubcategories = { ...option };
        const { attribute_values } = option;

        if (!isSearchPage) {
            const categoryItemsIds = this.getCategorySubCategories();
            const subCategoriesIds = attribute_values.filter((item) => categoryItemsIds.includes(item));
            optionWithSubcategories.attribute_values = subCategoriesIds;
        }

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
