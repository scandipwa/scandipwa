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

import FIELD_TYPE from 'Component/Field/Field.config';
import { ChildrenType, MixType, RefType } from 'Type/Common.type';
import { EventsType, FieldAttrType, ValidationRuleType } from 'Type/Field.type';
import getFieldsData from 'Util/Form/Extract';
import { validateGroup } from 'Util/Validator';

import Form from './Form.component';

/**
 * Form
 * @class FormContainer
 * @namespace Component/Form/Container */
export class FormContainer extends PureComponent {
    static propTypes = {
        // Form attributes
        children: ChildrenType,
        attr: FieldAttrType,
        events: EventsType,
        onSubmit: PropTypes.func,
        onError: PropTypes.func,
        returnAsObject: PropTypes.bool,
        elemRef: RefType,

        // Validation
        validationRule: ValidationRuleType,
        validateOn: PropTypes.arrayOf(PropTypes.string),
        showErrorAsLabel: PropTypes.bool,

        // Labels
        label: PropTypes.string,
        subLabel: PropTypes.string,

        mix: MixType
    };

    static defaultProps = {
        attr: {},
        events: {},
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        onSubmit: null,
        onError: null,
        children: [],
        returnAsObject: false,
        mix: {},
        elemRef: null
    };

    state = {
        validationResponse: null
    };

    containerFunctions = {
        validate: this.validate.bind(this),
        setRef: this.setRef.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    formRef = createRef();

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount() {
        const { validationRule } = this.props;

        if (this.formRef) {
            this.formRef.removeEventListener('reset', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                this.formRef.removeEventListener('validate', this.validate.bind(this));
            }
        }
    }

    // Adds validation event listener to field
    setRef(elem) {
        const { validationRule, elemRef } = this.props;

        if (elem && this.formRef !== elem) {
            this.formRef = elem;

            if (elemRef) {
                elemRef.current = elem;
            }

            elem.addEventListener('reset', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                elem.addEventListener('validate', this.validate.bind(this));
            }
        }
    }

    resetField() {
        const fields = this.formRef.querySelectorAll('input, textarea, select');
        const event = new CustomEvent('resetField');
        fields.forEach((field) => field.dispatchEvent(event));
    }

    validate(data) {
        const { validationRule } = this.props;
        const output = validateGroup(this.formRef, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output !== true) {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }
        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook, ...args) {
        this.validate();

        if (typeof hook === 'function') {
            this.surroundEvent(hook, ...args);
        }
    }

    surroundEvent(hook, ...args) {
        const { attr, returnAsObject } = this.props;
        const fields = getFieldsData(
            this.formRef,
            false,
            [FIELD_TYPE.number, FIELD_TYPE.button],
            returnAsObject
        );

        hook(...[...args, { ...attr, formRef: this.formRef, fields }]);
    }
    //#endregion

    async onSubmit(e) {
        e.preventDefault();

        const {
            onSubmit,
            onError,
            returnAsObject = false,
            validationRule
        } = this.props;

        const fields = getFieldsData(
            this.formRef, false, [FIELD_TYPE.number, FIELD_TYPE.button], returnAsObject
        );
        const isValid = validateGroup(this.formRef, validationRule);

        if (isValid !== true) {
            if (typeof onError === 'function') {
                onError(this.formRef, fields, isValid);
            }

            return;
        }

        if (typeof onSubmit === 'function') {
            onSubmit(this.formRef, fields);
        }
    }

    containerProps() {
        const {
            events,
            validateOn,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mix
        } = this.props;
        const { validate, onSubmit } = this.containerFunctions;
        const { validationResponse } = this.state;

        const newEvents = { };
        Object.keys(events).forEach((eventName) => {
            const { [eventName]: event } = events;
            newEvents[eventName] = this.surroundEvent.bind(this, event);
        });

        // Surrounds events with validation
        validateOn.forEach((eventName) => {
            const { [eventName]: baseEvent } = events;
            newEvents[eventName] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
        });

        return {
            validationResponse,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mix,
            events: {
                ...newEvents,
                onSubmit
            }
        };
    }

    render() {
        return (
            <Form
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FormContainer;
