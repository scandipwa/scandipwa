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

export type ValidationRule = {
    isRequired?: boolean;
    inputType?: string;
    selector?: string;
    match?: string
    | ((args: string | Record<string, string>[] | undefined) => boolean)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((...args: any[]) => true | string);
    range?: { min?: number; max?: number; showLengthError?: boolean };
    fileExtension?: Record<string, string>;
    customErrorMessages?: Record<string, string>;
};

export type ValidationOutput = {
    value: string | boolean;
    errorMessages: string[];
};

export type ValidationDOMOutput = {
    values?: {
        name: string;
        value: string;
        type: string;
    }[];
    errorFields?: unknown[];
    errorMessages?: string[];
};

export type FieldValidationOutput = {
    errorMessages?: string[];
    name?: string;
    type: FieldType;
    value?: string | boolean;
};
