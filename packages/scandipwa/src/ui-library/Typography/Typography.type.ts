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
    FieldAttributes, FieldEvents,
} from 'Component/Field/Field.type';
import { Children, Mix } from 'Type/Common.type';

import { TypographyVariants } from './Typography.config';

export interface TypographyContainerProps {
    children: Children;
    mix: Mix;
    attr: FieldAttributes;
    events: FieldEvents;
    variant: TypographyVariants;
}

export interface TypographyComponentProps {
    children: Children;
    mix: Mix;
    attr: FieldAttributes;
    variant: TypographyVariants;
}

export type TypographyContainerPropsKey = 'mix' | 'attr' | 'children' | 'variant';

export interface TypographyMapVariant {
    Component: any;
}
