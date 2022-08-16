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

import { PureComponent, SyntheticEvent } from 'react';

import { ReactElement } from 'Type/Common.type';
import { ValidationOutput } from 'Type/Field.type';
import { validate } from 'Util/Validator';
import { FieldValidationOutput, ValidationRule } from 'Util/Validator/Validator.type';

import Field from './Field.component';
import { FieldType } from './Field.config';
import {
    FieldComponentProps,
    FieldContainerFunctions,
    FieldContainerProps,
    FieldContainerPropsKeys,
    FieldContainerState,
    FieldRef
} from './Field.type';

/**
 * Field
 * @class FieldContainer
 * @namespace Component/Field/Container
 */
export class FieldContainer extends PureComponent<FieldContainerProps, FieldContainerState> {
    static defaultProps: Partial<FieldContainerProps> = {
        type: FieldType.TEXT,
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
        elemRef: undefined,
        changeValueOnDoubleClick: false,
        isSortSelect: false
    };

    state: FieldContainerState = {
        validationResponse: null,
        showLengthError: false
    };

    containerFunctions: FieldContainerFunctions = {
        validate: this.validate.bind(this)
    };

    fieldRef: FieldRef | null = null;

    //#region VALIDATION
    // Removes event listener for validation from field
    componentWillUnmount(): void {
        const { validationRule } = this.props;

        if (this.fieldRef) {
            this.fieldRef.removeEventListener('resetField', this.resetField.bind(this));

            if (validationRule && Object.keys(validationRule).length > 0) {
                this.fieldRef.removeEventListener('validate', this.validate.bind(this));
            }
        }
    }

    // Adds validation event listener to field
    setRef(elem: FieldRef | null): void {
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

    resetField(): void {
        this.setState({ validationResponse: null });
    }

    handleShowLengthError(): ValidationRule {
        const { validationRule, type } = this.props;
        const { showLengthError } = this.state;

        if (type === FieldType.TEXTAREA || type === FieldType.TEXT) {
            validationRule.range = { ...validationRule.range, showLengthError };
        }

        return validationRule;
    }

    validate(data?: (Event | SyntheticEvent) & ValidationOutput): boolean | FieldValidationOutput {
        const {
            validationRule: { range: { max: maxValidLength = 0 } = {} }, type, attr: { name } = {}
        } = this.props;
        const { showLengthError } = this.state;

        if (!this.fieldRef) {
            return false;
        }

        const value = this.fieldRef instanceof HTMLInputElement
        && (type === FieldType.CHECKBOX || type === FieldType.RADIO)
            ? !!this.fieldRef.checked
            : this.fieldRef.value;
        const newValidRule = this.handleShowLengthError();

        if (!value) {
            return false;
        }

        const response = validate(type === FieldType.FILE && typeof value === 'string'
            ? value.toLowerCase()
            : value, newValidRule);
        const output = response !== true ? { ...response, type, name } : response;

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && typeof output !== 'boolean') {
            if (!data.detail.errors) {
                // eslint-disable-next-line no-param-reassign
                data.detail.errors = [];
            }

            // Validates length on submit, renders special message
            if (output.errorMessages
                && typeof value === 'string'
                && maxValidLength
                && value.length > maxValidLength
                && !showLengthError
            ) {
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

    validateOnEvent(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        hook: (...args: any[]) => void,
        ...args: ((event?: SyntheticEvent) => void)[]
    ): void {
        if (hook && this.fieldRef) {
            const { attr, type } = this.props;

            if (this.fieldRef.value) {
                hook(...[...args, {
                    ...attr, fieldRef: this.fieldRef, value: this.fieldRef.value, type
                }]);
            }
        }

        this.validate();
    }
    //#endregion

    containerProps(): Pick<FieldComponentProps, FieldContainerPropsKeys> {
        const {
            events,
            validateOn,
            type,
            attr,
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
        const { validationResponse } = this.state;
        const { validate } = this.containerFunctions;

        // Surrounds events with validation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newEvents: any = { ...events };

        validateOn.forEach((eventName) => {
            const { [ eventName as keyof typeof events]: baseEvent } = events;
            newEvents[ eventName ] = baseEvent ? this.validateOnEvent.bind(this, baseEvent) : validate;
        });

        return {
            type,
            attr,
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
            setRef: this.setRef.bind(this)
        };
    }

    render(): ReactElement {
        return (
            <Field
              { ...this.containerProps() }
            />
        );
    }
}

export default FieldContainer;
