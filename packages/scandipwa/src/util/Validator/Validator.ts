/* eslint-disable spaced-comment */
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

import { FieldType } from 'Component/Field/Field.config';
import {
    VALIDATION_MESSAGES,
    VALIDATION_RULES,
    ValidationInputTypeNumber,
} from 'Util/Validator/Config';

import {
    ValidationDOMOutput,
    ValidationOutput,
    ValidationRule,
} from './Validator.type';

/**
 * Validates parameter based on rules
 * @param value
 * @param rule
 * @returns {boolean|{errorMessages: *[], value}}
 * @namespace Util/Validator/validate
 */
export const validate = (value: string | boolean, rule: ValidationRule): boolean | ValidationOutput => {
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
            onExtensionFail,
        } = {},
    } = rule;

    const output: ValidationOutput = {
        value,
        errorMessages: [],
    };

    //#region IS REQUIRED
    if (isRequired && !value) {
        output.errorMessages.push(onRequirementFail || VALIDATION_MESSAGES.isRequired);
    }
    //#endregion

    //#region INPUT TYPE
    if (inputType && value && !(value as string).match(
        VALIDATION_RULES[inputType as keyof typeof VALIDATION_RULES],
    )) {
        output.errorMessages.push(
            onInputTypeFail || VALIDATION_MESSAGES[inputType as keyof typeof VALIDATION_MESSAGES],
        );
    }
    //#endregion

    //#region MATCH
    if (typeof match === 'function') {
        const response = match(value as string);

        if (response !== true) {
            output.errorMessages.push(response === false ? onMatchFail || VALIDATION_MESSAGES.match : response);
        }
    } else if (match && !(value as string).match(match)) {
        output.errorMessages.push(onMatchFail || VALIDATION_MESSAGES.match);
    }
    //#endregion

    //#region RANGE
    if (range) {
        const { min, max, showLengthError } = range;
        const isNumber = !!(inputType && inputType in ValidationInputTypeNumber);

        if (isNumber) {
            if (min && +value < min) {
                output.errorMessages.push(onRangeFailMin || __('Minimal value is %s!', min));
            }

            if (max && +value > max) {
                output.errorMessages.push(onRangeFailMax || __('Maximum value is %s!', max));
            }
        } else {
            if (min && (value as string).length < min && (value as string).length > 0) {
                output.errorMessages.push(onRangeFailMin || __('Minimum %s characters!', min));
            }

            if (max && (value as string).length > max) {
                const tooMany = (value as string).length - max;

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
        const currentFileExtension = (value as string).split('.').pop() as string;

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
export const validateGroup = (DOM: HTMLElement, rule?: ValidationRule): true | ValidationDOMOutput => {
    const {
        selector = 'select, input, textarea, .js-validatabale, form, .FieldGroup',
    } = rule || {};
    const fields = DOM.querySelectorAll<HTMLInputElement>(selector);

    const output: ValidationDOMOutput = {
        values: [],
        errorFields: [],
        errorMessages: [],
    };

    //#region VALIDATE FIELDS
    fields.forEach((field) => {
        const {
            name,
            value,
            tagName = FieldType.SELECT,
            type = FieldType.SELECT,
        } = field;

        const fieldType = tagName.toLowerCase() === FieldType.TEXTAREA ? FieldType.TEXTAREA : type;
        const fieldValue = fieldType === FieldType.CHECKBOX || fieldType === FieldType.RADIO ? field.checked : value;

        output.values?.push({ name, value: fieldValue, type: fieldType });

        // Invokes validation event for all fields
        const data = { errors: [] };
        const event = new CustomEvent('validate', { detail: data });

        field.dispatchEvent(event);
        const { errors } = data;

        if (errors.length > 0) {
            output.errorFields?.push(errors);
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
                onGroupFail,
            } = {},
        } = rule;

        if (isRequired) {
            const containsValue = output.values?.some(({ value, type }) => {
                if (type === FieldType.CHECKBOX || type === FieldType.RADIO) {
                    return value;
                }

                if (typeof value === 'string') {
                    return value.length > 0;
                }

                return !!value;
            });

            if (!containsValue) {
                output.errorMessages?.push(onRequirementFail || VALIDATION_MESSAGES.isRequired);
            }
        }

        if (typeof match === 'function' && !match(output.values)) {
            output.errorMessages?.push(onMatchFail || VALIDATION_MESSAGES.match);
        }

        if (output.errorMessages?.length === 0 && (output.errorFields?.length || 0) > 0) {
            output.errorMessages?.push(onGroupFail || VALIDATION_MESSAGES.group);
        }
    }
    //#endregion
    const { errorMessages, errorFields } = output;

    return !errorMessages?.length && !errorFields?.length ? true : output;
};

/**
 * Get number of different character classes
 * @param {String} value
 * @return {Number}
 * @namespace Util/Validator/getNumberOfCharacterClasses
 */
export const getNumberOfCharacterClasses = (value: string): number => Number(/\d+/.test(value))
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
    range: ValidationRule['range'],
    minCharacter: string,
): string | boolean => {
    if (value.length === 0 || !range) {
        return true;
    }

    if (range.min && value.length < range.min) {
        return __('Minimum %s characters!', range.min);
    }

    if (range.max && value.length > range.max) {
        return __('Maximum %s characters!', range.max);
    }

    const counter = getNumberOfCharacterClasses(value);

    if (counter < Number(minCharacter)) {
        return __(
            'Minimum of different classes of characters in password is %s. ',
            minCharacter,
        )
            + __('Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
    }

    return true;
};
