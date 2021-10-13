import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import {
    VALIDATION_INPUT_TYPE_NUMBER,
    VALIDATION_MESSAGES,
    VALIDATION_RULES
} from 'Util/Validator/Config';

import { ValidationRule } from './type';

export interface ValidationResult {
    value?: string | boolean
    errorMessages: string[]
}

export interface ValidationResults {
    values: { name: string; value: string | boolean, type: string }[]
    errorMessages: string[]
    errorFields: { name: string; value: string, type: string }[][]
}

/**
 * Validates parameter based on rules
 * @namespace Util/Validator/validate
 */
export const validate = (
    value: string | boolean | undefined,
    rule?: ValidationRule
): boolean | ValidationResult => {
    const {
        isRequired,
        inputType,
        match,
        range,
        customErrorMessages: {
            onRequirementFail = '',
            onInputTypeFail = '',
            onMatchFail = '',
            onRangeFailMin = '',
            onRangeFailMax = ''
        } = {}
    } = rule || {};

    const output: ValidationResult = {
        value,
        errorMessages: []
    };

    // #region IS REQUIRED
    if (isRequired && typeof value !== 'boolean' && !value) {
        output.errorMessages.push(onRequirementFail || VALIDATION_MESSAGES.isRequired);

        return output;
    }
    // #endregion

    // #region INPUT TYPE
    if (
        inputType
        && typeof value !== 'boolean'
        && value
        && !value.match(VALIDATION_RULES[inputType as keyof typeof VALIDATION_RULES])
    ) {
        output.errorMessages.push(
            onInputTypeFail
            || VALIDATION_MESSAGES[inputType as keyof typeof VALIDATION_MESSAGES]
        );
    }
    // #endregion

    // #region MATCH
    if (typeof match === 'function') {
        const response = match(value);

        if (response !== true) {
            output.errorMessages.push(response === false ? onMatchFail || VALIDATION_MESSAGES.match : response);
        }
    } else if (match && typeof value === 'string' && !value?.match(match)) {
        output.errorMessages.push(onMatchFail || VALIDATION_MESSAGES.match);
    }
    // #endregion

    // #region RANGE
    if (range && typeof value === 'string') {
        const { min, max } = range;
        const isNumber = (inputType as keyof VALIDATION_INPUT_TYPE_NUMBER) in VALIDATION_INPUT_TYPE_NUMBER;

        if (isNumber) {
            if (min && Number.parseInt(value ?? '0', 10) < min) {
                output.errorMessages.push(onRangeFailMin || __('Minimal value is %s!', min));
            }

            if (max && Number.parseInt(value ?? '0', 10) > max) {
                output.errorMessages.push(onRangeFailMax || __('Maximum value is %s!', max));
            }
        } else {
            if (min && (value?.length ?? 0) < min) {
                output.errorMessages.push(onRangeFailMin || __('Minimum %s characters!', min));
            }

            if (max && (value?.length ?? 0) > max) {
                output.errorMessages.push(onRangeFailMax || __('Maximum %s characters!', max));
            }
        }
    }
    // #endregion

    return output.errorMessages.length === 0 ? true : output;
};

/**
 * Validates DOM object check itself and children
 * @namespace Util/Validator/validateGroup
 */
export const validateGroup = (
    DOM: HTMLElement | null,
    rule?: ValidationRule
): boolean | ValidationResults => {
    if (typeof DOM?.querySelectorAll !== 'function') {
        return true;
    }

    const {
        selector = 'select, input, textarea, .js-validatabale, form, .FieldGroup'
    } = rule || {};
    const fields = DOM?.querySelectorAll(selector);

    const output: ValidationResults = {
        values: [],
        errorFields: [],
        errorMessages: []
    };

    // #region VALIDATE FIELDS
    fields.forEach((field) => {
        const {
            name,
            value,
            tagName = FIELD_TYPE.select,
            type = FIELD_TYPE.select
        } = field as HTMLInputElement;

        const fieldType = tagName.toLowerCase() === FIELD_TYPE.textarea ? FIELD_TYPE.textarea : type;
        const fieldValue = (fieldType === FIELD_TYPE.checkbox || fieldType === FIELD_TYPE.radio)
            ? (field as HTMLInputElement).checked
            : value;

        output.values.push({ name, value: fieldValue, type: fieldType });

        // Invokes validation event for all fields
        const data = { errors: [] };
        const event = new CustomEvent('validate', { detail: data });
        field.dispatchEvent(event);
        const { errors } = data;

        if (errors.length > 0) {
            output.errorFields.push(errors);
        }
    });
    // #endregion

    // #region VALIDATE GROUP
    if (rule) {
        const {
            isRequired,
            match,
            customErrorMessages: {
                onRequirementFail,
                onMatchFail,
                onGroupFail
            } = {}
        } = rule;

        if (isRequired) {
            const containsValue = output.values.some(({ value, type }) => {
                if (type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio) {
                    return value;
                }

                if (typeof value === 'string') {
                    return value.length > 0;
                }

                return !!value;
            });

            if (!containsValue) {
                output.errorMessages.push(onRequirementFail || VALIDATION_MESSAGES.isRequired);
            }
        }

        if (typeof match === 'function' && !match(output.values)) {
            output.errorMessages.push(onMatchFail || VALIDATION_MESSAGES.match);
        }

        if (output.errorMessages.length === 0 && output.errorFields.length > 0) {
            output.errorMessages.push(onGroupFail || VALIDATION_MESSAGES.group);
        }
    }
    // #endregion

    const { errorMessages, errorFields } = output;
    return (errorMessages.length === 0 && errorFields.length === 0) ? true : output;
};

export default validate;
