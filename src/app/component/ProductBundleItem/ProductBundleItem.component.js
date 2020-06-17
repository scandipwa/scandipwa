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
import ProductCustomizableOption from 'Component/ProductCustomizableOption/ProductCustomizableOption.component';
import ProductBundleItemFields from 'Component/ProductBundleItemFields';
import Field from 'Component/Field';

export const CHECKBOX = 'checkbox';
export const SELECT = 'select';

class ProductBundleItem extends ProductCustomizableOption {
    static propTypes = {
        ...ProductCustomizableOption.propTypes,
        maxQuantity: PropTypes.number.isRequired,
        setCheckboxItemQuantity: PropTypes.func.isRequired,
        setDropdownItemQuantity: PropTypes.func.isRequired
    };

    renderMap = {
        [CHECKBOX]: this.renderCheckboxValues.bind(this),
        [SELECT]: this.renderDropdownValues.bind(this)
    };

    renderOptionCheckboxValue = (item) => {
        const {
            getSelectedCheckboxValue,
            renderOptionLabel,
            setCheckboxItemQuantity,
            maxQuantity
        } = this.props;
        const {
            id,
            label,
            product: { price: { minimalPrice: { amount: { value } } } },
            price_type
        } = item;

        const priceLabel = renderOptionLabel(price_type, value);

        return (
            <div key={ id }>
                <Field
                  type="checkbox"
                  label={ this.renderHeading(label, priceLabel) }
                  id={ `option-${ id }` }
                  name={ `option-${ id }` }
                  value={ id }
                  onChange={ getSelectedCheckboxValue }
                />
                <ProductBundleItemFields
                  option={ item }
                  setItemQuantity={ setCheckboxItemQuantity }
                  maxQuantity={ maxQuantity }
                />
            </div>
        );
    };

    renderQtyInput = (item) => {
        const {
            selectedDropdownValue, setDropdownItemQuantity, maxQuantity, minQuantity
        } = this.props;
        const { id, quantity } = item;
        const itemQty = quantity || 1;

        if (id !== selectedDropdownValue) {
            return null;
        }

        return (
            <ProductBundleItemFields
              key={ id }
              option={ { id: selectedDropdownValue, quantity: itemQty } }
              setItemQuantity={ setDropdownItemQuantity }
              maxQuantity={ maxQuantity }
              minQuantity={ minQuantity }
            />
        );
    };

    renderOptionDropdownValues(values) {
        const {
            option: { options },
            getDropdownOptions,
            selectedDropdownValue,
            setDropdownValue
        } = this.props;
        const dropdownOptions = getDropdownOptions(values);

        return (
            <>
                <Field
                  id="customizable-options-dropdown"
                  name="customizable-options-dropdown"
                  type="select"
                  mix={ { block: 'CustomizableOptions', elem: 'Select' } }
                  placeholder={ __('Choose Option') }
                  selectOptions={ dropdownOptions }
                  value={ selectedDropdownValue }
                  onChange={ setDropdownValue }
                />
                { options.map(this.renderQtyInput) }
            </>
        );
    }

    renderCheckboxValues() {
        const { option: { required, options } } = this.props;

        return (
            <>
                { options.map(this.renderOptionCheckboxValue) }
                { this.renderRequired(required) }
            </>
        );
    }

    renderDropdownValues() {
        const { option: { required, options } } = this.props;

        return (
            <>
                { this.renderOptionDropdownValues(options) }
                { this.renderRequired(required) }
            </>
        );
    }

    render() {
        const { optionType } = this.props;
        const render = this.renderMap[optionType];

        if (!render) {
            return null;
        }

        return render();
    }
}

export default ProductBundleItem;
