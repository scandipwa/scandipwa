/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { FieldType } from 'Component/Field/Field.config';

export type Label = string | React.ReactNode;

export type Option = {
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
};

export type CustomErrorMessages = {
    onRequirementFail?: string;
    onInputTypeFail?: string;
    onMatchFail?: string;
    onRangeFailMin?: string;
    onRangeFailMax?: string;
    onExtensionFail?: string;
    onGroupFail?: string;
};

// TODO
export type Events = Record<string, unknown>;

// TODO
export type FieldAttr = unknown;

export type FieldOptions = {
    id?: string | number;
    label?: Label;
    value?: string | number;
    isHovered?: boolean;
};

export type ValuesShape = {
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
};

export type ErrorMessageShape = {
    injectables?: string[];
    value?: string;
};

export type ErrorFieldShape = {
    errorMessages?: ErrorMessageShape[];
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
};

export type FieldGroupValidationResponse = {
    errorFields: ErrorFieldShape;
    errorMessages: ErrorMessageShape;
    values: ValuesShape;
} | boolean;

export type Date = number | string;

export type ValidationOutput = {
    detail?: {
        errors?: {
            type: FieldType;
            name?: string;
            value?: string | boolean;
            errorMessages?: string[];
        }[];
    };
};
