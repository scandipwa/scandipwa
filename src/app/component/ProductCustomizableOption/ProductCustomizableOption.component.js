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
        contentHeading: PropTypes.string.isRequired,
        getSelectedCheckboxValue: PropTypes.func.isRequired,
        renderOptionLabel: PropTypes.func.isRequired,
        updateTextFieldValue: PropTypes.func.isRequired,
        getHeading: PropTypes.func.isRequired,
        setDropdownValue: PropTypes.func.isRequired,
        selectedDropdownValue: PropTypes.number.isRequired,
        optionType: PropTypes.string.isRequired,
        getDropdownOptions: PropTypes.func.isRequired
    };

    renderRequired(isRequired) {
        // skip undefined and false
        if (isRequired !== true) {
            return null;
        }

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

    renderOptionField(value, isRequired) {
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
                { this.renderRequired(isRequired) }
                { this.renderMaxCharacters() }
            </>
        );
    }

    renderMaxCharacters(max_characters) {
        if (max_characters <= 0) {
            return null;
        }

        return (
            <div
              block="ProductCustomizableOptions"
              elem="Information"
            >
                { __('Maximum %s characters', max_characters) }
            </div>
        );
    }

    renderCheckboxValues() {
        const { option: { required, checkboxValues } } = this.props;

        return (
            <>
                { checkboxValues.map(this.renderOptionCheckboxValue) }
                { this.renderRequired(required) }
            </>
        );
    }

    renderDropdownValues() {
        const { option: { required, dropdownValues } } = this.props;

        return (
            <>
                { this.renderOptionDropdownValues(dropdownValues) }
                { this.renderRequired(required) }
            </>
        );
    }

    renderField() {
        const { option: { required, fieldValues } } = this.props;
        return this.renderOptionField(fieldValues, required);
    }

    renderArea() {
        const { option: { required, areaValues } } = this.props;
        return this.renderOptionField(areaValues, required);
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
        const {
            contentHeading,
            option: {
                option_id
            }
        } = this.props;

        return (
            <ExpandableContent
              heading={ contentHeading }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
              isContentExpanded
            >
                { this.renderContent() }
            </ExpandableContent>
        );
    }
}

export default ProductCustomizableOptions;
