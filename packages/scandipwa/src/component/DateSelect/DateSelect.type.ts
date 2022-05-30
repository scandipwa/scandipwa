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

import { FieldDateType } from 'Component/FieldDate/FieldDate.config';
import { ProductOption } from 'Component/Product/Product.type';
import { ReactElement } from 'Type/Common.type';

export interface DateSelectContainerMapStateProps {
    yearRange: string;
    dateFieldsOrder: string;
    timeFormat: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DateSelectContainerMapDispatchProps {}

export interface DateSelectContainerBaseProps {
    type: FieldDateType;
    uid: string;
    isRequired: boolean;
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}

export type DateSelectContainerProps = DateSelectContainerMapStateProps
& DateSelectContainerMapDispatchProps
& DateSelectContainerBaseProps;

export interface DateSelectContainerState {
    selectedYear: number;
    selectedMonth: number;
    selectedDay?: number;
    selectedHours: string;
    selectedMinutes: string;
    selectedAMPM: string;
    maxDay: number;
}

export interface DateSelectComponentProps {
    selectedYear: number;
    selectedMonth: number;
    selectedDay?: number;
    selectedHours: string;
    selectedMinutes: string;
    selectedAMPM: string;
    maxDay: number;
    showTimeSelect: boolean;
    showDateSelect: boolean;
    minYear: number;
    maxYear: number;
    dateFieldsOrder: string;
    timeFormat: string;
    uid: string;
    isRequired: boolean;
    type: FieldDateType;
    onSetYear: (year: number) => void;
    onSetMonth: (month: number) => void;
    onSetDay: (day: number) => void;
    onSetHours: (hours: string) => void;
    onSetMinutes: (minutes: string) => void;
    onSetAMPM: (ampm: string) => void;
}

export type DateSelectComponentContainerPropKeys =
    | 'selectedYear'
    | 'selectedMonth'
    | 'selectedDay'
    | 'selectedHours'
    | 'selectedMinutes'
    | 'selectedAMPM'
    | 'maxDay'
    | 'showTimeSelect'
    | 'showDateSelect'
    | 'minYear'
    | 'maxYear'
    | 'dateFieldsOrder'
    | 'timeFormat'
    | 'uid'
    | 'isRequired'
    | 'type';

export interface DateSelectComponentDateMap {
    d: () => ReactElement;
    m: () => ReactElement;
    y: () => ReactElement;
}

export interface OptionShape {
    id: string;
    value: string;
    label: string;
}
