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

import ExpandableContent from 'Component/ExpandableContent';
import ExpandableContentShowMore from 'Component/ExpandableContentShowMore';
import ProductAttributeValue from 'Component/ProductAttributeValue/ProductAttributeValue.component';
import { ProductAttributeShape } from 'Component/ProductAttributeValue/ProductAttributeValue.type';
// eslint-disable-next-line max-len
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.component';
import {
    ProductConfigurableAttribute,
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import { ReactElement } from 'Type/Common.type';
import { getPriceFilterLabel } from 'Util/Category';
import { sortBySortOrder } from 'Util/Product';
import { IndexedAttributeWithValueOption } from 'Util/Product/Product.type';

import {
    CategoryConfigurableAttributesComponentProps,
    CategoryConfigurableAttributesComponentState,
} from './CategoryConfigurableAttributes.type';

/** @namespace Component/CategoryConfigurableAttributes/Component */
export class CategoryConfigurableAttributesComponent<
P extends Readonly<CategoryConfigurableAttributesComponentProps> = Readonly<CategoryConfigurableAttributesComponentProps>,
S extends CategoryConfigurableAttributesComponentState = CategoryConfigurableAttributesComponentState,
> extends ProductConfigurableAttributes<
    P,
    S
    > {
    renderSubCategories(option: Partial<ProductConfigurableAttribute>): ReactElement {
        const { getSubCategories } = this.props;

        const optionWithSubcategories = getSubCategories(option);
        const { attribute_values = [] } = optionWithSubcategories;

        if (!attribute_values.length) {
            return null;
        }

        return this.renderDropdownOrSwatch(optionWithSubcategories);
    }

    renderPriceSwatch(option: Partial<ProductConfigurableAttribute>): ReactElement {
        const { currencyCode } = this.props;
        const { attribute_options, ...priceOption } = option;

        if (attribute_options) {
            // do not render price filter if it includes "*_*" aggregation
            if (attribute_options['*_*']) {
                return null;
            }

            (priceOption as Partial<ProductConfigurableAttribute>).attribute_options = Object.entries(attribute_options)
                .reduce((
                    acc: Record<string, IndexedAttributeWithValueOption>,
                    [key, option],
                ) => {
                    const { label: oldLabel } = option;
                    const [from, to] = oldLabel.split('~');
                    const label = getPriceFilterLabel(from, to, currencyCode);

                    acc[key] = { ...option, label };

                    return acc;
                }, {});
        }

        return this.renderDropdownOrSwatch(priceOption);
    }

    renderDropdownOrSwatch(option: Partial<ProductConfigurableAttribute>): ReactElement {
        const {
            isContentExpanded,
        } = this.props;

        const {
            attribute_label,
            attribute_code,
            attribute_options,
        } = option;

        const [{ swatch_data = null }] = attribute_options ? Object.values(attribute_options) : [{}];
        const isSwatch = !!swatch_data;

        return (
            <ExpandableContent
              key={ attribute_code }
              heading={ attribute_label }
              mix={ {
                  block: 'ProductConfigurableAttributes',
                  elem: 'Expandable',
              } }
              isContentExpanded={ isContentExpanded }
            >
                { isSwatch ? this.renderSwatch(option) : this.renderDropdown(option) }
            </ExpandableContent>
        );
    }

    renderConfigurableAttributeValue(attribute: Partial<ProductConfigurableAttribute>): ReactElement {
        const {
            getIsConfigurableAttributeAvailable,
            handleOptionClick,
            getLink,
            isSelected,
            showProductCount,
        } = this.props;

        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              isSelected={ isSelected(attribute) }
              isAvailable={ getIsConfigurableAttributeAvailable(attribute) }
              onClick={ handleOptionClick as (o: Partial<ProductAttributeShape>) => void }
              getLink={ getLink as (o: Partial<ProductAttributeShape>) => string }
              isProductCountVisible={ showProductCount }
            />
        );
    }

    renderConfigurableOption(option: Partial<ProductConfigurableAttribute>): ReactElement {
        const { attribute_code } = option;

        switch (attribute_code) {
        case 'price':
            return this.renderPriceSwatch(option);
        case 'category_id':
            return this.renderSubCategories(option);
        default:
            return this.renderDropdownOrSwatch(option);
        }
    }

    renderConfigurableAttributes(): ReactElement {
        const { configurable_options } = this.props;

        return sortBySortOrder(Object.values(configurable_options), 'attribute_position')
            .map(this.renderConfigurableOption.bind(this));
    }

    renderDropdown(option: Partial<ProductConfigurableAttribute>): ReactElement {
        const { attribute_values = [] } = option;

        return (
            <div
              block="ProductConfigurableAttributes"
              elem="DropDownList"
            >
                <ExpandableContentShowMore>
                    { attribute_values.map((attribute_value) => (
                        this.renderConfigurableAttributeValue({ ...option, attribute_value })
                    )) }
                </ExpandableContentShowMore>
            </div>
        );
    }
}

export default CategoryConfigurableAttributesComponent;
