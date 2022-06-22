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

import { InputHTMLAttributes } from 'react';

import { FieldEvents, FieldNumberCustomEvents } from 'Component/Field/Field.type';

export interface FieldNumberContainerFunctions {
    setRef: (elem: HTMLInputElement | null) => void;
    handleValueChange: (value: number) => void;
}

export interface FieldNumberContainerProps {
    attr: InputHTMLAttributes<HTMLInputElement>;
    events: Omit<FieldEvents, 'onChange' | 'onLoad'> & FieldNumberCustomEvents;
    isDisabled: boolean;
    setRef: (elem: HTMLInputElement | null) => void;
}

export interface FieldNumberContainerState {
    value: number | string;
}

export interface FieldNumberComponentProps {
    attr: InputHTMLAttributes<HTMLInputElement>;
    events: Omit<FieldEvents, 'onChange' | 'onLoad'> & FieldNumberCustomEvents;
    setRef: (elem: HTMLInputElement | null) => void;
    value: string | number;
    handleValueChange: (value: number) => void;
    isDisabled: boolean;
}

export type FieldNumberContainerPropsKeys = 'attr'
| 'events'
| 'isDisabled'
| 'value';
