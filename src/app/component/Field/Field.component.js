/* eslint-disable react/no-did-update-set-state */
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

// todo fix text type

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.style';
import ClickOutside from 'Component/ClickOutside';

const TEXT_TYPE = 'text';
const NUMBER_TYPE = 'number';
const RADIO_TYPE = 'radio';
const CHECKBOX_TYPE = 'checkbox';
const TEXTAREA_TYPE = 'textarea';
const PASSWORD_TYPE = 'password';
const SELECT_TYPE = 'select';

/**
 * Input fields component
 * @class Field
 */
class Field extends Component {
    constructor(props) {
        super(props);

        const {
            type,
            min,
            value: propsValue
        } = this.props;

        let value = propsValue;

        if (!propsValue) {
            switch (type) {
            case NUMBER_TYPE:
                if (value < min) value = min;
                value = 0;
                break;
            default:
                value = '';
                break;
            }
        }

        this.state = {
            value,
            isSelectExpanded: false
        };

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleSelectExpand = this.handleSelectExpand.bind(this);
        this.handleSelectListOptionClick = this.handleSelectListOptionClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { value: prevValue } = prevProps;
        const { value: currentValue } = this.props;

        if (prevValue !== currentValue) this.setState({ value: currentValue });
    }

    onChange(event) {
        if (typeof event === 'string' || typeof event === 'number') {
            return this.handleChange(event);
        }

        return this.handleChange(event.target.value);
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (onFocus) onFocus(event);
    }

    onKeyPress(event) {
        const { onKeyPress } = this.props;

        if (onKeyPress) onKeyPress(event);
    }

    onClick(event) {
        const { onClick } = this.props;

        if (onClick) onClick(event);
    }

    handleChange(value) {
        const { onChange, type, min } = this.props;

        switch (type) {
        case NUMBER_TYPE:
            const isValueNaN = Number.isNaN(parseInt(value, 10));
            if ((value < min || isValueNaN)) return;
            if (onChange) onChange(value);
            this.setState({ value });
            break;
        default:
            if (onChange) onChange(value);
            this.setState({ value });
        }
    }

    handleSelectExpand() {
        this.setState(({ isSelectExpanded }) => ({ isSelectExpanded: !isSelectExpanded }));
    }

    handleSelectListOptionClick({ value }) {
        const { formRef, onChange } = this.props;
        if (typeof formRef !== 'function') {
            formRef.current.value = value;

            // TODO: investigate why this is required
            const event = new Event('change', { bubbles: true });
            formRef.current.dispatchEvent(event);
        } else {
            onChange(value);
        }
    }

    renderTextarea() {
        const {
            id,
            name,
            rows,
            autocomplete,
            formRef
        } = this.props;
        const { value } = this.state;

        return (
            <textarea
              ref={ formRef }
              id={ id }
              name={ name }
              rows={ rows }
              value={ value }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              autoComplete={ autocomplete }
            />
        );
    }

    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */
    renderTypeText() {
        const {
            id,
            name,
            placeholder,
            autocomplete,
            formRef
        } = this.props;

        const { value } = this.state;

        return (
            <input
              ref={ formRef }
              type="text"
              id={ id }
              name={ name }
              value={ value }
              onChange={ (this.onChange) }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              placeholder={ placeholder }
              autoComplete={ autocomplete }
            />
        );
    }

    renderTypePassword() {
        const {
            id, name, placeholder, formRef
        } = this.props;
        const { value } = this.state;

        return (
            <input
              ref={ formRef }
              type="password"
              autoComplete="current-password"
              id={ id }
              name={ name }
              value={ value }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              placeholder={ placeholder }
            />
        );
    }

    renderTypeNumber() {
        const { id, name, formRef } = this.props;
        const { value } = this.state;

        return (
            <>
                <input
                  ref={ formRef }
                  type="number"
                  id={ id }
                  name={ name }
                  value={ value }
                  onChange={ this.onChange }
                //   onKeyPress={ this.onKeyPress }
                //   onFocus={ this.onFocus }
                  onClick={ this.onClick }
                />
                <button onClick={ () => this.handleChange(parseFloat(value) + 1) }>
                    <span>+</span>
                </button>
                <button onClick={ () => this.handleChange(parseFloat(value) - 1) }>
                    <span>–</span>
                </button>
            </>
        );
    }

    renderCheckbox() {
        const {
            id, name, formRef, disabled, checked
        } = this.props;

        return (
            <>
                <input
                  ref={ formRef }
                  id={ id }
                  name={ name }
                  type="checkbox"
                  checked={ checked }
                  disabled={ disabled }
                //   onFocus={ this.onFocus }
                  onChange={ this.onChange }
                //   onKeyPress={ this.onKeyPress }
                />
                <label htmlFor={ id } />
            </>
        );
    }

    renderRadioButton() {
        const {
            formRef, id, name, value, disabled, label, checked
        } = this.props;

        return (
            <label htmlFor={ id }>
                <input
                  ref={ formRef }
                  type="radio"
                  id={ id }
                  name={ name }
                  checked={ checked }
                  value={ value }
                  disabled={ disabled }
                //   onFocus={ this.onFocus }
                  onChange={ this.onClick }
                  onKeyPress={ this.onKeyPress }
                />
                <label htmlFor={ id } />
                { label }
            </label>
        );
    }

    static renderMultipleRadioButtons(radioOptions, fieldSetId, fieldSetName = null) {
        const name = fieldSetName || fieldSetId;

        return (
            <fieldset id={ fieldSetId } name={ name }>
                { radioOptions.map((radioButton) => {
                    const {
                        id, name, value, disabled, checked, label
                    } = radioButton;

                    return (
                        <Field
                          key={ id }
                          type={ RADIO_TYPE }
                          id={ id }
                          name={ name }
                          value={ value }
                          disabled={ disabled }
                          checked={ checked }
                          label={ label }
                        />
                    );
                }) }
            </fieldset>
        );
    }

    renderSelectWithOptions() {
        const {
            name, id, selectOptions, formRef, placeholder, value
        } = this.props;

        const { isSelectExpanded: isExpanded } = this.state;

        if (!selectOptions) throw new Error('Prop `selectOptions` is required for Field type `select`');

        return (
            <ClickOutside onClick={ () => isExpanded && this.handleSelectExpand() }>
                <div
                  block="Field"
                  elem="SelectWrapper"
                  onClick={ this.handleSelectExpand }
                  onKeyPress={ this.handleSelectExpand }
                  role="button"
                  tabIndex="0"
                  aria-label="Select drop-down"
                  aria-expanded={ isExpanded }
                >
                    <select
                      block="Field"
                      elem="Select"
                      mods={ { isExpanded } }
                      ref={ formRef }
                      name={ name }
                      id={ id }
                      tabIndex="0"
                      value={ value || '' }
                      onChange={ this.onChange }
                    >
                        { placeholder && <option value="" label={ placeholder } /> }
                        {
                            selectOptions.map(({
                                id, value, disabled, label
                            }) => (
                                <option
                                  key={ id }
                                  id={ id }
                                  value={ value }
                                  disabled={ disabled }
                                >
                                    { label }
                                </option>
                            ))
                        }
                    </select>
                    <ul
                      block="Field"
                      elem="SelectOptions"
                      role="menu"
                      mods={ { isExpanded } }
                    >
                        { selectOptions.map((options) => {
                            const { id, label } = options;

                            return (
                                <li
                                  block="Field"
                                  elem="SelectOption"
                                  mods={ { isExpanded } }
                                  key={ id }
                                  role="menuitem"
                                  onClick={ () => this.handleSelectListOptionClick(options) }
                                  onKeyPress={ () => this.handleSelectListOptionClick(options) }
                                  tabIndex={ isExpanded ? '0' : '-1' }
                                >
                                    { label }
                                </li>
                            );
                        }) }
                    </ul>
                </div>
            </ClickOutside>
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

    render() {
        const {
            id, type, label, note, message, state, mix
        } = this.props;

        const mods = {
            type,
            hasError: !!message,
            ...(state ? { [state]: true } : {})
        };

        return (
            <div block="Field" mods={ mods } mix={ mix }>
                { label && <label htmlFor={ id }>{ label }</label> }
                { this.renderInputOfType(type) }
                { message && <p block="Field" elem="Message">{ message }</p> }
                { note && <p block="Field" elem="Note">{ note }</p> }
            </div>
        );
    }
}

Field.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        TEXT_TYPE,
        NUMBER_TYPE,
        TEXTAREA_TYPE,
        PASSWORD_TYPE,
        RADIO_TYPE,
        CHECKBOX_TYPE,
        SELECT_TYPE
    ]).isRequired,
    label: PropTypes.string,
    note: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    state: PropTypes.string,
    rows: PropTypes.number,
    checked: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    selectOptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        disabled: PropTypes.bool,
        label: PropTypes.string
    })),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    min: PropTypes.number,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]))
    }),
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    autocomplete: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

Field.defaultProps = {
    rows: 4,
    min: 0,
    disabled: false,
    checked: false,
    mix: {},
    selectOptions: [],
    label: '',
    formRef: () => {},
    onKeyPress: () => {},
    onClick: () => {},
    onFocus: () => {},
    onChange: () => {},
    value: null,
    state: '',
    note: '',
    message: '',
    placeholder: '',
    autocomplete: 'off'
};

export default Field;
