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
    DOMAttributes,
    FormEvent,
    FormHTMLAttributes,
    MutableRefObject,
    SyntheticEvent
} from 'react';

import { Children, Mix } from 'Type/Common.type';
import { DateObject, FieldData } from 'Util/Form/Form.type';
import { ValidationDOMOutput, ValidationRule } from 'Util/Validator/Validator.type';

export type FormFields = (DateObject | FieldData)[] | Record<string, DateObject | FieldData>;

export interface FormContainerFunctions {
    validate: (data?: (Event | SyntheticEvent) & FormValidationOutput) => boolean | ValidationDOMOutput | null;
    setRef: (elem: HTMLFormElement | null) => void;
    onSubmit: (e: FormEvent) => Promise<void>;
}

export interface FormContainerProps {
    children: Children;
    attr: FormHTMLAttributes<HTMLFormElement>;
    events: Omit<DOMAttributes<HTMLFormElement>, 'children' | 'dangerouslySetInnerHTML'>;
    onSubmit: (
        form: HTMLFormElement,
        fields: FieldData[],
        asyncData: unknown
    ) => void;
    onError: (
        form: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput
    ) => void;
    returnAsObject: boolean;
    elemRef: MutableRefObject<HTMLFormElement>;
    validationRule: ValidationRule;
    validateOn: string[];
    showErrorAsLabel: boolean;
    label: string;
    subLabel: string;
    mix: Mix;
}

export interface FormContainerState {
    validationResponse: true | ValidationDOMOutput | null;
}

export interface FormComponentProps {
    children: Children;
    attr: FormHTMLAttributes<HTMLFormElement>;
    events: Omit<DOMAttributes<HTMLFormElement>, 'children' | 'dangerouslySetInnerHTML'>;
    showErrorAsLabel: boolean;
    label: string;
    subLabel: string;
    mix: Mix;
    validationResponse: true | ValidationDOMOutput | null;
    setRef: (elem: HTMLFormElement | null) => void;
}

export type FormContainerPropsKeys = 'validationResponse'
| 'children'
| 'attr'
| 'showErrorAsLabel'
| 'label'
| 'subLabel'
| 'mix'
| 'events';

export type FormValidationOutput = {
    detail?: {
        errors?: ValidationDOMOutput[];
    };
};
