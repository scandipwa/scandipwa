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
import { attachmentIcon } from './ProductCustomizableOptions.config';

import './ProductCustomizableOptions.style';

export default class ProductCustomizableOptionsComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        fileFormRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]).isRequired,
        options: PropTypes.array,
        setCustomizableOptionFieldValue: PropTypes.func.isRequired,
        setCustomizableOptionAreaValue: PropTypes.func.isRequired,
        setSelectedDropdownValue: PropTypes.func.isRequired,
        getDropdownOptions: PropTypes.func.isRequired,
        setSelectedCheckboxValues: PropTypes.func.isRequired,
        handleAttachFile: PropTypes.func.isRequired,
        handleRemoveFile: PropTypes.func.isRequired
    };

    static defaultProps = {
        options: []
    };

    state = {
        selectedDropdownValue: 0,
        fieldValue: '',
        areaValue: ''
    };

    onChange = (selectedDropdownValue, option_id) => {
        const { setSelectedDropdownValue } = this.props;
        this.setState({ selectedDropdownValue });

        setSelectedDropdownValue(selectedDropdownValue, option_id);
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
                  maxLength={ max_characters }
                    /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ value => this.updateAreaFieldValue(value, id) }
                />
                { isRequired && (
                    this.renderRequired()
                ) }
                <div
                  block="ProductCustomizableOptions"
                  elem="Information"
                >
                    { __('Maximum %s characters', max_characters) }
                </div>
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
                  maxLength={ max_characters }
                  value={ fieldValue }
                    /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ value => this.updateFieldValue(value, id) }
                />
                { isRequired && (
                    this.renderRequired()
                ) }
                <div
                  block="ProductCustomizableOptions"
                  elem="Information"
                >
                    { __('Maximum %s characters', max_characters) }
                </div>
            </>
        );
    }

    renderAttachment = (name, index) => {
        const { handleRemoveFile } = this.props;

        return (
            <div key={ index }>
                <span
                  block="MyAccountReturnDetailsChat"
                  elem="AttachmentName"
                >
                    { name }
                </span>
                <button
                  block="MyAccountOverlay"
                  elem="CloseButton"
                  onClick={ () => handleRemoveFile(name) }
                />
            </div>
        );
    };

    renderAttachments() {
        const { files } = this.props;

        if (!files.length) {
            return null;
        }

        return (
            <div
              block="MyAccountReturnDetailsChat"
              elem="AttachmentWrapper"
            >
                { attachmentIcon }
                <div
                  block="MyAccountReturnDetailsChat"
                  elem="Attachment"
                >
                    { files.map((file, index) => this.renderAttachment(file.name, index)) }
                </div>
            </div>
        );
    }

    renderOptionFile(values, option_id, isRequired) {
        const { handleAttachFile, fileFormRef } = this.props;

        return (
            <div
              block="ProductCustomizableOptions"
              elem="FileAttach"
            >
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gif"
                  multiple
                  block="ProductCustomizableOptions"
                  onChange={ () => handleAttachFile(option_id) }
                  ref={ fileFormRef }
                />
                { isRequired && (
                    this.renderRequired()
                ) }
                { this.renderAttachments() }
            </div>
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
              selectOptions={ dropdownOptions }
              value={ selectedDropdownValue }
                /* eslint-disable-next-line react/jsx-no-bind */
              onChange={ value => this.onChange(value, option_id) }
            />
        );
    }

    renderOptionCheckboxValues(value, option_id) {
        const { setSelectedCheckboxValues } = this.props;
        const { option_type_id, title, price } = value;

        return (
            <Field
              type="checkbox"
              label={ __(title) }
              labelBold={ `${ formatCurrency() }${ price }` }
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
                { __('This field is required') }
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
            fileValues,
            option_id,
            required
        } = option;

        if (fieldValues || areaValues || fileValues) {
            // eslint-disable-next-line fp/no-let
            let optionPrice;

            if (fieldValues) {
                const { price } = fieldValues;
                optionPrice = price;
            } else if (areaValues) {
                const { price } = areaValues;
                optionPrice = price;
            } else if (fileValues) {
                const { price } = fileValues;
                optionPrice = price;
            }

            return (
                <ExpandableContent
                  heading={ `${ __(title) } + ` }
                  headingAdditional={ `${ formatCurrency() }${ optionPrice }` }
                  mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
                  key={ option_id }
                >
                    { fieldValues && (
                        this.renderOptionField(fieldValues, option_id, required)
                    ) }
                    { areaValues && (
                        this.renderOptionAreaField(areaValues, option_id, required)
                    ) }
                    { fileValues && (
                        this.renderOptionFile(fileValues, option_id, required)
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
