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

import {
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    PureComponent,
    SelectHTMLAttributes,
    TextareaHTMLAttributes
} from 'react';

import FieldFile from 'Component/FieldFile';
import { FieldNumberContainer } from 'Component/FieldNumber/FieldNumber.container';
import FieldSelectContainer from 'Component/FieldSelect/FieldSelect.container';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { FieldType } from './Field.config';
import {
    FieldComponentProps,
    FieldEvents,
    FieldInputCustomEvents,
    FieldNumberCustomEvents,
    FieldReactEvents,
    FieldSelectCustomEvents
} from './Field.type';

import './Field.style';

/**
 * Field
 * @class Field
 * @namespace Component/Field/Component
 */
export class Field extends PureComponent<FieldComponentProps> {
    static defaultProps: Partial<FieldComponentProps> = {
        validationResponse: null,
        changeValueOnDoubleClick: false,
        isSortSelect: false
    };

    renderMap = {
        // Checkboxes & Radio
        [FieldType.RADIO]: this.renderCheckboxOrRadio.bind(this),
        [FieldType.CHECKBOX]: this.renderCheckboxOrRadio.bind(this),
        [FieldType.MULTI]: this.renderCheckboxOrRadio.bind(this),

        // Default input
        [FieldType.EMAIL]: this.renderDefaultInput.bind(this),
        [FieldType.TEXT]: this.renderDefaultInput.bind(this),
        [FieldType.TIME]: this.renderDefaultInput.bind(this),
        [FieldType.DATETIME]: this.renderDefaultInput.bind(this),
        [FieldType.DATE]: this.renderDefaultInput.bind(this),
        [FieldType.PASSWORD]: this.renderDefaultInput.bind(this),
        [FieldType.SUBMIT]: this.renderDefaultInput.bind(this),

        // Custom fields
        [FieldType.FILE]: this.renderFile.bind(this),
        [FieldType.SELECT]: this.renderSelect.bind(this),
        [FieldType.TEXTAREA]: this.renderTextArea.bind(this),
        [FieldType.BUTTON]: this.renderButton.bind(this),
        [FieldType.NUMBER]: this.renderNumber.bind(this)

    };

    //#region INPUT TYPE RENDER
    renderDefaultInput(): ReactElement {
        const {
            type, setRef, attr, events, isDisabled
        } = this.props;

        return (
            <input
              ref={ (elem) => setRef(elem) }
              disabled={ isDisabled }
              type={ type }
              { ...attr as InputHTMLAttributes<HTMLInputElement> }
              { ...events as FieldReactEvents<HTMLInputElement> }
            />
        );
    }

    renderFile(): ReactElement {
        const { attr, events, setRef } = this.props;

        return (
            <FieldFile
              attr={ attr as InputHTMLAttributes<HTMLInputElement> }
              events={ events as Omit<FieldEvents, 'onChange'> & FieldInputCustomEvents }
              setRef={ setRef }
            />
        );
    }

    renderNumber(): ReactElement {
        const {
            attr,
            events,
            setRef,
            isDisabled = false
        } = this.props;

        return (
            <FieldNumberContainer
              attr={ attr as InputHTMLAttributes<HTMLInputElement> }
              events={ events as Omit<FieldEvents, 'onChange'> & FieldNumberCustomEvents }
              setRef={ setRef }
              isDisabled={ isDisabled }
            />
        );
    }

    renderSelect(): ReactElement {
        const {
            attr,
            events,
            setRef,
            options,
            isDisabled = false,
            changeValueOnDoubleClick,
            isSortSelect
        } = this.props;

        return (
            <FieldSelectContainer
              attr={ attr as SelectHTMLAttributes<HTMLSelectElement> }
              events={ events as Omit<FieldEvents, 'onChange'> & FieldSelectCustomEvents }
              options={ options }
              setRef={ setRef }
              isDisabled={ isDisabled }
              isSortSelect={ isSortSelect }
              changeValueOnDoubleClick={ changeValueOnDoubleClick }
            />
        );
    }

    renderButton(): ReactElement {
        const {
            setRef, attr, events, isDisabled
        } = this.props;
        const { value = __('Submit') } = attr;

        return (
            <button
              ref={ (elem) => setRef(elem) }
              disabled={ isDisabled }
              { ...attr as ButtonHTMLAttributes<HTMLButtonElement> }
              { ...events as FieldReactEvents<HTMLButtonElement> }
            >
                { value }
            </button>
        );
    }

    renderCheckboxOrRadio(): ReactElement {
        const {
            type,
            setRef,
            attr: { defaultChecked = false, ...newAttr } = {},
            events: { onChange },
            events,
            isDisabled,
            label
        } = this.props;

        const {
            id = '',
            checked,
            value = ''
        } = newAttr as InputHTMLAttributes<HTMLInputElement>;
        const elem = type.charAt(0).toUpperCase() + type.slice(1);
        const inputEvents = {
            ...events,
            onChange: onChange || noopFn
        };
        const isButtonDisabled = (typeof value === 'string' && !value.match('none') && isDisabled);
        const isChecked = isButtonDisabled || defaultChecked ? !isDisabled : undefined;

        return (
            <label htmlFor={ id } block="Field" elem={ `${elem}Label` } mods={ { isDisabled } }>
                <input
                  ref={ (elem) => setRef(elem) }
                  disabled={ isButtonDisabled ? isDisabled : false }
                  type={ type }
                  { ...{ ...newAttr, checked: checked || isChecked } as InputHTMLAttributes<HTMLInputElement> }
                  { ...inputEvents as FieldReactEvents<HTMLInputElement> }
                />
                <div block="input-control" mods={ { disabled: { isDisabled } } } />
                { label }
            </label>
        );
    }

    renderTextArea(): ReactElement {
        const {
            setRef, attr, events, isDisabled
        } = this.props;

        return (
            <textarea
              ref={ (elem) => setRef(elem) }
              { ...attr as TextareaHTMLAttributes<HTMLTextAreaElement> }
              disabled={ isDisabled }
              { ...events as FieldReactEvents<HTMLTextAreaElement> }
            />
        );
    }
    //#endregion

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under field
    renderErrorMessage(message: string, key: string): ReactElement {
        return <div block="Field" elem="ErrorMessage" key={ key }>{ message }</div>;
    }

    renderErrorMessages(): ReactElement {
        const {
            showErrorAsLabel,
            validationResponse,
            attr: { name }
        } = this.props;

        if (!showErrorAsLabel || !validationResponse || validationResponse === true) {
            return null;
        }

        const { errorMessages = [] } = validationResponse;

        if (!errorMessages || !name) {
            return null;
        }

        return (
            <div block="Field" elem="ErrorMessages">
                { errorMessages.map((message, index) => this.renderErrorMessage.call(this, message, name + index)) }
            </div>
        );
    }

    // Renders fields label above field
    renderLabel(): ReactElement {
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
    renderRequiredTag(): ReactElement {
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
    renderSubLabel(): ReactElement {
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

    render(): ReactElement {
        const {
            type, validationResponse, mix
        } = this.props;
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
                    { type !== FieldType.CHECKBOX && type !== FieldType.RADIO && this.renderLabel() }
                    { inputRenderer && inputRenderer() }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}

export default Field;
