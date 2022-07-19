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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import { FIELD_TYPE } from 'Component/Field/Field.config';
import FieldDate from 'Component/FieldDate';
import { FIELD_DATE_TYPE } from 'Component/FieldDate/FieldDate.config';
import FieldGroup from 'Component/FieldGroup';
import { CustomizableOptionsType } from 'Type/ProductList.type';
// eslint-disable-next-line no-unused-vars
import { getSubLabelFromMaxCharacters } from 'Util/Product/Extract';
import { customizableOptionToLabel } from 'Util/Product/Transform';

import { CONFIG_FIELD_TYPE } from './ProductCustomizableOption.config';

/**
 * Product Customizable Option
 * @class ProductCustomizableOption
 * @namespace Component/ProductCustomizableOption/Component
 */
export class ProductCustomizableOption extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        fieldType: PropTypes.string.isRequired,
        updateSelectedValues: PropTypes.func.isRequired,
        getDropdownOptions: PropTypes.func.isRequired,
        isRequired: PropTypes.bool.isRequired,
        currencyCode: PropTypes.string.isRequired,
        options: CustomizableOptionsType
    };

    static defaultProps = {
        options: []
    };

    renderMap = {
        [CONFIG_FIELD_TYPE.text]: this.renderDefaultValue.bind(this),
        [CONFIG_FIELD_TYPE.textarea]: this.renderDefaultValue.bind(this),
        [CONFIG_FIELD_TYPE.date]: this.renderDatePicker.bind(this, FIELD_DATE_TYPE.date),
        [CONFIG_FIELD_TYPE.dateTime]: this.renderDatePicker.bind(this, FIELD_DATE_TYPE.dateTime),
        [CONFIG_FIELD_TYPE.time]: this.renderDatePicker.bind(this, FIELD_DATE_TYPE.time),

        [CONFIG_FIELD_TYPE.file]: this.renderFileValue.bind(this),
        [CONFIG_FIELD_TYPE.select]: this.renderSelectValues.bind(this),
        [CONFIG_FIELD_TYPE.radio]: this.renderRadioValues.bind(this),
        [CONFIG_FIELD_TYPE.checkbox]: this.renderCheckboxValues.bind(this),
        [CONFIG_FIELD_TYPE.multi]: this.renderCheckboxValues.bind(this)
    };

    state = {
        value: ''
    };

    componentDidMount() {
        const { updateSelectedValues } = this.props;

        updateSelectedValues();
    }

    getLabel(option, overrideBase = null, overridePrice = null) {
        const { currencyCode } = this.props;

        const {
            baseLabel,
            priceLabel
        } = customizableOptionToLabel(option, currencyCode);

        return (
            <div block="ProductCustomizableItem" elem="Label">
                { overrideBase || baseLabel }
                { (overridePrice || priceLabel) && (
                    <strong block="ProductCustomizableItem" elem="PriceLabel">
                        { ` ${overridePrice || priceLabel}` }
                    </strong>
                ) }
            </div>
        );
    }

    updateValues({ currentTarget: { value } }) {
        const { updateSelectedValues } = this.props;

        this.setState({ value });
        updateSelectedValues();
    }

    renderDefaultValue(option) {
        const {
            title, fieldType, isRequired, uid
        } = this.props;
        const { value } = this.state;
        const { max_characters } = option;
        const label = this.getLabel(option, title);
        const subLabel = getSubLabelFromMaxCharacters(max_characters, value);

        return (
            <>
                { this.renderOptionGroupTitle(label) }
                <Field
                  type={ fieldType }
                  validationRule={ {
                      isRequired,
                      range: { max: max_characters > 0 ? max_characters : null }
                  } }
                  attr={ {
                      id: uid,
                      name: uid,
                      placeholder: ''
                  } }
                  subLabel={ subLabel }
                  events={ {
                      onChange: this.updateValues.bind(this)
                  } }
                  validateOn={ ['onBlur', 'onChange'] }
                />
            </>
        );
    }

    renderDatePicker(type, option) {
        const {
            title,
            uid,
            isRequired,
            updateSelectedValues
        } = this.props;

        const label = this.getLabel(option, title);

        return (
            <>
                { this.renderOptionGroupTitle(label) }
                <FieldDate
                  type={ type }
                  uid={ uid }
                  isRequired={ isRequired }
                  updateSelectedValues={ updateSelectedValues }
                />
            </>
        );
    }

    renderFileValue(option) {
        const {
            title, uid, isRequired, updateSelectedValues
        } = this.props;
        const { file_extension: fileExtensions = '' } = option;
        const label = this.getLabel(option, title);

        return (
            <>
                { this.renderOptionGroupTitle(label) }
                <Field
                  type={ FIELD_TYPE.file }
                  validationRule={ {
                      isRequired,
                      fileExtension: {
                          accept: fileExtensions
                      }
                  } }
                  attr={ {
                      id: uid,
                      name: uid,
                      accept: fileExtensions
                  } }
                  updateSelectedValues={ updateSelectedValues }
                  events={ {
                      onChange: updateSelectedValues
                  } }
                />
            </>
        );
    }

    renderCheckBox(option) {
        const {
            uid,
            is_default: isDefault = false
        } = option;
        const { updateSelectedValues } = this.props;
        const label = this.getLabel(option);

        return (
            <div key={ uid }>
                <Field
                  type={ FIELD_TYPE.checkbox }
                  label={ label }
                  attr={ {
                      id: `option-${ uid }`,
                      value: uid,
                      name: `option-${ uid }`,
                      defaultChecked: isDefault
                  } }
                  events={ {
                      onChange: updateSelectedValues
                  } }
                />
            </div>
        );
    }

    renderCheckboxValues(options) {
        const { isRequired } = this.props;

        return (
            <FieldGroup
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            >
                { options.map(this.renderCheckBox.bind(this)) }
            </FieldGroup>
        );
    }

    renderRadio(name, option) {
        const {
            uid,
            is_default
        } = option;
        const { updateSelectedValues } = this.props;
        const label = this.getLabel(option);

        return (
            <div key={ uid }>
                <Field
                  type={ FIELD_TYPE.radio }
                  label={ label }
                  attr={ {
                      id: `option-${ uid }`,
                      value: uid,
                      name: `option-${ name }`,
                      defaultChecked: is_default
                  } }
                  events={ {
                      onChange: updateSelectedValues
                  } }
                />
            </div>
        );
    }

    renderRadioValues(options) {
        const { isRequired, uid } = this.props;

        return (
            <FieldGroup
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            >
                { options.map((option) => this.renderRadio(uid, option)) }
            </FieldGroup>
        );
    }

    renderSelectValues() {
        const {
            getDropdownOptions,
            updateSelectedValues,
            isRequired,
            uid
        } = this.props;

        return (
            <div block="ProductCustomizableItem" elem="DropdownWrapper">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: `customizable-options-dropdown-${ uid }`,
                      name: `customizable-options-dropdown-${ uid }`,
                      selectPlaceholder: __('Select option...')
                  } }
                  mix={ { block: 'ProductCustomizableItem', elem: 'Select' } }
                  options={ getDropdownOptions() }
                  events={ {
                      onChange: updateSelectedValues
                  } }
                  validationRule={ {
                      isRequired
                  } }
                  validateOn={ ['onChange'] }
                />
            </div>
        );
    }

    renderOptionGroupTitle(title) {
        const { isRequired } = this.props;

        return (
            <div block="ProductCustomizableItem" elem="HeadingBold">
                { title }
                { isRequired && <strong block="ProductCustomizableItem" elem="Required">*</strong> }
            </div>
        );
    }

    render() {
        const { options, type, title } = this.props;
        const render = this.renderMap[type];

        if (!render) {
            return null;
        }

        const renderTitle = title
            && (type === CONFIG_FIELD_TYPE.select
            || type === CONFIG_FIELD_TYPE.radio
            || type === CONFIG_FIELD_TYPE.checkbox
            || type === CONFIG_FIELD_TYPE.multi);

        return (
            <div block="ProductCustomizableItem" elem="Wrapper">
                { renderTitle && this.renderOptionGroupTitle(title) }
                { options && render(options) }
            </div>
        );
    }
}

export default ProductCustomizableOption;
