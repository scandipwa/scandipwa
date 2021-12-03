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

import FIELD_TYPE from 'Component/Field/Field.config';

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

/**
 * Converts date to magento supported format
 * @param value
 * @returns {string|*}
 * @namespace Util/Form/Extract/getDateValue
 */
export const getDateValue = (value, fieldType = FIELD_TYPE.date) => {
    try {
        const dateValue = fieldType === FIELD_TYPE.time
            ? `2000-01-01 ${value}`
            : value;

        const date = new Date(dateValue);
        const day = zeroBasedValue(date.getDate());
        const month = zeroBasedValue(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = zeroBasedValue(date.getHours());
        const minutes = zeroBasedValue(date.getMinutes());
        const seconds = zeroBasedValue(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch {
        return value;
    }
};

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

    fields.forEach((field) => {
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

        const formattedValue = (type === FIELD_TYPE.date
            || type === FIELD_TYPE.dateTime
            || type === FIELD_TYPE.time)
            && value
            ? getDateValue(value, type) : value;

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
