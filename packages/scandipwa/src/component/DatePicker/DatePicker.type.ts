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

import { FieldType } from 'Component/Field/Field.config';
import { FieldDateType } from 'Component/FieldDate/FieldDate.config';
import { ProductOption } from 'Component/Product/Product.type';

export interface DatePickerContainerMapStateProps {
    yearRange: string;
    dateFieldsOrder: string;
    timeFormat: string;
}


export interface DatePickerContainerMapDispatchProps {}

export interface DatePickerContainerFunctions {
    onSetDate: (date: Date) => void;
}

export interface DatePickerContainerBaseProps {
    type: FieldDateType;
    uid: string;
    isRequired: boolean;
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}

export type DatePickerContainerProps = DatePickerContainerMapStateProps
& DatePickerContainerMapDispatchProps
& DatePickerContainerBaseProps;

export interface DatePickerContainerState {
    selectedDate: Date;
}

export interface DatePickerComponentProps {
    selectedDate: Date;
    showTimeSelect: boolean;
    showTimeSelectOnly: boolean;
    minDate: Date;
    maxDate: Date;
    dateFormat: string;
    timeFormat: string;
    uid: string;
    isClearable: boolean;
    type: FieldDateType;
    onSetDate: (date: Date) => void;
}

export type DatePickerComponentContainerPropKeys =
    | 'selectedDate'
    | 'showTimeSelect'
    | 'showTimeSelectOnly'
    | 'minDate'
    | 'maxDate'
    | 'dateFormat'
    | 'timeFormat'
    | 'uid'
    | 'isClearable'
    | 'type';

export interface DatePickerComponentPlaceholderMap {
    [FieldType.DATE]: string;
    [FieldType.DATETIME]: string;
    [FieldType.TIME]: string;
}
