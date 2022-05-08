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

import {
    DetailedHTMLProps, FormEvent, FormHTMLAttributes, RefObject, SyntheticEvent
} from 'react';

import { Children, Mix } from 'Type/Common.type';
import { ValidationRule } from 'Type/Field.type';
import { GetFieldsData } from 'Util/Form/Form.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

export type FormContainerProps = {
    children: Children;
    attr: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    onSubmit: (ref: RefObject<HTMLElement>, fields: GetFieldsData<true>) => void;
    onError: (ref: RefObject<HTMLElement>, fields: GetFieldsData<true>, isValid: boolean | ValidationDOMOutput) => void;
    returnAsObject: boolean;
    elemRef: RefObject<HTMLElement>;
    validationRule: ValidationRule;
    showErrorAsLabel: boolean;
    label: string;
    subLabel: string;
    mix: Mix;
    events: Record<string, (event?: SyntheticEvent) => void>;
    validateOn: string[];
};

export type FormContainerState = {
    validationResponse: boolean | ValidationDOMOutput;
};

export type FormComponentProps = {
    children: Children;
    attr: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    events: Record<string, ((event?: SyntheticEvent) => void) | ((e: FormEvent<Element>) => Promise<void>)>;
    setRef: (elem: HTMLFormElement | null) => void;
    showErrorAsLabel: boolean;
    validationResponse: boolean | ValidationDOMOutput;
    label: string;
    subLabel: string;
    mix: Mix;
};

export type FormContainerPropsKeys =
    | 'validationResponse'
    | 'children'
    | 'attr'
    | 'showErrorAsLabel'
    | 'label'
    | 'subLabel'
    | 'mix'
    | 'events';

export type field = {
    field: HTMLInputElement;
    name: string;
    type: string;
    value: string | boolean;
};
