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
import { FIELD_RADIO_NONE } from 'Component/Field/Field.config';
import { NoneRadioOption } from 'Util/Product/Product.type';

export enum ConfigFieldType {
    TEXT = 'field',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'area',
    SELECT = 'drop_down',
    FILE = 'file',
    DATE = 'date',
    DATETIME = 'date_time',
    TIME = 'time',
    MULTI = 'multiple',
}

export const NONE_RADIO_OPTION: NoneRadioOption = {
    title: __('None'),
    label: __('None'),
    uid: FIELD_RADIO_NONE,
    price: 0,
    finalOptionPrice: 0,
    can_change_quantity: false,
    priceInclTax: 0,
    is_default: false,
};
