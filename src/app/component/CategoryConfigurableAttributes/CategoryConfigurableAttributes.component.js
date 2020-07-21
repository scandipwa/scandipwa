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

// eslint-disable-next-line max-len
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.component';
import CategoryPriceRange from 'Component/CategoryPriceRange';
import CategorySubcategories from 'Component/CategorySubcategories';
import ExpandableContent from 'Component/ExpandableContent';

class CategoryConfigurableAttributes extends ProductConfigurableAttributes {
    renderPriceRange() {
        return (
            <CategoryPriceRange key="price" />
        );
    }

    renderDropdownOrSwatch(option) {
        const {
            isContentExpanded,
            getSubHeading
        } = this.props;

        const {
            attribute_label,
            attribute_code,
            attribute_options
        } = option;

        const [{ swatch_data }] = attribute_options ? Object.values(attribute_options) : [{}];
        const isSwatch = !!swatch_data;

        return (
            <ExpandableContent
              key={ attribute_code }
              heading={ attribute_label }
              subHeading={ getSubHeading(option) }
              mix={ {
                  block: 'ProductConfigurableAttributes',
                  elem: 'Expandable'
              } }
              isContentExpanded={ isContentExpanded }
            >
                { isSwatch ? this.renderSwatch(option) : this.renderDropdown(option) }
            </ExpandableContent>
        );
    }

    renderConfigurableOption = (option) => {
        const { attribute_code } = option;

        switch (attribute_code) {
        case 'price':
            return this.renderPriceRange(option);
        default:
            return this.renderDropdownOrSwatch(option);
        }
    };

    renderConfigurableAttributes() {
        const { configurable_options } = this.props;

        return Object.values(configurable_options)
            .map(this.renderConfigurableOption);
    }

    renderDropdown(option) {
        const { attribute_values } = option;

        return (
            <div
              block="ProductConfigurableAttributes"
              elem="DropDownList"
            >
                { attribute_values.map((attribute_value) => (
                    this.renderConfigurableAttributeValue({ ...option, attribute_value })
                )) }
            </div>
        );
    }
}

export default CategoryConfigurableAttributes;
