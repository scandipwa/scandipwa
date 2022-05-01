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

import { RefObject } from 'react';

import { Children, Mix } from 'Type/Common.type';
import { FieldAttr, ValidationRule } from 'Type/Field.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

export type FormContainerProps = {
    children: Children;
    attr: FieldAttr;
    onSubmit: (ref: RefObject<HTMLElement>, fields: field[]) => void;
    onError: (ref: RefObject<HTMLElement>, fields: field[], isValid: boolean | ValidationDOMOutput) => void;
    returnAsObject: boolean;
    elemRef: RefObject<HTMLElement>;
    validationRule: ValidationRule;
    showErrorAsLabel: boolean;
    label: string;
    subLabel: string;
    mix: Mix;
};

export type FormContainerState = {
    validationResponse: boolean | ValidationDOMOutput;
};

export type field = {
    field: HTMLInputElement;
    name: string;
    type: string;
    value: string | boolean;
};
