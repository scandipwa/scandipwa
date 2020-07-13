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
import ExpandableContent from 'Component/ExpandableContent';
import Field from 'Component/Field';

export const CHECKBOX = 'checkbox';
export const DROPDOWN = 'dropdown';
export const TEXT_FIELD = 'field';
export const AREA_FIELD = 'area';

class ProductCustomizableOption extends ExtensiblePureComponent {
    static propTypes = {
        option: PropTypes.object.isRequired,
        textValue: PropTypes.string.isRequired,
        getSelectedCheckboxValue: PropTypes.func.isRequired,
        renderOptionLabel: PropTypes.func.isRequired,
        updateTextFieldValue: PropTypes.func.isRequired,
        setDropdownValue: PropTypes.func.isRequired,
        selectedDropdownValue: PropTypes.number.isRequired,
        optionType: PropTypes.string.isRequired,
        getDropdownOptions: PropTypes.func.isRequired
    };

    renderMap = {
        [CHECKBOX]: {
            render: () => this.renderCheckboxValues(),
            title: () => this.renderTitle()
        },
        [DROPDOWN]: {
            render: () => this.renderDropdownValues(),
            title: () => this.renderTitle()
        },
        [TEXT_FIELD]: {
            render: () => this.renderTextField(),
            title: () => this.renderTextFieldTitle()
        },
        [AREA_FIELD]: {
            render: () => this.renderTextField(),
            title: () => this.renderTextFieldTitle()
        }
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

    renderHeading(mainTitle, titleBold) {
        return (
            <>
                <span
                  block="ProductCustomizableOptions"
                  elem="Heading"
                >
                    { `${ mainTitle } + ` }
                </span>
                <span
                  block="ProductCustomizableOptions"
                  elem="HeadingBold"
                >
                    { titleBold }
                </span>
            </>
        );
    }

    renderOptionCheckboxValue = (item) => {
        const { getSelectedCheckboxValue, renderOptionLabel } = this.props;
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
              label={ this.renderHeading(title, priceLabel) }
              key={ option_type_id }
              id={ `option-${ option_type_id }` }
              name={ `option-${ option_type_id }` }
              value={ option_type_id }
              onChange={ getSelectedCheckboxValue }
            />
        );
    };

    renderOptionDropdownValues(values) {
        const {
            getDropdownOptions,
            selectedDropdownValue,
            setDropdownValue
        } = this.props;
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
        const { option: { required, data } } = this.props;

        return (
            <>
                { data.map(this.renderOptionCheckboxValue) }
                { this.renderRequired(required) }
            </>
        );
    }

    renderDropdownValues() {
        const { option: { required, data } } = this.props;

        return (
            <>
                { this.renderOptionDropdownValues(data) }
                { this.renderRequired(required) }
            </>
        );
    }

    renderTextField() {
        const {
            option: {
                required,
                data
            },
            updateTextFieldValue,
            textValue,
            optionType
        } = this.props;
        const { max_characters } = data;
        const fieldType = optionType === 'field' ? 'text' : 'textarea';

        return (
            <>
                <Field
                  id={ `customizable-options-${ optionType }` }
                  name={ `customizable-options-${ optionType }` }
                  type={ fieldType }
                  maxLength={ max_characters > 0 ? max_characters : null }
                  value={ textValue }
                  onChange={ updateTextFieldValue }
                />
                { this.renderRequired(required) }
                { this.renderMaxCharacters(max_characters) }
            </>
        );
    }

    renderTitle() {
        const { option } = this.props;
        const { title } = option;

        return title;
    }

    renderTextFieldTitle() {
        const {
            renderOptionLabel,
            option: {
                title,
                data: {
                    price_type,
                    price
                }
            }
        } = this.props;

        const priceLabel = renderOptionLabel(price_type, price);

        return this.renderHeading(title, priceLabel);
    }

    render() {
        const {
            option: {
                option_id
            },
            optionType
        } = this.props;

        const optionRenderMap = this.renderMap[optionType];

        if (!optionRenderMap) {
            return null;
        }

        const { render, title } = optionRenderMap;

        return (
            <ExpandableContent
              heading={ title() }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
              isContentExpanded
            >
                { render() }
            </ExpandableContent>
        );
    }
}

export default ProductCustomizableOption;
