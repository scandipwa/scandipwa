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
import { FIELD_RADIO_NONE } from 'Component/Field/Field.config';

export const CONFIG_FIELD_TYPE = {
    text: 'field',
    radio: 'radio',
    checkbox: 'checkbox',
    textarea: 'area',
    select: 'drop_down',
    file: 'file',
    date: 'date',
    dateTime: 'date_time',
    time: 'time',
    multi: 'multiple'
};

export const NONE_RADIO_OPTION = {
    title: __('None'),
    label: __('None'),
    uid: FIELD_RADIO_NONE,
    price: 0,
    finalOptionPrice: 0,
    can_change_quantity: false,
    priceInclTax: 0
};

export default CONFIG_FIELD_TYPE;
