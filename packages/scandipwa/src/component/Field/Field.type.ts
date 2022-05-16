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
    ButtonHTMLAttributes,
    ChangeEvent,
    ClassAttributes,
    DOMAttributes,
    InputHTMLAttributes,
    MutableRefObject,
    SelectHTMLAttributes,
    SyntheticEvent,
    TextareaHTMLAttributes
} from 'react';

import { Mix, ReactElement } from 'Type/Common.type';
import { FieldOptions, Option } from 'Type/Field.type';
import { FieldValidationOutput, ValidationDOMOutput, ValidationRule } from 'Util/Validator/Validator.type';

import { FieldType } from './Field.config';

export interface FieldContainerProps {
    type: FieldType;
    attr: FieldAttributes;
    events: FieldEvents;
    isDisabled: boolean;
    mix: Mix;
    options: FieldOptions[];
    elemRef: MutableRefObject<HTMLElement>;
    changeValueOnDoubleClick: boolean;
    isSortSelect: boolean;
    validationRule: ValidationRule;
    validateOn: string[];
    showErrorAsLabel: boolean;
    label: ReactElement | string | null;
    subLabel: ReactElement | string | null;
    addRequiredTag: boolean;
}

export interface FieldContainerState {
    validationResponse: null | boolean | FieldValidationOutput;
    showLengthError: boolean;
}

export interface FieldComponentProps {
    type: FieldType;
    attr: FieldAttributes;
    events: FieldEvents;
    isDisabled: boolean;
    setRef: (elem: FieldRef | null) => void;
    mix: Mix;
    options: Option[];
    changeValueOnDoubleClick: boolean;
    isSortSelect: boolean;
    label: ReactElement | string | null;
    subLabel: ReactElement | string | null;
    addRequiredTag: boolean;
    showErrorAsLabel: boolean;
    validationResponse: null | boolean | ValidationDOMOutput;
}

export type FieldContainerPropsKeys =
'type'
| 'attr'
| 'isDisabled'
| 'mix'
| 'options'
| 'showErrorAsLabel'
| 'label'
| 'subLabel'
| 'addRequiredTag'
| 'changeValueOnDoubleClick'
| 'isSortSelect'
| 'validationResponse'
| 'events'
| 'setRef';

export type FieldRef = HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | HTMLSelectElement;
export type FieldAttributes = (InputHTMLAttributes<HTMLInputElement>
| ButtonHTMLAttributes<HTMLButtonElement>
| TextareaHTMLAttributes<HTMLTextAreaElement>
| SelectHTMLAttributes<HTMLSelectElement>)
& ClassAttributes<HTMLElement>
& {
    selectPlaceholder?: string;
    isExpanded?: boolean;
    noPlaceholder?: boolean;
};

export type FieldEvents = Omit<DOMAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML' | 'onChange'>
& {
    onChange?: ((event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void)
    | FieldNumberCustomEvents['onChange']
    | FieldSelectCustomEvents['onChange']
    | FieldInputCustomEvents['onChange'];
    onLoad?: FieldNumberCustomEvents['onLoad'];
};

export type FieldNumberCustomEvents = {
    onChange?: (value: number, field?: EventFieldData, event?: SyntheticEvent) => void;
    onLoad?: (value: number, field?: EventFieldData, event?: SyntheticEvent) => void;
};

export type FieldSelectCustomEvents = {
    onChange?: (value: string) => void;
};

export type FieldInputCustomEvents = {
    onChange?: (value: string) => void;
};

export type EventFieldData = FieldAttributes & { fieldRef: FieldRef; value: string; type: string };

export type FieldReactEvents<T> = Omit<DOMAttributes<T>, 'children' | 'dangerouslySetInnerHTML'>;
