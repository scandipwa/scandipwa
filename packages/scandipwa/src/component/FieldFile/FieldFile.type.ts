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

import { FieldEvents, FieldInputCustomEvents } from 'Component/Field/Field.type';

export interface FieldFileContainerFunctions {
    setRef: (elem: HTMLInputElement | null) => void;
}

export interface FieldFileContainerProps {
    attr: InputHTMLAttributes<HTMLElement>;
    events: Omit<FieldEvents, 'onChange'> & FieldInputCustomEvents;
    setRef: (elem: HTMLInputElement | null) => void;
}

export interface FieldFileContainerState {
    fileName: string;
    isLoading: boolean;
}

export interface FieldFileComponentProps {
    attr: InputHTMLAttributes<HTMLElement>;
    events: Omit<FieldEvents, 'onChange'> & FieldInputCustomEvents;
    setRef: (elem: HTMLInputElement | null) => void;
    fileName: string;
    isLoading: boolean;
}

export type FieldContainerPropsKeys =
 'fileName'
 | 'isLoading'
 | 'setRef'
 | 'events'
 | 'attr';
