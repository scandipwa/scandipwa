/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { FormEvent, PureComponent, SyntheticEvent } from 'react';

import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import getFieldsData from 'Util/Form/Extract';
import { FieldData } from 'Util/Form/Form.type';
import { validateGroup } from 'Util/Validator';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

import Form from './Form.component';
import {
    FormComponentProps,
    FormContainerFunctions,
    FormContainerProps,
    FormContainerPropsKeys,
    FormContainerState,
    FormValidationOutput
} from './Form.type';

/**
 * Form
 * @class FormContainer
 * @namespace Component/Form/Container */
export class FormContainer extends PureComponent<FormContainerProps, FormContainerState> {
    static defaultProps: Partial<FormContainerProps> = {
        attr: {},
        events: {},
        validationRule: {},
        validateOn: [],
        showErrorAsLabel: true,
        label: '',
        subLabel: '',
        onSubmit: undefined,
        onError: undefined,
        children: [],
        returnAsObject: false,
        mix: {},
        elemRef: undefined
    };

    state: FormContainerState = {
        validationResponse: null
    };

    containerFunctions: FormContainerFunctions = {
        validate: this.validate.bind(this),
        setRef: this.setRef.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    formRef: HTMLFormElement | null = null;

    // #region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount(): void {
        const { validationRule } = this.props;

        if (this.formRef) {
            this.formRef.removeEventListener('reset', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                this.formRef.removeEventListener('validate', this.validate.bind(this));
            }
        }
    }

    // Adds validation event listener to field
    setRef(elem: HTMLFormElement | null): void {
        const { validationRule, elemRef } = this.props;

        if (elem && this.formRef !== elem) {
            this.formRef = elem;

            if (elemRef) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                elemRef.current = elem;
            }

            elem.addEventListener('reset', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                elem.addEventListener('validate', this.validate.bind(this));
            }
        }
    }

    resetField(): void {
        const fields = this.formRef && this.formRef.querySelectorAll('input, textarea, select');
        const event = new CustomEvent('resetField');

        fields?.forEach((field) => field.dispatchEvent(event));
    }

    validate(data?: (Event | SyntheticEvent) & FormValidationOutput): boolean | ValidationDOMOutput | null {
        const { validationRule } = this.props;
        const output = this.formRef && validateGroup(this.formRef, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output && output !== true) {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }
            data.detail.errors.push(output);
        }

        this.setState({ validationResponse: output });

        return output;
    }

    validateOnEvent(hook: unknown, ...args: ((event?: SyntheticEvent) => void)[]): void{
        this.validate();

        if (typeof hook === 'function') {
            this.surroundEvent(hook, ...args);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    surroundEvent(hook: any, ...args: ((event?: SyntheticEvent) => void)[]): void {
        const { attr, returnAsObject } = this.props;
        const fields = getFieldsData(
            this.formRef,
            false,
            [FieldType.NUMBER, FieldType.BUTTON],
            returnAsObject
        );

        hook(...[...args, { ...attr, formRef: this.formRef, fields }]);
    }
    // #endregion

    async onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        if (!this.formRef) {
            return;
        }

        const {
            onSubmit,
            onError,
            returnAsObject = false,
            validationRule
        } = this.props;

        const fields = getFieldsData(
            this.formRef, false, [FieldType.NUMBER, FieldType.BUTTON], returnAsObject
        );
        const isValid = validateGroup(this.formRef, validationRule);

        if (isValid !== true) {
            if (typeof onError === 'function') {
                onError(this.formRef, fields, isValid);
            }

            return;
        }

        if (typeof onSubmit === 'function') {
            onSubmit(this.formRef, fields as FieldData[]);
        }
    }

    containerProps(): Pick<FormComponentProps, FormContainerPropsKeys> {
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
        const newEvents: Record<string, unknown> = { };

        Object.keys(events).forEach((eventName) => {
            const { [eventName as keyof typeof events]: event } = events;

            newEvents[eventName] = this.surroundEvent.bind(this, event);
        });

        // Surrounds events with validation
        validateOn.forEach((eventName) => {
            const { [eventName as keyof typeof events]: baseEvent } = events;

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
