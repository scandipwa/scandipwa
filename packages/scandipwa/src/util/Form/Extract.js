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

import FIELD_TYPE from 'Config/Field.config';

export const getFieldsData = (DOM, excludeEmpty = false, ignoreTypes = []) => {
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
            ? (field.checked ? field.value : false)
            : type === FIELD_TYPE.file
                ? field.fieldData
                : field.value;

        if (!excludeEmpty || value) {
            output.push({
                name: field.name,
                type,
                value,
                field
            });
        }
    });

    return output;
};

export default getFieldsData;
