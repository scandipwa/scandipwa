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

import PropTypes from 'prop-types';

import { FieldType } from 'Component/Field/Field.config';
import { ValidationInputType } from 'Util/Validator/Config';

export type Label = string | React.ReactNode;

export interface Option {
    id?: string | number;
    label?: Label;
    value?: string | number;
    name?: string;
    isAvailable?: boolean;
    target?: { value: string | number };
    sort_order?: number;
    isPlaceholder?: boolean;
    subLabel?: string;
    isHovered?: boolean;
    disabled?: boolean;
}

export interface CustomErrorMessages {
    onRequirementFail?: string;
    onInputTypeFail?: string;
    onMatchFail?: string;
    onRangeFailMin?: string;
    onRangeFailMax?: string;
    onExtensionFail?: string;
    onGroupFail?: string;
}

// TODO
export type Events = Record<string, unknown>;

// TODO
export type FieldAttr = unknown;

export interface FieldOptions {
    id?: string | number;
    label?: Label;
    value?: string | number;
    isHovered?: boolean;
}

export interface Values {
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
}

export interface ErrorMessage {
    injectables?: string[];
    value?: string;
}

export interface ErrorField {
    errorMessages?: ErrorMessage[];
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
}

export type FieldGroupValidationResponse = {
    errorFields: ErrorField;
    errorMessages: ErrorMessage;
    values: Values;
} | boolean;

export type Date = number | string;

export interface ValidationOutput {
    detail?: {
        errors?: {
            type: FieldType;
            name?: string;
            value?: string | boolean;
            errorMessages?: string[];
        }[];
    };
}

export const LabelType = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

export const OptionType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: LabelType,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const CustomErrorMessagesType = PropTypes.shape({
    onRequirementFail: PropTypes.string,
    onInputTypeFail: PropTypes.string,
    onMatchFail: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onRangeFailMin: PropTypes.string,
    onRangeFailMax: PropTypes.string,
    onExtensionFail: PropTypes.string,
});

export const ValidationRuleType = PropTypes.shape({
    isRequired: PropTypes.bool,
    inputType: PropTypes.oneOf(Object.values(ValidationInputType)),
    match: PropTypes.func,
    customErrorMessages: CustomErrorMessagesType,
});

export const EventsType = PropTypes.objectOf(PropTypes.func);

export const FieldAttrType = PropTypes.object;

export const FieldOptionsType = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: LabelType,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
);

export const ValuesShape = PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
});

export const ErrorMessageShape = PropTypes.shape({
    injectables: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
});

export const errorFieldShape = PropTypes.arrayOf(PropTypes.shape({
    errorMessages: PropTypes.arrayOf(ErrorMessageShape),
    ...ValuesShape,
}));

export const FieldGroupValidationResponseType = PropTypes.oneOfType([PropTypes.shape({
    errorFields: PropTypes.arrayOf(errorFieldShape),
    errorMessages: PropTypes.arrayOf(ErrorMessageShape),
    values: PropTypes.arrayOf(ValuesShape),
}), PropTypes.bool]);

export const DateType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
