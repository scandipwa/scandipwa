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

import { FormFields } from 'Component/Form/Form.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

/**
 * Returns name: value pair object for form output.
 * @param fields (Array)
 * @param validation ({})
 * @namespace Util/Form/scrollToError
 */
export const scrollToError = (fields: FormFields | null, validation: ValidationDOMOutput | boolean = {}): void => {
    if (typeof validation === 'boolean' || !Array.isArray(fields) || fields.length === 0) {
        return;
    }

    const { errorFields = [] } = validation;

    if (errorFields.length === 0) {
        return;
    }

    const { name } = errorFields[0][0];
    const errorItem = fields.find(({ name: itemName }) => itemName === name);

    if (!errorItem) {
        return;
    }

    const { field } = errorItem;

    if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

export default scrollToError;
