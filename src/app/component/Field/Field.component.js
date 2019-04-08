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

/* eslint-disable react/require-default-props */
// Due complexity of propTypes, TODO: rearrange

/* eslint jsx-a11y/label-has-associated-control: 0 */
// Disabled due bug in `renderCheckboxInput` function

// todo fix text type

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.style';

const TEXT_TYPE = 'text';
const NUMBER_TYPE = 'number';
const CHECKBOX_TYPE = 'checkbox';
const RADIO_TYPE = 'radio';
const TEXTAREA_TYPE = 'textarea';
const PASSWORD_TYPE = 'password';

/**
 * Input fields component
 * @class Field
 */
class Field extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        const { type, min } = this.props;
        let { value } = this.props;

        if (value < min) value = min;

        if (!value) {
            switch (type) {
            case NUMBER_TYPE:
                value = 0;
                break;
            case CHECKBOX_TYPE:
                value = false;
                break;
            case RADIO_TYPE:
                value = false;
                break;
            default:
                value = '';
                break;
            }
        }

        this.state = { value };
    }

    /**
     * This allows to sync values if the component is controlled outside of the parent
     * For e.g. when we have two controlable fields on the screen which both share same prop value
     * @return {Object} state
     */
    static getDerivedStateFromProps(props, state) {
        const { value } = props;
        const { value: stateValue } = state;

        if (value !== stateValue) {
            return { stateValue };
        }

        return null;
    }

    onChange(event) {
        this.handleChange(event.target.value);
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
        const {
            onChange,
            type,
            min
        } = this.props;
        const isValueNaN = Number.isNaN(parseInt(value, 10));

        if (type === NUMBER_TYPE && (value < min || isValueNaN)) {
            return;
        }

        this.setState({ value });
        if (onChange) onChange(value);
    }

    renderTextarea() {
        const {
            id,
            rows,
            isAutocompleteAllowed,
            formRef
        } = this.props;
        const { value } = this.state;

        return (
            <textarea
              ref={ formRef }
              id={ id }
              rows={ rows }
              value={ value }
              onChange={ this.onChange }
              onFocus={ event => this.onFocus(event) }
              onClick={ event => this.onClick(event) }
              autoComplete={ !isAutocompleteAllowed ? 'off' : undefined }
            />
        );
    }

    renderCheckboxInput() {
        const {
            id, name, type, value, checked, formRef
        } = this.props;

        const checkedBool = type === RADIO_TYPE
            ? checked === value
            : checked;

        return (
            <>
                <input
                  ref={ formRef }
                  type={ type }
                  checked={ checkedBool }
                  name={ name }
                  value={ value }
                  onChange={ () => this.handleChange(value) }
                  onFocus={ event => this.onFocus(event) }
                  onClick={ event => this.onClick(event) }
                  id={ id }
                />
                <label htmlFor={ id } />
            </>
        );
    }

    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */
    renderTypeText() {
        const {
            placeholder,
            id,
            isAutocompleteAllowed,
            formRef
        } = this.props;
        const { value } = this.state;

        return (
            <input
              ref={ formRef }
              type="text"
              id={ id }
              value={ value }
              onChange={ (this.onChange) }
              onFocus={ event => this.onFocus(event) }
              onClick={ event => this.onClick(event) }
              placeholder={ placeholder }
              autoComplete={ !isAutocompleteAllowed ? 'off' : undefined }
            />
        );
    }

    renderTypePassword() {
        const { placeholder, id, formRef } = this.props;
        const { value } = this.state;

        return (
            <input
              ref={ formRef }
              type="password"
              id={ id }
              value={ value }
              onChange={ this.onChange }
              onFocus={ event => this.onFocus(event) }
              onClick={ event => this.onClick(event) }
              placeholder={ placeholder }
            />
        );
    }

    renderTypeNumber() {
        const { id, formRef } = this.props;
        const { value } = this.state;

        return (
            <>
                <input
                  ref={ formRef }
                  type="number"
                  id={ id }
                  value={ value }
                  onChange={ this.onChange }
                  onKeyPress={ event => this.onKeyPress(event) }
                  onFocus={ event => this.onFocus(event) }
                  onClick={ event => this.onClick(event) }
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

    renderInputOfType(type) {
        switch (type) {
        case CHECKBOX_TYPE:
            return this.renderCheckboxInput();
        case RADIO_TYPE:
            return this.renderCheckboxInput();
        case NUMBER_TYPE:
            return this.renderTypeNumber();
        case TEXTAREA_TYPE:
            return this.renderTextarea();
        case PASSWORD_TYPE:
            return this.renderTypePassword();
        default:
            return this.renderTypeText();
        }
    }

    render() {
        const {
            id, type, label, note, message, state, block, elem
        } = this.props;

        const mods = state ? { [state]: true } : undefined;
        const mix = (block && elem) ? { block, elem } : undefined;

        return (
            <div block="Field" mods={ mods } mix={ mix }>
                { message && <p block="Field" elem="Message">{ message }</p> }
                { label && <label htmlFor={ id }>{ label }</label> }
                { this.renderInputOfType(type) }
                { note && <p block="Field" elem="Note">{ note }</p> }
            </div>
        );
    }
}

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        TEXT_TYPE,
        NUMBER_TYPE,
        CHECKBOX_TYPE,
        TEXTAREA_TYPE,
        RADIO_TYPE,
        PASSWORD_TYPE
    ]).isRequired,
    name: PropTypes.string,
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
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    min: PropTypes.number,
    block: PropTypes.string,
    elem: PropTypes.string,
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    isAutocompleteAllowed: PropTypes.bool
};

Field.defaultProps = {
    rows: 4,
    min: 0,
    block: null,
    elem: null
};

export default Field;
