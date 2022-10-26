/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { FieldType } from 'Component/Field/Field.config';

export interface ValidationRule {
    isRequired?: boolean;
    inputType?: string;
    selector?: string;
    match?: string
    | ((value: string | Record<string, string | boolean>[] | undefined) => boolean)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((...args: any[]) => boolean | string);
    range?: { min?: number; max?: number; showLengthError?: boolean };
    fileExtension?: Record<string, string>;
    customErrorMessages?: Record<string, string>;
}

export interface ValidationOutput {
    value: string | boolean;
    errorMessages: string[];
}

export interface ValidationDOMOutput {
    values?: {
        name: string;
        value: string | boolean;
        type: string;
    }[];
    errorFields?: unknown[];
    errorMessages?: string[];
}

export interface FieldValidationOutput {
    errorMessages?: string[];
    name?: string;
    type: FieldType;
    value?: string | boolean;
}
