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

import { FieldOptions } from 'Type/Field.type';

/** @namespace Util/Field/arrayToFieldOptions */
export const arrayToFieldOptions = (valuesArr: Array<string | number>): FieldOptions[] => valuesArr.map((value, index) => ({
    id: index,
    label: value.toString(),
    value,
}));
