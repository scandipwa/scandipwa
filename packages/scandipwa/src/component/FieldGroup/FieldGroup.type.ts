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
    FocusEventHandler,
    FormHTMLAttributes,
    MutableRefObject,
    ReactEventHandler,
    RefObject,
    SyntheticEvent
} from 'react';

import { FieldRef } from 'Component/Field/Field.type';
import { FormValidationOutput } from 'Component/Form/Form.type';
import { Children, Mods } from 'Type/Common.type';
import { ValidationDOMOutput, ValidationRule } from 'Util/Validator/Validator.type';

export interface FieldGroupContainerFunctions {
    validate: (data?: (Event | SyntheticEvent) & FormValidationOutput) => boolean | ValidationDOMOutput | null;
}

export interface FieldGroupContainerProps {
    children: Children;
    attr: FormHTMLAttributes<HTMLDivElement>;
    events: FieldGroupEvents;
    elemRef: MutableRefObject<HTMLDivElement>;
    validationRule: ValidationRule;
    validateOn: string[];
    showErrorAsLabel: boolean;
    label: string;
    subLabel: string;
    mods: Mods;
    returnAsObject?: boolean;
}

export interface FieldGroupContainerState {
    validationResponse: true | ValidationDOMOutput | null;
}

export interface FieldGroupComponentProps {
    children: Children;
    attr: FormHTMLAttributes<HTMLDivElement>;
    events: FieldGroupEvents;
    setRef: (elem: HTMLDivElement | null) => void;
    showErrorAsLabel: boolean;
    validationResponse: true | ValidationDOMOutput | null;
    label: string;
    subLabel: string;
    mods: Mods;
}

export type FieldGroupContainerPropsKeys = 'validationResponse'
| 'children'
| 'attr'
| 'showErrorAsLabel'
| 'label'
| 'subLabel'
| 'mods'
| 'events'
| 'setRef';

export type FieldGroupEvents = Omit<
DOMAttributes<HTMLDivElement>,
'children'
| 'onBlur'
| 'onLoad'
| 'dangerouslySetInnerHTML'
>
& {
    onBlur: (event: FocusEventHandler, fields: FieldGroupEventData) => void;
    onLoad: (event: ReactEventHandler, fields: FieldGroupEventData) => void;
};

export interface FieldGroupEventData {
    fields: {
        field: RefObject<FieldRef>;
        name: string;
        type: string;
        value: string;
    }[];
    formRef: RefObject<HTMLDivElement>;
}
