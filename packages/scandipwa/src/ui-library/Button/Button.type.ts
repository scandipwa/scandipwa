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

import {
    ButtonHTMLAttributes, ChangeEvent, ClassAttributes, DOMAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes,
} from 'react';

import { DateFieldAttr } from 'Component/DateSelect/DateSelect.config';
import {
    EventFieldData, FieldInputCustomEvents, FieldNumberCustomEvents, FieldSelectCustomEvents,
} from 'Component/Field/Field.type';
import { Children, Mix } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

export interface ButtonComponentProps {
    children: Children;
    mix: Mix;
    ariaLabel: string;
    'aria-label': string;
    id: string;
    attr: FieldAttributes;
    events: FieldEvents;
}

export type FieldAttributes = (InputHTMLAttributes<HTMLInputElement>
| ButtonHTMLAttributes<HTMLButtonElement>
| TextareaHTMLAttributes<HTMLTextAreaElement>
| SelectHTMLAttributes<HTMLSelectElement>)
& ClassAttributes<HTMLElement>
& {
    selectPlaceholder?: string;
    isExpanded?: boolean;
    noPlaceholder?: boolean;
    key?: string | number;
    [DateFieldAttr.TYPE]?: string;
    [DateFieldAttr.NAME]?: string;
};

export type FieldEvents = Omit<DOMAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML' | 'onChange'>
& {
    onChange?: ((event: ChangeEvent<HTMLInputElement>, field?: EventFieldData) => void)
    | FieldNumberCustomEvents['onChange']
    | FieldSelectCustomEvents['onChange']
    | FieldInputCustomEvents['onChange']
    | ((currencyCode: GQLCurrencyEnum) => void);
    onLoad?: FieldNumberCustomEvents['onLoad'];
};

export type FieldReactEvents<T> = Omit<DOMAttributes<T>, 'children' | 'dangerouslySetInnerHTML'>;

export type ButtonContainerPropsKey = 'mix';
