/* eslint-disable fp/no-let */
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
import { formatCurrency } from 'Util/Price';
import ExpandableContent from 'Component/ExpandableContent';
import Field from 'Component/Field';

import './ProductCustomizableOptions.style';

export default class ProductCustomizableOptionsComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        options: PropTypes.array,
        setCustomizableOptionFieldValue: PropTypes.func.isRequired,
        setCustomizableOptionAreaValue: PropTypes.func.isRequired,
        setSelectedDropdownValue: PropTypes.func.isRequired,
        getDropdownOptions: PropTypes.func.isRequired,
        setSelectedCheckboxValues: PropTypes.func.isRequired
    };

    static defaultProps = {
        options: []
    };

    state = {
        selectedDropdownValue: 0,
        fieldValue: '',
        areaValue: ''
    };

    onChange = (selectedValue, option_id) => {
        const { setSelectedDropdownValue } = this.props;
        const { selectedDropdownValue } = this.state;

        if (selectedValue === selectedDropdownValue) {
            this.setState({ selectedDropdownValue: 0 });
            setSelectedDropdownValue();
        } else {
            this.setState({ selectedDropdownValue: selectedValue });
            setSelectedDropdownValue(selectedValue, option_id);
        }
    };

    updateFieldValue = (value, id) => {
        const { setCustomizableOptionFieldValue } = this.props;
        this.setState({ fieldValue: value });

        setCustomizableOptionFieldValue(id, value);
    };

    updateAreaFieldValue = (value, id) => {
        const { setCustomizableOptionAreaValue } = this.props;
        this.setState({ areaValue: value });

        setCustomizableOptionAreaValue(id, value);
    };

    renderOptionAreaField(value, id, isRequired) {
        const { max_characters } = value;
        const { areaValue } = this.state;

        return (
            <>
                <Field
                  type="textarea"
                  id="customizable-options-area"
                  name="customizable-options-area"
                  value={ areaValue }
                  maxLength={ max_characters > 0 ? max_characters : null }
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ value => this.updateAreaFieldValue(value, id) }
                />
                { isRequired && (
                    this.renderRequired()
                ) }
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

    renderOptionField(value, id, isRequired) {
        const { max_characters } = value;
        const { fieldValue } = this.state;

        return (
            <>
                <Field
                  id="customizable-options-field"
                  name="customizable-options-field"
                  type="text"
                  maxLength={ max_characters > 0 ? max_characters : null }
                  value={ fieldValue }
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ value => this.updateFieldValue(value, id) }
                />
                { isRequired && (
                    this.renderRequired()
                ) }
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

    renderOptionDropdownValues(values, option_id) {
        const { getDropdownOptions } = this.props;
        const { selectedDropdownValue } = this.state;
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
              /* eslint-disable-next-line react/jsx-no-bind */
              onChange={ value => this.onChange(value, option_id) }
            />
        );
    }

    renderOptionCheckboxValues(value, option_id) {
        const { setSelectedCheckboxValues } = this.props;
        const {
            option_type_id,
            title,
            price,
            price_type
        } = value;
        const labelBold = price_type === 'PERCENT' ? `${ price }%` : `${ formatCurrency() }${ price }`;

        return (
            <Field
              type="checkbox"
              label={ __(title) }
              labelBold={ labelBold }
              key={ option_type_id }
              id={ `option-${ option_type_id }` }
              name={ `option-${ option_type_id }` }
              value={ price }
              renderLabelAfter
              /* eslint-disable-next-line react/jsx-no-bind */
              onChange={ () => setSelectedCheckboxValues(option_id, option_type_id) }
            />
        );
    }

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

    renderOption(option) {
        const {
            title,
            checkboxValues,
            dropdownValues,
            fieldValues,
            areaValues,
            option_id,
            required
        } = option;

        if (fieldValues || areaValues) {
            let optionPrice;
            let priceType;

            if (fieldValues) {
                const { price, price_type } = fieldValues;
                optionPrice = price;
                priceType = price_type === 'PERCENT';
            } else if (areaValues) {
                const { price, price_type } = areaValues;
                optionPrice = price;
                priceType = price_type === 'PERCENT';
            }

            const additionalTitle = priceType ? `${ optionPrice }%` : `${ formatCurrency() }${ optionPrice }`;

            return (
                <ExpandableContent
                  heading={ `${ __(title) } + ` }
                  headingAdditional={ additionalTitle }
                  mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
                  key={ option_id }
                >
                    { fieldValues && (
                        this.renderOptionField(fieldValues, option_id, required)
                    ) }
                    { areaValues && (
                        this.renderOptionAreaField(areaValues, option_id, required)
                    ) }
                </ExpandableContent>
            );
        }

        return (
            <ExpandableContent
              heading={ __(title) }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { checkboxValues && (
                    checkboxValues.map(value => this.renderOptionCheckboxValues(value, option_id))
                ) }
                { dropdownValues && (
                    this.renderOptionDropdownValues(dropdownValues, option_id)
                ) }
                { required && (
                    this.renderRequired()
                ) }
            </ExpandableContent>
        );
    }

    renderContent() {
        const { options } = this.props;

        return options.map(option => this.renderOption(option));
    }

    renderPlaceholder() {
        const { isLoading } = this.props;

        return (
            <div
              block="ProductCustomizableOptions"
              mods={ { isLoading, isPlaceholder: true } }
            />
        );
    }

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            return this.renderPlaceholder();
        }

        return (
            this.renderContent()
        );
    }
}
