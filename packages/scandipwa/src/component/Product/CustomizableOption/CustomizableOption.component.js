/* eslint-disable */
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
import { PureComponent } from 'react';
import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { customizableOptionToLabel } from 'Util/Product/Transform';
import { CONFIG_FIELD_TYPE } from 'Component/Product/CustomizableOption/CustomizableOption.config';
import FieldContainer from 'Component/PureForm/Field';
import FieldGroupContainer from 'Component/PureForm/FieldGroup';

export class CustomizableOption extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        fieldType: PropTypes.string.isRequired,
        updateSelectedValues: PropTypes.func.isRequired,
        getDropdownOptions: PropTypes.func.isRequired,
        isRequired: PropTypes.bool.isRequired,
        currencyCode: PropTypes.string.isRequired
    };

    renderMap = {
        [CONFIG_FIELD_TYPE.text]: this.renderDefaultValue.bind(this),
        [CONFIG_FIELD_TYPE.textarea]: this.renderDefaultValue.bind(this),
        [CONFIG_FIELD_TYPE.date]: this.renderDefaultValue.bind(this),
        [CONFIG_FIELD_TYPE.dateTime]: this.renderDefaultValue.bind(this),
        [CONFIG_FIELD_TYPE.time]: this.renderDefaultValue.bind(this),

        [CONFIG_FIELD_TYPE.file]: this.renderFileValue.bind(this),
        [CONFIG_FIELD_TYPE.select]: this.renderSelectValues.bind(this),
        [CONFIG_FIELD_TYPE.radio]: this.renderRadioValues.bind(this),
        [CONFIG_FIELD_TYPE.checkbox]: this.renderCheckboxValues.bind(this),
        [CONFIG_FIELD_TYPE.multi]: this.renderCheckboxValues.bind(this)
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
            <>
                { overrideBase ? overrideBase : baseLabel }
                <strong> { overridePrice ? overridePrice : priceLabel }</strong>
            </>
        );
    }

    renderDefaultValue(option) {
        const { updateSelectedValues, title, fieldType, isRequired, uid } = this.props;
        const { max_characters } = option
        const label = this.getLabel(option, title);

        return (
            <>
                { this.renderOptionGroupTitle(label) }
                <FieldContainer
                    type={ fieldType }
                    validationRule={{
                        isRequired,
                        range: {
                            // min: isRequired ? 1 : 0,
                            max: max_characters > 0 ? max_characters : null
                        }
                    }}
                    attr={{
                        id: `${ uid }`,
                        name: `${ uid }`
                    }}
                    events={{
                        onChange: updateSelectedValues
                    }}
                    validateOn={['onBlur']}
                />
            </>
        );
    }

    renderFileValue(option) {
        const { title, uid, isRequired, updateSelectedValues } = this.props;
        const { file_extension: fileExtensions = '' } = option;
        const label = this.getLabel(option, title);

        return (
            <>
                { this.renderOptionGroupTitle(label) }
                <FieldContainer
                    type={ FIELD_TYPE.file }
                    validationRule={{
                        isRequired
                    }}
                    attr={{
                        id: `${ uid }`,
                        name: `${ uid }`,
                        accept: fileExtensions
                    }}
                    events={{
                        onChange: updateSelectedValues
                    }}
                    validateOn={['onChange']}
                />
            </>
        );
    }

    renderCheckBox = (option) => {
        const {
            uid,
            is_default = false,
        } = option;
        const { updateSelectedValues } = this.props;
        const label = this.getLabel(option);

        return (
            <div key={ uid }>
                <FieldContainer
                    type={ FIELD_TYPE.checkbox }
                    label={ label }
                    attr={{
                        id: `option-${ uid }`,
                        value: uid,
                        name: `option-${ uid }`
                    }}
                    events={{
                        onChange: updateSelectedValues
                    }}
                />
            </div>
        );
    }

    renderCheckboxValues(options) {
        const { isRequired } = this.props;

        return (
            <FieldGroupContainer
                validationRule={{
                    isRequired,
                }}
                validateOn={['onChange']}
            >
                { options.map(this.renderCheckBox) }
            </FieldGroupContainer>
        );
    }

    renderRadio = (name, option) => {
        const {
            uid,
            is_default,
        } = option;
        const { updateSelectedValues } = this.props;
        const label = this.getLabel(option);

        return (
            <div key={ uid }>
                <FieldContainer
                    type={ FIELD_TYPE.radio }
                    label={ label }
                    attr={{
                        id: `option-${ uid }`,
                        value: uid,
                        name: `option-${ name }`,
                        checked: is_default
                    }}
                    events={{
                        onChange: updateSelectedValues
                    }}
                />
            </div>
        );
    }

    renderRadioValues(options) {
        const { isRequired, uid } = this.props;

        return (
            <FieldGroupContainer
                validationRule={{
                    isRequired,
                }}
                validateOn={['onChange']}
            >
                { options.map((option) => this.renderRadio(uid, option)) }
            </FieldGroupContainer>
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
                <FieldContainer
                    type={ FIELD_TYPE.select }
                    attr={{
                        id: `customizable-options-dropdown-${ uid }`,
                        name: `customizable-options-dropdown-${ uid }`,
                        selectPlaceholder: __('Select option...')
                    }}
                    mix={ { block: 'ProductCustomizableItem', elem: 'Select' } }
                    options={ getDropdownOptions() }
                    events={{
                        onChange: updateSelectedValues
                    }}
                    validationRule={{
                        isRequired
                    }}
                    validateOn={ ['onChange'] }
                />
            </div>
        );
    }

    renderOptionGroupTitle(title) {
        const { isRequired } = this.props;

        return (
            <div block="ProductCustomizableItem" elem="Heading">
                { title }
                { isRequired && <strong block="ProductCustomizableItem" elem="Required"> *</strong> }
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

export default CustomizableOption;
