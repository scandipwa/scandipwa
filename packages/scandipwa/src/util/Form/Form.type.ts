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
    type?: string;
    year?: string;
    month?: string;
    day?: string;
    hours?: string;
    minutes?: string;
    ampm: string;
    name?: string;
};

export type DateObject = {
    name: string;
    value: string;
    type: string;
};

export type FieldData = {
    field: HTMLElement;
    name: string;
    type: string;
    value: string | boolean | number;
};
