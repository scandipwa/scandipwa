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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpandableContent from 'Component/ExpandableContent';
import Field from 'Component/Field';

class ProductCustomizableOptions extends PureComponent {
    static propTypes = {
        option: PropTypes.object.isRequired,
        textValue: PropTypes.string.isRequired,
        getSelectedCheckboxValue: PropTypes.func.isRequired,
        renderOptionLabel: PropTypes.func.isRequired,
        updateTextFieldValue: PropTypes.func.isRequired,
        getHeading: PropTypes.func.isRequired,
        setDropdownValue: PropTypes.func.isRequired,
        selectedDropdownValue: PropTypes.number.isRequired,
        optionType: PropTypes.string.isRequired,
        getDropdownOptions: PropTypes.func.isRequired
    };

    renderRequired() {
        return (
            <div
              block="ProductCustomizableOptions"
              elem="Required"
            >
                { __('This field is required!') }
            </div>
        );
    }

    renderOptionCheckboxValue = (item) => {
        const { getSelectedCheckboxValue, renderOptionLabel, getHeading } = this.props;
        const {
            option_type_id,
            title,
            price,
            price_type
        } = item;
        const priceLabel = renderOptionLabel(price_type, price);

        return (
            <Field
              type="checkbox"
              label={ getHeading(title, priceLabel) }
              key={ option_type_id }
              id={ `option-${ option_type_id }` }
              name={ `option-${ option_type_id }` }
              value={ option_type_id }
              renderLabelAfter
              onChange={ getSelectedCheckboxValue }
            />
        );
    };

    renderCheckboxValues() {
        const { option } = this.props;
        const {
            title,
            option_id,
            required,
            checkboxValues
        } = option;

        return (
            <ExpandableContent
              heading={ __(title) }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { checkboxValues.map(this.renderOptionCheckboxValue) }
                { required ? this.renderRequired() : null }
            </ExpandableContent>
        );
    }

    renderOptionDropdownValues(values) {
        const { getDropdownOptions, selectedDropdownValue, setDropdownValue } = this.props;
        const dropdownOptions = getDropdownOptions(values);

        return (
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
        );
    }

    renderDropdownValues() {
        const { option } = this.props;
        const {
            title,
            option_id,
            required,
            dropdownValues
        } = option;

        return (
            <ExpandableContent
              heading={ __(title) }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { this.renderOptionDropdownValues(dropdownValues) }
                { required ? this.renderRequired() : null }
            </ExpandableContent>
        );
    }

    renderOptionField(value, id, isRequired) {
        const { updateTextFieldValue, textValue, optionType } = this.props;
        const { max_characters } = value;
        const fieldType = optionType === 'field' ? 'text' : 'textarea';

        return (
            <>
                <Field
                  id={ `customizable-options-${ fieldType }` }
                  name={ `customizable-options-${ fieldType }` }
                  type={ fieldType }
                  maxLength={ max_characters > 0 ? max_characters : null }
                  value={ textValue }
                  onChange={ updateTextFieldValue }
                />
                { isRequired ? this.renderRequired() : null }
                { max_characters > 0 && (
                    <div
                      block="ProductCustomizableOptions"
                      elem="Information"
                    >
                        { __('Maximum %s characters', max_characters) }
                    </div>
                ) }
            </>
        );
    }

    renderField() {
        const { option, renderOptionLabel, getHeading } = this.props;
        const {
            title,
            option_id,
            required,
            fieldValues
        } = option;
        const { price_type, price } = fieldValues;
        const priceLabel = renderOptionLabel(price_type, price);

        return (
            <ExpandableContent
              heading={ getHeading(title, priceLabel) }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { this.renderOptionField(fieldValues, required) }
            </ExpandableContent>
        );
    }

    renderArea() {
        const { option, renderOptionLabel, getHeading } = this.props;
        const {
            title, option_id, required, areaValues
        } = option;
        const { price_type, price } = areaValues;
        const priceLabel = renderOptionLabel(price_type, price);

        return (
            <ExpandableContent
              heading={ getHeading(title, priceLabel) }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { this.renderOptionField(areaValues, required) }
            </ExpandableContent>
        );
    }

    renderContent() {
        const { optionType } = this.props;

        switch (optionType) {
        case 'checkbox':
            return this.renderCheckboxValues();
        case 'dropdown':
            return this.renderDropdownValues();
        case 'field':
            return this.renderField();
        case 'area':
            return this.renderArea();
        default:
            return null;
        }
    }

    render() {
        return this.renderContent();
    }
}

export default ProductCustomizableOptions;
