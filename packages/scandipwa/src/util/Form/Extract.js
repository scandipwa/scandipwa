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

import { FIELD_NAME_ATTR, FIELD_TYPE_ATTR, HOURS_12H_COUNT } from 'Component/DateSelect/DateSelect.config';
import FIELD_TYPE from 'Component/Field/Field.config';
import { DATE_FIELDS_COUNT, FIELD_DATE_TYPE, TIME_FORMAT } from 'Component/FieldDate/FieldDate.config';

/**
 * Appends 0 to value if its less than passed attribute;
 * @param value
 * @param lessThan
 * @returns {string|*}
 * @namespace Util/Form/Extract/zeroBasedValue
 */
// eslint-disable-next-line no-magic-numbers
export const zeroBasedValue = (value, lessThan = 10) => (
    (+value < lessThan) ? `0${value}` : value
);

/** @namespace Util/Form/Extract/adjustHours */
export const adjustHours = (hours, timeFormat) => {
    if (timeFormat === TIME_FORMAT.H12) {
        if (hours > HOURS_12H_COUNT) {
            return hours % HOURS_12H_COUNT;
        }

        if (hours === 0) {
            return HOURS_12H_COUNT;
        }
    }

    return hours;
};

/**
 * Converts date to magento supported format
 * @returns {string|*}
 * @namespace Util/Form/Extract/getDateValue
 */
export const getDateValue = (dateValue) => {
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
export const calcYearRangeAttributes = (startYear, endYear) => {
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
export const getYearRangeAttributes = (yearRange = ',', isYear = false) => {
    const [startYear, endYear] = yearRange.split(',');

    const { minYear, maxYear } = calcYearRangeAttributes(startYear, endYear);

    if (isYear) {
        return { minYear, maxYear };
    }

    return {
        minDate: new Date(`${minYear}-01-01T00:00:00.000`),
        maxDate: new Date(`${maxYear}-12-31T23:59:59.999`)
    };
};

/** @namespace Util/Form/Extract/isMagentoDateFormatValid */
export const isMagentoDateFormatValid = (dateFieldsOrder) => new RegExp(Array(DATE_FIELDS_COUNT)
    .fill('[dmy]').join(','))
    .test(dateFieldsOrder);

/** @namespace Util/Form/Extract/getTimeFormat */
export const getTimeFormat = (timeFormat) => (timeFormat === TIME_FORMAT.H12 ? 'h:mm aa' : 'HH:mm');

/** @namespace Util/Form/Extract/getDateFormat */
export const getDateFormat = (dateFieldsOrder) => {
    if (!isMagentoDateFormatValid(dateFieldsOrder)) {
        return 'dd/MM/yyyy';
    }

    const dateMap = {
        d: 'dd',
        m: 'MM',
        y: 'yyyy'
    };

    return dateFieldsOrder.split(',').map((field) => dateMap[field]).join('/');
};

/** @namespace Util/Form/Extract/getDateTimeFormat */
export const getDateTimeFormat = (type, dateFieldsOrder, timeFormat) => {
    const timePart = type === FIELD_DATE_TYPE.time || type === FIELD_DATE_TYPE.dateTime
        ? getTimeFormat(timeFormat)
        : '';

    const datePart = type === FIELD_DATE_TYPE.date || type === FIELD_DATE_TYPE.dateTime
        ? getDateFormat(dateFieldsOrder)
        : '';

    return `${datePart } ${ timePart}`.trim();
};

/** @namespace Util/Form/Extract/adjustAmpmHours */
export const adjustAmpmHours = (hours, ampm) => {
    if (ampm === 'PM') {
        return (hours % HOURS_12H_COUNT) + HOURS_12H_COUNT;
    }

    if (ampm === 'AM') {
        return hours % HOURS_12H_COUNT;
    }

    return hours;
};

/** @namespace Util/Form/Extract/transformDateFieldsData */
export const transformDateFieldsData = (datesData) => Object.entries(datesData).reduce((prev, [name, data]) => {
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

    if (type === FIELD_DATE_TYPE.date && year && month && day) {
        return [...prev, {
            name,
            type,
            value: `${year}-${month}-${day} 00:00:00`
        }];
    }

    if (type === FIELD_DATE_TYPE.dateTime && year && month && day && hours && minutes) {
        return [...prev, {
            name,
            type,
            value: `${year}-${month}-${day} ${hoursAdjusted}:${minutes}:00`
        }];
    }

    if (type === FIELD_DATE_TYPE.time && hours && minutes) {
        return [...prev, {
            name,
            type,
            value: `2000-01-01 ${hoursAdjusted}:${minutes}:00`
        }];
    }

    return prev;
}, []);

/** @namespace Util/Form/Extract/groupDateFieldsData */
export const groupDateFieldsData = (fields) => Array.from(fields)
    .reduce((prev, field) => {
        const dataType = field.getAttribute(FIELD_TYPE_ATTR);

        if (!Object.values(FIELD_DATE_TYPE).includes(dataType)) {
            return prev;
        }

        const { name, value } = field;
        const fieldName = field.getAttribute(FIELD_NAME_ATTR);
        const { [name]: prevData } = prev;

        return {
            ...prev,
            [name]: {
                ...prevData,
                type: dataType,
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
export const getFieldsData = (DOM, excludeEmpty = false, ignoreTypes = [], asObject = false) => {
    const fields = DOM.querySelectorAll('input, textarea, select');
    const output = [];

    const dateFieldsGrouped = groupDateFieldsData(fields);
    output.push(...transformDateFieldsData(dateFieldsGrouped));

    fields.forEach((field) => {
        if (Object.values(FIELD_DATE_TYPE).includes(field.getAttribute(FIELD_TYPE_ATTR))) {
            return;
        }

        const { tagName } = field;
        const tag = tagName.toLowerCase();
        const type = tag === FIELD_TYPE.textarea || tag === FIELD_TYPE.select || tag === FIELD_TYPE.button
            ? tag : field.type;

        if (ignoreTypes.some((ignoreType) => ignoreType === type)) {
            return;
        }

        // eslint-disable-next-line no-nested-ternary
        const value = type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio
            // eslint-disable-next-line no-nested-ternary
            ? (field.checked ? field.value === 'on' ? true : field.value : false)
            : type === FIELD_TYPE.file
                ? field.fileData
                : field.value;

        const dateValue = field.getAttribute('data-date');
        const formattedValue = dateValue ? getDateValue(dateValue) : value;

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
        const objectOutput = {};
        output.forEach((field) => {
            const { name } = field;
            objectOutput[name] = field;
        });

        return objectOutput;
    }

    return output;
};

export default getFieldsData;
