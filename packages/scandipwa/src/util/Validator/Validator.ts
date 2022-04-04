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
import FIELD_TYPE from 'Component/Field/Field.config';
import { VALIDATION_MESSAGES, VALIDATION_RULES, ValidationInputTypeNumber } from 'Util/Validator/Config';

//TODO Move to Types

export type ValidationRule = {
    isRequired: boolean;
    inputType: string;
    selector?: string;
    match: string | ((args: string | Record<string, string>[]) => boolean);
    range: Record<string, number>;
    fileExtension: Record<string, string>;
    customErrorMessages: Record<string, string>;
};

export type ValidationOutput = {
    value: string;
    errorMessages: string[];
};

export type ValidationDOMOutput = {
    values: {
        name: string;
        value: string;
        type: string;
    }[];
    errorFields: unknown[];
    errorMessages: string[];
};

/**
 * Validates parameter based on rules
 * @param value
 * @param rule
 * @returns {boolean|{errorMessages: *[], value}}
 * @namespace Util/Validator/validate
 */
export const validate = (value: string, rule: ValidationRule): boolean | ValidationOutput => {
    const {
        isRequired,
        inputType,
        match,
        range,
        fileExtension,
        customErrorMessages: {
            onRequirementFail,
            onInputTypeFail,
            onMatchFail,
            onRangeFailMin,
            onRangeFailMax,
            onExtensionFail
        } = {}
    } = rule;

    const output: ValidationOutput = {
        value,
        errorMessages: []
    };

    //#region IS REQUIRED
    if (isRequired && !value) {
        output.errorMessages.push(onRequirementFail || VALIDATION_MESSAGES.isRequired);
    }
    //#endregion

    //#region INPUT TYPE
    if (inputType && value && !value.match(VALIDATION_RULES[inputType])) {
        output.errorMessages.push(onInputTypeFail || VALIDATION_MESSAGES[inputType]);
    }
    //#endregion

    //#region MATCH
    if (typeof match === 'function') {
        const response = match(value);

        if (response !== true) {
            output.errorMessages.push(response === false ? onMatchFail || VALIDATION_MESSAGES.match : response);
        }
    } else if (match && !value.match(match)) {
        output.errorMessages.push(onMatchFail || VALIDATION_MESSAGES.match);
    }
    //#endregion

    //#region RANGE
    if (range) {
        const { min, max, showLengthError } = range;
        const isNumber = inputType in ValidationInputTypeNumber;

        if (isNumber) {
            if (min && +value < min) {
                output.errorMessages.push(onRangeFailMin || __('Minimal value is %s!', min));
            }

            if (max && +value > max) {
                output.errorMessages.push(onRangeFailMax || __('Maximum value is %s!', max));
            }
        } else {
            if (min && value.length < min && value.length > 0) {
                output.errorMessages.push(onRangeFailMin || __('Minimum %s characters!', min));
            }

            if (max && value.length > max) {
                const tooMany = value.length - max;
                output.errorMessages.push(onRangeFailMax || __('Maximum %s characters (%s too many)', max, tooMany));

                if (showLengthError) {
                    output.errorMessages.unshift(__('Please enter no more than %s characters.', max));
                }
            }
        }
    }

    if (fileExtension && value !== '') {
        const { accept } = fileExtension;
        const acceptedExtensions = accept.split(', ');
        const currentFileExtension = value.split('.').pop() as string;

        if (!acceptedExtensions.includes(currentFileExtension)) {
            output.errorMessages.push(onExtensionFail || VALIDATION_MESSAGES.fileExtension);
        }
    }
    //#endregion

    const { errorMessages } = output;
    return errorMessages.length === 0 ? true : output;
};

/**
 * Validates DOM object check itself and children
 * @param DOM
 * @param rule
 * @returns {boolean|{errorMessages: *[], values: *[], errorFields: *[]}}
 * @namespace Util/Validator/validateGroup
 */
export const validateGroup = (DOM: Document, rule: ValidationRule): boolean | ValidationDOMOutput => {
    if (typeof DOM.querySelectorAll !== 'function') {
        return true;
    }

    const {
        selector = 'select, input, textarea, .js-validatabale, form, .FieldGroup'
    } = rule || {};
    const fields = DOM?.querySelectorAll(selector) as NodeListOf<HTMLInputElement>;

    const output: ValidationDOMOutput = {
        values: [],
        errorFields: [],
        errorMessages: []
    };

    //#region VALIDATE FIELDS
    fields.forEach((field) => {
        const {
            name,
            value,
            tagName = FIELD_TYPE.select,
            type = FIELD_TYPE.select
        } = field as HTMLInputElement;

        const fieldType = tagName.toLowerCase() === FIELD_TYPE.textarea ? FIELD_TYPE.textarea : type;
        // TODO change logic so that checked won't fill as value
        // eslint-disable-next-line max-len
        const fieldValue = fieldType === (FIELD_TYPE.checkbox || fieldType === FIELD_TYPE.radio) && field.checked ? '' : value;
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
    //#endregion

    //#region VALIDATE GROUP
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
    //#endregion
    const { errorMessages, errorFields } = output;
    return errorMessages.length === 0 && errorFields.length === 0 ? true : output;
};

/**
 * Get number of different character classes
 * @param {String} value
 * @return {Number}
 * @namespace Util/Validator/getNumberOfCharacterClasses
 */
export const getNumberOfCharacterClasses = (value: string) => Number(/\d+/.test(value))
      + Number(/[a-z]+/.test(value))
      + Number(/[A-Z]+/.test(value))
      + Number(/[^a-zA-Z0-9]+/.test(value));

export default validate;

/**
 * Validates password
 * @param {String} value
 * @param {{min: {Number|Object}, max: {Number|Object}}} range
 * @param {String} minCharacter
 * @returns {String|Boolean}
 * @namespace Util/Validator/validatePassword
 */
export const validatePassword = (
    value: string,
    range: Record<string, number>,
    minCharacter: number
): string | boolean => {
    if (value.length === 0) {
        return true;
    }

    if (value.length < range.min) {
        return __('Minimum %s characters!', range.min);
    }

    if (value.length > range.max) {
        return __('Maximum %s characters!', range.max);
    }

    const counter = getNumberOfCharacterClasses(value);

    if (counter < Number(minCharacter)) {
        return __('Minimum of different classes of characters in password is %s. ',
            minCharacter)
            + __('Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
    }

    return true;
};
