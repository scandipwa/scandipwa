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

import { NameValue } from 'Type/Common.type';

/**
 * Returns name: value pair object for form output.
 * @param fields (Array|Object)
 * @returns {{}}
 * @namespace Util/Form/Transform/transformToNameValuePair
 */
export const transformToNameValuePair = (
    fields: Record<string, NameValue> | NameValue[]
): Record<string, string> => {
    const filteredFields: Record<string, string> = {};
    const arrayFormat = !Array.isArray(fields) ? Object.values(fields) : fields;

    arrayFormat.forEach(({ value, name }) => {
        filteredFields[name] = value;
    });

    return filteredFields;
};

export default transformToNameValuePair;
