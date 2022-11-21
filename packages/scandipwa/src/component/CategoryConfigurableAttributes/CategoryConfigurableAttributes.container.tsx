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

import { connect } from 'react-redux';

import ProductConfigurableAttributesContainer
    from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';
import {
    ProductConfigurableAttribute,
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import CategoryConfigurableAttributes from './CategoryConfigurableAttributes.component';
import {
    CategoryConfigurableAttributesComponentContainerFunctions,
    CategoryConfigurableAttributesComponentContainerPropKeys,
    CategoryConfigurableAttributesComponentProps,
    CategoryConfigurableAttributesContainerMapDispatchProps,
    CategoryConfigurableAttributesContainerMapStateProps,
    CategoryConfigurableAttributesContainerProps,
} from './CategoryConfigurableAttributes.type';

/** @namespace Component/CategoryConfigurableAttributes/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CategoryConfigurableAttributesContainerMapStateProps => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code,
    showProductCount: state.ConfigReducer.layered_navigation_product_count_enabled,
    childrenCategories: state.CategoryReducer.category.children || [],
    parameters: state.CategoryReducer.selectedFilters,
});

/** @namespace Component/CategoryConfigurableAttributes/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CategoryConfigurableAttributesContainerMapDispatchProps => ({});

/** @namespace Component/CategoryConfigurableAttributes/Container */
export class CategoryConfigurableAttributesContainer extends ProductConfigurableAttributesContainer<
CategoryConfigurableAttributesContainerProps
> {
    static defaultProps: Partial<
    CategoryConfigurableAttributesContainerProps
    > = ProductConfigurableAttributesContainer.defaultProps;

    containerFunctions: CategoryConfigurableAttributesComponentContainerFunctions = {
        ...this.containerFunctions,
        getSubCategories: this.getSubCategories.bind(this),
    };

    containerProps(): Pick<
    CategoryConfigurableAttributesComponentProps,
    CategoryConfigurableAttributesComponentContainerPropKeys
    > {
        const {
            currencyCode,
            showProductCount,
            childrenCategories,
        } = this.props;

        return {
            currencyCode,
            showProductCount,
            childrenCategories,
            ...super.containerProps(),
        };
    }

    getCategorySubCategories(): string[] {
        const { childrenCategories } = this.props;

        return childrenCategories.map(({ id }) => id.toString());
    }

    getSubCategories(option: Partial<ProductConfigurableAttribute>): Partial<ProductConfigurableAttribute> {
        const { isSearchPage } = this.props;
        const optionWithSubcategories = { ...option };
        const { attribute_values = [] } = option;

        if (!isSearchPage) {
            const categoryItemsIds = this.getCategorySubCategories();
            const subCategoriesIds = attribute_values.filter((item) => categoryItemsIds.includes(item));

            optionWithSubcategories.attribute_values = subCategoriesIds;
        }

        return optionWithSubcategories;
    }

    render(): ReactElement {
        return (
            <CategoryConfigurableAttributes
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryConfigurableAttributesContainer);
