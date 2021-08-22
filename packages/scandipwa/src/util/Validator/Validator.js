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
import FIELD_TYPE from 'Config/Field.config';
import { VALIDATION_INPUT_TYPE_NUMBER, VALIDATION_MESSAGES, VALIDATION_RULES } from 'Util/Validator/Config';

export const validate = (value, rule) => {
    const {
        isRequired,
        inputType,
        match,
        range,
        customErrorMessages: {
            onRequirementFail,
            onInputTypeFail,
            onMatchFail,
            onRangeFail
        } = {}
    } = rule;

    const output = {
        value,
        errorMessages: []
    };

    //#region IS REQUIRED
    if (isRequired && !value) {
        output.errorMessages.push(onRequirementFail || VALIDATION_MESSAGES.isRequired);
    }
    //#endregion

    //#region INPUT TYPE
    if (inputType && !value.match(VALIDATION_RULES[inputType])) {
        output.errorMessages.push(onInputTypeFail || VALIDATION_MESSAGES[inputType]);
    }
    //#endregion

    //#region MATCH
    if ((typeof match === 'function' && !match(value)) || (match && value.match(match))) {
        output.errorMessages.push(onMatchFail || VALIDATION_MESSAGES.match);
    }
    //#endregion

    //#region RANGE
    if (range) {
        const { min, max } = range;
        const isNumber = !!VALIDATION_INPUT_TYPE_NUMBER[inputType];
        console.log([isNumber, value, inputType]);
        if (isNumber) {
            if ((min && +value < min) || (max && +value > max)) {
                output.errorMessages.push(onRangeFail || VALIDATION_MESSAGES.range);
            }
        } else if ((min && value.length < min) || (max && value.length > max)) {
            output.errorMessages.push(onRangeFail || VALIDATION_MESSAGES.range);
        }
    }
    //#endregion

    const { errorMessages } = output;
    return errorMessages.length === 0 ? true : output;
};

export const validateGroup = (DOM, rule = null) => {
    const {
        selector = 'select, input, textarea, .js-validatabale, form, .FieldGroup'
    } = rule || {};
    const fields = DOM.querySelectorAll(selector);

    const output = {
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
        } = field;

        const fieldType = tagName.toLowerCase() === FIELD_TYPE.textarea ? FIELD_TYPE.textarea : type;
        const fieldValue = fieldType === FIELD_TYPE.checkbox || fieldType === FIELD_TYPE.radio ? field.checked : value;
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
                onMatchFail
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
    }
    //#endregion

    const { errorMessages, errorFields } = output;
    return errorMessages.length === 0 && errorFields.length === 0 ? true : output;
};

export default validate;
