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
            return { value };
        }

        return null;
    }

    onChange(event) {
        this.handleChange(event.target.value);
    }

    handleChange(value) {
        const { onChange, type, min } = this.props;

        if (type === NUMBER_TYPE && value < min) {
            return;
        }

        this.setState({ value });
        if (onChange) onChange(value);
    }

    renderTextarea() {
        const { id, rows } = this.props;
        const { value } = this.state;

        return (
            <textarea
              id={ id }
              rows={ rows }
              value={ value }
              onChange={ this.onChange }
            />
        );
    }

    renderCheckboxInput() {
        const {
            id, name, type, value, checked
        } = this.props;

        const checkedBool = type === RADIO_TYPE
            ? checked === value
            : checked;

        return (
            <>
                <input
                  type={ type }
                  checked={ checkedBool }
                  name={ name }
                  value={ value }
                  onChange={ () => this.handleChange(value) }
                  id={ id }
                />
                <label htmlFor={ id } />
            </>
        );
    }

    renderTypeText() {
        const { placeholder, id } = this.props;
        const { value } = this.state;

        return (
            <input
              type="text"
              id={ id }
              value={ value }
              onChange={ this.onChange }
              placeholder={ placeholder }
            />
        );
    }

    renderTypeNumber() {
        const { id } = this.props;
        const { value } = this.state;

        return (
            <>
                <input
                  type="number"
                  id={ id }
                  value={ value }
                  onChange={ this.onChange }
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
        default:
            return this.renderTypeText();
        }
    }

    render() {
        const {
            id, type, label, note, message, state, block, elem
        } = this.props;

        const mods = state ? { [state]: true } : {};

        return (
            <div block="Field" mods={ mods } mix={ { block, elem } }>
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
        RADIO_TYPE
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
    min: PropTypes.number,
    block: PropTypes.string,
    elem: PropTypes.string
};

Field.defaultProps = {
    rows: 4,
    min: 0,
    block: null,
    elem: null
};

export default Field;
