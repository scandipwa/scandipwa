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

import { FIELD_TYPE } from 'Config/Field.config';
import { MixType } from 'Type/Common';
import FieldSelectContainer from 'Component/PureForm/FieldSelect/FieldSelect.container';

import './Field.style.scss';
import { FieldNumberContainer } from 'Component/PureForm/FieldNumber/FieldNumber.container';

export class Field extends PureComponent {
    static propTypes = {
        // Field attributes
        type: PropTypes.oneOf(Object.values(FIELD_TYPE)).isRequired,
        attr: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        setRef: PropTypes.func.isRequired,
        mix: MixType.isRequired,
        options: PropTypes.array.isRequired,

        // Validation
        showErrorAsLabel: PropTypes.bool.isRequired,
        validationResponse: PropTypes.object.isRequired,

        // Labels
        label: PropTypes.string.isRequired,
        subLabel: PropTypes.string.isRequired
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
        [FIELD_TYPE.number]: this.renderNumber.bind(this),

    };

    //#region INPUT TYPE RENDER
    renderDefaultInput() {
        const { type, setRef, attr, events, isDisabled } = this.props

        return <input
            ref={elem => setRef(elem)}
            disabled={ isDisabled }
            type={ type }
            { ...attr }
            { ...events }
        />;
    }

    renderFile() {
        return this.renderDefaultInput();
    }

    renderNumber() {
        const { attr, events, setRef } = this.props;

        return (
            <FieldNumberContainer
                attr={ attr }
                events={ events }
                setRef={ setRef }
            />
        );
    }

    renderSelect() {
        const { attr, events, options, setRef } = this.props;

        return (
            <FieldSelectContainer
                attr={ attr }
                events={ events }
                options={ options }
                setRef={ setRef }
            />
        );
    }

    renderButton() {
        const { setRef, attr, events, isDisabled } = this.props
        const { value = __("Submit") } = attr;

        return <button
            ref={elem => setRef(elem)}
            disabled={ isDisabled }
            { ...attr }
            { ...events }
        >{ value }</button>;
    }

    renderCheckboxOrRadio() {
        const {
            type,
            setRef,
            attr,
            attr: { id = "" } = {},
            events,
            isDisabled,
            label
        } = this.props

        return (
            <label htmlFor={ id } block="Field" elem="CheckboxLabel">
                <input
                    ref={elem => setRef(elem)}
                    disabled={ isDisabled }
                    type={ type }
                    { ...attr }
                    { ...events }
                />
                <div block="input-control" />
                { label }
            </label>
        );
    }

    renderTextArea() {
        const { setRef, attr, events, isDisabled } = this.props

        return <textarea
            ref={elem => setRef(elem)}
            disabled={ isDisabled }
            { ...attr }
            { ...events }
        />;
    }
    //#endregion

    //#region LABEL/TEXT RENDER
    // Renders validation error messages under field
    renderErrorMessage = (message) => (
        <div block="Field" elem="ErrorMessage">{ message }</div>
    );

    renderErrorMessages() {
        const {
            showErrorAsLabel,
            validationResponse
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
                { errorMessages.map(this.renderErrorMessage) }
            </div>
        );
    }

    // Renders fields label above field
    renderLabel() {
        const { type, label, attr: { name } = {} } = this.props;
        if (!label) {
            return null;
        }

        const isObject = typeof label === 'object';

        return (
            <>
                { isObject && label }
                { !isObject && <label htmlFor={name ? name : `input-${type}`}>{label}</label> }
            </>
        );
    }

    // Renders fields label under field
    renderSubLabel() {
        const { subLabel } = this.props;
        if (!subLabel) {
            return null;
        }

        return (
            <>
                { subLabel }
            </>
        )
    }
    //#endregion

    render() {
        const { type, validationResponse, mix } = this.props;
        const inputRenderer = this.renderMap[type];

        return (
            <>
                { type !== FIELD_TYPE.checkbox && type !== FIELD_TYPE.radio && this.renderLabel() }
                <div
                    block="Field"
                    mods={ {
                        type,
                        isValid: validationResponse === true,
                        hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0
                    } }
                    mix={ mix }
                >
                    { inputRenderer && inputRenderer() }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </>
        )
    }
}

export default Field;
