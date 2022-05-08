/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { DateFieldAttr, HourFormat } from 'Component/DateSelect/DateSelect.config';
import { FieldType } from 'Component/Field/Field.config';
import {
    DATE_FIELDS_COUNT,
    FieldDateType,
    TimeFormat
} from 'Component/FieldDate/FieldDate.config';

import {
    DateMap,
    DateObject,
    DateRangeAttribute,
    DatesData,
    FieldData,
    GetFieldsData,
    YearRangeAttribute
} from './Form.type';

/**
 * Appends 0 to value if its less than passed attribute;
 * @param value
 * @param lessThan
 * @returns {string|*}
 * @namespace Util/Form/Extract/zeroBasedValue
 */
// eslint-disable-next-line no-magic-numbers
export const zeroBasedValue = <T>(value: T, lessThan = 10): string | T => (
    (+value < lessThan) ? `0${value}` : value
);

/** @namespace Util/Form/Extract/adjustHours */
export const adjustHours = (hours: number, timeFormat: string): number => {
    if (timeFormat === TimeFormat.H12) {
        if (hours > HourFormat.H12) {
            return hours % HourFormat.H12;
        }

        if (hours === 0) {
            return HourFormat.H12;
        }
    }

    return hours;
};

/**
 * Converts date to magento supported format
 * @returns {string|*}
 * @namespace Util/Form/Extract/getDateValue
 */
export const getDateValue = (dateValue: number | string | Date): number | string | Date => {
    try {
        const date = new Date(dateValue);
        const day = zeroBasedValue(date.getDate());
        const month = zeroBasedValue(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = zeroBasedValue(date.getHours());
        const minutes = zeroBasedValue(date.getMinutes());
        const seconds = zeroBasedValue(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch {
        return dateValue;
    }
};

/** @namespace Util/Form/Extract/calcYearRangeAttributes */
export const calcYearRangeAttributes = (startYear: number, endYear: number): YearRangeAttribute => {
    const currentYear = new Date().getFullYear();

    // https://docs.magento.com/user-guide/stores/attribute-date-time-options.html
    // blank year range defaults to current year
    if (!startYear && !endYear) {
        return { minYear: currentYear, maxYear: currentYear };
    }

    // if start or end date is empty it defaults to current year
    // if it creates an invalid range, the only filled in year is used both as start and end of the range
    // e.g. `2020,` => `2020,2021`, `,2022` => `2021,2022`, `,2020` => `2020,2020`, `2022,` => `2022,2022`
    const minYear = startYear || (endYear && currentYear <= endYear ? currentYear : endYear);
    const maxYear = endYear || (startYear && currentYear >= startYear ? currentYear : startYear);

    return { minYear, maxYear };
};

/** @namespace Util/Form/Extract/getYearRangeAttributes */
export const getYearRangeAttributes = (yearRange = ',', isYear = false): YearRangeAttribute | DateRangeAttribute => {
    const [startYear, endYear] = yearRange.split(',');

    const { minYear, maxYear } = calcYearRangeAttributes(Number(startYear), Number(endYear));

    if (isYear) {
        return { minYear, maxYear };
    }

    return {
        minDate: new Date(`${minYear}-01-01T00:00:00.000`),
        maxDate: new Date(`${maxYear}-12-31T23:59:59.999`)
    };
};

/** @namespace Util/Form/Extract/isMagentoDateFormatValid */
export const isMagentoDateFormatValid = (dateFieldsOrder: string): boolean => new RegExp(Array(DATE_FIELDS_COUNT)
    .fill('[dmy]').join(','))
    .test(dateFieldsOrder);

/** @namespace Util/Form/Extract/getTimeFormat */
export const getTimeFormat = (timeFormat: string): string => (timeFormat === TimeFormat.H12 ? 'h:mm aa' : 'HH:mm');

/** @namespace Util/Form/Extract/getDateFormat */
export const getDateFormat = (dateFieldsOrder: string): string => {
    if (!isMagentoDateFormatValid(dateFieldsOrder)) {
        return 'dd/MM/yyyy';
    }

    const dateMap: DateMap = {
        d: 'dd',
        m: 'MM',
        y: 'yyyy'
    };

    return dateFieldsOrder
        .split(',')
        .map((field) => dateMap[<keyof DateMap>field])
        .join('/');
};

/** @namespace Util/Form/Extract/getDateTimeFormat */
export const getDateTimeFormat = (type: string, dateFieldsOrder: string, timeFormat: string): string => {
    const timePart = type === FieldDateType.TIME || type === FieldDateType.DATETIME
        ? getTimeFormat(timeFormat)
        : '';

    const datePart = type === FieldDateType.DATE || type === FieldDateType.DATETIME
        ? getDateFormat(dateFieldsOrder)
        : '';

    return `${datePart } ${ timePart}`.trim();
};

/** @namespace Util/Form/Extract/adjustAmpmHours */
export const adjustAmpmHours = (hours: number, ampm?: string): number => {
    if (ampm === 'PM') {
        return (hours % HourFormat.H12) + HourFormat.H12;
    }

    if (ampm === 'AM') {
        return hours % HourFormat.H12;
    }

    return hours;
};

/** @namespace Util/Form/Extract/transformDateFieldsData */
export const transformDateFieldsData = (
    datesData: Record<string, DatesData>
): DateObject[] => Object.entries(datesData).reduce((
    prev: DateObject[],
    [name, data]
) => {
    const {
        type,
        year,
        month,
        day,
        hours,
        minutes,
        ampm
    } = data;

    const hoursAdjusted = adjustAmpmHours(Number(hours), ampm);

    if (type === FieldDateType.DATE && year && month && day) {
        return [...prev, {
            name,
            type,
            value: `${year}-${month}-${day} 00:00:00`
        }];
    }

    if (type === FieldDateType.DATETIME && year && month && day && hours && minutes) {
        return [...prev, {
            name,
            type,
            value: `${year}-${month}-${day} ${hoursAdjusted}:${minutes}:00`
        }];
    }

    if (type === FieldDateType.TIME && hours && minutes) {
        return [...prev, {
            name,
            type,
            value: `2000-01-01 ${hoursAdjusted}:${minutes}:00`
        }];
    }

    return prev;
}, []);

/** @namespace Util/Form/Extract/groupDateFieldsData */
export const groupDateFieldsData = (
    fields: NodeListOf<HTMLSelectElement | HTMLInputElement>
): Record<string, DatesData> => Array.from(fields)
    .reduce((prev: Record<string, DatesData>, field) => {
        const dataType = field.getAttribute(DateFieldAttr.TYPE) || '';

        if (!Object.values<string>(FieldDateType).includes(dataType)) {
            return prev;
        }

        const { name, value } = field;
        const fieldName = field.getAttribute(DateFieldAttr.NAME) || '';
        const { [name]: prevData } = prev;

        return {
            ...prev,
            [name]: {
                ...prevData,
                type: <FieldDateType>dataType,
                [fieldName]: value
            }
        };
    }, {});

/**
 * Returns fields values from DOM/Form
 * @param DOM
 * @param excludeEmpty
 * @param ignoreTypes
 * @param asObject
 * @returns {{}|*[]}
 * @namespace Util/Form/Extract/getFieldsData
 */
export const getFieldsData = <AsObject extends boolean = false>(
    DOM: Document | HTMLElement | null,
    excludeEmpty = false,
    ignoreTypes: string[] = [],
    asObject?: AsObject
): GetFieldsData<AsObject> | null => {
    if (!DOM) {
        return null;
    }

    const fields: NodeListOf<HTMLSelectElement | HTMLInputElement> = DOM.querySelectorAll('input, textarea, select');
    const output: Array<DateObject | FieldData> = [];

    const dateFieldsGrouped = groupDateFieldsData(fields);
    output.push(...transformDateFieldsData(dateFieldsGrouped));

    fields.forEach((field) => {
        if (Object.values<string>(FieldDateType).includes(field.getAttribute(DateFieldAttr.TYPE) || '')) {
            return;
        }

        const { tagName } = field;
        const tag = tagName.toLowerCase();
        const type = tag === FieldType.TEXTAREA || tag === FieldType.SELECT || tag === FieldType.BUTTON
            ? tag
            : field.type;

        if (ignoreTypes.some((ignoreType) => ignoreType === type)) {
            return;
        }

        // eslint-disable-next-line no-nested-ternary
        const value = field instanceof HTMLInputElement
            && (type === FieldType.CHECKBOX || type === FieldType.RADIO)
            // eslint-disable-next-line no-nested-ternary
            ? (field.checked ? field.value === 'on' ? true : field.value : false)
            : field instanceof HTMLInputElement && type === FieldType.FILE
                ? field.fileData
                : field.value;

        const dateValue = field.getAttribute('data-date');
        const formattedValue = dateValue ? getDateValue(dateValue) : value || '';

        if (!excludeEmpty || value) {
            output.push({
                name: field.name,
                type,
                value: formattedValue,
                field
            });
        }
    });

    if (asObject) {
        const objectOutput: Record<string, DateObject | FieldData> = {};

        output.forEach((field) => {
            const { name } = field;
            objectOutput[name] = field;
        });

        return <GetFieldsData<AsObject>>objectOutput;
    }

    return <GetFieldsData<AsObject>>output;
};

export default getFieldsData;
