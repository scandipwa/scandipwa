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
    values?: {
        name: string;
        value: string;
        type: string;
    }[];
    errorFields?: unknown[];
    errorMessages?: string[];
};
