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

import { Component, InputHTMLAttributes, SyntheticEvent } from 'react';

import { FieldEvents, FieldInputCustomEvents } from 'Component/Field/Field.type';
import { FieldValidationOutput, ValidationOutput } from 'Util/Validator/Validator.type';

export interface FieldFileContainerFunctions {
    setRef: (elem: HTMLInputElement | null) => void;
}

export interface FieldFileContainerProps {
    attr: InputHTMLAttributes<HTMLElement>;
    events: Omit<FieldEvents, 'onChange'> & FieldInputCustomEvents;
    setRef: (elem: HTMLInputElement | null) => void;
    validate: (data?: (Event | SyntheticEvent) & ValidationOutput) => boolean | FieldValidationOutput;
    resetFieldValue: (
        fieldHandler: Component<FieldFileContainerProps, FieldFileContainerState>,
        event: SyntheticEvent<Element, Event>
    ) => void;
}

export interface FieldFileContainerState {
    fileName: string;
    isLoading: boolean;
    value: string;
}

export interface FieldFileComponentProps {
    attr: InputHTMLAttributes<HTMLElement>;
    events: Omit<FieldEvents, 'onChange'> & FieldInputCustomEvents;
    setRef: (elem: HTMLInputElement | null) => void;
    fileName: string;
    isLoading: boolean;
    value: string;
    resetFieldValue: (
        fieldHandler: Component<FieldFileContainerProps, FieldFileContainerState>,
        event: SyntheticEvent<Element, Event>
    ) => void;
}

export type FieldContainerPropsKeys =
 'fileName'
 | 'isLoading'
 | 'setRef'
 | 'events'
 | 'attr'
 | 'value'
 | 'resetFieldValue';

export interface FieldFileComponentState {}
