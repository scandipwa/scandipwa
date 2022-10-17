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

export interface ValuesShape {
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
}

export interface ErrorMessageShape {
    injectables?: string[];
    value?: string;
}

export interface ErrorFieldShape {
    errorMessages?: ErrorMessageShape[];
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
}

export type FieldGroupValidationResponse = {
    errorFields: ErrorFieldShape;
    errorMessages: ErrorMessageShape;
    values: ValuesShape;
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
