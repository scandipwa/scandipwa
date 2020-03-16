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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MixType } from 'Type/Common';
import ClickOutside from 'Component/ClickOutside';
import Input from 'Component/Input';
import './Field.style';

export const TEXT_TYPE = 'text';
export const NUMBER_TYPE = 'number';
export const RADIO_TYPE = 'radio';
export const CHECKBOX_TYPE = 'checkbox';
export const TEXTAREA_TYPE = 'textarea';
export const PASSWORD_TYPE = 'password';
export const SELECT_TYPE = 'select';

const ENTER_KEY_CODE = 13;
const A_KEY_CODE = 65;
const z_KEY_CODE = 122;
const Z_KEY_CODE = 90;
const a_KEY_CODE = 97;


/**
 * Input fields component
 * @class Field
 */
export default class Field extends PureComponent {
    static propTypes = {
        skipValue: PropTypes.bool,
        isControlled: PropTypes.bool,
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
        message: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ]),
        validation: PropTypes.arrayOf(PropTypes.string),
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
        isDisabled: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClick: PropTypes.func,
        onKeyPress: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number,
        mix: MixType,
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        autocomplete: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ])
    };

    static defaultProps = {
        rows: 4,
        min: 1,
        max: 99,
        isDisabled: false,
        checked: false,
        isControlled: false,
        mix: {},
        selectOptions: [],
        label: '',
        formRef: () => {},
        onKeyPress: () => {},
        onClick: () => {},
        onFocus: () => {},
        onChange: () => {},
        onBlur: () => {},
        value: null,
        message: '',
        placeholder: '',
        autocomplete: 'off',
        validation: [],
        skipValue: false
    };

    onChange = this.onChange.bind(this);

    onChangeCheckbox = this.onChangeCheckbox.bind(this);

    onFocus = this.onFocus.bind(this);

    onKeyPress = this.onKeyPress.bind(this);

    onKeyEnterDown = this.onKeyEnterDown.bind(this);

    onClick = this.onClick.bind(this);

    handleSelectExpand = this.handleSelectExpand.bind(this);

    handleSelectExpandedExpand = this.handleSelectExpandedExpand.bind(this);

    handleSelectListOptionClick = this.handleSelectListOptionClick.bind(this);

    handleSelectListKeyPress = this.handleSelectListKeyPress.bind(this);

    constructor(props) {
        super(props);

        const { checked } = props;
        const value = this._getInitialPropsValue();

        this.state = {
            value,
            valueIndex: -1,
            checked,
            searchString: 'a',
            isSelectExpanded: false
        };
    }

    componentDidUpdate(prevProps) {
        const { value: prevValue, checked: prevChecked } = prevProps;
        const { value: currentValue, checked: currChecked, type } = this.props;

        if (prevValue !== currentValue) this.setState({ value: currentValue });
        if (type === CHECKBOX_TYPE && currChecked !== prevChecked) this.setState({ checked: currChecked });
    }

    onChange(event) {
        if (typeof event === 'string' || typeof event === 'number') {
            return this.handleChange(event);
        }

        return this.handleChange(event.target.value);
    }

    onChangeCheckbox(event) {
        const { onChange } = this.props;
        const { target: { checked, value } } = event;

        if (onChange) onChange(value, checked);
        return this.setState({ checked });
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (onFocus) onFocus(event);
    }

    onBlur(event) {
        const { onBlur } = this.props;

        if (onBlur) onBlur(event);
    }

    onKeyPress(event) {
        const { onKeyPress } = this.props;

        if (onKeyPress) onKeyPress(event);
    }

    onKeyEnterDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            const value = event.target.value || 1;
            this.handleChange(value);
        }
    }

    onClick(event, selectValue = false) {
        const { onClick } = this.props;

        if (selectValue) event.target.select();
        if (onClick) onClick(event);
    }

    handleChange(value, shouldUpdate = true) {
        const {
            isControlled,
            onChange,
            type,
            min,
            max
        } = this.props;

        switch (type) {
        case NUMBER_TYPE:
            const isValueNaN = Number.isNaN(parseInt(value, 10));
            if (min > value || value > max || isValueNaN) break;
            if (onChange && shouldUpdate) onChange(value);
            if (!isControlled) this.setState({ value });
            break;
        default:
            if (onChange) onChange(value);
            if (!isControlled) this.setState({ value });
        }
    }

    handleSelectExpand() {
        this.setState(({ isSelectExpanded }) => ({ isSelectExpanded: !isSelectExpanded }));
    }

    handleSelectExpandedExpand() {
        const { isSelectExpanded } = this.state;

        if (isSelectExpanded) this.handleSelectExpand();
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

    _getInitialPropsValue() {
        const { type, value } = this.props;

        if (value) return value;

        switch (type) {
        case NUMBER_TYPE:
            return 0;
        default:
            return '';
        }
    }

    _getSelectedValueIndex(keyCode) {
        const { selectOptions } = this.props;
        const {
            searchString: prevSearchString,
            valueIndex: prevValueIndex
        } = this.state;

        const pressedKeyValue = String.fromCharCode(keyCode).toLowerCase();

        const searchString = (prevSearchString[prevSearchString.length - 1] !== pressedKeyValue)
            ? `${prevSearchString}${pressedKeyValue}`
            : pressedKeyValue;

        const nextValueIndex = selectOptions.findIndex(({ label }, i) => (
            label && label.toLowerCase().startsWith(searchString) && (
                i > prevValueIndex || prevSearchString !== searchString
            )
        ));

        if (nextValueIndex !== -1) {
            return { searchString, valueIndex: nextValueIndex };
        }

        // if no items were found, take only the latest letter of the search string
        const newSearchString = searchString[searchString.length - 1];

        const newValueIndex = selectOptions.findIndex(({ label }) => (
            label && label.toLowerCase().startsWith(newSearchString)
        ));

        if (newValueIndex !== -1) {
            return { searchString: newSearchString, valueIndex: newValueIndex };
        }

        // if there are no items starting with this letter
        return {};
    }

    handleSelectListKeyPress(event) {
        const { isSelectExpanded } = this.state;
        const { selectOptions, onChange, id: selectId } = this.props;
        const keyCode = event.which || event.keycode;

        // on Enter pressed
        if (keyCode === ENTER_KEY_CODE) {
            this.handleSelectExpand();
            return;
        }

        if (!isSelectExpanded
            || !keyCode
            || keyCode < A_KEY_CODE
            || keyCode > z_KEY_CODE
            || (keyCode > Z_KEY_CODE && keyCode < a_KEY_CODE)
        ) return;

        const { searchString, valueIndex } = this._getSelectedValueIndex(keyCode);

        // valueIndex can be 0, so !valueIndex === true
        if (!searchString || valueIndex === null) return;

        this.setState({ searchString, valueIndex }, () => {
            const { id, value } = selectOptions[valueIndex];
            // converting to string for avoiding the error with the first select option
            onChange(value.toString());
            const selectedElement = document.querySelector(`#${selectId} + ul #o${id}`);
            selectedElement.focus();
        });
    }

    renderTextarea() {
        const {
            id,
            name,
            rows,
            formRef,
            isDisabled
        } = this.props;

        const { value } = this.state;

        return (
            <textarea
              ref={ formRef }
              id={ id }
              name={ name }
              rows={ rows }
              value={ value }
              disabled={ isDisabled }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
            />
        );
    }

    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */
    renderTypeText() {
        const { value } = this.state;

        return (
            <Input
              { ...this.props }
              type="text"
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              value={ value }
            />
        );
    }

    renderTypePassword() {
        const { value } = this.state;

        return (
            <Input
              { ...this.props }
              type="password"
              autocomplete="current-password"
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onClick={ this.onClick }
              value={ value }
            />
        );
    }

    renderTypeNumber() {
        const {
            min,
            max
        } = this.props;

        const { value } = this.state;

        return (
            <>
                <Input
                  { ...this.props }
                  type="number"
                  readOnly
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={ e => this.handleChange(e.target.value, false) }
                  onKeyDown={ this.onKeyEnterDown }
                  value={ value }
                />
                <button
                  disabled={ +value === max }
                  onClick={ () => this.handleChange(+value + 1) }
                >
                    <span>+</span>
                </button>
                <button
                  disabled={ +value === min }
                  onClick={ () => this.handleChange(+value - 1) }
                >
                    <span>–</span>
                </button>
            </>
        );
    }

    renderCheckbox() {
        const {
            id
        } = this.props;
        const { checked } = this.state;

        return (
            <>
                <Input
                  { ...this.props }
                  type="checkbox"
                  checked={ checked }
                  onChange={ this.onChangeCheckbox }
                />
                <label htmlFor={ id } />
            </>
        );
    }

    renderRadioButton() {
        const {
            id,
            label,
            checked
        } = this.props;

        return (
            <label htmlFor={ id }>
                <Input
                  { ...this.props }
                  type="radio"
                  checked={ checked }
                  onChange={ this.onClick }
                  onKeyPress={ this.onKeyPress }
                />
                <label htmlFor={ id } />
                { label }
            </label>
        );
    }

    renderSelectWithOptions() {
        const {
            name, id, selectOptions, formRef, placeholder, value, isDisabled
        } = this.props;

        const { isSelectExpanded: isExpanded } = this.state;

        if (!selectOptions) throw new Error('Prop `selectOptions` is required for Field type `select`');

        return (
            <ClickOutside onClick={ this.handleSelectExpandedExpand }>
                <div
                  block="Field"
                  elem="SelectWrapper"
                  onClick={ this.handleSelectExpand }
                  onKeyPress={ this.handleSelectListKeyPress }
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
                      disabled={ isDisabled }
                      tabIndex="0"
                      value={ value || '' }
                      onChange={ this.onChange }
                    >
                        { placeholder && <option value="" label={ placeholder } /> }
                        { selectOptions.map(({
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
                        )) }
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
                                  // added 'o' as querySelector does not work with
                                  // ids, that consist of numbers only
                                  id={ `o${id}` }
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

    renderLabel() {
        const { id, label, validation } = this.props;
        const isRequired = validation.includes('notEmpty');
        if (!label) return null;

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
        if (!message) return null;

        return (
            <p block="Field" elem="Message">
                { message }
            </p>
        );
    }

    render() {
        const { mix, type, message } = this.props;

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
