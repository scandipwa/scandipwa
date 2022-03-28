/* eslint-disable spaced-comment */
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
import { createRef, PureComponent } from 'react';

import { MixType, RefType } from 'Type/Common.type';
import {
    EventsType, FieldAttrType, FieldOptionsType, LabelType, ValidationRuleType
} from 'Type/Field.type';
import { validate } from 'Util/Validator';

import Field from './Field.component';
import { FIELD_TYPE } from './Field.config';

/**
 * Field
 * @class FieldContainer
 * @namespace Component/Field/Container
 */
export class FieldContainer extends PureComponent {
    static propTypes = {
        // Field attributes
        type: PropTypes.oneOf(Object.values(FIELD_TYPE)),
        attr: FieldAttrType,
        events: EventsType,
        isDisabled: PropTypes.bool,
        mix: MixType,
        options: FieldOptionsType,
        elemRef: RefType,
        changeValueOnDoubleClick: PropTypes.bool,
        isSortSelect: PropTypes.bool,

        // Validation
        validationRule: ValidationRuleType,
        validateOn: PropTypes.arrayOf(PropTypes.string),
        showErrorAsLabel: PropTypes.bool,

        // Labels
        label: LabelType,
        subLabel: PropTypes.string,
        addRequiredTag: PropTypes.bool
    };

    static defaultProps = {
        type: FIELD_TYPE.text,
        attr: {},
        events: {},
        mix: {},
        validationRule: {},
        validateOn: [],
        options: [],
        showErrorAsLabel: true,
        isDisabled: false,
        addRequiredTag: false,
        label: '',
        subLabel: '',
        elemRef: null,
        changeValueOnDoubleClick: false,
        isSortSelect: false
    };

    state = {
        validationResponse: null,
        showLengthError: false
    };

    containerFunctions = {
        validate: this.validate.bind(this)
    };

    fieldRef = createRef();

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount() {
        const { validationRule } = this.props;

        if (this.fieldRef) {
            this.fieldRef.removeEventListener('resetField', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                this.fieldRef.removeEventListener('validate', this.validate.bind(this));
            }
        }
    }

    // Adds validation event listener to field
    setRef(elem) {
        const { validationRule, elemRef } = this.props;

        if (elem && this.fieldRef !== elem) {
            this.fieldRef = elem;

            if (elemRef) {
                elemRef.current = elem;
            }

            elem.addEventListener('resetField', this.resetField.bind(this));

            if (!validationRule || Object.keys(validationRule).length === 0) {
                return;
            }

            elem.addEventListener('validate', this.validate.bind(this));
        }
    }

    resetField() {
        this.setState({ validationResponse: null });
    }

    handleShowLengthError() {
        const { validationRule, type } = this.props;
        const { showLengthError } = this.state;

        if (type === FIELD_TYPE.textarea || type === FIELD_TYPE.text) {
            validationRule.range = { ...validationRule.range, showLengthError };
        }

        return validationRule;
    }

    validate(data) {
        const {
            validationRule: { range: { max: maxValidLength = 0 } = {} }, type, attr: { name } = {}
        } = this.props;
        const { showLengthError } = this.state;
        const value = type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio
            ? !!this.fieldRef.checked
            : this.fieldRef.value;
        const newValidRule = this.handleShowLengthError();
        const response = validate(type === FIELD_TYPE.file
            ? value.toLowerCase()
            : value, newValidRule);
        const output = response !== true ? { ...response, type, name } : response;

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && response !== true) {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }

            // Validates length on submit, renders special message
            if (maxValidLength && value.length > maxValidLength && !showLengthError) {
                this.setState({ showLengthError: true });
                output.errorMessages.unshift(__('Please enter no more than %s characters.', maxValidLength));
            }

            data.detail.errors.push(output);
        }

        // When submit and response equals true (it can be object) reset show length error
        if (response === true) {
            this.setState({ showLengthError: false });
        }

        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook, ...args) {
        if (hook) {
            const { attr, type } = this.props;
            const { value } = this.fieldRef;
            hook(...[...args, {
                ...attr, fieldRef: this.fieldRef, value, type
            }]);
        }
        this.validate();
    }
    //#endregion

    containerProps() {
        const {
            events,
            validateOn,
            type,
            attr: {
                autoComplete,
                autocomplete,
                ...attr
            } = {},
            isDisabled,
            mix,
            options,
            showErrorAsLabel,
            label,
            subLabel,
            addRequiredTag,
            changeValueOnDoubleClick,
            isSortSelect
        } = this.props;
        const { validationResponse, lengthError } = this.state;
        const { validate } = this.containerFunctions;

        // Surrounds events with validation
        const newEvents = { ...events };
        validateOn.forEach((eventName) => {
            const { [eventName]: baseEvent } = events;
            newEvents[eventName] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
        });

        return {
            type,
            attr: {
                ...attr,
                autoComplete: autoComplete || autocomplete
            },
            isDisabled,
            mix,
            options,
            showErrorAsLabel,
            label,
            subLabel,
            addRequiredTag,
            changeValueOnDoubleClick,
            isSortSelect,
            validationResponse,
            events: newEvents,
            fieldRef: this.fieldRef,
            setRef: this.setRef.bind(this),
            lengthError
        };
    }

    render() {
        return (
            <Field
              { ...this.containerProps() }
            />
        );
    }
}

export default FieldContainer;
