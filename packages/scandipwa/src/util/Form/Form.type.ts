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

export type YearRangeAttribute = {
    minYear: number;
    maxYear: number;
};

export type DateRangeAttribute = {
    minDate: Date;
    maxDate: Date;
};

export type DateMap = {
    d: string;
    m: string;
    y: string;
};

export type DatesData = {
    type: FieldDateType;
    year?: string;
    month?: string;
    day?: string;
    hours?: string;
    minutes?: string;
    ampm?: string;
    name: string;
};

export type DateObject = {
    name: string;
    type: FieldDateType;
    value: string;
};

export type FieldData<T = FieldValue> = {
    field: HTMLElement;
    name: string;
    type: string;
    value: T;
};

export type GetFieldsData<AsObject extends boolean = false> = AsObject extends true
    ? Record<string, DateObject | FieldData>
    : Array<DateObject | FieldData>;

export type FieldValue = string | number | boolean | Date;
