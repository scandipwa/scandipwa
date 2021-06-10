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
    childrenCategories: state.CategoryReducer.category.children
});

/** @namespace Component/CategoryConfigurableAttributes/Container */
export class CategoryConfigurableAttributesContainer extends ProductConfigurableAttributesContainer {
    containerFunctions = {
        ...this.containerFunctions,
        getSubCategories: this.getSubCategories.bind(this)
    };

    getSubCategories(option) {
        const optionWithSubcategories = { ...option };
        const { childrenCategories } = this.props;
        const { attribute_values } = option;
        const childrenCategoryIds = childrenCategories.map((category) => category.id.toString());
        const subCategoriesIds = attribute_values.filter((item) => childrenCategoryIds.includes(item));
        optionWithSubcategories.attribute_values = subCategoriesIds;

        return optionWithSubcategories;
    }

    render() {
        return (
            <CategoryConfigurableAttributes
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

/** @namespace Component/CategoryConfigurableAttributes/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigurableAttributesContainer);
