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

import { KeyboardEvent, SelectHTMLAttributes } from 'react';

import { FieldEvents, FieldSelectCustomEvents } from 'Component/Field/Field.type';
import { Option } from 'Type/Field.type';

export interface FieldSelectContainerFunctions {
    handleSelectListOptionClick: (option: Option) => void;
    handleSelectListKeyPress: (event: KeyboardEvent) => void;
    handleSelectExpandedExpand: () => void;
    handleSelectExpand: () => void;
    setRef: (elem: HTMLSelectElement | null) => void;
    handleDropdownOpenDirection: () => void;
    handleIsScrollableList: () => void;
}

export interface FieldSelectContainerProps {
    attr: SelectHTMLAttributes<HTMLSelectElement> & {
        isExpanded?: boolean;
        selectPlaceholder?: string;
        noPlaceholder?: boolean;
    };
    events: Omit<FieldEvents, 'onChange'> & FieldSelectCustomEvents;
    options: Option[];
    setRef: (elem: HTMLSelectElement | null) => void;
    isDisabled: boolean;
    noPlaceholder: boolean;
    changeValueOnDoubleClick: boolean;
    isSortSelect: boolean;
}

export interface FieldSelectContainerState {
    valueIndex: number;
    searchString: string;
    selectedOptionIndex: number;
    isExpanded: boolean;
    isDropdownOpenUpwards: boolean;
    isScrollable: boolean;
    isSelectedOptionAvailable: boolean;
}

export interface FieldSelectComponentProps {
    attr: SelectHTMLAttributes<HTMLSelectElement>;
    events: Omit<FieldEvents, 'onChange'> & FieldSelectCustomEvents;
    setRef: (elem: HTMLSelectElement | null) => void;
    options: Option[];
    isExpanded: boolean;
    handleSelectListOptionClick: (option: Option) => void;
    handleSelectListKeyPress: (event: KeyboardEvent) => void;
    handleSelectExpandedExpand: () => void;
    handleSelectExpand: () => void;
    isSelectedOptionAvailable: boolean;
    isDisabled: boolean;
    isDropdownOpenUpwards: boolean;
    isScrollable: boolean;
    isSortSelect: boolean;
    isUpDirection: boolean;
}

export type FieldSelectContainerPropsKeys = 'attr'
| 'events'
| 'setRef'
| 'isDisabled'
| 'isExpanded'
| 'isDropdownOpenUpwards'
| 'isScrollable'
| 'isSortSelect'
| 'isSelectedOptionAvailable'
| 'options';
