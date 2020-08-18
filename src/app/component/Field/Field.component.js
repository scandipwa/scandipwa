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

/* eslint jsx-a11y/label-has-associated-control: 0 */
// Disabled due bug in `renderCheckboxInput` function

import './Field.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import FieldInput from 'Component/FieldInput';
import FieldSelect from 'Component/FieldSelect';
import FieldTextarea from 'Component/FieldTextarea';
import { MixType } from 'Type/Common';

import {
    CHECKBOX_TYPE,
    NUMBER_TYPE,
    PASSWORD_TYPE,
    RADIO_TYPE,
    SELECT_TYPE,
    TEXTAREA_TYPE
} from './Field.config';

/**
 * Input fields component
 * @class Field
 */
export class Field extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        onChangeCheckbox: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        onKeyPress: PropTypes.func.isRequired,
        onKeyEnterDown: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        message: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        validation: PropTypes.arrayOf(PropTypes.string),
        checked: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        mix: MixType,
        min: PropTypes.number,
        max: PropTypes.number
    };

    static defaultProps = {
        min: 1,
        max: 99,
        checked: false,
        mix: {},
        label: '',
        value: null,
        message: '',
        validation: []
    };

    renderTextarea() {
        return (
            <FieldTextarea
              { ...this.props }
            />
        );
    }

    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */
    renderTypeText() {
        return (
            <FieldInput
              { ...this.props }
              type="text"
            />
        );
    }

    renderTypePassword() {
        return (
            <FieldInput
              { ...this.props }
              type="password"
            />
        );
    }

    renderTypeNumber() {
        const {
            min,
            max,
            value,
            onKeyEnterDown,
            handleChange
        } = this.props;

        return (
            <>
                <FieldInput
                  { ...this.props }
                  type="number"
                  readOnly
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={ (e) => handleChange(e.target.value, false) }
                  onKeyDown={ onKeyEnterDown }
                />
                <button
                  disabled={ +value === max }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleChange(+value + 1) }
                >
                    <span>+</span>
                </button>
                <button
                  disabled={ +value === min }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleChange(+value - 1) }
                >
                    <span>–</span>
                </button>
            </>
        );
    }

    renderCheckbox() {
        const {
            id,
            onChangeCheckbox
        } = this.props;

        return (
            <>
                <FieldInput
                  { ...this.props }
                  type="checkbox"
                  onChange={ onChangeCheckbox }
                />
                <label htmlFor={ id } />
            </>
        );
    }

    renderRadioButton() {
        const {
            id,
            label,
            onClick
        } = this.props;

        return (
            <label htmlFor={ id }>
                <FieldInput
                  { ...this.props }
                  type="radio"
                  onChange={ onClick }
                />
                <label htmlFor={ id } />
                { label }
            </label>
        );
    }

    renderSelectWithOptions() {
        return (
            <FieldSelect
              { ...this.props }
            />
        );
    }

    renderInputOfType(type) {
        switch (type) {
        case CHECKBOX_TYPE:
            return this.renderCheckbox();
        case RADIO_TYPE:
            return this.renderRadioButton();
        case NUMBER_TYPE:
            return this.renderTypeNumber();
        case TEXTAREA_TYPE:
            return this.renderTextarea();
        case PASSWORD_TYPE:
            return this.renderTypePassword();
        case SELECT_TYPE:
            return this.renderSelectWithOptions();
        default:
            return this.renderTypeText();
        }
    }

    renderLabel() {
        const { id, label, validation } = this.props;
        const isRequired = validation.includes('notEmpty');

        if (!label) {
            return null;
        }

        return (
            <label
              block="Field"
              elem="Label"
              mods={ { isRequired } }
              htmlFor={ id }
            >
                { label }
            </label>
        );
    }

    renderMessage() {
        const { message } = this.props;

        if (!message) {
            return null;
        }

        return (
            <p block="Field" elem="Message">
                { message }
            </p>
        );
    }

    render() {
        const {
            mix,
            type,
            message
        } = this.props;

        return (
            <div
              block="Field"
              mods={ { type, hasError: !!message } }
              mix={ mix }
            >
                { this.renderLabel() }
                { this.renderInputOfType(type) }
                { this.renderMessage() }
            </div>
        );
    }
}

export default Field;
