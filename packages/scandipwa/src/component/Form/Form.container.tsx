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

import {
    createRef, FormEvent,
    PureComponent, RefObject
} from 'react';

import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import getFieldsData from 'Util/Form/Extract';
import { validateGroup } from 'Util/Validator';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

import Form from './Form.component';
import { FormContainerProps, FormContainerState } from './Form.type';

/**
 * Form
 * @class FormContainer
 * @namespace Component/Form/Container */
export class FormContainer extends PureComponent<FormContainerProps, FormContainerState> {
    static defaultProps = {
        attr: {},
        events: {},
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        onSubmit: noopFn,
        onError: noopFn,
        children: [],
        returnAsObject: false,
        mix: {},
        elemRef: null
    };

    state = {
        validationResponse: true
    };

    containerFunctions = {
        validate: this.validate.bind(this),
        setRef: this.setRef.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    formRef = createRef<HTMLElement>();

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount(): void {
        const { validationRule } = this.props;

        if (this.formRef) {
            this.formRef.current?.removeEventListener('reset', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                this.formRef.current?.removeEventListener('validate', this.validate.bind(this));
            }
        }
    }

    // Adds validation event listener to field
    setRef(elem: RefObject<HTMLElement>): void {
        const { validationRule, elemRef } = this.props;

        if (elem && this.formRef !== elem) {
            this.formRef = elem;

            if (elemRef) {
                elemRef.current = elem;
            }

            elem.current?.addEventListener('reset', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                elem.current?.addEventListener('validate', this.validate.bind(this));
            }
        }
    }

    resetField(): void {
        const fields = this.formRef.current?.querySelectorAll('input, textarea, select');
        const event = new CustomEvent('resetField');

        if (!fields) {
            return;
        }

        fields.forEach((field) => field.dispatchEvent(event));
    }

    validate(): boolean | ValidationDOMOutput {
        const { validationRule } = this.props;
        const output = validateGroup(this.formRef, validationRule);

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
            [FieldType.NUMBER, FieldType.BUTTON],
            returnAsObject
        );

        hook(...[...args, { ...attr, formRef: this.formRef, fields }]);
    }
    //#endregion

    async onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const {
            onSubmit,
            onError,
            returnAsObject = false,
            validationRule
        } = this.props;

        const fields = getFieldsData(
            this.formRef, false, [FieldType.NUMBER, FieldType.BUTTON], returnAsObject
        );

        if (!fields) {
            return;
        }

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
            // events,
            // validateOn,
            children,
            attr,
            showErrorAsLabel,
            label,
            subLabel,
            mix
        } = this.props;
        const {
            // validate,
            onSubmit
        } = this.containerFunctions;
        const { validationResponse } = this.state;

        const newEvents = {};
        Object.keys(events).forEach((eventName) => {
            const { [ eventName ]: event } = events;
            newEvents[ eventName ] = this.surroundEvent.bind(this, event);
        });

        // Surrounds events with validation
        validateOn.forEach((eventName) => {
            const { [ eventName ]: baseEvent } = events;
            newEvents[ eventName ] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
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
                // ...newEvents,
                onSubmit
            }
        };
    }

    render(): ReactElement {
        return (
            <Form
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default FormContainer;
