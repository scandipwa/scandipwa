/* eslint-disable spaced-comment,@scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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

import FieldFile from 'Component/FieldFile';
import { FieldNumberContainer } from 'Component/FieldNumber/FieldNumber.container';
import FieldSelectContainer from 'Component/FieldSelect/FieldSelect.container';
import { MixType } from 'Type/Common.type';
import {
    EventsType,
    FieldAttrType,
    LabelType,
    OptionType
} from 'Type/Field.type';
import { noopFn } from 'Util/Common';

import { FIELD_TYPE } from './Field.config';

import './Field.style';

/**
 * Field
 * @class Field
 * @namespace Component/Field/Component
 */
export class Field extends PureComponent {
    static propTypes = {
        // Field attributes
        type: PropTypes.oneOf(Object.values(FIELD_TYPE)).isRequired,
        attr: FieldAttrType.isRequired,
        events: EventsType.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        setRef: PropTypes.func.isRequired,
        mix: MixType.isRequired,
        options: PropTypes.arrayOf(OptionType).isRequired,
        changeValueOnDoubleClick: PropTypes.bool,

        // Validation
        showErrorAsLabel: PropTypes.bool.isRequired,
        validationResponse: (props, propName, componentName) => {
            const propValue = props[propName];

            if (propValue === null) {
                return;
            }

            if (typeof propValue === 'boolean') {
                return;
            }

            if (typeof propValue === 'object' && !Object.keys(propValue).includes('errorMessages')) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `${componentName} only accepts null, bool or object of "errorMessages" as "validationResponse", received "${JSON.stringify(propValue)}"`
                );
            }
        },

        // Labels
        label: LabelType.isRequired,
        subLabel: PropTypes.string.isRequired,
        addRequiredTag: PropTypes.bool.isRequired
    };

    static defaultProps = {
        validationResponse: null,
        changeValueOnDoubleClick: false
    };

    renderMap = {
        // Checkboxes & Radio
        [FIELD_TYPE.radio]: this.renderCheckboxOrRadio.bind(this),
        [FIELD_TYPE.checkbox]: this.renderCheckboxOrRadio.bind(this),
        [FIELD_TYPE.multi]: this.renderCheckboxOrRadio.bind(this),

        // Default input
        [FIELD_TYPE.email]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.text]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.time]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.dateTime]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.date]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.password]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.submit]: this.renderDefaultInput.bind(this),

        // Custom fields
        [FIELD_TYPE.file]: this.renderFile.bind(this),
        [FIELD_TYPE.select]: this.renderSelect.bind(this),
        [FIELD_TYPE.textarea]: this.renderTextArea.bind(this),
        [FIELD_TYPE.button]: this.renderButton.bind(this),
        [FIELD_TYPE.number]: this.renderNumber.bind(this)

    };

    //#region INPUT TYPE RENDER
    renderDefaultInput() {
        const {
            type, setRef, attr, events, isDisabled
        } = this.props;

        return (
            <input
              ref={ (elem) => setRef(elem) }
              disabled={ isDisabled }
              type={ type }
              { ...attr }
              { ...events }
            />
        );
    }

    renderFile() {
        const { attr, events, setRef } = this.props;

        return (
            <FieldFile attr={ attr } events={ events } setRef={ setRef } />
        );
    }

    renderNumber() {
        const {
            attr,
            events,
            setRef,
            isDisabled = false
        } = this.props;

        return (
            <FieldNumberContainer
              attr={ attr }
              events={ events }
              setRef={ setRef }
              isDisabled={ isDisabled }
            />
        );
    }

    renderSelect() {
        const {
            attr,
            events,
            setRef,
            options,
            isDisabled = false,
            changeValueOnDoubleClick
        } = this.props;

        return (
            <FieldSelectContainer
              attr={ attr }
              events={ events }
              options={ options }
              setRef={ setRef }
              isDisabled={ isDisabled }
              changeValueOnDoubleClick={ changeValueOnDoubleClick }
            />
        );
    }

    renderButton() {
        const {
            setRef, attr, events, isDisabled
        } = this.props;
        const { value = __('Submit') } = attr;

        return (
            <button
              ref={ (elem) => setRef(elem) }
              disabled={ isDisabled }
              { ...attr }
              { ...events }
            >
                { value }
            </button>
        );
    }

    renderCheckboxOrRadio() {
        const {
            type,
            setRef,
            attr,
            attr: { id = '' } = {},
            events: { onChange },
            events,
            isDisabled,
            label
        } = this.props;

        const elem = type.charAt(0).toUpperCase() + type.slice(1);
        const inputEvents = {
            ...events,
            onChange: onChange || noopFn
        };

        return (
            <label htmlFor={ id } block="Field" elem={ `${elem}Label` }>
                <input
                  ref={ (elem) => setRef(elem) }
                  disabled={ isDisabled }
                  type={ type }
                  { ...attr }
                  { ...inputEvents }
                />
                <div block="input-control" />
                { label }
            </label>
        );
    }

    renderTextArea() {
        const {
            setRef, attr, events, isDisabled
        } = this.props;

        return (
            <textarea
              ref={ (elem) => setRef(elem) }
              disabled={ isDisabled }
              { ...attr }
              { ...events }
            />
        );
    }
    //#endregion

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under field
    renderErrorMessage(message, key) {
        return <div block="Field" elem="ErrorMessage" key={ key }>{ message }</div>;
    }

    renderErrorMessages() {
        const {
            showErrorAsLabel,
            validationResponse,
            attr: { name }
        } = this.props;

        if (!showErrorAsLabel || !validationResponse || validationResponse === true) {
            return null;
        }

        const { errorMessages } = validationResponse;

        if (!errorMessages) {
            return null;
        }

        return (
            <div block="Field" elem="ErrorMessages">
                { errorMessages.map((message, index) => this.renderErrorMessage.call(this, message, name + index)) }
            </div>
        );
    }

    // Renders fields label above field
    renderLabel() {
        const { type, label, attr: { name } = {} } = this.props;

        if (!label) {
            return null;
        }

        return (
            <div block="Field" elem="LabelContainer">
                <label block="Field" elem="Label" htmlFor={ name || `input-${type}` }>
                    { label }
                    { this.renderRequiredTag() }
                </label>
            </div>
        );
    }

    // Renders * for required fields
    renderRequiredTag() {
        const { addRequiredTag } = this.props;

        if (!addRequiredTag) {
            return null;
        }

        return (
            <span block="Field" elem="Label" mods={ { isRequired: true } }>
                { ' *' }
            </span>
        );
    }

    // Renders fields label under field
    renderSubLabel() {
        const { subLabel } = this.props;

        if (!subLabel) {
            return null;
        }

        return (
            <div block="Field" elem="SubLabelContainer">
                <div block="Field" elem="SubLabel">
                    { subLabel }
                </div>
            </div>
        );
    }
    //#endregion

    render() {
        const { type, validationResponse, mix } = this.props;
        const inputRenderer = this.renderMap[type];

        return (
            <div block="Field" elem="Wrapper" mods={ { type } }>
                <div
                  block="Field"
                  mods={ {
                      type,
                      isValid: validationResponse === true,
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0
                  } }
                  mix={ mix }
                >
                    { type !== FIELD_TYPE.checkbox && type !== FIELD_TYPE.radio && this.renderLabel() }
                    { inputRenderer && inputRenderer() }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}

export default Field;
